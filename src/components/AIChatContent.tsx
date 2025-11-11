import { Card, CardContent } from "./ui/card";
import { ArrowUpRight } from "lucide-react";
import { ChatThread } from "./ChatThread";
import { ChatInputBar } from "./ChatInputBar";

const suggestionCards = [
  {
    id: 1,
    text: "Don't worry, this update is quicker than your internet history deletion!",
  },
  {
    id: 2,
    text: "A majestic bird soars high above a crystal-clear glacial lake, its wings catching the sunlight.",
  },
  {
    id: 3,
    text: "For Wallace the walrus, the perfect day starts with a leisurely swim in the icy Arctic waters",
  },
  {
    id: 4,
    text: "The best time to stretch is whenever your body feels tight or stiff!",
  },
];

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

interface AIChatContentProps {
  selectedChatId: number | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export function AIChatContent({ selectedChatId, messages, onSendMessage, onSuggestionClick }: AIChatContentProps) {
  // Show welcome screen if no chat is selected
  if (!selectedChatId) {
    return (
      <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#faf5ff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl mb-4" style={{ color: '#581c87' }}>
              Welcome, John Doe
            </h1>
            <p className="text-lg text-muted-foreground">
              May I be of assistance today?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestionCards.map((card) => (
              <Card
                key={card.id}
                onClick={() => onSuggestionClick(card.text)}
                className="hover:shadow-lg transition-all cursor-pointer group border-2 bg-white"
                style={{ borderColor: '#e5e7eb' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d8b4fe'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex-1">
                      {card.text}
                    </p>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Show chat thread if a chat is selected
  return (
    <main className="flex-1 flex flex-col" style={{ backgroundColor: '#faf5ff' }}>
      <ChatThread messages={messages} />
      <ChatInputBar onSendMessage={onSendMessage} />
    </main>
  );
}
