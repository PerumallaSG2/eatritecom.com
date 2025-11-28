// Simple visitor tracking utility
export interface VisitorData {
  timestamp: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  referrer: string;
  sessionId: string;
}

export class VisitorTracker {
  private static sessionId: string = this.generateSessionId();

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static trackVisitor(): VisitorData {
    const visitorData: VisitorData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'Direct',
      sessionId: this.sessionId
    };

    // Store locally for backup
    this.storeVisitorData(visitorData);
    
    // Send to backend database
    this.sendToBackend(visitorData);
    
    return visitorData;
  }

  private static async sendToBackend(data: VisitorData) {
    try {
      // Get device type
      const deviceType = /Mobile|Android|iPhone|iPad/.test(data.userAgent) 
        ? 'Mobile' 
        : /Tablet|iPad/.test(data.userAgent) 
        ? 'Tablet' 
        : 'Desktop';

      // Get browser info
      const browserInfo = this.getBrowserInfo(data.userAgent);

      const payload = {
        sessionId: data.sessionId,
        userAgent: data.userAgent,
        referrer: data.referrer,
        pageUrl: window.location.href,
        pageTitle: document.title,
        screenResolution: data.screenResolution,
        deviceType,
        browserName: browserInfo.name,
        browserVersion: browserInfo.version,
        operatingSystem: browserInfo.os,
        language: data.language,
        timezone: data.timezone,
        utmSource: new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign')
      };

      // Send to backend API
      await fetch('http://localhost:4005/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📊 Visitor tracked in database');

    } catch (error) {
      console.warn('Failed to send analytics to backend:', error);
      // Fallback to local storage only
    }
  }

  private static getBrowserInfo(userAgent: string) {
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let operatingSystem = 'Unknown';

    // Detect browser
    if (userAgent.includes('Chrome')) {
      browserName = 'Chrome';
      const match = userAgent.match(/Chrome\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      const match = userAgent.match(/Firefox\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari')) {
      browserName = 'Safari';
      const match = userAgent.match(/Version\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edge')) {
      browserName = 'Edge';
      const match = userAgent.match(/Edge\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    }

    // Detect OS
    if (userAgent.includes('Windows')) {
      operatingSystem = 'Windows';
    } else if (userAgent.includes('Mac OS')) {
      operatingSystem = 'macOS';
    } else if (userAgent.includes('Linux')) {
      operatingSystem = 'Linux';
    } else if (userAgent.includes('Android')) {
      operatingSystem = 'Android';
    } else if (userAgent.includes('iOS')) {
      operatingSystem = 'iOS';
    }

    return { name: browserName, version: browserVersion, os: operatingSystem };
  }

  private static storeVisitorData(data: VisitorData) {
    try {
      // Store in localStorage for demo purposes
      const existingData = JSON.parse(localStorage.getItem('eatrite_visitors') || '[]');
      existingData.push(data);
      
      // Keep only last 100 visitors
      if (existingData.length > 100) {
        existingData.splice(0, existingData.length - 100);
      }
      
      localStorage.setItem('eatrite_visitors', JSON.stringify(existingData));
      
      // Also log to console for immediate visibility
      console.log('📊 New Visitor:', data);
    } catch (error) {
      console.error('Failed to store visitor data:', error);
    }
  }

  static getVisitorStats() {
    try {
      const visitors = JSON.parse(localStorage.getItem('eatrite_visitors') || '[]');
      return {
        totalVisitors: visitors.length,
        uniqueSessions: new Set(visitors.map((v: VisitorData) => v.sessionId)).size,
        todayVisitors: visitors.filter((v: VisitorData) => 
          new Date(v.timestamp).toDateString() === new Date().toDateString()
        ).length,
        topReferrers: this.getTopReferrers(visitors),
        topDevices: this.getTopDevices(visitors)
      };
    } catch {
      return null;
    }
  }

  private static getTopReferrers(visitors: VisitorData[]) {
    const referrers = visitors.reduce((acc: Record<string, number>, visitor) => {
      const ref = visitor.referrer === '' ? 'Direct' : visitor.referrer;
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(referrers)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  private static getTopDevices(visitors: VisitorData[]) {
    const devices = visitors.reduce((acc: Record<string, number>, visitor) => {
      const device = this.getDeviceType(visitor.userAgent);
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(devices)
      .sort(([,a], [,b]) => b - a);
  }

  private static getDeviceType(userAgent: string): string {
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      return 'Mobile';
    } else if (/Tablet|iPad/.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }
}

// Simple Google Analytics setup
export const setupGoogleAnalytics = (trackingId: string) => {
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function() {
    (window as any).dataLayer.push(arguments);
  };
  
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', trackingId);
};

export const trackPageView = (pageName: string) => {
  // Track with our custom tracker
  console.log(`📄 Page View: ${pageName}`);
  
  // Track with Google Analytics if available
  if ((window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};