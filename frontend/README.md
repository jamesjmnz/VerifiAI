# VerifiAI Frontend

Next.js 16 frontend application for the VerifiAI fact-checking platform.

## Features

- **Verification Console** – Dashboard for submitting claims and viewing verification results
- **Real-time Verification** – Stream verification process with detailed analysis
- **Score Breakdown Visualization** – Display risk scores and credibility breakdowns
- **User Authentication** – Better Auth integration with Google OAuth support
- **Verification History** – Track and review past verifications
- **Modern UI** – Built with Radix UI and Tailwind CSS

## Tech Stack

- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** – Utility-first styling
- **Radix UI** – Accessible component primitives
- **Better Auth** – Authentication library with Google OAuth
- **Prisma** – Database ORM with Neon adapter
- **Lucide React** – Icon library
- **Framer Motion** – Animation library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Database URL (Neon PostgreSQL recommended)
- Backend API running (see main README for backend setup)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   DATABASE_URL=your_database_url_here
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── claims/        # Claims management
│   │   └── verify/        # Verification endpoints
│   ├── console/           # Verification console
│   │   ├── verify/        # Verification page
│   │   ├── history/       # Verification history
│   │   └── layout.tsx     # Console layout
│   ├── login/             # Login page
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── types/             # TypeScript type definitions
├── components/
│   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   ├── sections/          # Page sections (Features, FAQ, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── verify.ts          # API client for verification
│   ├── claims.ts          # API client for claims
│   ├── auth.ts            # Authentication utilities
│   └── prisma.ts          # Prisma client
├── hooks/
│   └── use-mobile.ts       # Mobile detection hook
└── prisma/
    ├── schema.prisma       # Database schema
    └── migrations/         # Database migrations
```

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Authentication

The frontend uses Better Auth for authentication with Google OAuth support. Users can:

- Sign in with Google
- Access protected routes (console pages)
- View verification history tied to their account

## API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL`:

- `POST /api/v1/verification/verify` – Verify a claim
- `GET /api/claims` – Get user's verification history
- Authentication endpoints handled by Better Auth

## Styling

- **Tailwind CSS 4** – Utility-first CSS framework
- **Radix UI** – Accessible, unstyled component primitives
- **Custom components** – Built on top of Radix UI with Tailwind styling
- **Responsive design** – Mobile-first approach

## Database

Uses Prisma ORM with Neon PostgreSQL adapter. The schema includes:

- User accounts (via Better Auth)
- Verification claims and results
- User verification history

Run migrations with:
```bash
npx prisma migrate dev
```

## Deployment

The application can be deployed to Vercel, Netlify, or any Node.js hosting platform. Make sure to:

1. Set all environment variables
2. Run database migrations
3. Build the application: `npm run build`

## Development Tips

- Use `npm run dev` for hot-reloading during development
- Check browser console for API errors
- Use React DevTools for component debugging
- Prisma Studio: `npx prisma studio` to view database

## Contributing

See the main [README.md](../README.md) for contribution guidelines.
