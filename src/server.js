import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';

// Middlewares
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
// Routers
import notesRouters from './routes/notesRoutes.js';

const app = express();
// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(helmet()); // Додає безпекові заголовки
app.use(cors()); // Дозволяє запити з будь-яких джерел

// Notes routers
app.use(notesRouters);

// Middleware 404
app.use(notFoundHandler);

// Middleware Errors.
app.use(errorHandler);

// Connect Mongo
await connectMongoDB();


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
