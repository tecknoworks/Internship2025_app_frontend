import { Star, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface SkillCardProps {
  skill: {
    name: string;
    rating: number;
    department: string;
    badge: string;
    employees: number;
    avgLevel: number;
    trending: boolean;
    description: string;
    tags: string[];
  };
}

export function SkillCard({ skill }: SkillCardProps) {
  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-purple-100 text-purple-700 border-purple-200',
      'Analytics': 'bg-pink-100 text-pink-700 border-pink-200',
      'Design': 'bg-orange-100 text-orange-700 border-orange-200',
      'Operations': 'bg-amber-100 text-amber-700 border-amber-200',
      'Marketing': 'bg-teal-100 text-teal-700 border-teal-200',
      'Data Science': 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colors[badge] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'fill-[#EA2775] text-[#EA2775]' : 'fill-gray-200 text-gray-200'}`}
      />
    ));
  };

  return (
    <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-gray-900 group-hover:text-[#EA2775] transition-colors">{skill.name}</h3>
            {skill.trending && (
              <Badge className="bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] text-white border-0 gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {skill.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Badge variant="outline" className={getBadgeColor(skill.badge)}>
          {skill.badge}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Employees</span>
          </div>
          <div className="text-gray-900">{skill.employees}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Avg Level</span>
          </div>
          <div className="text-gray-900">{skill.avgLevel}/5</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Rating</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(skill.rating)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Skill Coverage</span>
          <span className="text-xs text-gray-900">{Math.round((skill.employees / 1234) * 100)}%</span>
        </div>
        <Progress value={(skill.employees / 1234) * 100} className="h-2" />
      </div>

      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] hover:from-[#d61f68] hover:to-[#6d1840] text-white">
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="icon">
          <Star className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
