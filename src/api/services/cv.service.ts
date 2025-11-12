import axiosInstance from '../config/axios';

interface CVProcessRequest {
  file: File;
}

interface CVProcessResponse {
  id: string;
  skills: Array<{
    name: string;
    confidence: number;
  }>;
  experience: string;
  education: string;
}

class CVService {
  private readonly BASE_PATH = '/cv';

  async upload(file: File): Promise<CVProcessResponse> {
    const formData = new FormData();
    formData.append('cv', file);

    const { data } = await axiosInstance.post<CVProcessResponse>(
      `${this.BASE_PATH}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }

  async process(id: string): Promise<CVProcessResponse> {
    const { data } = await axiosInstance.post<CVProcessResponse>(
      `${this.BASE_PATH}/${id}/process`
    );
    return data;
  }

  async getHistory(): Promise<CVProcessResponse[]> {
    const { data } = await axiosInstance.get<CVProcessResponse[]>(
      `${this.BASE_PATH}/history`
    );
    return data;
  }
}

export default new CVService();
