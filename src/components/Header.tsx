import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";
import logoTransp from "../logotransp.png";

interface HeaderProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function Header({ currentPage = "ai-chat", onPageChange }: HeaderProps) {
  return (
    <header className="border-b-2 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src={logoTransp}
            alt="Tecknoworks"
            className="h-12 w-auto object-contain"
          />
        </div>
        <nav className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="hover:bg-accent"
            onClick={() => onPageChange?.("ai-chat")}
            style={currentPage === "ai-chat" ? { backgroundColor: '#faf5ff' } : {}}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Chat
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-accent"
            onClick={() => onPageChange?.("my-skills")}
            style={currentPage === "my-skills" ? { backgroundColor: '#faf5ff' } : {}}
          >
            My Skills
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-accent"
            onClick={() => onPageChange?.("cv-processing")}
            style={currentPage === "cv-processing" ? { backgroundColor: '#faf5ff' } : {}}
          >
            CV Processing
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-accent"
            onClick={() => onPageChange?.("skill-search")}
            style={currentPage === "skill-search" ? { backgroundColor: '#faf5ff' } : {}}
          >
            Skill Search
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-accent"
            onClick={() => onPageChange?.("employee-profiles")}
            style={currentPage === "employee-profiles" ? { backgroundColor: '#faf5ff' } : {}}
          >
            Employee Profiles
          </Button>
        </nav>
      </div>
    </header>
  );
}
