# SkillUp

A professional growth platform and skill marketplace, built as my senior project. Users build ATS-optimized CVs, get AI-based feedback on them and exchange skills with each other.

## Features

- CV builder with ATS-optimized templates
- AI-based CV evaluation
- PDF export and email delivery
- Skill-exchange marketplace with categories and reviews
- Profiles covering education, experience, certifications and projects
- JWT authentication with password reset by email
- Role-based accounts and an admin dashboard
- Chatbot interface

## Tech stack

- **Backend:** NestJS, TypeScript, Sequelize, Passport JWT, PDFKit, Nodemailer
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript

## Project structure

```
backend/    NestJS API, with one module per feature (auth, skills, cv, chatbot, ...)
frontend/   Static pages for the marketplace, profiles, chat and admin dashboard
```

## Getting started

You'll need Node.js and a MySQL server.

1. Create a MySQL database for the project.
2. Copy `backend/.env.example` to `backend/.env` and fill in your values.
3. Start the API:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
4. Open `frontend/index.html` in your browser.
