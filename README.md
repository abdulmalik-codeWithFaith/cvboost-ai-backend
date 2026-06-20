CVBoost AI Backend

Overview

CVBoost AI is an AI-powered CV optimization platform that analyzes a user's CV against a job description and generates application-ready documents.

The backend handles authentication, CV processing, AI integration, scoring, and data management.

Tech Stack

- NestJS
- TypeScript
- Supabase (PostgreSQL)
- Supabase Storage
- Supabase Auth
- OpenAI API

Core Features

- Authentication
- CV Upload Processing
- CV Text Extraction
- Job Description Analysis
- AI-Powered CV Optimization
- Cover Letter Generation
- Match Score Calculation
- Data Storage

Backend Responsibilities

- Build and maintain APIs
- Handle file uploads
- Process CV content
- Integrate AI services
- Manage database operations
- Return structured responses to the frontend

Development Rules

- Create feature branches for new work
- Use clear commit messages
- Document API endpoints
- Test endpoints before merging
- Follow clean code practices

Project Status

MVP Development - Cohort 1

# 1. Install dependencies

npm install

# 2. Set up environment variables

cp .env.example .env

# Fill in all values in .env

# 3. Generate Prisma client

npm run prisma:generate

# 4. Run migrations against your Supabase DB

npm run prisma:migrate

# 5. Start the dev server

npm run start:dev

Also has the route

# CVBoost AI - Backend Project Structure (NestJS)

## Team Responsibilities

### Developer 1 - @Baylon

Responsible for:

- Authentication
- User Management
- Protected Routes
- Supabase Integration

### Developer 2 - @~miracle

Responsible for:

- CV Upload & Processing
- AI Integration
- Cover Letter Generation
- Match Score Logic

### Shared Responsibilities

- NestJS Setup
- API Documentation (Swagger)
- Database Integration (Prisma/PostgreSQL)
- Testing
- Code Reviews

---

# Suggested NestJS Structure

```text
src/
│
├── auth/
│   ├── controllers/
│   │   └── auth.controller.ts
│   │
│   ├── services/
│   │   └── auth.service.ts
│   │
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   │
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   │
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   │
│   └── auth.module.ts
│
├── users/
│   ├── controllers/
│   │   └── users.controller.ts
│   │
│   ├── services/
│   │   └── users.service.ts
│   │
│   ├── dto/
│   │   └── update-user.dto.ts
│   │
│   └── users.module.ts
│
├── supabase/
│   ├── services/
│   │   └── supabase.service.ts
│   │
│   └── supabase.module.ts
│
├── cv/
│   ├── controllers/
│   │   └── cv.controller.ts
│   │
│   ├── services/
│   │   └── cv.service.ts
│   │
│   ├── dto/
│   │   └── upload-cv.dto.ts
│   │
│   └── cv.module.ts
│
├── ai/
│   ├── services/
│   │   └── ai.service.ts
│   │
│   ├── prompts/
│   │   └── prompt.templates.ts
│   │
│   └── ai.module.ts
│
├── cover-letter/
│   ├── controllers/
│   │   └── cover-letter.controller.ts
│   │
│   ├── services/
│   │   └── cover-letter.service.ts
│   │
│   └── cover-letter.module.ts
│
├── match-score/
│   ├── controllers/
│   │   └── match-score.controller.ts
│   │
│   ├── services/
│   │   └── match-score.service.ts
│   │
│   └── match-score.module.ts
│
├── database/
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   └── helpers/
│
├── config/
│   └── configuration.ts
│
├── app.module.ts
└── main.ts
```

---

# API Route Ownership

## @Baylon

### Authentication

```http
POST   /auth/register
POST   /auth/login
POST   /auth/refresh-token
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
```

### Users

```http
GET    /users/profile
PATCH  /users/profile
DELETE /users/profile
```

### Protected Routes

```http
GET    /users/me
GET    /dashboard
```

### Supabase

```http
POST   /storage/upload
DELETE /storage/delete/:id
GET    /storage/file/:id
```

---

## @~miracle

### CV Upload

```http
POST   /cv/upload
GET    /cv/:id
DELETE /cv/:id
```

### CV Processing

```http
POST   /cv/process/:id
GET    /cv/analysis/:id
```

### AI Services

```http
POST   /ai/analyze-cv
POST   /ai/extract-skills
POST   /ai/job-recommendations
```

### Cover Letter

```http
POST   /cover-letter/generate
GET    /cover-letter/:id
```

### Match Score

```http
POST   /match-score/calculate
GET    /match-score/:id
```

---

# Database Models (Initial Idea)

## User

```ts
id;
email;
password;
firstName;
lastName;
role;
createdAt;
updatedAt;
```

## Resume

```ts
id;
userId;
fileUrl;
parsedData;
createdAt;
```

## CoverLetter

```ts
id;
userId;
content;
createdAt;
```

## MatchScore

```ts
id;
userId;
jobDescription;
score;
feedback;
createdAt;
```

---

# Development Flow

### Baylon

Create:

```bash
nest g module auth
nest g module users
nest g module supabase

nest g controller auth
nest g controller users

nest g service auth
nest g service users
nest g service supabase
```

### Miracle

Create:

```bash
nest g module cv
nest g module ai
nest g module cover-letter
nest g module match-score

nest g controller cv
nest g controller cover-letter
nest g controller match-score

nest g service cv
nest g service ai
nest g service cover-letter
nest g service match-score
```

---

Each developer owns their routes and business logic. Once routes are ready, integration between modules can happen through services and dependency injection.
