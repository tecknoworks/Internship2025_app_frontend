import axiosInstance from '../config/axios';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
  avatar?: string;
}

interface EmployeeFilters {
  department?: string;
  skills?: string[];
  search?: string;
}

class EmployeesService {
  private readonly BASE_PATH = '/employees';

  async getAll(filters?: EmployeeFilters): Promise<Employee[]> {
    const { data } = await axiosInstance.get<Employee[]>(this.BASE_PATH, {
      params: filters
    });
    return data;
  }

  async getById(id: string): Promise<Employee> {
    const { data } = await axiosInstance.get<Employee>(`${this.BASE_PATH}/${id}`);
    return data;
  }

  async search(query: string): Promise<Employee[]> {
    const { data } = await axiosInstance.get<Employee[]>(`${this.BASE_PATH}/search`, {
      params: { q: query }
    });
    return data;
  }

  async getBySkills(skills: string[]): Promise<Employee[]> {
    const { data } = await axiosInstance.post<Employee[]>(
      `${this.BASE_PATH}/filter-by-skills`,
      { skills }
    );
    return data;
  }
}

export default new EmployeesService();
