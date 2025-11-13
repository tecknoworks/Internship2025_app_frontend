import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Paperclip } from "lucide-react";

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
}

export function ChatInputBar({ onSendMessage }: ChatInputBarProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 border-t-2 bg-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0 h-12 w-12 border-2"
            style={{ borderColor: '#e5e7eb' }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '#faf5ff';
              e.currentTarget.style.borderColor = '#d8b4fe';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[48px] max-h-32 resize-none border-2 rounded-2xl"
              style={{ borderColor: '#e5e7eb' }}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)'}
              onBlur={(e) => e.currentTarget.style.boxShadow = ''}
              rows={1}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0 h-12 px-6 rounded-2xl"
            style={{ backgroundColor: '#9333ea', color: '#ffffff' }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => !message.trim() ? null : e.currentTarget.style.backgroundColor = '#7e22ce'}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => !message.trim() ? null : e.currentTarget.style.backgroundColor = '#9333ea'}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
