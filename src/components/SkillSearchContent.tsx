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

export function SkillSearchContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [operator, setOperator] = useState("and");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState<typeof sampleData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (skill: typeof sampleData[0]) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  return (
    <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#f8f9fc' }}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-xl shadow-md"
              style={{ backgroundColor: "#7c3aed" }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: '#1e1b4b' }}>
              Skill Search & Discovery
            </h1>
          </div>
          <p className="text-lg ml-1" style={{ color: '#64748b' }}>
            Find and explore skills across your organization
          </p>
        </div>

        {/* Search Bar */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff' }}>
          <CardContent className="py-4">
            <div className="relative">
              <Search
                className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2"
                style={{ color: '#7c3aed', left: '0.65rem' }}
              />
              <Input
                placeholder="Search for a skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 text-base border-0 bg-gray-50 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                style={{ paddingLeft: '2.2rem' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm border-0">
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="p-1.5 rounded-md" style={{ backgroundColor: '#ef4444' }}>
                  <Filter className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-medium">Advanced Filters</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
                {/* Skill Level */}
                <div className="space-y-3">
                  <Label htmlFor="skill-level" className="text-sm font-medium">
                    Skill Level
                  </Label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger
                      id="skill-level"
                      className="h-12 rounded-lg border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 shadow-sm transition focus-visible:border-purple-400 focus-visible:ring-2 focus-visible:ring-purple-400/40"
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="z-50 rounded-lg border border-gray-200 bg-white shadow-xl">
                      <SelectItem value="beginner">⭐ Beginner</SelectItem>
                      <SelectItem value="intermediate">⭐⭐ Intermediate</SelectItem>
                      <SelectItem value="advanced">⭐⭐⭐ Advanced</SelectItem>
                      <SelectItem value="expert">⭐⭐⭐⭐⭐ Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="space-y-3">
                  <Label htmlFor="department" className="text-sm font-medium">
                    Department
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger
                      id="department"
                      className="h-12 rounded-lg border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 shadow-sm transition focus-visible:border-purple-400 focus-visible:ring-2 focus-visible:ring-purple-400/40"
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="z-50 rounded-lg border border-gray-200 bg-white shadow-xl">
                      <SelectItem value="engineering">💻 Engineering</SelectItem>
                      <SelectItem value="design">🎨 Design</SelectItem>
                      <SelectItem value="marketing">📢 Marketing</SelectItem>
                      <SelectItem value="analytics">📊 Analytics</SelectItem>
                      <SelectItem value="operations">⚙️ Operations</SelectItem>
                      <SelectItem value="data-science">🤖 Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Logical Operator */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Filter Logic</Label>
                  <RadioGroup value={operator} onValueChange={setOperator} className="space-y-3">
                    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition hover:border-purple-300 data-[state=checked]:border-purple-400" data-state={operator === "and" ? "checked" : undefined}>
                      <RadioGroupItem
                        value="and"
                        id="and"
                        className="h-5 w-5 border-2 border-purple-400 text-purple-500 focus-visible:ring-2 focus-visible:ring-purple-300"
                      />
                      <Label htmlFor="and" className="cursor-pointer flex-1 text-sm font-medium text-gray-700">
                        AND (Match all filters)
                      </Label>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition hover:border-purple-300 data-[state=checked]:border-purple-400" data-state={operator === "or" ? "checked" : undefined}>
                      <RadioGroupItem
                        value="or"
                        id="or"
                        className="h-5 w-5 border-2 border-purple-400 text-purple-500 focus-visible:ring-2 focus-visible:ring-purple-300"
                      />
                      <Label htmlFor="or" className="cursor-pointer flex-1 text-sm font-medium text-gray-700">
                        OR (Match any filter)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Button className="h-11 rounded-lg px-6 text-[15px] font-semibold text-white shadow" style={{ backgroundColor: '#7c3aed' }}>
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-lg border-gray-200 px-6 text-[15px] font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
                  onClick={() => {
                    setSkillLevel("");
                    setDepartment("");
                    setOperator("and");
                  }}
                >
                  Clear All
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Results Card */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff' }}>
          <CardHeader className="border-b" style={{ backgroundColor: '#fafbfc' }}>
            <CardTitle className="text-xl font-semibold">Search Results</CardTitle>
            <CardDescription className="text-sm">
              Showing {sampleData.length} skills matching your criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Data Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f3f4f6' }} className="hover:bg-gray-100">
                    <TableHead className="font-semibold text-gray-700">Skill Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                    <TableHead className="font-semibold text-gray-700">Department</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((skill) => (
                    <TableRow key={skill.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {skill.skillName}
                      </TableCell>
                      <TableCell>
                        <StarRating initialRating={skill.rating} />
                      </TableCell>
                      <TableCell>
                        <span 
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border"
                          style={{
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
                          style={{ color: '#1e1b4b' }}
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
