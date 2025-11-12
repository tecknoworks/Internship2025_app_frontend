# Structură Proiect

## 📁 Structură Foldere

```
src/
├── pages/              # Pagini principale ale aplicației
│   ├── AIChatPage.tsx
│   ├── MySkillsPage.tsx
│   ├── CVProcessingPage.tsx
│   ├── SkillSearchPage.tsx
│   ├── EmployeeProfilesPage.tsx
│   └── index.ts
├── components/         # Componente reutilizabile
│   ├── Header.tsx      # Header comun pentru navigare
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── AIChatSidebar.tsx
│   ├── AIChatContent.tsx
│   ├── MySkillsContent.tsx
│   ├── CVProcessingContent.tsx
│   ├── SkillSearchContent.tsx
│   ├── EmployeeProfilesContent.tsx
│   ├── ui/             # Componente UI (shadcn/ui)
│   └── figma/
└── App.tsx             # Router principal
```

## 🎯 Pagini Disponibile

1. **AI Chat** (`/`) - Chat cu AI
2. **My Skills** (`/my-skills`) - Gestionarea skill-urilor
3. **CV Processing** (`/cv-processing`) - Procesare CV-uri
4. **Skill Search** (`/skill-search`) - Căutare skill-uri
5. **Employee Profiles** (`/employee-profiles`) - Profile angajați

## 🚀 Comenzi

```bash
# Instalare dependențe
npm install

# Rulare development
npm run dev

# Build pentru producție
npm run build

# Preview build
npm run preview
```

## 📝 Git

Proiectul este configurat cu `.gitignore` care exclude:
- `node_modules/`
- `build/`
- `dist/`
- Fișiere de environment (`.env*`)
