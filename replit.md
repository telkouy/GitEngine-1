# Overview

Vibe Coder is an AI-powered developer productivity dashboard that provides comprehensive insights into coding performance, project management, and development workflow optimization. The application combines real-time analytics, automated documentation generation, AI-driven insights, and OKR tracking to help developers maximize their productivity and code quality.

The system features a modern React-based frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and implementing a clean, modular architecture for scalability and maintainability.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **UI Framework**: Utilizes Radix UI primitives with shadcn/ui components for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Theme System**: Custom theme provider supporting light/dark modes with system preference detection

The component structure is organized hierarchically with reusable UI components in `/components/ui` and feature-specific dashboard components in `/components/dashboard`.

## Backend Architecture

The server follows a **RESTful API** pattern built on **Express.js**:

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js with TypeScript support
- **Development**: TSX for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Middleware**: Custom logging, JSON parsing, and error handling

The backend implements a clean separation of concerns with:
- Route handlers in `/server/routes.ts`
- Data access abstraction through storage interfaces
- Memory-based storage implementation for development/demo purposes

## Data Storage Solutions

**Database**: PostgreSQL with Drizzle ORM for type-safe database operations

- **ORM**: Drizzle provides compile-time type safety and SQL-like query building
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Schema**: Centralized schema definitions in `/shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management

**Data Models**:
- Users with authentication and preferences
- Commits with impact scoring and project categorization
- AI-generated insights with categorization
- Documentation tracking with auto-generation flags
- OKRs with progress tracking
- Achievements and gamification elements
- Integration status monitoring
- Next steps and task management

## Authentication and Authorization

Currently implements a simplified authentication system suitable for demo purposes:
- User identification through username lookup
- Session-based approach with Express sessions
- Future-ready architecture for OAuth integration

## External Service Integrations

**Development Tools**:
- Git repository integration (GitHub, GitLab, Bitbucket)
- Code quality tools (ESLint, Prettier, SonarQube)
- CI/CD pipeline integration
- Documentation platforms (Notion, Confluence)

**Communication**:
- Slack bot integration for automated updates
- Email notifications for summaries and alerts
- Calendar integration for planning and scheduling

**AI Services**:
- Code analysis and insight generation
- Automated documentation creation
- Predictive analytics for development patterns

The architecture supports webhook-driven real-time updates and maintains a plugin-based approach for easy integration expansion.

## Performance Optimizations

- Vite for fast development builds and HMR
- TanStack Query for intelligent caching and background updates
- Lazy loading and code splitting for optimal bundle sizes
- PostgreSQL connection pooling for database efficiency
- Glass morphism UI effects with hardware acceleration