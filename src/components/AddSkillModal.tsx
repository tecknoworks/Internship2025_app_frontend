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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { StarRating } from "./StarRating";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skillName: string, category: string, level: number) => void;
}

export function AddSkillModal({ isOpen, onClose, onAdd }: AddSkillModalProps) {
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);

  const handleAdd = () => {
    if (skillName.trim() && category) {
      onAdd(skillName.trim(), category, skillLevel);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSkillName("");
    setCategory("");
    setSkillLevel(3);
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
          {/* Skill Name Input */}
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              placeholder="e.g., React Development, Project Management"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="border-2"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="border-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">💻 Technical</SelectItem>
                <SelectItem value="Design">🎨 Design</SelectItem>
                <SelectItem value="Management">👔 Management</SelectItem>
                <SelectItem value="Communication">💬 Communication</SelectItem>
                <SelectItem value="Analytics">📊 Analytics</SelectItem>
                <SelectItem value="Marketing">📢 Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Level Display */}
          <div className="space-y-2">
            <Label>Skill Level</Label>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2">
              <StarRating initialRating={skillLevel} readonly />
              <span className="text-sm text-muted-foreground">
                {skillLevel} / 5
              </span>
            </div>
          </div>

          {/* Slider to adjust level */}
          <div className="space-y-4">
            <Label>Set Your Proficiency Level</Label>
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
            disabled={!skillName.trim() || !category}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Add Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
