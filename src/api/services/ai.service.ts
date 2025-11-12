import axiosInstance from '../config/axios';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: number;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

interface SendMessageRequest {
  sessionId?: number;
  message: string;
}

interface SendMessageResponse {
  sessionId: number;
  message: ChatMessage;
}

class AIService {
  private readonly BASE_PATH = '/ai';

  async getSessions(): Promise<ChatSession[]> {
    const { data } = await axiosInstance.get<ChatSession[]>(`${this.BASE_PATH}/sessions`);
    return data;
  }

  async getSession(id: number): Promise<ChatSession> {
    const { data } = await axiosInstance.get<ChatSession>(`${this.BASE_PATH}/sessions/${id}`);
    return data;
  }

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    const { data } = await axiosInstance.post<SendMessageResponse>(
      `${this.BASE_PATH}/chat`,
      request
    );
    return data;
  }

  async createSession(title?: string): Promise<ChatSession> {
    const { data } = await axiosInstance.post<ChatSession>(`${this.BASE_PATH}/sessions`, {
      title: title || 'New Chat'
    });
    return data;
  }

  async deleteSession(id: number): Promise<void> {
    await axiosInstance.delete(`${this.BASE_PATH}/sessions/${id}`);
  }
}

export default new AIService();
