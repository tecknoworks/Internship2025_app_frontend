import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export function AdvancedFilters() {
  const departments = ['Engineering', 'Design', 'Analytics', 'Marketing', 'Operations', 'Sales'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div>
        <Label className="text-sm text-gray-700 mb-3 block">Department</Label>
        <div className="flex items-center gap-2 flex-wrap">
          {departments.map((dept) => (
            <Badge
              key={dept}
              variant="outline"
              className="cursor-pointer hover:bg-[#EA2775] hover:text-white hover:border-[#EA2775] transition-colors"
            >
              {dept}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm text-gray-700 mb-3 block">Skill Level Range</Label>
        <div className="px-2">
          <Slider
            defaultValue={[2, 4]}
            max={5}
            min={1}
            step={1}
            className="mb-3"
          />
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Level 1</span>
            <span>Level 5</span>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm text-gray-700 mb-3 block">Proficiency Level</Label>
        <div className="space-y-2">
          {levels.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <Checkbox id={level} />
              <label
                htmlFor={level}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm text-gray-700 mb-3 block">Special Filters</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="trending" />
            <label htmlFor="trending" className="text-sm text-gray-700 cursor-pointer">
              Trending skills only
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="certified" />
            <label htmlFor="certified" className="text-sm text-gray-700 cursor-pointer">
              Certified skills
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="high-demand" />
            <label htmlFor="high-demand" className="text-sm text-gray-700 cursor-pointer">
              High demand
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#EA2775] to-[#7D1C4B] text-white rounded-lg hover:from-[#d61f68] hover:to-[#6d1840] transition-all text-sm">
          Apply Filters
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
          Clear All
        </button>
      </div>
    </div>
  );
}
