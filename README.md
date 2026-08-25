# my-market-place

A full-stack marketplace application built with:

- **Backend**: NestJS + TypeScript + Prisma ORM + PostgreSQL
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Infrastructure**: Docker + Docker Compose

## Features

- 🔐 JWT Authentication (register & login)
- 🏪 Stores management (create, list, view, update, delete)
- 🏷️ Offers management (create, list, view, update, delete)
- ❤️ User Favorites (add/remove offers to favorites)

## Project Structure

```
my-market-place/
├── backend/           # NestJS REST API
│   ├── prisma/        # Database schema & migrations
│   └── src/
│       ├── auth/      # JWT Authentication
│       ├── stores/    # Stores CRUD
│       ├── offers/    # Offers CRUD
│       ├── favorites/ # User Favorites
│       ├── users/     # Users
│       └── prisma/    # Prisma service
├── frontend/          # Next.js App
│   └── src/
│       ├── app/       # App Router pages
│       ├── components/# Shared components
│       └── lib/       # API utilities
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)

### Run with Docker

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services
docker-compose up --build
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

### Local Development

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma migrate dev
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get JWT token |

### Stores
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/stores | No | List all stores |
| GET | /api/stores/:id | No | Get store details |
| POST | /api/stores | Yes | Create a store |
| PUT | /api/stores/:id | Yes | Update a store |
| DELETE | /api/stores/:id | Yes | Delete a store |

### Offers
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/offers | No | List all offers |
| GET | /api/offers/:id | No | Get offer details |
| POST | /api/offers | Yes | Create an offer |
| PUT | /api/offers/:id | Yes | Update an offer |
| DELETE | /api/offers/:id | Yes | Delete an offer |

### Favorites
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/favorites | Yes | Get user's favorites |
| POST | /api/favorites/:offerId | Yes | Add offer to favorites |
| DELETE | /api/favorites/:offerId | Yes | Remove from favorites |
