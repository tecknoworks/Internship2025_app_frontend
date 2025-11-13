import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function TrendingSkills() {
  const trendingSkills = [
    { name: 'AI/ML', growth: '+45%', count: 234, trend: 'up' },
    { name: 'React', growth: '+38%', count: 456, trend: 'up' },
    { name: 'Cloud Computing', growth: '+32%', count: 189, trend: 'up' },
    { name: 'DevOps', growth: '+28%', count: 167, trend: 'up' },
    { name: 'Data Science', growth: '+22%', count: 198, trend: 'up' },
  ];

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[#EA2775]" />
        <h3 className="text-gray-900">Trending Skills</h3>
        <Badge className="ml-auto bg-green-100 text-green-700">This Week</Badge>
      </div>
      <div className="space-y-3">
        {trendingSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EA2775]/10 to-[#7D1C4B]/10 flex items-center justify-center text-[#EA2775] group-hover:from-[#EA2775] group-hover:to-[#7D1C4B] group-hover:text-white transition-all">
                {index + 1}
              </div>
              <div>
                <div className="text-sm text-gray-900">{skill.name}</div>
                <div className="text-xs text-gray-500">{skill.count} employees</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600">{skill.growth}</span>
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
