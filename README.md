# Web App Layout Design

Skills Management Application - React + TypeScript + Vite

## 📁 Project Structure

```
src/
├── api/                    # API Layer
│   ├── config/
│   │   └── axios.ts       # Axios config + interceptors
│   ├── services/          # API Services (organized by feature)
│   │   ├── auth.service.ts
│   │   ├── skills.service.ts
│   │   ├── cv.service.ts
│   │   ├── employees.service.ts
│   │   └── ai.service.ts
│   └── index.ts           # Centralized exports
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
├── types/                 # TypeScript types
└── App.tsx               # Main router
```

## 🚀 Running the code

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Environment Setup

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📖 Documentation

- **[API_CLEAN.md](./API_CLEAN.md)** - Complete API guide with examples
- **[STRUCTURE.md](./STRUCTURE.md)** - Project structure details

## 💡 Quick API Usage

```typescript
import { authService, skillsService } from '@/api';

// Login
await authService.login({ email, password });

// Get skills
const skills = await skillsService.getAll();
```

## 🎯 Pages

- `/` - AI Chat
- `/my-skills` - My Skills Management
- `/cv-processing` - CV Processing
- `/skill-search` - Skill Search
- `/employee-profiles` - Employee Profiles
- `/login` - Login
- `/register` - Register

## 📦 Original Design

This project is based on [Web App Layout Design](https://www.figma.com/design/gDAkXx6EBd0vHUQt6mQp1J/Web-App-Layout-Design)
  