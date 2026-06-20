<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
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
>>>>>>> decd262ce39e42f3dddf131f1162b9e226c90250
