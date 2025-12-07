import express, { Router } from 'express';
import { Request, Response } from 'express';
import { OrderProcessor, OrderData as ProcessorOrderData } from '../services/orderProcessor.js';

const router: Router = express.Router();

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  description?: string;
}

// NOTE: For authenticated employee orders, use /api/employee/orders endpoints
// This route is kept for legacy/guest checkout support via OrderProcessor

// Create a new order using enhanced OrderProcessor
router.post('/process', async (req: Request, res: Response) => {
  try {
    // Transform request body to OrderProcessor format
    const orderData: ProcessorOrderData = {
      customer: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },
      delivery_address: {
        street: req.body.address,
        apartment: req.body.apartment,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        deliveryInstructions: req.body.deliveryInstructions,
      },
      items: req.body.items.map((item: any) => ({
        meal_id: item.id || item.meal_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customizations: item.customizations,
        dietary_notes: item.dietary_notes,
      })),
      subtotal: req.body.subtotal || 0,
      tax: req.body.tax || 0,
      delivery_fee: req.body.delivery_fee || 0,
      tip: req.body.tip || 0,
      total: req.body.totalAmount || req.body.total,
      delivery_date: req.body.delivery_date,
      delivery_time_slot: req.body.delivery_time_slot,
      special_instructions: req.body.special_instructions,
    };

    // Process the order using OrderProcessor
    const processedOrder = await OrderProcessor.processOrder(orderData);

    res.status(201).json({
      success: true,
      order: {
        id: processedOrder.id,
        order_number: processedOrder.order_number,
        status: processedOrder.status,
        total: processedOrder.pricing.total,
        estimated_delivery: processedOrder.delivery.estimated_date,
        payment_intent_id: processedOrder.payment.payment_intent_id,
      },
      message: 'Order processed successfully',
    });

  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
