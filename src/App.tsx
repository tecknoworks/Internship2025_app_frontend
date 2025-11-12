import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { AIChatPage } from "./pages/AIChatPage";
import { MySkillsPage } from "./pages/MySkillsPage";
import { CVProcessingPage } from "./pages/CVProcessingPage";
import { SkillSearchPage } from "./pages/SkillSearchPage";
import { EmployeeProfilesPage } from "./pages/EmployeeProfilesPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";

type Page = "ai-chat" | "my-skills" | "cv-processing" | "skill-search" | "employee-profiles";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") {
    return (
      <>
        <LoginPage />
        <Toaster position="top-right" />
      </>
    );
  }

  if (location.pathname === "/register") {
    return (
      <>
        <RegisterPage />
        <Toaster position="top-right" />
      </>
    );
  }

  // Get current page from URL
  const currentPage: Page = 
    location.pathname === '/my-skills' ? 'my-skills' :
    location.pathname === '/cv-processing' ? 'cv-processing' :
    location.pathname === '/skill-search' ? 'skill-search' :
    location.pathname === '/employee-profiles' ? 'employee-profiles' :
    'ai-chat';

  const handlePageChange = (page: string) => {
    if (page === 'ai-chat') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "my-skills":
        return <MySkillsPage />;
      case "cv-processing":
        return <CVProcessingPage />;
      case "skill-search":
        return <SkillSearchPage />;
      case "employee-profiles":
        return <EmployeeProfilesPage />;
      default:
        return <AIChatPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {renderContent()}
      <Toaster position="top-right" />
    </div>
  );
}
