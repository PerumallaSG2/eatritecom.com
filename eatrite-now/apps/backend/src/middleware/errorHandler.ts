import { Request, Response, NextFunction } from 'express'
import { AppError, ValidationError as CustomValidationError } from '../types'

interface ErrorResponse {
  success: false
  error: {
    message: string
    type: string
    statusCode: number
    details?: any
  }
  timestamp: string
  path: string
  method: string
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500
  let message = 'Internal Server Error'
  let type = 'ServerError'
  let details: any = undefined

  // Log error for debugging
  console.error(`Error ${new Date().toISOString()}:`, {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  })

  // Handle custom application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    type = err.constructor.name
  }
  
  // Handle custom validation errors
  else if (err instanceof CustomValidationError) {
    statusCode = 400
    message = err.message
    type = 'ValidationError'
    details = err.errors
  }
  
  // Handle SQL Server errors
  else if (err.code) {
    switch (err.code) {
      case 'ENOTFOUND':
      case 'ECONNREFUSED':
        statusCode = 503
        message = 'Database connection failed'
        type = 'DatabaseError'
        break
      case 'EREQUEST':
        statusCode = 400
        message = 'Invalid database request'
        type = 'DatabaseError'
        break
      default:
        statusCode = 500
        message = 'Database error occurred'
        type = 'DatabaseError'
    }
  }
  
  // Handle validation errors from express-validator
  else if (err.errors && Array.isArray(err.errors)) {
    statusCode = 400
    message = 'Validation failed'
    type = 'ValidationError'
    details = err.errors
  }
  
  // Handle JWT errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
    type = 'AuthenticationError'
  }
  
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
    type = 'AuthenticationError'
  }
  
  // Handle multer errors (file upload)
  else if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413
    message = 'File too large'
    type = 'FileUploadError'
  }
  
  // Handle CORS errors
  else if (err.message && err.message.includes('CORS')) {
    statusCode = 403
    message = 'CORS policy violation'
    type = 'CORSError'
  }

  // Create standardized error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message,
      type,
      statusCode,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  }

  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.details = {
      ...errorResponse.error.details,
      stack: err.stack,
      originalError: err.message,
    }
  }

  // Send error response
  res.status(statusCode).json(errorResponse)
}

// Async error handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// 404 handler for undefined routes
export const notFoundHandler = (req: Request, res: Response) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404)
  
  res.status(404).json({
    success: false,
    error: {
      message: error.message,
      type: 'NotFoundError',
      statusCode: 404,
    },
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  })
}
