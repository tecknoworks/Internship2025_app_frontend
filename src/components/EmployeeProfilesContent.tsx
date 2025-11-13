import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeDetailsModal } from "./EmployeeDetailsModal";
import { Users, Upload, RefreshCw, FileSpreadsheet, CheckCircle, XCircle, MessageSquare, Bell } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Textarea } from "./ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// Sample employee data
const sampleEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Engineering",
    position: "Senior Software Engineer",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinedDate: "Jan 2022",
    skillCount: 8,
    skills: [
      { id: 1, name: "React Development", level: 5, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 2, name: "TypeScript", level: 4, category: "Technical", lastUpdated: "Oct 2024" },
      { id: 3, name: "Node.js", level: 4, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 4, name: "Team Leadership", level: 3, category: "Management", lastUpdated: "Sep 2024" },
      { id: 5, name: "Code Review", level: 5, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 6, name: "Agile Methodology", level: 4, category: "Management", lastUpdated: "Aug 2024" },
      { id: 7, name: "Technical Writing", level: 3, category: "Communication", lastUpdated: "Oct 2024" },
      { id: 8, name: "UI/UX Design", level: 2, category: "Design", lastUpdated: "Sep 2024" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    department: "Design",
    position: "Lead Product Designer",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinedDate: "Mar 2021",
    skillCount: 7,
    skills: [
      { id: 9, name: "UI/UX Design", level: 5, category: "Design", lastUpdated: "Nov 2024" },
      { id: 10, name: "Figma", level: 5, category: "Design", lastUpdated: "Nov 2024" },
      { id: 11, name: "Adobe Creative Suite", level: 4, category: "Design", lastUpdated: "Oct 2024" },
      { id: 12, name: "User Research", level: 4, category: "Design", lastUpdated: "Nov 2024" },
      { id: 13, name: "Design Systems", level: 5, category: "Design", lastUpdated: "Oct 2024" },
      { id: 14, name: "Prototyping", level: 4, category: "Design", lastUpdated: "Nov 2024" },
      { id: 15, name: "Presentation Skills", level: 4, category: "Communication", lastUpdated: "Sep 2024" },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    department: "Data Science",
    position: "Data Scientist",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinedDate: "Jul 2023",
    skillCount: 9,
    skills: [
      { id: 16, name: "Python Programming", level: 5, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 17, name: "Machine Learning", level: 4, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 18, name: "SQL Database", level: 5, category: "Technical", lastUpdated: "Oct 2024" },
      { id: 19, name: "Data Visualization", level: 4, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 20, name: "Statistical Analysis", level: 5, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 21, name: "TensorFlow", level: 3, category: "Technical", lastUpdated: "Oct 2024" },
      { id: 22, name: "R Programming", level: 3, category: "Technical", lastUpdated: "Sep 2024" },
      { id: 23, name: "Data Mining", level: 4, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 24, name: "Technical Presentation", level: 3, category: "Communication", lastUpdated: "Oct 2024" },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    department: "Marketing",
    position: "Marketing Manager",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    joinedDate: "May 2020",
    skillCount: 6,
    skills: [
      { id: 25, name: "Digital Marketing", level: 5, category: "Marketing", lastUpdated: "Nov 2024" },
      { id: 26, name: "Content Strategy", level: 4, category: "Marketing", lastUpdated: "Nov 2024" },
      { id: 27, name: "SEO/SEM", level: 4, category: "Marketing", lastUpdated: "Oct 2024" },
      { id: 28, name: "Social Media Marketing", level: 5, category: "Marketing", lastUpdated: "Nov 2024" },
      { id: 29, name: "Team Management", level: 4, category: "Management", lastUpdated: "Oct 2024" },
      { id: 30, name: "Analytics & Reporting", level: 3, category: "Analytics", lastUpdated: "Nov 2024" },
    ],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    department: "Operations",
    position: "Operations Lead",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 567-8901",
    location: "Chicago, IL",
    joinedDate: "Feb 2022",
    skillCount: 7,
    skills: [
      { id: 31, name: "Project Management", level: 5, category: "Management", lastUpdated: "Nov 2024" },
      { id: 32, name: "Process Optimization", level: 4, category: "Management", lastUpdated: "Oct 2024" },
      { id: 33, name: "Stakeholder Management", level: 5, category: "Management", lastUpdated: "Nov 2024" },
      { id: 34, name: "Risk Management", level: 4, category: "Management", lastUpdated: "Nov 2024" },
      { id: 35, name: "Budget Planning", level: 3, category: "Management", lastUpdated: "Sep 2024" },
      { id: 36, name: "Communication", level: 5, category: "Communication", lastUpdated: "Nov 2024" },
      { id: 37, name: "Data Analysis", level: 3, category: "Analytics", lastUpdated: "Oct 2024" },
    ],
  },
  {
    id: 6,
    name: "James Wilson",
    department: "Analytics",
    position: "Business Analyst",
    email: "james.wilson@company.com",
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
    joinedDate: "Sep 2023",
    skillCount: 6,
    skills: [
      { id: 38, name: "Data Analysis", level: 5, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 39, name: "Excel Advanced", level: 5, category: "Technical", lastUpdated: "Nov 2024" },
      { id: 40, name: "SQL", level: 4, category: "Technical", lastUpdated: "Oct 2024" },
      { id: 41, name: "Tableau", level: 4, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 42, name: "Business Intelligence", level: 4, category: "Analytics", lastUpdated: "Nov 2024" },
      { id: 43, name: "Report Writing", level: 3, category: "Communication", lastUpdated: "Oct 2024" },
    ],
  },
];

// Mock skill change requests
const skillChangeRequests = [
  {
    id: 1,
    employeeName: "Sarah Johnson",
    department: "Engineering",
    position: "Senior Software Engineer",
    skillName: "React Development",
    oldLevel: 4,
    newLevel: 5,
    requestDate: "Nov 15, 2024",
    status: "pending"
  },
  {
    id: 2,
    employeeName: "Michael Chen",
    department: "Design",
    position: "Lead Product Designer",
    skillName: "Figma",
    oldLevel: 4,
    newLevel: 5,
    requestDate: "Nov 14, 2024",
    status: "pending"
  },
  {
    id: 3,
    employeeName: "Emily Rodriguez",
    department: "Data Science",
    position: "Data Scientist",
    skillName: "Python Programming",
    oldLevel: 4,
    newLevel: 5,
    requestDate: "Nov 13, 2024",
    status: "pending"
  },
];

export function EmployeeProfilesContent() {
  const [selectedEmployee, setSelectedEmployee] = useState<typeof sampleEmployees[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof skillChangeRequests[0] | null>(null);
  const [feedback, setFeedback] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewDetails = (employee: typeof sampleEmployees[0]) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        toast.success("CSV file uploaded successfully!", {
          description: `Processing ${file.name}...`,
        });
        // Here you would process the CSV file
      } else {
        toast.error("Invalid file type", {
          description: "Please upload a CSV file",
        });
      }
      // Reset the input
      event.target.value = "";
    }
  };

  const handleUpdateSkills = () => {
    toast.success("Skills update requested", {
      description: "Your request has been submitted successfully",
    });
  };

  const handleAcceptRequest = (requestId: number) => {
    setIsFeedbackModalOpen(true);
    const request = skillChangeRequests.find(r => r.id === requestId);
    setSelectedRequest(request || null);
  };

  const handleDeclineRequest = (requestId: number) => {
    setIsFeedbackModalOpen(true);
    const request = skillChangeRequests.find(r => r.id === requestId);
    setSelectedRequest(request || null);
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Feedback submitted successfully!", {
        description: "The employee will be notified of your decision.",
      });
      setIsFeedbackModalOpen(false);
      setFeedback("");
      setSelectedRequest(null);
    } else {
      toast.error("Please provide feedback");
    }
  };

  return (
    <div className="h-full overflow-y-auto p-8" style={{ backgroundColor: "#f6f5ff" }}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#7c3aed" }}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-semibold" style={{ color: "#1e1b4b" }}>
                  Employee Skill Profiles
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  View and manage employee skills across your organization
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsRequestsModalOpen(true)}
              style={{ backgroundColor: "#7c3aed" }}
              className="hover:opacity-90"
            >
              <Bell className="h-4 w-4 mr-2" />
              View Requests ({skillChangeRequests.length})
            </Button>
          </div>
        </div>

        {/* Data Management Section */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b-2" style={{ backgroundColor: "#f0eeff" }}>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-purple-600" />
              Data Management
            </CardTitle>
            <CardDescription>Import and update employee skill data</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="text-sm"
              />
              <Button
                onClick={handleImportClick}
                style={{ backgroundColor: "#16a34a", color: "white" }}
                className="hover:bg-green-700 whitespace-nowrap"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import BambooHR Report
              </Button>
              <Button
                onClick={handleUpdateSkills}
                variant="outline"
                className="border-2 hover:bg-purple-50 whitespace-nowrap"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Skills
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Upload a CSV file from BambooHR to import or update employee skill data. Supported format: CSV with columns for Name, Department, Skills, and Levels.
            </p>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div>
          <h2 className="text-2xl mb-4">All Employees ({sampleEmployees.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {sampleEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onViewDetails={() => handleViewDetails(employee)}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" size="default" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 1} size="default">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 2} size="default">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 3} size="default">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size="default" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={selectedEmployee}
        />
      )}

      {/* Skill Change Requests Modal */}
      <Dialog open={isRequestsModalOpen} onOpenChange={setIsRequestsModalOpen}>
        <DialogContent style={{ maxWidth: "95vw", width: "1400px" }} className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3 mb-2">
              <Bell className="h-6 w-6" style={{ color: "#7c3aed" }} />
              Skill Change Requests
            </DialogTitle>
            <DialogDescription className="text-base">
              Review and approve skill level changes requested by employees
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6" style={{ minHeight: "500px" }}>
            <div className="rounded-lg border overflow-hidden" style={{ minHeight: "500px" }}>
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "#f9fafb" }}>
                    <TableHead className="font-semibold py-3">Employee</TableHead>
                    <TableHead className="font-semibold py-3">Department</TableHead>
                    <TableHead className="font-semibold py-3">Position</TableHead>
                    <TableHead className="font-semibold py-3">Skill Change</TableHead>
                    <TableHead className="font-semibold py-3">Date</TableHead>
                    <TableHead className="text-right font-semibold py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillChangeRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-purple-50">
                      <TableCell className="font-medium py-4">{request.employeeName}</TableCell>
                      <TableCell className="py-4">
                        <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
                          {request.department}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm py-4">{request.position}</TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{request.skillName}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>
                            {request.oldLevel}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                            {request.newLevel}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm py-4">{request.requestDate}</TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            style={{ backgroundColor: "#22c55e" }}
                            className="hover:opacity-90 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                            variant="outline"
                            className="border border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <MessageSquare className="h-6 w-6" style={{ color: "#7c3aed" }} />
              Provide Feedback
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <span>
                  Feedback for <strong>{selectedRequest.employeeName}</strong> - {selectedRequest.skillName} ({selectedRequest.oldLevel} → {selectedRequest.newLevel})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Feedback</label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide detailed feedback about this skill change request..."
                className="min-h-[150px]"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsFeedbackModalOpen(false);
                  setFeedback("");
                  setSelectedRequest(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFeedback}
                style={{ backgroundColor: "#7c3aed" }}
                className="hover:opacity-90"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
