// Export centralizat pentru toate serviciile API
export { default as axiosInstance } from './config/axios';

// Services
export { default as authService } from './services/auth.service';
export { default as skillsService } from './services/skills.service';
export { default as cvService } from './services/cv.service';
export { default as employeesService } from './services/employees.service';
export { default as aiService } from './services/ai.service';

// Types
export type * from '../types/api';
