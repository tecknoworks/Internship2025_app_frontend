# API Integration Guide

## 📦 Structură API

```
src/api/
├── axios.ts           # Configurare Axios cu interceptors
├── authService.ts     # Service pentru autentificare
└── index.ts          # Export centralizat
```

## 🔧 Configurare

### 1. Environment Variables

Creează un fișier `.env` în root-ul proiectului:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Pentru producție, modifică URL-ul corespunzător.

### 2. Backend URL

Backend-ul trebuie să fie disponibil pe URL-ul specificat în `.env`. Default: `http://localhost:8000/api`

## 🔐 Authentication Service

### Login

```typescript
import { authService } from '@/api';

try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  
  // Token-ul este salvat automat în localStorage
  console.log('User:', response.user);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Register

```typescript
import { authService } from '@/api';

try {
  const response = await authService.register({
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  });
  
  console.log('Registered user:', response.user);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Logout

```typescript
import { authService } from '@/api';

await authService.logout();
// Token-ul este șters automat din localStorage
```

**Endpoint:** `POST /logout`

### Check Authentication

```typescript
import { authService } from '@/api';

if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log('Current user:', user);
}
```

## 🔒 Axios Interceptors

### Request Interceptor
- Adaugă automat token-ul JWT în header-ul `Authorization: Bearer <token>`
- Token-ul este luat din `localStorage`

### Response Interceptor
- **401 Unauthorized:** Șterge token-ul și redirectează la `/login`
- **403 Forbidden:** Log eroare de acces
- **404 Not Found:** Log resursă negăsită
- **500 Server Error:** Log eroare de server

## 📝 Utilizare în Componente

### Exemplu Login Page

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authService.login({ email, password });
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
    </form>
  );
}
```

## 🚀 Extindere

Pentru a adăuga noi servicii API, creează fișiere noi în `src/api/`:

```typescript
// src/api/skillsService.ts
import axiosInstance from './axios';

export const skillsService = {
  getAll: async () => {
    const response = await axiosInstance.get('/skills');
    return response.data;
  },
  
  create: async (skill: Skill) => {
    const response = await axiosInstance.post('/skills', skill);
    return response.data;
  },
  
  // ... alte metode
};
```

Apoi exportă-l în `src/api/index.ts`:

```typescript
export * from './skillsService';
```

## 🔑 LocalStorage

Serviciul salvează automat următoarele date:
- `authToken` - JWT token pentru autentificare
- `user` - Obiect JSON cu informațiile utilizatorului

## ⚠️ Note Importante

1. **CORS:** Backend-ul trebuie să permită cereri de la frontend (configurare CORS)
2. **HTTPS:** În producție, folosește întotdeauna HTTPS
3. **Token Expiration:** Implementează refresh token mechanism pentru token-uri expirate
4. **Error Handling:** Toate erorile sunt loggate în consolă și pot fi afișate cu toast notifications
