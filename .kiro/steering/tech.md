# Tech Stack & Build System

## Core Technologies

- **React 18.3.1**: UI framework with hooks and functional components
- **TypeScript 5.8.2**: Type safety and developer experience
- **Vite 6.2.0**: Build tool and dev server (port 3000)
- **React Router v6**: Client-side routing with lazy loading

## Backend Stack

- **Express.js 5.2.1**: RESTful API server (port 5000)
- **PostgreSQL**: Production database with Neon serverless
- **JWT Authentication**: bcrypt password hashing
- **Multer**: File upload middleware

## UI & Styling

- **Tailwind CSS v4**: Utility-first CSS framework with custom config
- **Lucide React**: Icon library
- **Responsive Design**: Mobile-first approach

## State Management & Data

- **React Context API**: Global state (AuthContext, DataContext, SiteConfigContext)
- **React Hook Form + Zod**: Form handling and validation
- **PostgreSQL**: Persistent database storage

## Development Tools

- **@vitejs/plugin-react**: Vite React plugin
- **@types/node**: Node.js type definitions
- **tsx**: TypeScript execution for server
- **ESLint + Prettier**: Code formatting and linting

## Common Commands

### Development

```bash
npm run dev          # Start frontend dev server (http://localhost:3000)
npm run dev:server   # Start backend server (http://localhost:5000)
npm run build        # Production build
npm run preview      # Preview production build
```

### Database Management

```bash
npm run migrate      # Run database migrations
npm run seed:nav     # Seed navigation data
npm run db:setup     # Full database setup (migrate + seed)
npm run db:sync      # Sync database configuration
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Project Setup

```bash
npm install          # Install dependencies
```

## Build Configuration

- **Vite Config**: Custom alias `@/*` pointing to src directory
- **TypeScript**: ES2022 target, ESNext modules, bundler resolution
- **Environment**: GEMINI_API_KEY support for future AI integration
- **Server**: Host 0.0.0.0 for network access
- **Proxy**: API requests proxied to backend server

## Code Style Guidelines

- **Functional Components**: Use React.FC with TypeScript
- **Lazy Loading**: All pages are lazy loaded
- **Context Pattern**: Centralized state management
- **API Integration**: Centralized API client in services/api.ts
