import { Search, Star, Users, TrendingUp, Award, Download, Bell, Settings, User, Sparkles, Target, Zap, BarChart3, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { LogicalSkillFilter } from './components/LogicalSkillFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

interface SkillCondition {
  id: string;
  skill: string;
  operator: 'AND' | 'OR';
}

interface Skill {
  name: string;
  rating: number;
  department: string;
}

export default function App() {
  const [skillConditions, setSkillConditions] = useState<SkillCondition[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const stats = [
    { icon: Users, label: 'Total Skills', value: '2,847', change: '+12.3%', trend: 'up' },
    { icon: TrendingUp, label: 'Active Users', value: '1,234', change: '+8.1%', trend: 'up' },
    { icon: Award, label: 'Certifications', value: '567', change: '+15.2%', trend: 'up' },
    { icon: Target, label: 'Skill Gaps', value: '89', change: '-5.4%', trend: 'down' },
  ];

  const allSkills: Skill[] = [
    { name: 'React Development', rating: 5, department: 'Engineering' },
    { name: 'Data Analysis', rating: 4, department: 'Analytics' },
    { name: 'UI/UX Design', rating: 5, department: 'Design' },
    { name: 'Project Management', rating: 4, department: 'Operations' },
    { name: 'Python Programming', rating: 5, department: 'Engineering' },
    { name: 'Digital Marketing', rating: 3, department: 'Marketing' },
    { name: 'Machine Learning', rating: 5, department: 'Engineering' },
    { name: 'SQL Database', rating: 4, department: 'Engineering' },
    { name: 'Content Writing', rating: 3, department: 'Marketing' },
    { name: 'Graphic Design', rating: 4, department: 'Design' },
    { name: 'Cloud Computing', rating: 5, department: 'Engineering' },
    { name: 'SEO Optimization', rating: 3, department: 'Marketing' },
  ];

  const availableSkillNames = allSkills.map(s => s.name);
  const departments = ['Engineering', 'Analytics', 'Design', 'Operations', 'Marketing'];

  const filterSkills = (): Skill[] => {
    let filtered = [...allSkills];

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(skill => skill.rating >= minRating);
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(skill => skill.department === departmentFilter);
    }

    // Apply skill conditions with AND/OR logic
    if (skillConditions.length > 0 && skillConditions.some(c => c.skill)) {
      const validConditions = skillConditions.filter(c => c.skill);
      
      if (validConditions.length > 0) {
        filtered = filtered.filter(skill => {
          // Check if skill matches any of the conditions based on operators
          let matches = skill.name === validConditions[0].skill;
          
          for (let i = 1; i < validConditions.length; i++) {
            const condition = validConditions[i];
            const prevOperator = validConditions[i - 1].operator;
            const skillMatches = skill.name === condition.skill;
            
            if (prevOperator === 'AND') {
              matches = matches && skillMatches;
            } else {
              matches = matches || skillMatches;
            }
          }
          
          return matches;
        });
      }
    }

    return filtered;
  };

  const filteredSkills = filterSkills();

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < count ? 'fill-[#EA2775] text-[#EA2775]' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  const getBadgeColor = (department: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-purple-100 text-purple-700 border-purple-200',
      'Analytics': 'bg-pink-100 text-pink-700 border-pink-200',
      'Design': 'bg-orange-100 text-orange-700 border-orange-200',
      'Operations': 'bg-amber-100 text-amber-700 border-amber-200',
      'Marketing': 'bg-teal-100 text-teal-700 border-teal-200',
    };
    return colors[department] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleSearch = () => {
    // The filtering happens automatically through filterSkills()
    console.log('Search triggered with conditions:', skillConditions);
  };

  const handleReset = () => {
    setSkillConditions([]);
    setRatingFilter('all');
    setDepartmentFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#EA2775]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#7D1C4B]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-100/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EA2775] to-[#7D1C4B] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="tracking-tight text-gray-900">TecknoworkNS</div>
              <div className="text-xs text-gray-500">Skills Platform</div>
            </div>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] text-white">
              <Search className="w-4 h-4" />
              <span className="text-sm">Skill Search</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Analytics</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Users className="w-4 h-4" />
              <span className="text-sm">My Skills</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Award className="w-4 h-4" />
              <span className="text-sm">Certifications</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Target className="w-4 h-4" />
              <span className="text-sm">Skill Gaps</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Employee Profiles</span>
            </button>
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-[#EA2775]/10 to-[#7D1C4B]/10 rounded-xl border border-[#EA2775]/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#EA2775]" />
              <span className="text-sm text-gray-900">AI Assistant</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Get personalized skill recommendations</p>
            <Button size="sm" className="w-full bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] hover:from-[#d61f68] hover:to-[#6d1840] text-white">
              Try Now
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-[#EA2775] to-[#7D1C4B] text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-900 truncate">John Doe</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Skills Intelligence Dashboard</h1>
              <p className="text-sm text-gray-600">Discover and manage organizational skills</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EA2775] rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-[#EA2775] to-[#7D1C4B]' :
                      index === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      'bg-gradient-to-br from-amber-500 to-amber-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className={`${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Search & Filters Card */}
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EA2775] to-[#7D1C4B] flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Skill Search with Logical Filtering</h3>
                <p className="text-sm text-gray-600">Combine skills with AND/OR logic to find exactly what you need</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Logical Skill Filter */}
              <div>
                <LogicalSkillFilter 
                  availableSkills={availableSkillNames}
                  onFilterChange={setSkillConditions}
                />
              </div>

              {/* Additional Filters */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Minimum Rating</label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ratings</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ (3+)</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ (4+)</SelectItem>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Department</label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] hover:from-[#d61f68] hover:to-[#6d1840] text-white gap-2"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Table */}
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Search Results</h3>
              <p className="text-sm text-gray-500">
                Showing {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} matching your criteria
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Skill Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No skills match your current filters. Try adjusting your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSkills.map((skill, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="text-gray-900">{skill.name}</TableCell>
                        <TableCell>{renderStars(skill.rating)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getBadgeColor(skill.department)}>
                            {skill.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-[#EA2775] hover:text-[#7D1C4B] hover:bg-[#EA2775]/10"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
