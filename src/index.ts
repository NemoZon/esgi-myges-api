import express from 'express';
import errorHandler from './middlewares/errorHandler.moddleware';
import loggerMiddleware from './middlewares/logger.middleware';
import config from './config/config';

const app = express();

app.use(express.json());

app.use(loggerMiddleware);
// app.use('/api/items', itemRoutes);

app.use(errorHandler); // Error handling middleware should be the last middleware in the stack

const start = async (): Promise<void> => {
  try {
    if (!config.DB_URL) {
      throw new Error('❌ DB_URL is not defined in .env file');
    }
    console.log('🔗 Connecting to MongoDB...' + config.DB_URL);

    // await mongoose.connect(process.env.DB_URL, {});

    app.listen(config.PORT, () => {
      console.log(`🚀 Server started on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

start();
