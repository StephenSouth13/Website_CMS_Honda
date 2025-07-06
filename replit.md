# Honda Mỹ Huyền - Motorcycle Dealership Website

## Overview

Honda Mỹ Huyền is a full-stack web application for a Honda motorcycle dealership. The application features a modern, responsive design built with React and TypeScript on the frontend, Express.js on the backend, and PostgreSQL database managed with Drizzle ORM. The website allows customers to browse motorcycles, view promotions, request test drives, and contact the dealership.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Build Tool**: ESBuild for server-side compilation

### Database Schema
- **Database**: PostgreSQL (configured for Neon serverless)
- **Tables**: users, motorcycles, test_drive_requests, contact_requests, promotions, services
- **Features**: Full CRUD operations, relationship management, data validation

## Key Components

### Database Entities
1. **Users**: Customer account management with authentication
2. **Motorcycles**: Product catalog with categories (tay-ga, so-san, con-tay), pricing, specifications
3. **Test Drive Requests**: Customer test drive booking system
4. **Contact Requests**: Customer inquiry management
5. **Promotions**: Marketing campaigns and special offers
6. **Services**: After-sales service catalog

### Frontend Pages
1. **Home**: Hero section, featured motorcycles, promotions overview
2. **Products**: Motorcycle catalog with filtering by category
3. **Product Detail**: Individual motorcycle specifications and details
4. **Test Drive**: Registration form for test drive requests
5. **Contact**: Customer inquiry form and dealership information
6. **Promotions**: Active promotional campaigns
7. **Services**: After-sales service offerings
8. **About**: Company information and team
9. **Authentication**: Login and registration pages

### API Endpoints
- `/api/motorcycles` - CRUD operations for motorcycle catalog
- `/api/test-drive` - Test drive request management
- `/api/contact` - Customer inquiry handling
- `/api/promotions` - Promotional campaign management
- `/api/services` - Service catalog management
- `/api/users` - User authentication and management

## Data Flow

1. **Client Request**: User interacts with React frontend
2. **API Communication**: TanStack Query manages HTTP requests to Express.js backend
3. **Data Processing**: Express.js routes handle business logic and validation
4. **Database Operations**: Drizzle ORM executes type-safe PostgreSQL queries
5. **Response Handling**: Data flows back through the stack to update UI

## External Dependencies

### Frontend Dependencies
- **@radix-ui/\***: Headless UI primitives for accessible components
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **class-variance-authority**: Utility for component variants
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library

### Backend Dependencies
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **express**: Web application framework
- **zod**: Schema validation library

### Development Dependencies
- **vite**: Frontend build tool with hot module replacement
- **typescript**: Type safety across the entire stack
- **tailwindcss**: CSS utility framework with custom Honda brand colors

## Deployment Strategy

### Build Process
1. **Frontend**: Vite compiles React app to static assets in `dist/public`
2. **Backend**: ESBuild bundles Express.js server to `dist/index.js`
3. **Database**: Drizzle migrations manage schema changes

### Production Configuration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static Assets**: Frontend served from `/dist/public`
- **API Routes**: Backend serves API endpoints with `/api` prefix
- **Session Management**: PostgreSQL-based session storage

### Development Environment
- **Hot Reload**: Vite provides instant frontend updates
- **TypeScript**: Continuous type checking across client and server
- **Database**: Drizzle push for schema synchronization

## Changelog
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.