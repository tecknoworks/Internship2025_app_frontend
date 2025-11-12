# API Structure - Clean & Scalable

## 📁 Structură Nouă

```
src/api/
├── config/
│   └── axios.ts              # Configurare Axios + Interceptors
├── services/
│   ├── auth.service.ts       # /auth/* endpoints
│   ├── skills.service.ts     # /skills/* endpoints
│   ├── cv.service.ts         # /cv/* endpoints
│   ├── employees.service.ts  # /employees/* endpoints
│   └── ai.service.ts         # /ai/* endpoints
└── index.ts                  # Export centralizat

src/hooks/
├── useApi.ts                 # Custom hook pentru API calls
└── index.ts

src/types/
└── api.ts                    # TypeScript types
```

## 🚀 Utilizare Simplificată

### Metodă 1: Direct Service (Simplu)

```typescript
import { authService } from '@/api';

// Login
const user = await authService.login({ email, password });

// Register
const newUser = await authService.register({ name, email, password });

// Logout
await authService.logout();
```

### Metodă 2: Cu Custom Hook (Recomandat)

```typescript
import { useApi } from '@/hooks';
import { skillsService } from '@/api';

function MySkillsPage() {
  const { loading, execute } = useApi(skillsService.getAll, {
    successMessage: 'Skills loaded!',
    errorMessage: 'Failed to load skills'
  });

  const loadSkills = async () => {
    const skills = await execute({});
    console.log(skills);
  };

  return (
    <button onClick={loadSkills} disabled={loading}>
      {loading ? 'Loading...' : 'Load Skills'}
    </button>
  );
}
```

## 📋 Servicii Disponibile

### 1. Auth Service (`authService`)

```typescript
// Login
await authService.login({ email, password });

// Register
await authService.register({ name, email, password });

// Logout
await authService.logout();

// Check auth
const isAuth = authService.isAuthenticated();

// Get current user
const user = authService.getCurrentUser();
```

### 2. Skills Service (`skillsService`)

```typescript
// Get all skills
const skills = await skillsService.getAll();

// Get by ID
const skill = await skillsService.getById('123');

// Create
const newSkill = await skillsService.create({ name: 'React', level: 5 });

// Update
await skillsService.update('123', { level: 4 });

// Delete
await skillsService.delete('123');

// Search
const results = await skillsService.search('react');
```

### 3. CV Service (`cvService`)

```typescript
// Upload CV
const result = await cvService.upload(file);

// Process CV
const processed = await cvService.process('cv-id');

// Get history
const history = await cvService.getHistory();
```

### 4. Employees Service (`employeesService`)

```typescript
// Get all
const employees = await employeesService.getAll();

// Filter
const filtered = await employeesService.getAll({
  department: 'IT',
  skills: ['React', 'Node.js']
});

// Get by ID
const employee = await employeesService.getById('123');

// Search
const results = await employeesService.search('John');

// Filter by skills
const withSkills = await employeesService.getBySkills(['React']);
```

### 5. AI Service (`aiService`)

```typescript
// Get all sessions
const sessions = await aiService.getSessions();

// Get session
const session = await aiService.getSession(1);

// Send message
const response = await aiService.sendMessage({
  sessionId: 1,
  message: 'Hello AI'
});

// Create session
const newSession = await aiService.createSession('My Chat');

// Delete session
await aiService.deleteSession(1);
```

## 💡 Exemple Complete

### Login Page (Simplified)

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks';
import { authService } from '@/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { loading, execute } = useApi(authService.login, {
    successMessage: 'Login successful!',
    onSuccess: () => navigate('/')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Skills Page Example

```typescript
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks';
import { skillsService } from '@/api';

export function MySkillsPage() {
  const [skills, setSkills] = useState([]);

  const { loading, execute: loadSkills } = useApi(skillsService.getAll, {
    onSuccess: setSkills
  });

  const { execute: deleteSkill } = useApi(skillsService.delete, {
    successMessage: 'Skill deleted!',
    onSuccess: () => loadSkills({})
  });

  useEffect(() => {
    loadSkills({});
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        skills.map(skill => (
          <div key={skill.id}>
            {skill.name} - Level {skill.level}
            <button onClick={() => deleteSkill(skill.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
```

## 🎯 Avantaje

✅ **Scalabil** - Fiecare serviciu e independent
✅ **Clean** - Cod minimal, fără duplicare
✅ **Type-safe** - Full TypeScript support
✅ **Reusable** - Hook-uri pentru logică comună
✅ **Organized** - Structură clară pe features

## 🔧 Adăugare Serviciu Nou

1. Creează `src/api/services/newFeature.service.ts`:

```typescript
import axiosInstance from '../config/axios';

class NewFeatureService {
  private readonly BASE_PATH = '/new-feature';

  async getSomething(): Promise<any> {
    const { data } = await axiosInstance.get(this.BASE_PATH);
    return data;
  }
}

export default new NewFeatureService();
```

2. Exportă în `src/api/index.ts`:

```typescript
export { default as newFeatureService } from './services/newFeature.service';
```

3. Folosește:

```typescript
import { newFeatureService } from '@/api';
const data = await newFeatureService.getSomething();
```

Gata! 🚀
