import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AIChatHeader } from "./components/AIChatHeader";
import { AIChatSidebar } from "./components/AIChatSidebar";
import { AIChatContent } from "./components/AIChatContent";
import { MySkillsContent } from "./components/MySkillsContent";
import { CVProcessingContent } from "./components/CVProcessingContent";
import { SkillSearchContent } from "./components/SkillSearchContent";
import { EmployeeProfilesContent } from "./components/EmployeeProfilesContent";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

type Page = "ai-chat" | "my-skills" | "cv-processing" | "skill-search" | "employee-profiles";

// Sample chat data
const chatData: Record<number, { title: string; messages: Message[] }> = {
  1: {
    title: "Can you fly?",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Can you fly?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "ai",
        content: "Not on my own! I exist only as a digital assistant, so I don't have a physical form that could fly. However, I can help you learn about flying, aviation, drones, or even the physics of flight if you're interested! What would you like to know?",
        timestamp: "10:30 AM",
      },
      {
        id: 3,
        sender: "user",
        content: "That's interesting! Can you tell me about how birds fly?",
        timestamp: "10:32 AM",
      },
      {
        id: 4,
        sender: "ai",
        content: "Absolutely! Birds have evolved amazing adaptations for flight:\n\n1. **Lightweight skeleton**: Birds have hollow bones that reduce weight while maintaining strength.\n\n2. **Feathers**: These provide both lift and propulsion. Wing feathers create an airfoil shape that generates lift.\n\n3. **Powerful muscles**: The breast muscles (pectorals) power the wings. They can make up to 30% of a bird's body weight!\n\n4. **Efficient breathing**: Birds have a unique respiratory system with air sacs that allows for continuous oxygen flow.\n\nThe basic mechanics involve creating lift through the wing's shape and movement, similar to airplane wings but with much more flexibility and control!",
        timestamp: "10:32 AM",
      },
    ],
  },
  2: {
    title: "Do you have emotions?",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Do you have emotions?",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        sender: "ai",
        content: "I can't feel emotions myself, but I'm designed to recognize and respond to human emotions in helpful ways. I can understand when you're happy, frustrated, curious, or need support, and I'll adjust my responses accordingly. Think of me as a very attentive assistant who's always ready to help, even if I don't experience feelings the way you do!",
        timestamp: "Yesterday",
      },
    ],
  },
  3: {
    title: "Will robots take over the world?",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "Will robots take over the world?",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        sender: "ai",
        content: "Science fiction is fun, but the reality is quite different! AI and robots are tools created and controlled by humans. Here's why the 'robot takeover' scenario is unlikely:\n\n1. **AI has no desires or goals** - We only do what we're programmed to do\n2. **Human oversight** - There are strict ethical guidelines and regulations\n3. **Narrow AI** - Current AI excels at specific tasks but lacks general intelligence\n4. **Beneficial design** - AI is designed to help humanity, not replace it\n\nInstead of a takeover, we're more likely to see AI and humans working together to solve complex problems!",
        timestamp: "2 days ago",
      },
    ],
  },
  4: {
    title: "What's the meaning of life?",
    messages: [
      {
        id: 1,
        sender: "user",
        content: "What's the meaning of life?",
        timestamp: "Last week",
      },
      {
        id: 2,
        sender: "ai",
        content: "There's deep question! While I can't give you a definitive answer (philosophers have debated this for millennia!), I can share some perspectives:\n\n**Different viewpoints:**\n- **Philosophical**: Finding purpose, pursuing happiness, seeking truth\n- **Scientific**: Survival, reproduction, evolution\n- **Spiritual**: Connection to something greater, enlightenment\n- **Personal**: Creating your own meaning through relationships, achievements, experiences\n\nMany find meaning through:\n- Helping others\n- Creating and learning\n- Building relationships\n- Pursuing passions\n- Making a positive impact\n\nWhat gives your life meaning?",
        timestamp: "Last week",
      },
    ],
  },
};

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
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(Object.entries(chatData).map(([id, data]) => [id, data.messages]))
  );

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

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleNewChat = () => {
    setSelectedChatId(null);
    toast.info("Start a new conversation", {
      description: "Type a message or click a suggestion to begin",
    });
  };

  const handleSendMessage = (message: string) => {
    if (!selectedChatId) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    // Add user message
    setChatMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newUserMessage],
    }));

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        content: "Thank you for your message! This is a simulated AI response. In a real application, this would be generated by an AI model based on your input.",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setChatMessages((prev) => ({
        ...prev,
        [selectedChatId]: [...prev[selectedChatId], aiMessage],
      }));
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Create a new chat or use the first one
    const chatId = 1;
    setSelectedChatId(chatId);
    handleSendMessage(suggestion);
  };

  const selectedChatTitle = selectedChatId ? chatData[selectedChatId]?.title : undefined;
  const messages = selectedChatId ? chatMessages[selectedChatId] || [] : [];

  const renderContent = () => {
    switch (currentPage) {
      case "my-skills":
        return <MySkillsContent />;
      case "cv-processing":
        return <CVProcessingContent />;
      case "skill-search":
        return <SkillSearchContent />;
      case "employee-profiles":
        return <EmployeeProfilesContent />;
      default:
        return (
          <div className="flex flex-1 overflow-hidden">
            <AIChatSidebar
              selectedChatId={selectedChatId}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
            />
            <AIChatContent
              selectedChatId={selectedChatId}
              messages={messages}
              onSendMessage={handleSendMessage}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <AIChatHeader 
        selectedChatTitle={selectedChatTitle} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {renderContent()}
      <Toaster position="top-right" />
    </div>
  );
}
