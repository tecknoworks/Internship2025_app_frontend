import axiosInstance from '../config/axios';

interface Skill {
  id: string;
  name: string;
  level: number;
  category?: string;
}

interface CreateSkillRequest {
  name: string;
  level: number;
  category?: string;
}

interface UpdateSkillRequest extends Partial<CreateSkillRequest> {}

class SkillsService {
  private readonly BASE_PATH = '/skills';

  async getAll(): Promise<Skill[]> {
    const { data } = await axiosInstance.get<Skill[]>(this.BASE_PATH);
    return data;
  }

  async getById(id: string): Promise<Skill> {
    const { data } = await axiosInstance.get<Skill>(`${this.BASE_PATH}/${id}`);
    return data;
  }

  async create(skill: CreateSkillRequest): Promise<Skill> {
    const { data } = await axiosInstance.post<Skill>(this.BASE_PATH, skill);
    return data;
  }

  async update(id: string, skill: UpdateSkillRequest): Promise<Skill> {
    const { data } = await axiosInstance.put<Skill>(`${this.BASE_PATH}/${id}`, skill);
    return data;
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`${this.BASE_PATH}/${id}`);
  }

  async search(query: string): Promise<Skill[]> {
    const { data } = await axiosInstance.get<Skill[]>(`${this.BASE_PATH}/search`, {
      params: { q: query }
    });
    return data;
  }
}

export default new SkillsService();
