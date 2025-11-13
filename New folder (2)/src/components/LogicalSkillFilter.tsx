import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SkillCondition {
  id: string;
  skill: string;
  operator: 'AND' | 'OR';
}

interface LogicalSkillFilterProps {
  availableSkills: string[];
  onFilterChange: (conditions: SkillCondition[]) => void;
}

export function LogicalSkillFilter({ availableSkills, onFilterChange }: LogicalSkillFilterProps) {
  const [conditions, setConditions] = useState<SkillCondition[]>([
    { id: '1', skill: '', operator: 'AND' }
  ]);

  const addCondition = () => {
    const newCondition: SkillCondition = {
      id: Date.now().toString(),
      skill: '',
      operator: 'AND'
    };
    const updated = [...conditions, newCondition];
    setConditions(updated);
    onFilterChange(updated);
  };

  const removeCondition = (id: string) => {
    const updated = conditions.filter(c => c.id !== id);
    setConditions(updated);
    onFilterChange(updated);
  };

  const updateCondition = (id: string, field: 'skill' | 'operator', value: string) => {
    const updated = conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    );
    setConditions(updated);
    onFilterChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 mb-2">
        Build your query by combining skills with AND/OR logic
      </div>
      
      {conditions.map((condition, index) => (
        <div key={condition.id} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Select
                value={condition.skill}
                onValueChange={(value) => updateCondition(condition.id, 'skill', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a skill..." />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {conditions.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCondition(condition.id)}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {index < conditions.length - 1 && (
            <div className="flex items-center gap-2 pl-4">
              <div className="h-6 w-px bg-gray-300"></div>
              <Select
                value={condition.operator}
                onValueChange={(value) => updateCondition(condition.id, 'operator', value as 'AND' | 'OR')}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={addCondition}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Skill Condition
      </Button>
    </div>
  );
}
