import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';
import { Activity } from 'lucide-react';

export function SkillsChart() {
  const data = [
    { month: 'Jan', skills: 245 },
    { month: 'Feb', skills: 289 },
    { month: 'Mar', skills: 312 },
    { month: 'Apr', skills: 378 },
    { month: 'May', skills: 425 },
    { month: 'Jun', skills: 467 },
  ];

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-[#EA2775]" />
        <h3 className="text-gray-900">Skill Growth</h3>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="skills" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EA2775" stopOpacity={1} />
                <stop offset="100%" stopColor="#7D1C4B" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-gray-600">Last 6 months</span>
        <span className="text-green-600">↑ 90% growth</span>
      </div>
    </Card>
  );
}
