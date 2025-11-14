import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { StarRating } from "./StarRating";
import { EditSkillModal } from "./EditSkillModal";
import { AddSkillModal } from "./AddSkillModal";
import { Award, Plus, Edit, History, Briefcase, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  lastUpdated: string;
}

const initialSkills: Skill[] = [
  { id: 1, name: "React Development", level: 5, category: "Technical", lastUpdated: "Nov 15, 2024" },
  { id: 2, name: "TypeScript", level: 4, category: "Technical", lastUpdated: "Nov 10, 2024" },
  { id: 3, name: "Node.js", level: 4, category: "Technical", lastUpdated: "Nov 12, 2024" },
  { id: 4, name: "UI/UX Design", level: 3, category: "Design", lastUpdated: "Oct 28, 2024" },
  { id: 5, name: "Figma", level: 3, category: "Design", lastUpdated: "Oct 25, 2024" },
  { id: 6, name: "Team Leadership", level: 4, category: "Management", lastUpdated: "Nov 5, 2024" },
  { id: 7, name: "Project Management", level: 3, category: "Management", lastUpdated: "Oct 20, 2024" },
  { id: 8, name: "Agile Methodology", level: 4, category: "Management", lastUpdated: "Nov 8, 2024" },
  { id: 9, name: "Technical Writing", level: 4, category: "Communication", lastUpdated: "Nov 1, 2024" },
  { id: 10, name: "Presentation Skills", level: 3, category: "Communication", lastUpdated: "Oct 18, 2024" },
  { id: 11, name: "Data Analysis", level: 3, category: "Analytics", lastUpdated: "Nov 3, 2024" },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Technical: { bg: '#dbeafe', text: '#3b82f6', border: '#93c5fd' },
  Design: { bg: '#fce7f3', text: '#ec4899', border: '#f9a8d4' },
  Management: { bg: '#f3e8ff', text: '#a855f7', border: '#d8b4fe' },
  Communication: { bg: '#dcfce7', text: '#22c55e', border: '#86efac' },
  Analytics: { bg: '#ffedd5', text: '#f97316', border: '#fdba74' },
  Marketing: { bg: '#e0e7ff', text: '#6366f1', border: '#a5b4fc' },
};

const departmentColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
};

export function MySkillsContent() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<{ skillName: string; feedback: string; status: string } | null>(null);

  const user = {
    name: "Sarah Johnson",
    department: "Engineering",
    position: "Senior Software Engineer",
    avatar: "",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleEditClick = (skill: Skill) => {
    console.log('Edit clicked for skill:', skill);
    setSelectedSkill(skill);
    setIsEditModalOpen(true);
  };

  const handleSaveSkill = (skillId: number, newLevel: number) => {
    setSkills(skills.map(skill => 
      skill.id === skillId 
        ? { ...skill, level: newLevel, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
        : skill
    ));
    toast.success("Skill updated successfully!", {
      description: "Your changes have been submitted for approval.",
    });
  };

  const handleAddSkill = (skillName: string, category: string, level: number) => {
    console.log('Adding skill:', skillName, category, level);
    const newSkill: Skill = {
      id: skills.length + 1,
      name: skillName,
      level: level,
      category: category,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setSkills([...skills, newSkill]);
    toast.success("Skill added successfully!", {
      description: "Your new skill has been submitted for approval.",
    });
  };

  const handleViewFeedback = (skillName: string, feedback: string, status: string) => {
    setSelectedFeedback({ skillName, feedback, status });
    setIsFeedbackModalOpen(true);
  };

  // Mock history data
  const skillHistory = [
    { id: 1, skillName: "React Development", action: "Updated level from 4 to 5", date: "Nov 15, 2024", status: "Approved", feedback: "Excellent progress! Your recent work on the new dashboard demonstrates strong React expertise. The component architecture and state management patterns you've implemented are top-notch." },
    { id: 2, skillName: "TypeScript", action: "Updated level from 3 to 4", date: "Nov 10, 2024", status: "Approved", feedback: "Great improvement! Your use of advanced TypeScript features like generics and utility types in the latest project shows significant growth in this skill." },
    { id: 3, skillName: "Agile Methodology", action: "Added new skill", date: "Nov 8, 2024", status: "Approved", feedback: "Good addition to your skill set. Your active participation in sprint planning and retrospectives validates this skill level." },
    { id: 4, skillName: "Team Leadership", action: "Updated level from 3 to 4", date: "Nov 5, 2024", status: "Pending", feedback: "Under review. We'll assess this based on the upcoming Q4 project leadership outcomes." },
  ];

  return (
    <div className="h-full overflow-y-auto p-8" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="space-y-6" style={{ maxWidth: '1400px' }}>
        {/* Page Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#7c3aed' }}>
                <Award className="h-6 w-6 text-white" />
              </div>
              <h1
                className="font-semibold"
                style={{ color: '#7c3aed', fontSize: '1.45rem', lineHeight: '1.1',marginLeft: '0.5rem' }}
              >
                My Skills
              </h1>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              style={{ backgroundColor: '#22c55e' }}
              className="hover:opacity-90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Skill
            </Button>
          </div>
          <p className="text-muted-foreground text-base">
            Manage and update your professional skills
          </p>
        </div>

        {/* User Profile Section */}
        <Card className="border shadow-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20" style={{ backgroundColor: '#7c3aed' }}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-semibold text-white" style={{ backgroundColor: '#7c3aed' }}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
                <p className="text-base text-muted-foreground mb-2">{user.position}</p>
                <Badge style={{ backgroundColor: '#dbeafe', color: '#1e40af', borderColor: '#93c5fd' }} className="border text-sm px-2 py-0.5">
                  {user.department}
                </Badge>
              </div>
                <div className="text-right">
                  <p
                    className="text-5xl font-semibold"
                    style={{ color: '#7c3aed', fontSize: '1.8rem', lineHeight: '1.1' }}
                  >
                    {skills.length}
                  </p>
                  <p className="text-base text-muted-foreground">Total Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-white border-b-2">
            <CardTitle className="text-2xl">All Skills</CardTitle>
            <CardDescription className="text-base">
              Complete list of your professional skills
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border-2 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f3f4f6' }} className="hover:bg-gray-100">
                    <TableHead className="text-base">Skill Name</TableHead>
                    <TableHead className="text-base">Level</TableHead>
                    <TableHead className="text-base">Category</TableHead>
                    <TableHead className="text-base">Last Updated</TableHead>
                    <TableHead className="text-right text-base">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.id} className="hover:bg-gray-50">
                      <TableCell>{skill.name}</TableCell>
                      <TableCell>
                        <StarRating initialRating={skill.level} readonly />
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className="border"
                          style={{
                            backgroundColor: categoryColors[skill.category]?.bg || '#6b7280',
                            color: categoryColors[skill.category]?.text || '#ffffff',
                            borderColor: categoryColors[skill.category]?.border || '#4b5563'
                          }}
                        >
                          {skill.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{skill.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditClick(skill)}
                          className="hover:bg-purple-50"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Skill Update History */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-white border-b-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <History className="h-6 w-6 text-purple-600" />
              Skill Update History
            </CardTitle>
            <CardDescription className="text-base">
              Recent changes to your skill profile
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border-2 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: '#f3f4f6' }} className="hover:bg-gray-100">
                    <TableHead className="text-base">Skill Name</TableHead>
                    <TableHead className="text-base">Action</TableHead>
                    <TableHead className="text-base">Date</TableHead>
                    <TableHead className="text-base">Status</TableHead>
                    <TableHead className="text-base">Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillHistory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell>{item.skillName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.action}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge
                          className="border"
                          style={{
                            backgroundColor: item.status === "Approved" ? '#69f69aff' : item.status === "Pending" ? '#ebe48fff' : '#fee2e2',
                            color: item.status === "Approved" ? '#045421ff' : item.status === "Pending" ? '#854d0e' : '#991b1b',
                            borderColor: item.status === "Approved" ? '#86efac' : item.status === "Pending" ? '#f6d325ff' : '#fca5a5'
                          }}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewFeedback(item.skillName, item.feedback, item.status)}
                          className="hover:bg-blue-50"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Feedback
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Skill Modal */}
      {selectedSkill && (
        <EditSkillModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          skill={selectedSkill}
          onSave={handleSaveSkill}
        />
      )}

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSkill}
      />

      {/* Feedback Modal */}
      <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              Manager Feedback
            </DialogTitle>
            <DialogDescription>
              Feedback for: <span className="font-semibold text-gray-900">{selectedFeedback?.skillName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <Badge
                className="border"
                style={{
                  backgroundColor: selectedFeedback?.status === "Approved" ? '#dcfce7' : selectedFeedback?.status === "Pending" ? '#fef9c3' : '#fee2e2',
                  color: selectedFeedback?.status === "Approved" ? '#15803d' : selectedFeedback?.status === "Pending" ? '#854d0e' : '#991b1b',
                  borderColor: selectedFeedback?.status === "Approved" ? '#86efac' : selectedFeedback?.status === "Pending" ? '#fde047' : '#fca5a5'
                }}
              >
                {selectedFeedback?.status}
              </Badge>
            </div>
            <div className="rounded-lg border-2 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Feedback:</p>
              <p className="text-base text-gray-800 leading-relaxed">
                {selectedFeedback?.feedback}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsFeedbackModalOpen(false)}
              style={{ backgroundColor: '#7c3aed' }}
              className="hover:opacity-90"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
