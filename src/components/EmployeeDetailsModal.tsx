import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarRating } from "./StarRating";
import { Mail, Phone, MapPin, Calendar, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  lastUpdated: string;
}

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: number;
    name: string;
    department: string;
    avatar?: string;
    email?: string;
    phone?: string;
    location?: string;
    joinedDate?: string;
    position?: string;
    skills: Skill[];
  };
}

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-100 text-blue-700 border-blue-200",
  Design: "bg-pink-100 text-pink-700 border-pink-200",
  Management: "bg-purple-100 text-purple-700 border-purple-200",
  Communication: "bg-green-100 text-green-700 border-green-200",
  Analytics: "bg-orange-100 text-orange-700 border-orange-200",
};

const departmentColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Analytics: "bg-purple-100 text-purple-700 border-purple-200",
  Design: "bg-pink-100 text-pink-700 border-pink-200",
  Operations: "bg-orange-100 text-orange-700 border-orange-200",
  Marketing: "bg-green-100 text-green-700 border-green-200",
  "Data Science": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export function EmployeeDetailsModal({ isOpen, onClose, employee }: EmployeeDetailsModalProps) {
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 gap-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>

  <div className="p-6 pb-16" style={{ backgroundColor: "#7c3aed" }}>
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Employee Profile</DialogTitle>
            <DialogDescription className="text-white/90">
              Complete skill profile and information
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* User Card - overlapping the header */}
          <div className="px-6 -mt-12 pb-6">
            <Card className="border-2 shadow-lg">
              <CardContent className="pt-6">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback
                      className="text-xl text-white"
                      style={{ backgroundColor: "#7c3aed" }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-1">{employee.name}</h3>
                    <p className="text-muted-foreground mb-2">{employee.position || "Professional"}</p>
                    <Badge
                      className={`${departmentColors[employee.department] || 'bg-gray-100 text-gray-700'} border`}
                    >
                      {employee.department}
                    </Badge>
                  </div>
                </div>

                {/* Contact Information */}
                <div
                  className="space-y-3 rounded-lg border-2 p-4"
                  style={{ backgroundColor: "#f0eeff" }}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.location || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {employee.joinedDate || "N/A"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="mt-6">
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">All Skills</CardTitle>
                  <CardDescription>Complete skill profile</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead>Skill Name</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Last Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employee.skills.map((skill) => (
                          <TableRow key={skill.id} className="hover:bg-gray-50">
                            <TableCell>{skill.name}</TableCell>
                            <TableCell>
                              <StarRating initialRating={skill.level} readonly />
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${categoryColors[skill.category] || 'bg-gray-100 text-gray-700'} border`}
                              >
                                {skill.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {skill.lastUpdated}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="border-2">
            Close
          </Button>
          <Button className="bg-[#7c3aed] text-white hover:bg-[#6d28d9]">
            Edit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
