import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User } from "lucide-react";

interface EmployeeCardProps {
  employee: {
    id: number;
    name: string;
    department: string;
    avatar?: string;
    skillCount?: number;
  };
  onViewDetails: () => void;
}

const departmentColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Analytics: "bg-purple-100 text-purple-700 border-purple-200",
  Design: "bg-pink-100 text-pink-700 border-pink-200",
  Operations: "bg-orange-100 text-orange-700 border-orange-200",
  Marketing: "bg-green-100 text-green-700 border-green-200",
  "Data Science": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export function EmployeeCard({ employee, onViewDetails }: EmployeeCardProps) {
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-2 hover:shadow-lg transition-all hover:scale-105 duration-200">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md ring-2 ring-purple-200">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 w-full">
            <h3 className="text-lg">{employee.name}</h3>
            <Badge
              className={`${departmentColors[employee.department] || 'bg-gray-100 text-gray-700'} border`}
            >
              {employee.department}
            </Badge>
            {employee.skillCount && (
              <p className="text-sm text-muted-foreground">
                {employee.skillCount} skills
              </p>
            )}
          </div>

          <Button
            onClick={onViewDetails}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <User className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
