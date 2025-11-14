import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Search, MessageSquare, Settings, HelpCircle } from "lucide-react";

const recentChats = [
  {
    id: 1,
    title: "Can you fly?",
    preview: "Not on my own! I exist o...",
  },
  {
    id: 2,
    title: "Do you have emotion...",
    preview: "I can't feel emotions my...",
  },
  {
    id: 3,
    title: "Will robots take over t...",
    preview: "Science fiction is fun, b...",
  },
  {
    id: 4,
    title: "What's the meaning o...",
    preview: "There's deep question ab...",
  },
];

interface AIChatSidebarProps {
  selectedChatId: number | null;
  onSelectChat: (chatId: number) => void;
  onNewChat: () => void;
}

export function AIChatSidebar({ selectedChatId, onSelectChat, onNewChat }: AIChatSidebarProps) {
  return (
    <aside className="w-64 border-r-2 bg-white p-4 flex flex-col h-screen">
      <Button 
        onClick={onNewChat}
        className="w-full mb-6"
        style={{ backgroundColor: '#9333ea', color: '#ffffff' }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#7e22ce'}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#9333ea'}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Chat
      </Button>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-3 tracking-wider">RECENT CHATS</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-9 bg-muted/30 border-2"
          />
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {recentChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="w-full text-left p-3 rounded-lg transition-all border-2"
            style={
              selectedChatId === chat.id
                ? { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }
                : { borderColor: 'transparent' }
            }
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              if (selectedChatId !== chat.id) {
                e.currentTarget.style.backgroundColor = '#faf5ff';
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              if (selectedChatId !== chat.id) {
                e.currentTarget.style.backgroundColor = '';
              }
            }}
          >
            <div className="flex items-start gap-2">
              <MessageSquare 
                className="h-4 w-4 mt-0.5 flex-shrink-0"
                style={{ color: selectedChatId === chat.id ? '#9333ea' : '#717182' }}
              />
              <div className="min-w-0 flex-1">
                <p className={`text-sm truncate ${
                  selectedChatId === chat.id ? "font-medium" : ""
                }`}>{chat.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.preview}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-2 space-y-1">
        <button 
          className="w-full flex items-center gap-2 p-2 rounded-lg transition-all text-sm"
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#faf5ff'}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = ''}
        >
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </button>
        <button 
          className="w-full flex items-center gap-2 p-2 rounded-lg transition-all text-sm"
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#fdf2f8'}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = ''}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
}
