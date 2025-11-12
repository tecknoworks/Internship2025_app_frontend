import { useState } from "react";
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

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    id: number;
    name: string;
    level: number;
    category: string;
    lastUpdated: string;
  };
  onSave: (skillId: number, newLevel: number) => void;
}

export function EditSkillModal({ isOpen, onClose, skill, onSave }: EditSkillModalProps) {
  const [skillLevel, setSkillLevel] = useState(skill.level);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Simulare save - TEMPORARY
    setTimeout(() => {
      console.log("Saving skill:", { id: skill.id, level: skillLevel });
      onSave(skill.id, skillLevel);
      setLoading(false);
      onClose();
    }, 500);
  };

  const handleCancel = () => {
    setSkillLevel(skill.level); // Reset to original
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Skill Level</DialogTitle>
          <DialogDescription>
            Update your proficiency level for this skill
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Skill Name */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2">
            <p className="text-sm text-muted-foreground mb-1">Skill Name</p>
            <p className="text-lg">{skill.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Category: {skill.category}
            </p>
          </div>

          {/* Current Level Display */}
          <div className="space-y-2">
            <Label>Current Level</Label>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2">
              <StarRating initialRating={skill.level} readonly />
              <span className="text-sm text-muted-foreground">
                {skill.level} / 5
              </span>
            </div>
          </div>

          {/* Slider to adjust level */}
          <div className="space-y-4">
            <Label>Adjust Skill Level</Label>
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
              Changes require approval from your manager before being reflected in your profile.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-2"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
