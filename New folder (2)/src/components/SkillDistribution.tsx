import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from './ui/card';
import { BarChart3 } from 'lucide-react';

export function SkillDistribution() {
  const data = [
    { name: 'Engineering', value: 35, color: '#8B5CF6' },
    { name: 'Design', value: 20, color: '#F97316' },
    { name: 'Analytics', value: 18, color: '#EC4899' },
    { name: 'Marketing', value: 15, color: '#14B8A6' },
    { name: 'Operations', value: 12, color: '#F59E0B' },
  ];

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-[#EA2775]" />
        <h3 className="text-gray-900">Skill Distribution</h3>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-gray-600">{item.name}</span>
            <span className="text-xs text-gray-900 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
