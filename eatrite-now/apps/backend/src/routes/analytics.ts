import { Router, Request, Response } from 'express';
import { getPool } from '../services/database.js';
import sql from 'mssql';

const router: Router = Router();

// Helper function to execute queries
async function executeQuery(query: string, params: any = {}) {
  const pool = await getPool();
  const request = pool.request();
  
  // Add parameters to request
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      request.input(key, params[key]);
    }
  });
  
  const result = await request.query(query);
  return result.recordset;
}

// Track a new visitor
router.post('/track', async (req, res) => {
  try {
    const {
      sessionId,
      userAgent,
      referrer,
      pageUrl,
      pageTitle,
      screenResolution,
      deviceType,
      browserName,
      browserVersion,
      operatingSystem,
      language,
      timezone,
      utmSource,
      utmMedium,
      utmCampaign
    } = req.body;

    // Get IP address from request
    const ipAddress = req.ip || 
                     req.socket?.remoteAddress ||
                     req.headers['x-forwarded-for'] as string ||
                     'unknown';

    // Insert visitor log into SQL Server
    const query = `
      INSERT INTO visitor_logs (
        session_id, ip_address, user_agent, referrer, page_url, page_title,
        screen_resolution, device_type, browser_name, browser_version,
        operating_system, language, timezone, utm_source, utm_medium, utm_campaign
      ) VALUES (
        @sessionId, @ipAddress, @userAgent, @referrer, @pageUrl, @pageTitle,
        @screenResolution, @deviceType, @browserName, @browserVersion,
        @operatingSystem, @language, @timezone, @utmSource, @utmMedium, @utmCampaign
      )
    `;

    const params = {
      sessionId,
      ipAddress,
      userAgent: userAgent?.substring(0, 500),
      referrer: referrer?.substring(0, 500),
      pageUrl: pageUrl?.substring(0, 500),
      pageTitle: pageTitle?.substring(0, 200),
      screenResolution,
      deviceType,
      browserName,
      browserVersion,
      operatingSystem,
      language,
      timezone,
      utmSource,
      utmMedium,
      utmCampaign
    };

    await executeQuery(query, params);
    // Update daily analytics is handled by scheduled job

    res.status(200).json({ 
      success: true, 
      message: 'Visitor tracked successfully' 
    });

  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to track visitor' 
    });
  }
});

// Get visitor analytics
router.get('/analytics', async (req, res) => {
  try {
    // Get total visitors (last 30 days)
    const totalStats = await executeQuery(`
      SELECT 
        COUNT(*) as totalVisitors,
        COUNT(DISTINCT session_id) as uniqueVisitors,
        COUNT(DISTINCT ip_address) as uniqueIPs
      FROM visitor_logs
      WHERE created_at >= DATEADD(day, -30, GETDATE())
    `);

    // Get today's visitors
    const todayStats = await executeQuery(`
      SELECT 
        COUNT(*) as todayVisitors,
        COUNT(DISTINCT session_id) as todayUniqueSessions
      FROM visitor_logs
      WHERE CAST(created_at as DATE) = CAST(GETDATE() as DATE)
    `);

    // Get top referrers
    const topReferrers = await executeQuery(`
      SELECT TOP 10
        ISNULL(referrer, 'Direct') as referrer,
        COUNT(*) as count
      FROM visitor_logs
      WHERE created_at >= DATEADD(day, -30, GETDATE())
      GROUP BY referrer
      ORDER BY COUNT(*) DESC
    `);

    // Get device breakdown
    const deviceBreakdown = await executeQuery(`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM visitor_logs
      WHERE created_at >= DATEADD(day, -30, GETDATE())
      GROUP BY device_type
      ORDER BY COUNT(*) DESC
    `);

    // Get daily traffic
    const dailyTraffic = await executeQuery(`
      SELECT 
        CAST(created_at as DATE) as date,
        COUNT(*) as visitors,
        COUNT(DISTINCT session_id) as uniqueVisitors
      FROM visitor_logs
      WHERE created_at >= DATEADD(day, -30, GETDATE())
      GROUP BY CAST(created_at as DATE)
      ORDER BY date DESC
    `);

    res.json({
      success: true,
      data: {
        totalStats: totalStats[0],
        todayStats: todayStats[0],
        topReferrers,
        deviceBreakdown,
        hourlyTraffic: [],
        dailyTraffic
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch analytics' 
    });
  }
});

// Get real-time visitor count
router.get('/realtime', async (req, res) => {
  try {
    // Visitors in last 5 minutes
    const realtimeStats = await executeQuery(`
      SELECT 
        COUNT(DISTINCT session_id) as activeVisitors,
        COUNT(*) as pageViews
      FROM visitor_logs
      WHERE created_at >= DATEADD(minute, -5, GETDATE())
    `);

    // Current page breakdown
    const currentPages = await executeQuery(`
      SELECT TOP 10
        page_url,
        COUNT(*) as viewers
      FROM visitor_logs
      WHERE created_at >= DATEADD(minute, -5, GETDATE())
      GROUP BY page_url
      ORDER BY COUNT(*) DESC
    `);

    res.json({
      success: true,
      data: {
        activeVisitors: realtimeStats[0]?.activeVisitors || 0,
        pageViews: realtimeStats[0]?.pageViews || 0,
        currentPages
      }
    });

  } catch (error) {
    console.error('Error fetching real-time data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch real-time data' 
    });
  }
});



export default router;