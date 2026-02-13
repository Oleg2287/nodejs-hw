import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';

// Middlewares
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
// Routers
import notesRouters from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);
app.use(express.json({ limit: '5mb' })); // Розбір JSON з обмеженням розміру
app.use(helmet()); // Додає безпекові заголовки
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(cookieParser()); // Розбір cookie

// Auth routers
app.use(authRoutes);

// Notes routers
app.use(notesRouters);

// User routers
app.use(userRoutes);

// Middleware 404
app.use(notFoundHandler);

// Celebrate errors.
app.use(errors());

// Middleware Errors.
app.use(errorHandler);

// Connect Mongo
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
