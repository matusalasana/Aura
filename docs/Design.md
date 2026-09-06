Aura Architecture 

Tech stack

Frontend:
- React Vite
- React Router (createBrowserRouter)
- TailwindCSS
- zod and react hook form 
- Axios
- TanStack Query
- Framer Motion



Backend:
- Node.js
- Express.js
- PostgreSQL with Neon
- Drizzle ORM
- JWT auth
- Cloudinary support for image uploads
- Helmet + CORS



Database:
- Neon serverless PostgreSQL
- Drizzle ORM 
- Give full drizzle schema



SECURITY:
Helmet
CORS
HTTP-only Cookies
bcrypt
JWT
Zod Validation
SQL Injection protection via Drizzle
Environment variables
Rate limiting (recommended)
Cookie security flags in production



UPLOAD FLOW:

Frontend
↓
Multipart Form
↓
Multer Memory Storage
↓
Cloudinary
↓
Save URL
↓
Return image




AI Features:
AI-generated product descriptions
AI-generated SEO meta descriptions
AI-powered search suggestions
AI product recommendations
AI review summarization (future)
AI chatbot for shopping assistance


Folder Structure:

backend/

src/
│
├── app.ts
├── server.ts
│
├── config/
│   ├── env.ts
│   ├── db.ts
│   ├── cloudinary.ts
│   └── jwt.ts
│
├── middleware/
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── validate.ts
│   ├── upload.ts
│   └── authorize.ts
│
├── lib/
│   ├── jwt.ts
│   ├── bcrypt.ts
│   ├── cookies.ts
│   └── logger.ts
│
├── shared/
│   ├── ApiError.ts
│   ├── response.ts
│   ├── constants.ts
│   └── types.ts
│
├── drizzle/
│   ├── schema/
│   │   ├── users.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── categories.ts
│   │
│   ├── migrations/
│   └── drizzle.config.ts
│
├── modules
│   ├── auth/
│   ├── users/
│   ├── vendors/
│   ├── products/
│   ├── categories/
│   ├── cart/
│   ├── wishlist/
│   ├── orders/
│   ├── reviews/
│   ├── uploads/
│   ├── ai/
│   └── health/
│
└── routes/
    └── index.ts


Each module is self-contained.

Example 

products/

├── products.routes.ts

├── products.controller.ts

├── products.service.ts

├── products.repository.ts

└── products.validation.ts



ENVIRONMENTAL VARIABLES:

PORT=

NODE_ENV=

DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

ACCESS_TOKEN_EXPIRES=

REFRESH_TOKEN_EXPIRES=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

OPENAI_API_KEY=

CLIENT_URL=