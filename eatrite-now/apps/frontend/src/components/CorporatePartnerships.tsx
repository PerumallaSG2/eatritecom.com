import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  Star,
  Globe,
  Shield,
  Briefcase,
  Heart
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface CorporatePartner {
  id: string;
  name: string;
  logo: string;
  industry: string;
  employees: string;
  partnership: string;
  testimonial: string;
  contactPerson: string;
  role: string;
  metrics: {
    satisfaction: number;
    healthImprovement: string;
    costSavings: string;
    participation: string;
  };
  caseStudy?: string;
  partnershipType: 'wellness' | 'catering' | 'benefits' | 'events';
}

const corporatePartners: CorporatePartner[] = [
  {
    id: '1',
    name: 'Google',
    logo: '🔍',
    industry: 'Technology',
    employees: '150,000+',
    partnership: 'Employee Wellness Program',
    testimonial: 'Factor75 has transformed our workplace nutrition. Employee satisfaction with meal options increased by 78%.',
    contactPerson: 'Sarah Johnson',
    role: 'Head of Employee Wellness',
    metrics: {
      satisfaction: 94,
      healthImprovement: '65%',
      costSavings: '$2.3M',
      participation: '89%'
    },
    caseStudy: 'google-wellness-transformation.pdf',
    partnershipType: 'wellness'
  },
  {
    id: '2',
    name: 'Goldman Sachs',
    logo: '🏦',
    industry: 'Financial Services',
    employees: '45,000+',
    partnership: 'Executive Catering & Events',
    testimonial: 'Professional, healthy, and impressive. Factor75 elevates our client meetings and board presentations.',
    contactPerson: 'Michael Chen',
    role: 'Corporate Events Director',
    metrics: {
      satisfaction: 96,
      healthImprovement: '72%',
      costSavings: '$890K',
      participation: '92%'
    },
    partnershipType: 'catering'
  },
  {
    id: '3',
    name: 'Nike',
    logo: '👟',
    industry: 'Athletic Wear',
    employees: '75,000+',
    partnership: 'Athlete Performance Program',
    testimonial: 'Our athletes need peak nutrition. Factor75 delivers the quality and convenience that supports world-class performance.',
    contactPerson: 'Dr. Amanda Rodriguez',
    role: 'Sports Nutrition Director',
    metrics: {
      satisfaction: 98,
      healthImprovement: '83%',
      costSavings: '$1.5M',
      participation: '95%'
    },
    partnershipType: 'wellness'
  },
  {
    id: '4',
    name: 'Salesforce',
    logo: '☁️',
    industry: 'Cloud Software',
    employees: '70,000+',
    partnership: 'Remote Work Meal Benefits',
    testimonial: 'Factor75 helps us support our distributed workforce with healthy meal options, no matter where they work.',
    contactPerson: 'Lisa Park',
    role: 'Chief People Officer',
    metrics: {
      satisfaction: 91,
      healthImprovement: '58%',
      costSavings: '$1.2M',
      participation: '76%'
    },
    partnershipType: 'benefits'
  },
  {
    id: '5',
    name: 'Netflix',
    logo: '🎬',
    industry: 'Entertainment',
    employees: '12,000+',
    partnership: 'Creative Studio Catering',
    testimonial: 'Long filming days require sustained energy. Factor75 keeps our cast and crew fueled with healthy, delicious meals.',
    contactPerson: 'James Wilson',
    role: 'Production Services VP',
    metrics: {
      satisfaction: 93,
      healthImprovement: '61%',
      costSavings: '$450K',
      participation: '88%'
    },
    partnershipType: 'catering'
  },
  {
    id: '6',
    name: 'Tesla',
    logo: '⚡',
    industry: 'Electric Vehicles',
    employees: '100,000+',
    partnership: 'Manufacturing Site Wellness',
    testimonial: 'Healthy employees are more productive. Factor75 supports our mission to accelerate sustainable transport with sustainable nutrition.',
    contactPerson: 'Rachel Green',
    role: 'Employee Experience Lead',
    metrics: {
      satisfaction: 89,
      healthImprovement: '70%',
      costSavings: '$1.8M',
      participation: '82%'
    },
    partnershipType: 'wellness'
  }
];

const partnershipTypes = [
  { type: 'wellness', label: 'Employee Wellness', icon: Heart, count: 3 },
  { type: 'catering', label: 'Corporate Catering', icon: Briefcase, count: 2 },
  { type: 'benefits', label: 'Meal Benefits', icon: Star, count: 1 },
  { type: 'events', label: 'Events & Meetings', icon: Users, count: 0 }
];

export const CorporatePartnerships: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<CorporatePartner>(corporatePartners[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [animatedMetrics, setAnimatedMetrics] = useState({
    satisfaction: 0,
    totalEmployees: 0,
    totalSavings: 0
  });

  useEffect(() => {
    // Animate metrics
    const animateValue = (start: number, end: number, setter: (value: number) => void) => {
      const duration = 2000;
      const increment = (end - start) / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setter(Math.round(current));
      }, 16);
    };

    setTimeout(() => {
      animateValue(0, selectedPartner.metrics.satisfaction, (val) => 
        setAnimatedMetrics(prev => ({ ...prev, satisfaction: val }))
      );
      
      const totalEmployees = corporatePartners.reduce((sum, partner) => 
        sum + parseInt(partner.employees.replace(/[^\d]/g, '')), 0
      );
      animateValue(0, totalEmployees, (val) => 
        setAnimatedMetrics(prev => ({ ...prev, totalEmployees: val }))
      );
      
      const totalSavings = corporatePartners.reduce((sum, partner) => 
        sum + parseFloat(partner.metrics.costSavings.replace(/[^\d.]/g, '')), 0
      );
      animateValue(0, totalSavings, (val) => 
        setAnimatedMetrics(prev => ({ ...prev, totalSavings: val }))
      );
    }, 500);
  }, [selectedPartner]);

  const filteredPartners = filterType === 'all' 
    ? corporatePartners 
    : corporatePartners.filter(partner => partner.partnershipType === filterType);

  const getPartnershipTypeColor = (type: string) => {
    const colors = {
      wellness: 'bg-green-100 text-green-700 border-green-200',
      catering: 'bg-blue-100 text-blue-700 border-blue-200',
      benefits: 'bg-purple-100 text-purple-700 border-purple-200',
      events: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building2 className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Corporate Partnerships</h2>
              <Shield className="w-8 h-8" />
            </div>
            <p className="text-blue-100 text-lg">
              Trusted by Fortune 500 companies to nourish their workforce
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Partnership Type Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilterType('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Partnerships ({corporatePartners.length})
            </button>
            {partnershipTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.type}
                  onClick={() => setFilterType(type.type)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    filterType === type.type
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{type.label} ({type.count})</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Selected Partner Spotlight */}
        <FadeIn delay={0.2}>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Partner Info */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{selectedPartner.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedPartner.name}</h3>
                    <p className="text-gray-600">{selectedPartner.industry}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 border ${getPartnershipTypeColor(selectedPartner.partnershipType)}`}>
                      {selectedPartner.partnership}
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg italic text-gray-700 mb-6">
                  "{selectedPartner.testimonial}"
                </blockquote>

                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedPartner.contactPerson}</p>
                    <p className="text-sm">{selectedPartner.role}</p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-green-600">{animatedMetrics.satisfaction}%</div>
                  <div className="text-sm text-gray-600">Employee Satisfaction</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">{selectedPartner.metrics.healthImprovement}</div>
                  <div className="text-sm text-gray-600">Health Improvement</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">{selectedPartner.metrics.costSavings}</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-orange-600">{selectedPartner.metrics.participation}</div>
                  <div className="text-sm text-gray-600">Participation Rate</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Partner Grid */}
        <StaggeredAnimation className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {filteredPartners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                selectedPartner.id === partner.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-3">{partner.logo}</div>
              <h4 className="font-semibold text-gray-900 text-sm">{partner.name}</h4>
              <p className="text-xs text-gray-500">{partner.employees} employees</p>
              <div className="flex items-center justify-center mt-2">
                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                <span className="text-xs font-semibold">{partner.metrics.satisfaction}%</span>
              </div>
            </button>
          ))}
        </StaggeredAnimation>

        {/* Overall Stats */}
        <FadeIn delay={0.4}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h4 className="text-xl font-semibold text-center mb-6 text-gray-900">
              Partnership Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Globe className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-600">{corporatePartners.length}</div>
                <div className="text-sm text-gray-600">Enterprise Partners</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{(animatedMetrics.totalEmployees / 1000).toFixed(0)}K+</div>
                <div className="text-sm text-gray-600">Employees Served</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">${animatedMetrics.totalSavings.toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">94%</div>
                <div className="text-sm text-gray-600">Avg Satisfaction</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
              Partner with Factor75 for Your Organization
            </button>
            <p className="text-gray-600 mt-3">
              Join industry leaders in revolutionizing workplace nutrition
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default CorporatePartnerships;