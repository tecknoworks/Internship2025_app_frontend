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

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background -">
      <Button className="w-full mb-6">
        <Plus className="mr-2 h-4 w-4" />
        New Chat
      </Button>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">RECENT CHATS</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {recentChats.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm truncate">{chat.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.preview}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t space-y-1">
        <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
}
