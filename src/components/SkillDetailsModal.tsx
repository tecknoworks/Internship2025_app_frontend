import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarRating } from "./StarRating";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface SkillDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    id: number;
    skillName: string;
    rating: number;
    department: string;
    domain?: string;
    category?: string;
    user?: {
      name: string;
      avatar?: string;
      email?: string;
      phone?: string;
      location?: string;
      joinedDate?: string;
    };
  };
}

const departmentColors: Record<string, string> = {
  DepartmentName: "bg-blue-100 text-blue-700 border-blue-200",

};

export function SkillDetailsModal({ isOpen, onClose, skill }: SkillDetailsModalProps) {
  const user = skill.user || {
    name: "John Smith",
    email: "john.smith@company.com",
  };

  const domain = skill.domain || "Technical";
  const category = skill.category || "Programming";

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        {/* Header - Purple */}
        <div style={{ backgroundColor: '#7c3aed' }} className="p-6 pb-16">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold">Skill Details</DialogTitle>
            <DialogDescription className="text-white/90 text-base">
              View comprehensive information about this skill
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Card - overlapping header */}
        <div className="px-6 -mt-12">
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6 space-y-6">
              {/* Employee Information */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Employee Information</h4>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-md">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg font-bold" style={{ backgroundColor: '#7c3aed', color: 'white' }}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <Badge className={`${departmentColors[skill.department] || 'bg-purple-100 text-purple-700'} border`}>
                      {skill.department}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Skill Information */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Skill Information</h4>
                <div className="space-y-4">
                  {/* Skill Name */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs font-semibold text-purple-700 mb-1">Skill Name</p>
                    <p className="text-lg font-semibold text-gray-900">{skill.skillName}</p>
                  </div>

                  {/* Domain and Category */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Domain</p>
                      <p className="text-sm font-semibold text-gray-900">{domain}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="text-xs font-semibold text-indigo-700 mb-1">Category</p>
                      <p className="text-sm font-semibold text-gray-900">{category}</p>
                    </div>
                  </div>

                  {/* Skill Rating */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="text-xs font-semibold text-purple-700 mb-2">Skill Rating</p>
                    <StarRating initialRating={skill.rating} readonly />
                    <p className="text-sm text-gray-600 mt-2">
                      {skill.rating} out of 5 stars
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4">
          <Button variant="outline" onClick={onClose} className="border-2">
            Close
          </Button>
          {/* <Button style={{ backgroundColor: '#7c3aed' }} className="hover:opacity-90">
            Edit Skill
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
