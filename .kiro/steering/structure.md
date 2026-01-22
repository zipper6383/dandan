# Project Structure & Organization

## Root Structure

```
/
├── .kiro/              # Kiro IDE configuration
├── src/                # Frontend React application
├── server/             # Express.js backend server
├── database/           # PostgreSQL schema and migration scripts
├── docs/               # Technical documentation
├── scripts/            # Utility and maintenance scripts
├── public/             # Static assets (images, etc.)
├── uploads/            # User-uploaded files
├── App.tsx            # Main app with routing setup
├── index.tsx          # Entry point
├── types.ts           # Global TypeScript interfaces
└── vite.config.ts     # Build configuration
```

## Frontend Structure (`/src/`)

### Components Organization

- **Layout/**: Header, Footer, AdminLayout - layout components
- **Home/**: DonationTable, HomeBanner, NoticeBar, StatsGrid - homepage specific
- **Shared/**: Card, SEO, Loading - reusable components

### Pages Organization

- **Root level**: Public pages (Home, Projects, About, etc.)
- **Admin/**: Protected admin pages (Dashboard, ProjectManager, etc.)

### Core Directories

- **contexts/**: React Context providers (AuthContext, DataContext, SiteConfigContext)
- **services/**: API client and business logic
- **hooks/**: Custom React hooks
- **utils/**: Utility functions

## Backend Structure (`/server/`)

```
server/
├── config/         # Database configuration
├── controllers/    # Route handlers and business logic
├── middleware/     # Authentication and other middleware
├── routes/         # Express route definitions
└── index.ts        # Main server entry point
```

## Database Structure (`/database/`)

- **schema.sql**: PostgreSQL database schema
- **migrate.ts**: Database migration utilities
- **seed.sql**: Initial data seeding
- **migrations/**: Version-controlled schema changes

## Naming Conventions

- **Files**: PascalCase for components (e.g., `ProjectDetail.tsx`)
- **Folders**: PascalCase for feature folders (e.g., `components/Home/`)
- **Types**: PascalCase interfaces in `types.ts`
- **Context**: Suffix with "Context" (e.g., `DataContext`)
- **API**: Suffix with "API" (e.g., `ProjectsAPI`)

## Architecture Patterns

### Routing Structure

- **Public Routes**: Wrapped in PublicLayout (Header + Footer)
- **Admin Routes**: Protected with ProtectedRoute + AdminLayout
- **Lazy Loading**: All pages use React.lazy()

### State Management

- **Global State**: React Context API for shared data
- **Local State**: useState for component-specific state
- **Persistence**: PostgreSQL database with API integration

### Data Flow

1. User interaction → Component
2. Component → Context method
3. Context → API call (services/api.ts)
4. API → Database operation (server/routes/\*.ts)
5. Response → Context update → Re-render

## File Responsibilities

- **App.tsx**: Routing, layout logic, providers setup
- **types.ts**: Centralized TypeScript definitions
- **services/api.ts**: API client with typed endpoints
- **contexts/**: Business logic and state management
- **server/index.ts**: Backend API server with route mounting

## Key Patterns

- **Lazy Loading**: All route components are lazy loaded for performance
- **Context Providers**: Nested provider pattern in App.tsx
- **Protected Routes**: Role-based access control for admin features
- **API Centralization**: Single API client with typed methods
- **Form Handling**: React Hook Form + Zod validation pattern
