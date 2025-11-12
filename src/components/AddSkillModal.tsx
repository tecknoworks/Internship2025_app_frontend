import { useState, useRef, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { StarRating } from "./StarRating";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "./ui/utils";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skillName: string, category: string, level: number) => void;
}

// Mock data - în viitor va veni din backend
const availableSkills = [
  { name: "React", category: "Technical" },
  { name: "TypeScript", category: "Technical" },
  { name: "JavaScript", category: "Technical" },
  { name: "Python", category: "Technical" },
  { name: "Java", category: "Technical" },
  { name: "C++", category: "Technical" },
  { name: "Node.js", category: "Technical" },
  { name: "Angular", category: "Technical" },
  { name: "Vue.js", category: "Technical" },
  { name: "Next.js", category: "Technical" },
  { name: "UI/UX Design", category: "Design" },
  { name: "Figma", category: "Design" },
  { name: "Adobe XD", category: "Design" },
  { name: "Photoshop", category: "Design" },
  { name: "Illustrator", category: "Design" },
  { name: "Sketch", category: "Design" },
  { name: "Team Leadership", category: "Management" },
  { name: "Project Management", category: "Management" },
  { name: "Agile Methodologies", category: "Management" },
  { name: "Scrum", category: "Management" },
  { name: "Product Management", category: "Management" },
  { name: "Technical Writing", category: "Communication" },
  { name: "Public Speaking", category: "Communication" },
  { name: "Presentation Skills", category: "Communication" },
  { name: "Data Analysis", category: "Analytics" },
  { name: "SQL", category: "Analytics" },
  { name: "Excel", category: "Analytics" },
  { name: "Power BI", category: "Analytics" },
  { name: "Tableau", category: "Analytics" },
  { name: "Digital Marketing", category: "Marketing" },
  { name: "SEO", category: "Marketing" },
  { name: "Content Marketing", category: "Marketing" },
];

export function AddSkillModal({ isOpen, onClose, onAdd }: AddSkillModalProps) {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [category, setCategory] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredList, setFilteredList] = useState(availableSkills);
  
  const handleSearchChange = (value: string) => {
    const filtered = availableSkills.filter(skill => 
      skill.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleAdd = () => {
    if (selectedSkill && category) {
      onAdd(selectedSkill, category, skillLevel);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSelectedSkill("");
    setCategory("");
    setSkillLevel(3);
    setFilteredList(availableSkills);
    setIsDropdownOpen(false);
    onClose();
  };

  const handleSkillSelect = (skillName: string) => {
    setSelectedSkill(skillName);
    const skill = availableSkills.find(s => s.name === skillName);
    if (skill) {
      setCategory(skill.category);
    }
    setFilteredList(availableSkills);
    setIsDropdownOpen(false);
  };

  const levelDescriptions = [
    "",
    "Beginner - Basic knowledge",
    "Intermediate - Working knowledge",
    "Advanced - Strong proficiency",
    "Expert - Deep expertise",
    "Master - Industry leading",
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Skill</DialogTitle>
          <DialogDescription>
            Add a new skill to your profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Skill Name Dropdown with Search */}
                    <div className="mb-6">
            <Label className="text-base font-semibold mb-3 block" style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
              Skill Name
            </Label>
            
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full justify-between border-2 bg-white h-12"
                style={{ 
                  fontSize: '16px',
                  color: '#1f2937',
                  borderColor: '#d1d5db',
                  fontWeight: '400',
                  padding: '0 16px'
                }}
              >
                <span style={{ color: selectedSkill ? '#1f2937' : '#9ca3af' }}>
                  {selectedSkill || "e.g., React Development, Project Management"}
                </span>
                <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
              
              {isDropdownOpen && (
                <div 
                  style={{ 
                    position: 'absolute',
                    zIndex: 9999,
                    width: '100%',
                    marginTop: '8px',
                    maxHeight: '350px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                    <input
                      type="text"
                      placeholder="Search skills..."
                      onChange={(e) => handleSearchChange(e.target.value)}
                      autoFocus
                      style={{ 
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '16px', 
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '280px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                    {filteredList.length === 0 ? (
                      <div style={{ 
                        padding: '16px 0', 
                        textAlign: 'center', 
                        color: '#6b7280',
                        backgroundColor: '#ffffff' 
                      }}>
                        No skill found.
                      </div>
                    ) : (
                      filteredList.map((skill) => (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => handleSkillSelect(skill.name)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                          style={{ 
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            fontSize: '15px', 
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                            <Check
                              style={{ 
                                color: '#3b82f6', 
                                width: '20px', 
                                height: '20px',
                                opacity: selectedSkill === skill.name ? 1 : 0
                              }}
                            />
                            <span style={{ color: '#1f2937', fontWeight: '500' }}>{skill.name}</span>
                          </div>
                          <span 
                            style={{ 
                              backgroundColor: '#f3f4f6', 
                              color: '#6b7280',
                              fontSize: '13px',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {skill.category}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skill Level Display */}
          <div className="space-y-2">
            <Label>Skill Level</Label>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2">
              <StarRating key={skillLevel} initialRating={skillLevel} readonly />
              <span className="text-sm text-muted-foreground">
                {skillLevel} / 5
              </span>
            </div>
          </div>

          {/* Slider to adjust level */}
          <div className="space-y-4">
            <Label>Set Your Proficiency Level</Label>
            <div className="space-y-4">
              <div className="px-2 py-2">
                {/* Custom Slider */}
                <div className="relative w-full" style={{ marginBottom: '16px' }}>
                  {/* Background track - always visible */}
                  <div className="w-full h-2 bg-gray-300 rounded-full" />
                  
                  {/* Filled portion - overlay on top */}
                  <div 
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all"
                    style={{ width: `${((skillLevel - 1) / 4) * 100}%` }}
                  />
                  
                  {/* Hidden range input for interaction */}
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(Number(e.target.value))}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
                
                {/* Level markers - separate from slider */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  width: '100%',
                  marginTop: '10px',
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSkillLevel(level)}
                      style={{
                        fontSize: '16px',
                        fontWeight: skillLevel === level ? 'bold' : '600',
                        color: skillLevel === level ? '#3b82f6' : '#4b5563',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                        padding: '4px 8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={(e) => {
                        if (skillLevel !== level) {
                          e.currentTarget.style.color = '#4b5563'
                        }
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border">
                <p className="text-sm font-medium">
                  {levelDescriptions[skillLevel]}
                </p>
              </div>
            </div>
          </div>

          {/* Warning Note */}
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              New skills require approval from your manager before being added to your profile.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!selectedSkill || !category}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Add Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
