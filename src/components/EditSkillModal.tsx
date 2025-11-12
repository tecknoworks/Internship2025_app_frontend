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
import { Slider } from "./ui/slider";
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
              <StarRating initialRating={skillLevel} readonly />
              <span className="text-sm text-muted-foreground">
                {skillLevel} / 5
              </span>
            </div>
          </div>

          {/* Slider to adjust level */}
                   <div className="space-y-4">
            <Label>Adjust Skill Level</Label>
            <div className="space-y-4">
              <Slider
                value={[skillLevel]}
                onValueChange={(value: number[]) => setSkillLevel(value[0])}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border">
                <p className="text-sm">
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
