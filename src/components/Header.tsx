import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bell, Search as SearchIcon } from "lucide-react";

interface HeaderProps {
  currentPage?: string;
}

const pageMeta: Record<string, { title: string; description: string }> = {
  "ai-chat": {
    title: "AI Assistant",
    description: "Converse with the assistant and generate insights",
  },
  "my-skills": {
    title: "My Skills",
    description: "Review and update your personal skill profile",
  },
  "cv-processing": {
    title: "CV Processing",
    description: "Extract and validate skills from candidate resumes",
  },
  "skill-search": {
    title: "Skill Search",
    description: "Discover organizational skills and advanced filters",
  },
  "employee-profiles": {
    title: "Employee Profiles",
    description: "Browse detailed employee skill overviews",
  },
};

export function Header({ currentPage = "ai-chat" }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-end px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 focus:border-[#7c3aed] focus:outline-none"
            />
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-500 hover:text-[#7c3aed]"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-[#EA2775] to-[#7D1C4B] text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
