import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Search, Filter, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { StarRating } from "./StarRating";
import { SkillDetailsModal } from "./SkillDetailsModal";

const sampleData = [
  { id: 1, skillName: "React Development", rating: 1, department: "Engineering" },
  { id: 2, skillName: "Data Analysis", rating: 2, department: "Analytics" },
  { id: 3, skillName: "UI/UX Design", rating: 3, department: "Design" },
  { id: 4, skillName: "Project Management", rating: 3, department: "Operations" },
  { id: 5, skillName: "Python Programming", rating: 5, department: "Engineering" },
  { id: 6, skillName: "Digital Marketing", rating: 5, department: "Marketing" },
  { id: 7, skillName: "SQL Database", rating: 4, department: "Engineering" },
  { id: 8, skillName: "Machine Learning", rating: 5, department: "Data Science" },
];

const departmentColors: Record<string, string> = {
  Engineering: "bg-purple-100 text-purple-700 border-purple-200",
  Analytics: "bg-pink-100 text-pink-700 border-pink-200",
  Design: "bg-rose-100 text-rose-700 border-rose-200",
  Operations: "bg-violet-100 text-violet-700 border-violet-200",
  Marketing: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  "Data Science": "bg-purple-100 text-purple-700 border-purple-200",
};

type QueryItem = {
  id: string;
  type: 'skill' | 'operator';
  value: string;
  label?: string;
  icon?: string;
};

const availableSkills = [
  { value: "react", label: "React Development", icon: "⚛️" },
  { value: "python", label: "Python Programming", icon: "🐍" },
  { value: "cpp", label: "C++", icon: "⚙️" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "javascript", label: "JavaScript", icon: "💛" },
  { value: "typescript", label: "TypeScript", icon: "💙" },
  { value: "nodejs", label: "Node.js", icon: "🟢" },
  { value: "angular", label: "Angular", icon: "🅰️" },
  { value: "sql", label: "SQL Database", icon: "🗄️" },
  { value: "mongodb", label: "MongoDB", icon: "🍃" },
  { value: "aws", label: "AWS", icon: "☁️" },
  { value: "docker", label: "Docker", icon: "🐳" },
  { value: "kubernetes", label: "Kubernetes", icon: "⚓" },
  { value: "figma", label: "Figma", icon: "🎨" },
  { value: "photoshop", label: "Photoshop", icon: "📸" },
  { value: "ml", label: "Machine Learning", icon: "🤖" },
  { value: "data-analysis", label: "Data Analysis", icon: "📊" },
  { value: "ui-ux", label: "UI/UX Design", icon: "🎭" },
  { value: "project-mgmt", label: "Project Management", icon: "📋" },
];

export function SkillSearchContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [operator, setOperator] = useState("and");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState<typeof sampleData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Query builder state
  const [queryItems, setQueryItems] = useState<QueryItem[]>([]);
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState("");

  const handleViewDetails = (skill: typeof sampleData[0]) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  // Add skill to query
  const handleAddSkill = () => {
    if (!selectedSkillToAdd) return;
    
    const skillInfo = availableSkills.find(s => s.value === selectedSkillToAdd);
    if (!skillInfo) return;

    const newSkill: QueryItem = {
      id: `skill-${Date.now()}`,
      type: 'skill',
      value: selectedSkillToAdd,
      label: skillInfo.label,
      icon: skillInfo.icon,
    };

    // If there are already skills, add an operator first
    if (queryItems.length > 0) {
      const newOperator: QueryItem = {
        id: `operator-${Date.now()}`,
        type: 'operator',
        value: 'and', // default to AND
      };
      setQueryItems([...queryItems, newOperator, newSkill]);
    } else {
      setQueryItems([newSkill]);
    }

    setSelectedSkillToAdd("");
  };

  // Remove item from query
  const handleRemoveItem = (id: string) => {
    const index = queryItems.findIndex(item => item.id === id);
    if (index === -1) return;

    const newItems = [...queryItems];
    
    // If removing a skill
    if (queryItems[index].type === 'skill') {
      // Remove the skill
      newItems.splice(index, 1);
      
      // Remove operator before it (if exists)
      if (index > 0 && newItems[index - 1]?.type === 'operator') {
        newItems.splice(index - 1, 1);
      }
      // Or remove operator after it (if exists and it's the first skill)
      else if (index === 0 && newItems[0]?.type === 'operator') {
        newItems.splice(0, 1);
      }
    }
    
    setQueryItems(newItems);
  };

  // Update operator
  const handleOperatorChange = (id: string, newValue: string) => {
    setQueryItems(queryItems.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    ));
  };

  // Clear entire query
  const handleClearQuery = () => {
    setQueryItems([]);
              setSelectedSkillToAdd("");

  };

  // Load example query
  const handleLoadExample = (example: string) => {
    if (example === 'java-python') {
      const items: QueryItem[] = [
        { id: 'skill-1', type: 'skill', value: 'java', label: 'Java', icon: '☕' },
        { id: 'op-1', type: 'operator', value: 'or' },
        { id: 'skill-2', type: 'skill', value: 'python', label: 'Python Programming', icon: '🐍' },
      ];
      setQueryItems(items);
    } else if (example === 'react-typescript') {
      const items: QueryItem[] = [
        { id: 'skill-1', type: 'skill', value: 'react', label: 'React Development', icon: '⚛️' },
        { id: 'op-1', type: 'operator', value: 'and' },
        { id: 'skill-2', type: 'skill', value: 'typescript', label: 'TypeScript', icon: '💙' },
      ];
      setQueryItems(items);
    } else if (example === 'cloud') {
      const items: QueryItem[] = [
        { id: 'skill-1', type: 'skill', value: 'aws', label: 'AWS', icon: '☁️' },
        { id: 'op-1', type: 'operator', value: 'and' },
        { id: 'skill-2', type: 'skill', value: 'docker', label: 'Docker', icon: '🐳' },
        { id: 'op-2', type: 'operator', value: 'and' },
        { id: 'skill-3', type: 'skill', value: 'kubernetes', label: 'Kubernetes', icon: '⚓' },
      ];
      setQueryItems(items);
    }
  };

  // Generate query string for display
  const getQueryString = () => {
    return queryItems.map(item => {
      if (item.type === 'skill') {
        return item.label;
      } else {
        return item.value.toUpperCase();
      }
    }).join(' ');
  };

  return (
    <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#f8f9fc', fontFamily: '"Saira", sans-serif' }}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl shadow-md"
              style={{ backgroundColor: "#EA2775" }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          <p className="text-lg ml-1" style={{ color: '#64748b', fontFamily: '"Saira", sans-serif' }}>
            Find and explore skills across your organization
          </p>
          </div>

        </div>

        {/* Skills Query Builder */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff', marginTop: '24px' }}>
          <CardContent className="py-5 px-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: '"Saira", sans-serif' }}>Add skills and combine them with AND/OR logic</p>
                </div>
                {queryItems.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={handleClearQuery}
                    style={{ fontFamily: '"Saira", sans-serif' }}
                  >
                    Clear Query
                  </Button>
                )}
              </div>

              {/* Query Builder Area */}
              <div className="min-h-[100px] p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-dashed border-purple-300">
                {queryItems.length === 0 ? (
                  // Empty state
                  <div className="flex items-center justify-center h-[80px] text-gray-400">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium" style={{ fontFamily: '"Saira", sans-serif' }}>No skills added yet</p>
                      <p className="text-xs mt-1" style={{ fontFamily: '"Saira", sans-serif' }}>Select a skill below to start building your query</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dynamic Query Items */}
                    <div className="flex flex-wrap items-center gap-2">
                      {queryItems.map((item) => {
                        if (item.type === 'skill') {
                          return (
                            <div 
                              key={item.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border-2 border-purple-300 animate-in fade-in zoom-in duration-200"
                            >
                              <span className="text-xs font-semibold text-gray-900" style={{ fontFamily: '"Saira", sans-serif' }}>
                                {item.icon} {item.label}
                              </span>
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
                              >
                                <span className="text-red-600 font-bold text-sm">×</span>
                              </button>
                            </div>
                          );
                        } else {
                          // Operator
                          return (
                            <select
                              key={item.id}
                              value={item.value}
                              onChange={(e) => handleOperatorChange(item.id, e.target.value)}
                              className={`px-2 py-1 border-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                item.value === 'or' 
                                  ? 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200'
                                  : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                              }`}
                            >
                              <option value="and">AND</option>
                              <option value="or">OR</option>
                            </select>
                          );
                        }
                      })}
                    </div>

                    {/* Current Query Display */}
                    {queryItems.length > 0 && (
                      <div className="mt-4 text-xs text-gray-600 bg-white/60 rounded-lg p-3 border border-purple-200">
                        <strong>Current Query:</strong>{' '}
                        {queryItems.map((item, index) => {
                          if (item.type === 'skill') {
                            return <span key={item.id}>{item.label}</span>;
                          } else {
                            return (
                              <span 
                                key={item.id}
                                className={`font-bold mx-1 ${
                                  item.value === 'or' ? 'text-orange-600' : 'text-green-600'
                                }`}
                              >
                                {item.value.toUpperCase()}
                              </span>
                            );
                          }
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Add Skill Section */}
              <div className="flex gap-3 items-center" style={{ marginTop: '20px' }}>
                <Select value={selectedSkillToAdd} onValueChange={setSelectedSkillToAdd}>
                  <SelectTrigger 
                    className="border-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm" 
                    style={{ 
                      height: '48px', 
                      width: '350px', 
                      fontSize: '16px',
                      color: '#1f2937',
                      borderColor: '#d1d5db',
                      fontWeight: '400',
                      padding: '0 16px'
                    }}
                  >
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-white border-2 shadow-xl" 
                    style={{ 
                      maxHeight: '350px',
                      borderColor: '#e5e7eb',
                      borderRadius: '8px'
                    }}
                  >
                    {availableSkills.map((skill) => (
                      <SelectItem 
                        key={skill.value} 
                        value={skill.value}
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>{skill.icon}</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>{skill.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="px-5 shadow-sm hover:opacity-90 transition-all text-sm font-semibold" 
                  style={{ backgroundColor: '#7c3aed', height: '36px', marginLeft: '16px' }}
                  onClick={handleAddSkill}
                  disabled={!selectedSkillToAdd}
                >
                  + Add Skill
                </Button>
              </div>


            </div>
          </CardContent>
        </Card>

        {/* Additional Filters - Skill Level & Department */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff', marginTop: '24px' }}>
          <CardContent className="py-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#EA2775' ,marginRight: '8px' ,marginTop: '5px' }}>
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: '"Saira", sans-serif' }}>Additional Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: '16px' }}>
                {/* Skill Level */}
                <div className="space-y-3"> 
                  <Label htmlFor="skill-level" className="text-sm font-semibold text-gray-900" style={{ fontFamily: '"Saira", sans-serif' }}>
                    Minimum Skill Level
                  </Label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger
                      id="skill-level"
                      className="border-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
                      style={{ 
                        height: '48px', 
                        width: '100%', 
                        fontSize: '16px',
                        color: '#1f2937',
                        borderColor: '#d1d5db',
                        fontWeight: '400',
                        padding: '0 16px'
                      }}
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white border-2 shadow-xl" 
                      style={{ 
                        maxHeight: '350px',
                        borderColor: '#e5e7eb',
                        borderRadius: '8px'
                      }}
                    >
                      <SelectItem 
                        value="any"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        Any
                      </SelectItem>
                      <SelectItem 
                        value="beginner"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        ⭐
                      </SelectItem>
                      <SelectItem 
                        value="intermediate"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        ⭐⭐
                      </SelectItem>
                      <SelectItem 
                        value="intermediate-plus"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        ⭐⭐⭐
                      </SelectItem>
                      <SelectItem 
                        value="advanced"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        ⭐⭐⭐⭐
                      </SelectItem>
                      <SelectItem 
                        value="expert"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        ⭐⭐⭐⭐⭐
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="space-y-3">
                  <Label htmlFor="department" className="text-sm font-semibold text-gray-900" style={{ fontFamily: '"Saira", sans-serif' }}>
                    Department
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger
                      id="department"
                      className="border-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
                      style={{ 
                        height: '48px', 
                        width: '100%', 
                        fontSize: '16px',
                        color: '#1f2937',
                        borderColor: '#d1d5db',
                        fontWeight: '400',
                        padding: '0 16px'
                      }}
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white border-2 shadow-xl" 
                      style={{ 
                        maxHeight: '350px',
                        borderColor: '#e5e7eb',
                        borderRadius: '8px'
                      }}
                    >
                      <SelectItem 
                        value="engineering"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>💻</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Engineering</span>
                        </span>
                      </SelectItem>
                      <SelectItem 
                        value="design"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>🎨</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Design</span>
                        </span>
                      </SelectItem>
                      <SelectItem 
                        value="marketing"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>📢</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Marketing</span>
                        </span>
                      </SelectItem>
                      <SelectItem 
                        value="analytics"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>📊</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Analytics</span>
                        </span>
                      </SelectItem>
                      <SelectItem 
                        value="operations"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>⚙️</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Operations</span>
                        </span>
                      </SelectItem>
                      <SelectItem 
                        value="data-science"
                        className="cursor-pointer hover:bg-blue-50"
                        style={{ 
                          fontSize: '15px',
                          padding: '12px 16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span style={{ fontSize: '16px' }}>🤖</span>
                          <span style={{ color: '#1f2937', fontWeight: '500' }}>Data Science</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center" style={{ marginTop: '32px' }}>
          <Button 
            className="h-12 px-8 shadow-md hover:opacity-90 transition-all font-semibold text-base"
            style={{ backgroundColor: '#7c3aed', fontFamily: '"Saira", sans-serif' }}
            onClick={() => {
              // TODO: Apply filters logic
              console.log('Applying filters:', { queryItems, skillLevel, department });
            }}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
          <Button 
            variant="outline"
            className="h-12 px-8 shadow-sm hover:bg-gray-100 transition-all font-semibold text-base border-2"
            style={{ fontFamily: '"Saira", sans-serif' }}
            onClick={() => {
              setQueryItems([]);
              setSkillLevel("");
              setDepartment("");
              setSelectedSkillToAdd("");
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* Results Card */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff', marginTop: '32px' }}>
          <CardHeader className="border-b" style={{ backgroundColor: '#fafbfc' }}>
            <CardTitle className="text-xl font-semibold" style={{ fontFamily: '"Saira", sans-serif' }}>Search Results</CardTitle>
            <CardDescription className="text-sm" style={{ fontFamily: '"Saira", sans-serif' }}>
              Showing {sampleData.length} skills matching your criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Data Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f3f4f6' }} className="hover:bg-gray-100">
                    <TableHead className="font-semibold text-gray-700" style={{ fontFamily: '"Saira", sans-serif' }}>Skill Name</TableHead>
                    <TableHead className="font-semibold text-gray-700" style={{ fontFamily: '"Saira", sans-serif' }}>Rating</TableHead>
                    <TableHead className="font-semibold text-gray-700" style={{ fontFamily: '"Saira", sans-serif' }}>Department</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700" style={{ fontFamily: '"Saira", sans-serif' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((skill) => (
                    <TableRow key={skill.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium" style={{ fontFamily: '"Saira", sans-serif' }}>
                        {skill.skillName}
                      </TableCell>
                      <TableCell>
                        <StarRating initialRating={skill.rating} />
                      </TableCell>
                      <TableCell>
                        <span 
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border"
                          style={{
                            fontFamily: '"Saira", sans-serif',
                            backgroundColor: skill.department === 'Engineering' ? '#ede9fe' :
                                           skill.department === 'Analytics' ? '#fce7f3' :
                                           skill.department === 'Design' ? '#ffe4e6' :
                                           skill.department === 'Operations' ? '#fef3c7' :
                                           skill.department === 'Marketing' ? '#dcfce7' :
                                           skill.department === 'Data Science' ? '#dbeafe' : '#f3f4f6',
                            color: skill.department === 'Engineering' ? '#7c3aed' :
                                  skill.department === 'Analytics' ? '#ec4899' :
                                  skill.department === 'Design' ? '#f43f5e' :
                                  skill.department === 'Operations' ? '#f59e0b' :
                                  skill.department === 'Marketing' ? '#10b981' :
                                  skill.department === 'Data Science' ? '#3b82f6' : '#6b7280',
                            borderColor: skill.department === 'Engineering' ? '#ede9fe' :
                                        skill.department === 'Analytics' ? '#fce7f3' :
                                        skill.department === 'Design' ? '#ffe4e6' :
                                        skill.department === 'Operations' ? '#fef3c7' :
                                        skill.department === 'Marketing' ? '#dcfce7' :
                                        skill.department === 'Data Science' ? '#dbeafe' : '#f3f4f6'
                          }}
                        >
                          {skill.department}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="link" 
                          size="sm"
                          className="text-sm"
                          style={{ color: '#1e1b4b', fontFamily: '"Saira", sans-serif' }}
                          onClick={() => handleViewDetails(skill)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-14 flex justify-center pt-4">
              <Pagination className="w-auto">
                <PaginationContent className="items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      size="default"
                      className="rounded-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) => Math.max(1, page - 1));
                      }}
                    />
                  </PaginationItem>
                  {[1, 2, 3].map((pageNumber) => {
                    const isActive = currentPage === pageNumber;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          size="default"
                          isActive={isActive}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            isActive
                              ? "text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: "#7c3aed",
                                }
                              : {}
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-400">…</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      size="default"
                      className="rounded-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) => Math.min(3, page + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <SkillDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          skill={selectedSkill}
        />
      )}
    </main>
  );
}
