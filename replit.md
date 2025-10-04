# Space Habitat Planning & Simulation Tool

## Overview

This is an interactive space habitat planning and simulation tool designed for designing sustainable Mars colonies. The application provides a visual canvas for placing and connecting various building types (habitats, resource generators, communication towers, etc.), managing resource production/consumption, and simulating disaster scenarios. Users can design colony layouts in "Design Mode" and test their resilience in "Simulation Mode" with real-time resource tracking and disaster effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast HMR and optimized production builds
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component Library**
- Shadcn/ui components built on Radix UI primitives for accessible, headless UI components
- Tailwind CSS for styling with custom design tokens matching the sci-fi/space aesthetic
- Dark mode primary theme with deep space blue-black backgrounds and cyan/tech accent colors

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state for UI interactions and canvas manipulation
- No global state management library (Redux/Zustand) - relying on component state and query cache

**Design System**
- Custom color palette optimized for dark mode with functional colors for different building types
- Typography using 'Inter' for UI and 'JetBrains Mono' for numerical data/stats
- Consistent spacing, border radius, and elevation patterns defined in Tailwind config

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript support
- ESM module system throughout the codebase
- Development mode uses tsx for live TypeScript execution
- Production builds with esbuild for optimized bundling

**Storage Layer**
- Abstract storage interface (IStorage) allowing multiple implementations
- Current implementation: MemStorage (in-memory data store) for development
- Designed to be swapped with database-backed storage (Drizzle ORM integration prepared)
- User management schema defined but minimal server routes currently implemented

**Development Setup**
- Vite middleware integration for seamless frontend development
- Custom logging for API requests with duration tracking
- Error handling middleware for consistent error responses

### Data Storage Solutions

**Database Schema (Drizzle ORM)**
- PostgreSQL dialect configured via Drizzle Kit
- Neon Database serverless driver configured for deployment
- User table with username/password authentication structure
- Schema defined in `shared/schema.ts` for type sharing between client and server

**Data Models**
- Building types: 8 distinct building categories (house, food_station, water_drill, waste_management, communication_tower, energy_generator, mineral_drill, protection_module)
- Building properties: position (x, y coordinates), health (0-100), connection status, damage state, protection bonus
- Pipe connections: linking buildings together for resource distribution
- Resource tracking: water, food, minerals, energy production/consumption rates
- Disaster types: dust_storm, freezing_temperature, radiation_event with intensity levels

**Type Safety**
- Zod schemas for runtime validation and type inference
- Shared types between frontend and backend via `shared/schema.ts`
- Drizzle-zod integration for automatic schema validation

### External Dependencies

**UI Component Libraries**
- @radix-ui/* packages: Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, tooltip, etc.)
- lucide-react: Icon library for consistent iconography
- cmdk: Command palette component
- embla-carousel-react: Carousel functionality
- class-variance-authority: Type-safe variant styling
- tailwind-merge + clsx: Utility class management

**Data & Validation**
- @tanstack/react-query: Server state management and caching
- react-hook-form + @hookform/resolvers: Form handling with validation
- zod: Runtime type validation and schema definition
- drizzle-zod: Drizzle ORM to Zod schema conversion

**Database & Session Management**
- @neondatabase/serverless: PostgreSQL serverless driver for Neon Database
- drizzle-orm: Type-safe ORM for PostgreSQL
- connect-pg-simple: PostgreSQL session store for Express sessions

**Build & Development Tools**
- @replit/vite-plugin-*: Replit-specific development enhancements (error overlay, cartographer, dev banner)
- vite: Build tool and dev server
- esbuild: Fast JavaScript bundler for production builds
- tsx: TypeScript execution for development

**Utility Libraries**
- date-fns: Date manipulation and formatting
- nanoid: Unique ID generation

### Authentication and Authorization

**Current Implementation**
- User schema defined with username/password fields
- Storage interface includes user CRUD methods (getUser, getUserByUsername, createUser)
- No active authentication routes implemented yet
- Session infrastructure prepared with connect-pg-simple

**Planned Architecture**
- Session-based authentication using PostgreSQL session store
- Password hashing should be implemented before production use
- User context likely needed for multi-user colony designs

### Key Architectural Decisions

**Monorepo Structure**
- Client and server code in separate directories with shared type definitions
- Path aliases configured (@/, @shared/, @assets/) for clean imports
- Single package.json managing all dependencies

**Type Sharing Strategy**
- Shared schema definitions in `shared/schema.ts` accessible to both client and server
- Prevents type drift between frontend and backend
- Zod schemas provide both runtime validation and TypeScript types

**Separation of Concerns**
- UI components in `client/src/components/` with example files for documentation
- Business logic lives in page components (`client/src/pages/`)
- Server routes and storage layer cleanly separated
- Design guidelines documented separately for consistent styling

**Canvas-Based Interaction Model**
- Buildings placed on a grid system (60px grid size)
- Drag-and-drop for building placement and movement
- Visual pipe connections between buildings
- Dynamic building zone radius that expands as users build outward

**Dual-Mode Architecture**
- Design Mode: Focus on building placement, connection creation, layout planning
- Simulation Mode: Resource tracking, disaster simulation, health/damage states
- Clean mode separation allows for different interaction patterns and UI states