import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

interface ChatThreadProps {
  messages: Message[];
}

export function ChatThread({ messages }: ChatThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "ai" && (
              <Avatar className="h-10 w-10 flex-shrink-0" style={{ border: '2px solid #e9d5ff' }}>
                <AvatarFallback style={{ backgroundColor: '#9333ea', color: '#ffffff' }}>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              } max-w-[70%]`}
            >
              <div
                className="rounded-2xl px-5 py-3"
                style={
                  message.sender === "user"
                    ? { backgroundColor: '#9333ea', color: '#ffffff' }
                    : { backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }
                }
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 px-2">
                {message.timestamp}
              </span>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-10 w-10 flex-shrink-0" style={{ border: '2px solid #fbcfe8' }}>
                <AvatarFallback style={{ backgroundColor: '#ec4899', color: '#ffffff' }}>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
