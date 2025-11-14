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
      <DialogContent 
        className="p-0 gap-0 overflow-hidden"
        style={{
          width: '85vw',
          maxWidth: '1600px',
          maxHeight: '90vh'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          <X style={{ width: '18px', height: '18px', color: 'white' }} />
        </button>

        <div style={{ 
          padding: '15px 20px', 
          paddingBottom: '20px', 
          backgroundColor: "#7c3aed" 
        }}>
          <DialogHeader>
            <DialogTitle style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
              Employee Profile
            </DialogTitle>
            <DialogDescription style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>
              Complete skill profile and information
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable content */}
        <div style={{ 
          overflowY: 'auto', 
          maxHeight: 'calc(90vh - 170px)' 
        }}>
          {/* User Card - overlapping the header */}
          <div style={{ 
            padding: '0 32px', 
            marginTop: '20px',
            paddingBottom: '24px' 
          }}>
            <Card style={{ 
              border: '2px solid #e5e7eb', 
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}>
              <CardContent style={{ paddingTop: '24px', padding: '24px' }}>
                {/* Avatar and Basic Info */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '20px', 
                  marginBottom: '20px' 
                }}>
                  <Avatar style={{ 
                    height: '80px', 
                    width: '80px', 
                    border: '3px solid white',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
                    flexShrink: 0
                  }}>
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback
                      style={{ 
                        backgroundColor: "#7c3aed",
                        color: 'white',
                        fontSize: '28px',
                        fontWeight: 'bold'
                      }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      fontSize: '22px', 
                      fontWeight: 'bold', 
                      marginBottom: '6px',
                      color: '#1f2937',
                      overflow: 'visible',
                      whiteSpace: 'normal'
                    }}>
                      {employee.name}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '15px', 
                      marginBottom: '10px' 
                    }}>
                      {employee.position || "Professional"}
                    </p>
                    <Badge
                      className={departmentColors[employee.department] || 'bg-gray-100 text-gray-700'}
                      style={{
                        border: '1px solid',
                        fontSize: '13px',
                        padding: '4px 12px',
                        borderRadius: '5px',
                        fontWeight: '500',
                        display: 'inline-block'
                      }}
                    >
                      {employee.department}
                    </Badge>
                  </div>
                </div>

                {/* Contact Information */}
                {/* <div
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
                </div> */}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div style={{ marginTop: '20px' }}>
              <Card style={{ 
                border: '2px solid #e5e7eb', 
                borderRadius: '10px' 
              }}>
                <CardHeader style={{ 
                  paddingBottom: '12px', 
                  padding: '20px 24px' 
                }}>
                  <CardTitle style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '2px'
                  }}>
                    All Skills
                  </CardTitle>
                  <CardDescription style={{ 
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    Complete skill profile
                  </CardDescription>
                </CardHeader>
                <CardContent style={{ 
                  paddingTop: '12px', 
                  padding: '0 24px 24px' 
                }}>
                  <div style={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb', 
                    overflow: 'hidden' 
                  }}>
                    <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                      <Table>
                        <TableHeader style={{ 
                          position: 'sticky', 
                          top: 0, 
                          backgroundColor: '#f9fafb', 
                          zIndex: 10,
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          <TableRow>
                            <TableHead style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              padding: '12px 16px',
                              color: '#111827',
                              width: '30%'
                            }}>
                              Skill name
                            </TableHead>
                            <TableHead style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              padding: '12px 16px',
                              color: '#111827',
                              width: '30%'
                            }}>
                              Level
                            </TableHead>
                            <TableHead style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              padding: '12px 16px',
                              color: '#111827',
                              width: '20%'
                            }}>
                              Category
                            </TableHead>
                            <TableHead style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              padding: '12px 16px',
                              color: '#111827',
                              width: '20%'
                            }}>
                              Hire date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {employee.skills.map((skill) => (
                            <TableRow 
                              key={skill.id}
                              style={{ borderBottom: '1px solid #f3f4f6' }}
                            >
                              <TableCell style={{ 
                                fontSize: '15px', 
                                padding: '14px 16px', 
                                fontWeight: '600',
                                color: '#1f2937'
                              }}>
                                {skill.name}
                              </TableCell>
                              <TableCell style={{ padding: '14px 16px' }}>
                                <div style={{ 
                                  transform: 'scale(1.1)', 
                                  transformOrigin: 'left',
                                  display: 'inline-block'
                                }}>
                                  <StarRating initialRating={skill.level} readonly />
                                </div>
                              </TableCell>
                              <TableCell style={{ padding: '14px 16px' }}>
                                <Badge
                                  className={categoryColors[skill.category] || 'bg-gray-100 text-gray-700'}
                                  style={{
                                    border: '1px solid',
                                    fontSize: '13px',
                                    padding: '4px 10px',
                                    borderRadius: '5px',
                                    fontWeight: '500'
                                  }}
                                >
                                  {skill.category}
                                </Badge>
                              </TableCell>
                              <TableCell style={{ 
                                fontSize: '14px', 
                                color: '#6b7280', 
                                padding: '14px 16px',
                                fontWeight: '500'
                              }}>
                                {skill.lastUpdated}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter style={{ 
          padding: '16px 32px', 
          borderTop: '1px solid #e5e7eb' 
        }}>
          <Button 
            variant="outline" 
            onClick={onClose}
            style={{
              border: '1px solid #d1d5db',
              fontSize: '14px',
              padding: '8px 20px',
              fontWeight: '600',
              borderRadius: '6px'
            }}
          >
            Close
          </Button>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
