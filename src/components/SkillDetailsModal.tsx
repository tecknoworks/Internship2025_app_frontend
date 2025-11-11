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
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Analytics: "bg-purple-100 text-purple-700 border-purple-200",
  Design: "bg-pink-100 text-pink-700 border-pink-200",
  Operations: "bg-orange-100 text-orange-700 border-orange-200",
  Marketing: "bg-green-100 text-green-700 border-green-200",
  "Data Science": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export function SkillDetailsModal({ isOpen, onClose, skill }: SkillDetailsModalProps) {
  const user = skill.user || {
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinedDate: "Jan 2023",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 pb-16">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Skill Details</DialogTitle>
            <DialogDescription className="text-white/90">
              View comprehensive information about this skill
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* User Card - overlapping the gradient */}
        <div className="px-6 -mt-12">
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl mb-1">{user.name}</h3>
                  <Badge
                    className={`${departmentColors[skill.department] || 'bg-gray-100 text-gray-700'} border mb-2`}
                  >
                    {skill.department}
                  </Badge>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
              </div>

              {/* Skill Information */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2">
                  <p className="text-sm text-muted-foreground mb-1">Skill Name</p>
                  <p className="text-lg">{skill.skillName}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2">
                  <p className="text-sm text-muted-foreground mb-2">Skill Rating</p>
                  <StarRating initialRating={skill.rating} readonly />
                  <p className="text-sm text-muted-foreground mt-1">
                    {skill.rating} out of 5 stars
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2"
          >
            Close
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Edit Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
