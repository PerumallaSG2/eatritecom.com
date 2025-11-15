import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Award,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Briefcase,
  Heart,
  Activity,
  Download,
  RefreshCw
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface PartnershipMetric {
  id: string;
  title: string;
  value: number | string;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface CorporatePartner {
  id: string;
  name: string;
  logo: string;
  industry: string;
  type: 'enterprise' | 'healthcare' | 'fitness' | 'technology' | 'education';
  employees: number;
  contractValue: number;
  monthlyRevenue: number;
  startDate: Date;
  renewalDate: Date;
  participationRate: number;
  satisfactionScore: number;
  healthImprovements: {
    metric: string;
    improvement: number;
    unit: string;
  }[];
  costSavings: {
    healthcareCosts: number;
    productivityGains: number;
    absenteeismReduction: number;
  };
  engagement: {
    activeUsers: number;
    avgMealsPerWeek: number;
    programCompletion: number;
  };
}

interface ROICalculation {
  partnerId: string;
  partnerName: string;
  investment: {
    platformCosts: number;
    implementationCosts: number;
    supportCosts: number;
    total: number;
  };
  returns: {
    directRevenue: number;
    healthcareSavings: number;
    productivityGains: number;
    retentionBenefits: number;
    total: number;
  };
  roi: number;
  paybackPeriod: string;
  npv: number;
  confidence: number;
}

interface IndustryBenchmark {
  industry: string;
  avgParticipation: number;
  avgSatisfaction: number;
  avgROI: number;
  avgHealthImprovement: number;
  color: string;
}

interface SuccessStory {
  id: string;
  partnerName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    improvement: number;
    unit: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
  timeline: string;
}

const generatePartnershipMetrics = (): PartnershipMetric[] => [
  {
    id: 'total-partners',
    title: 'Active Corporate Partners',
    value: 247,
    unit: '',
    change: 18.5,
    trend: 'up',
    target: 300,
    icon: Building2,
    color: 'blue'
  },
  {
    id: 'partnership-revenue',
    title: 'B2B Revenue (Monthly)',
    value: 2847000,
    unit: '$',
    change: 23.2,
    trend: 'up',
    target: 3000000,
    icon: DollarSign,
    color: 'green'
  },
  {
    id: 'employee-participants',
    title: 'Employee Participants',
    value: 67834,
    unit: '',
    change: 15.8,
    trend: 'up',
    target: 75000,
    icon: Users,
    color: 'purple'
  },
  {
    id: 'avg-participation-rate',
    title: 'Avg Participation Rate',
    value: 73.4,
    unit: '%',
    change: 8.9,
    trend: 'up',
    target: 80,
    icon: Target,
    color: 'orange'
  },
  {
    id: 'avg-roi',
    title: 'Average Partner ROI',
    value: 340,
    unit: '%',
    change: 12.7,
    trend: 'up',
    target: 400,
    icon: TrendingUp,
    color: 'indigo'
  },
  {
    id: 'renewal-rate',
    title: 'Contract Renewal Rate',
    value: 94.2,
    unit: '%',
    change: 5.3,
    trend: 'up',
    target: 95,
    icon: CheckCircle,
    color: 'teal'
  }
];

const generateCorporatePartners = (): CorporatePartner[] => [
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    logo: '🪟',
    industry: 'Technology',
    type: 'enterprise',
    employees: 45000,
    contractValue: 2400000,
    monthlyRevenue: 387000,
    startDate: new Date(2023, 2, 15),
    renewalDate: new Date(2025, 2, 15),
    participationRate: 78.3,
    satisfactionScore: 4.8,
    healthImprovements: [
      { metric: 'Weight Loss', improvement: 11.2, unit: 'lbs avg' },
      { metric: 'Energy Increase', improvement: 67, unit: '%' },
      { metric: 'Stress Reduction', improvement: 42, unit: '%' }
    ],
    costSavings: {
      healthcareCosts: 1240000,
      productivityGains: 890000,
      absenteeismReduction: 340000
    },
    engagement: {
      activeUsers: 35234,
      avgMealsPerWeek: 8.4,
      programCompletion: 87
    }
  },
  {
    id: 'google',
    name: 'Google LLC',
    logo: '🔍',
    industry: 'Technology',
    type: 'enterprise',
    employees: 38000,
    contractValue: 2100000,
    monthlyRevenue: 324000,
    startDate: new Date(2023, 5, 1),
    renewalDate: new Date(2025, 5, 1),
    participationRate: 82.1,
    satisfactionScore: 4.9,
    healthImprovements: [
      { metric: 'Nutrition Goals Met', improvement: 89, unit: '%' },
      { metric: 'Sleep Quality', improvement: 73, unit: '%' },
      { metric: 'Mental Wellness', improvement: 56, unit: '%' }
    ],
    costSavings: {
      healthcareCosts: 1100000,
      productivityGains: 1250000,
      absenteeismReduction: 280000
    },
    engagement: {
      activeUsers: 31198,
      avgMealsPerWeek: 9.2,
      programCompletion: 92
    }
  },
  {
    id: 'kaiser-permanente',
    name: 'Kaiser Permanente',
    logo: '🏥',
    industry: 'Healthcare',
    type: 'healthcare',
    employees: 24000,
    contractValue: 1800000,
    monthlyRevenue: 256000,
    startDate: new Date(2022, 9, 1),
    renewalDate: new Date(2024, 9, 1),
    participationRate: 85.7,
    satisfactionScore: 4.7,
    healthImprovements: [
      { metric: 'Chronic Disease Management', improvement: 78, unit: '%' },
      { metric: 'Preventive Care Adoption', improvement: 84, unit: '%' },
      { metric: 'Healthcare Utilization Reduction', improvement: 34, unit: '%' }
    ],
    costSavings: {
      healthcareCosts: 2100000,
      productivityGains: 680000,
      absenteeismReduction: 450000
    },
    engagement: {
      activeUsers: 20568,
      avgMealsPerWeek: 7.8,
      programCompletion: 89
    }
  },
  {
    id: 'peloton',
    name: 'Peloton Interactive',
    logo: '🚴',
    industry: 'Fitness',
    type: 'fitness',
    employees: 8500,
    contractValue: 720000,
    monthlyRevenue: 89000,
    startDate: new Date(2023, 7, 15),
    renewalDate: new Date(2025, 7, 15),
    participationRate: 91.2,
    satisfactionScore: 4.9,
    healthImprovements: [
      { metric: 'Fitness Performance', improvement: 94, unit: '%' },
      { metric: 'Recovery Speed', improvement: 67, unit: '%' },
      { metric: 'Injury Prevention', improvement: 78, unit: '%' }
    ],
    costSavings: {
      healthcareCosts: 340000,
      productivityGains: 490000,
      absenteeismReduction: 120000
    },
    engagement: {
      activeUsers: 7752,
      avgMealsPerWeek: 11.3,
      programCompletion: 96
    }
  }
];

const generateROICalculations = (): ROICalculation[] => [
  {
    partnerId: 'microsoft',
    partnerName: 'Microsoft Corporation',
    investment: {
      platformCosts: 480000,
      implementationCosts: 120000,
      supportCosts: 80000,
      total: 680000
    },
    returns: {
      directRevenue: 2400000,
      healthcareSavings: 1240000,
      productivityGains: 890000,
      retentionBenefits: 340000,
      total: 4870000
    },
    roi: 616,
    paybackPeriod: '3.4 months',
    npv: 4190000,
    confidence: 94
  },
  {
    partnerId: 'google',
    partnerName: 'Google LLC',
    investment: {
      platformCosts: 420000,
      implementationCosts: 105000,
      supportCosts: 70000,
      total: 595000
    },
    returns: {
      directRevenue: 2100000,
      healthcareSavings: 1100000,
      productivityGains: 1250000,
      retentionBenefits: 280000,
      total: 4730000
    },
    roi: 695,
    paybackPeriod: '3.0 months',
    npv: 4135000,
    confidence: 96
  },
  {
    partnerId: 'kaiser-permanente',
    partnerName: 'Kaiser Permanente',
    investment: {
      platformCosts: 360000,
      implementationCosts: 90000,
      supportCosts: 60000,
      total: 510000
    },
    returns: {
      directRevenue: 1800000,
      healthcareSavings: 2100000,
      productivityGains: 680000,
      retentionBenefits: 450000,
      total: 5030000
    },
    roi: 886,
    paybackPeriod: '2.2 months',
    npv: 4520000,
    confidence: 92
  }
];

const generateIndustryBenchmarks = (): IndustryBenchmark[] => [
  {
    industry: 'Technology',
    avgParticipation: 75.2,
    avgSatisfaction: 4.6,
    avgROI: 425,
    avgHealthImprovement: 68,
    color: 'blue'
  },
  {
    industry: 'Healthcare',
    avgParticipation: 81.4,
    avgSatisfaction: 4.7,
    avgROI: 520,
    avgHealthImprovement: 78,
    color: 'green'
  },
  {
    industry: 'Finance',
    avgParticipation: 67.8,
    avgSatisfaction: 4.4,
    avgROI: 340,
    avgHealthImprovement: 62,
    color: 'purple'
  },
  {
    industry: 'Manufacturing',
    avgParticipation: 72.1,
    avgSatisfaction: 4.5,
    avgROI: 380,
    avgHealthImprovement: 65,
    color: 'orange'
  }
];

const generateSuccessStories = (): SuccessStory[] => [
  {
    id: 'microsoft-case-study',
    partnerName: 'Microsoft Corporation',
    industry: 'Technology',
    challenge: 'High healthcare costs and employee burnout affecting productivity across global offices',
    solution: 'Comprehensive nutrition program with personalized meal plans and wellness tracking',
    results: [
      { metric: 'Healthcare Cost Reduction', improvement: 23, unit: '%' },
      { metric: 'Employee Engagement', improvement: 34, unit: '%' },
      { metric: 'Absenteeism Reduction', improvement: 18, unit: '%' },
      { metric: 'Productivity Increase', improvement: 15, unit: '%' }
    ],
    testimonial: {
      quote: "Factor75's B2B program has transformed our employee wellness approach. The ROI exceeded our expectations, and employee satisfaction with benefits has never been higher.",
      author: "Sarah Chen",
      title: "VP of Employee Experience, Microsoft"
    },
    timeline: '18 months'
  }
];

export const B2BPartnershipROIDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PartnershipMetric[]>([]);
  const [partners, setPartners] = useState<CorporatePartner[]>([]);
  const [roiCalculations, setROICalculations] = useState<ROICalculation[]>([]);
  const [benchmarks, setBenchmarks] = useState<IndustryBenchmark[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<CorporatePartner | null>(null);

  useEffect(() => {
    const partnershipMetrics = generatePartnershipMetrics();
    const corporatePartners = generateCorporatePartners();
    
    setMetrics(partnershipMetrics);
    setPartners(corporatePartners);
    setROICalculations(generateROICalculations());
    setBenchmarks(generateIndustryBenchmarks());
    setSuccessStories(generateSuccessStories());
    setSelectedPartner(corporatePartners[0]);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <ArrowUpRight className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />;
    } else if (trend === 'down') {
      return <ArrowDownRight className={`w-4 h-4 ${change < 0 ? 'text-red-500' : 'text-green-500'}`} />;
    }
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'enterprise': return 'bg-blue-100 text-blue-700';
      case 'healthcare': return 'bg-green-100 text-green-700';
      case 'fitness': return 'bg-purple-100 text-purple-700';
      case 'technology': return 'bg-indigo-100 text-indigo-700';
      case 'education': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTotalInvestment = () => {
    return roiCalculations.reduce((sum, calc) => sum + calc.investment.total, 0);
  };

  const getTotalReturns = () => {
    return roiCalculations.reduce((sum, calc) => sum + calc.returns.total, 0);
  };

  const getAverageROI = () => {
    const totalROI = roiCalculations.reduce((sum, calc) => sum + calc.roi, 0);
    return Math.round(totalROI / roiCalculations.length);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-8 h-8" />
                <h2 className="text-3xl font-bold">B2B Partnership ROI Dashboard</h2>
                <Briefcase className="w-8 h-8" />
              </div>
              <p className="text-indigo-100 text-lg">
                Enterprise partnership performance and return on investment analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-8">
        {/* Key Partnership Metrics */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StaggeredAnimation>
              {metrics.map((metric) => {
                const IconComponent = metric.icon;
                const progressPercentage = metric.target ? (Number(metric.value) / metric.target) * 100 : 0;
                
                return (
                  <div key={metric.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend, metric.change)}
                        <span className={`text-sm font-semibold ${
                          metric.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {metric.unit === '$' ? formatCurrency(Number(metric.value)) : 
                       typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
                      {metric.unit !== '$' && metric.unit}
                    </div>
                    
                    {metric.target && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Target</span>
                          <span>{metric.unit === '$' ? formatCurrency(metric.target) : `${metric.target}${metric.unit}`}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.round(progressPercentage)}% of target
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </StaggeredAnimation>
          </div>
        </FadeIn>

        {/* Partner Portfolio & ROI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Corporate Partners List */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                Corporate Partner Portfolio
              </h3>
              
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedPartner(partner)}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedPartner?.id === partner.id ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{partner.logo}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPartnerTypeColor(partner.type)}`}>
                            {partner.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">{formatCurrency(partner.contractValue)}</div>
                        <div className="text-sm text-gray-600">{formatNumber(partner.employees)} employees</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Participation</div>
                        <div className="font-semibold">{partner.participationRate}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Satisfaction</div>
                        <div className="font-semibold text-yellow-600">★{partner.satisfactionScore}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Monthly Revenue</div>
                        <div className="font-semibold text-green-600">{formatCurrency(partner.monthlyRevenue)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ROI Analysis */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                ROI Analysis Overview
              </h3>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(getTotalInvestment())}</div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(getTotalReturns())}</div>
                    <div className="text-sm text-gray-600">Total Returns</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{getAverageROI()}%</div>
                    <div className="text-sm text-gray-600">Average ROI</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {roiCalculations.map((calc) => (
                  <div key={calc.partnerId} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{calc.partnerName}</h4>
                      <span className="text-lg font-bold text-green-600">{calc.roi}% ROI</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-600">Investment</div>
                        <div className="font-semibold text-red-600">{formatCurrency(calc.investment.total)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Returns</div>
                        <div className="font-semibold text-green-600">{formatCurrency(calc.returns.total)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Payback: {calc.paybackPeriod}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">{calc.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Selected Partner Details */}
        {selectedPartner && (
          <FadeIn delay={0.4}>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-2">{selectedPartner.logo}</span>
                  {selectedPartner.name} - Partnership Details
                </h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPartnerTypeColor(selectedPartner.type)}`}>
                    {selectedPartner.industry}
                  </span>
                  <div className="text-sm text-gray-600">
                    Contract: {selectedPartner.startDate.toLocaleDateString()} - {selectedPartner.renewalDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Health Improvements */}
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 text-red-600 mr-2" />
                    Health Improvements
                  </h4>
                  <div className="space-y-2">
                    {selectedPartner.healthImprovements.map((improvement, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-gray-600">{improvement.metric}</span>
                        <span className="font-semibold text-red-600">+{improvement.improvement}{improvement.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cost Savings */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                    Cost Savings
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Healthcare Costs</span>
                      <span className="font-semibold text-green-600">{formatCurrency(selectedPartner.costSavings.healthcareCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Productivity Gains</span>
                      <span className="font-semibold text-green-600">{formatCurrency(selectedPartner.costSavings.productivityGains)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Absenteeism Reduction</span>
                      <span className="font-semibold text-green-600">{formatCurrency(selectedPartner.costSavings.absenteeismReduction)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Engagement Metrics */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-4 h-4 text-purple-600 mr-2" />
                    Engagement Metrics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="font-semibold text-purple-600">{formatNumber(selectedPartner.engagement.activeUsers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Meals/Week</span>
                      <span className="font-semibold text-purple-600">{selectedPartner.engagement.avgMealsPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Program Completion</span>
                      <span className="font-semibold text-purple-600">{selectedPartner.engagement.programCompletion}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Industry Benchmarks & Success Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Industry Benchmarks */}
          <FadeIn delay={0.5}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-5 h-5 text-indigo-600 mr-2" />
                Industry Benchmarks
              </h3>
              
              <div className="space-y-4">
                {benchmarks.map((benchmark) => (
                  <div key={benchmark.industry} className={`p-4 bg-${benchmark.color}-50 rounded-lg border border-${benchmark.color}-100`}>
                    <h4 className="font-semibold text-gray-900 mb-3">{benchmark.industry}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Participation Rate</div>
                        <div className="font-semibold">{benchmark.avgParticipation}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Satisfaction</div>
                        <div className="font-semibold">★{benchmark.avgSatisfaction}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Average ROI</div>
                        <div className={`font-semibold text-${benchmark.color}-600`}>{benchmark.avgROI}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Health Improvement</div>
                        <div className="font-semibold">{benchmark.avgHealthImprovement}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Success Story */}
          <FadeIn delay={0.6}>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Featured Success Story
              </h3>
              
              {successStories.map((story) => (
                <div key={story.id} className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{story.partnerName}</h4>
                    <p className="text-sm text-gray-600 mb-3"><strong>Challenge:</strong> {story.challenge}</p>
                    <p className="text-sm text-gray-600 mb-4"><strong>Solution:</strong> {story.solution}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {story.results.map((result, index) => (
                        <div key={index} className="text-center p-2 bg-white rounded">
                          <div className="font-bold text-yellow-600">{result.improvement}{result.unit}</div>
                          <div className="text-xs text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>
                    
                    <blockquote className="italic text-gray-700 border-l-4 border-yellow-400 pl-4 mb-3">
                      "{story.testimonial.quote}"
                    </blockquote>
                    
                    <div className="text-right text-sm text-gray-600">
                      <div className="font-semibold">{story.testimonial.author}</div>
                      <div>{story.testimonial.title}</div>
                      <div className="mt-2 text-yellow-600">Timeline: {story.timeline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default B2BPartnershipROIDashboard;