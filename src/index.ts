import express from 'express';
import errorHandler from './middlewares/errorHandler.moddleware';
import loggerMiddleware from './middlewares/logger.middleware';
import config from './config/config';
import db from './data/database';
import roleRouter from './routes/role.route';
// import permissionInit from './data/mocks/permissionInit';
// import roleInit from './data/mocks/roleInit';
// import userInit from './data/mocks/userInit';
// import objectInit from './data/mocks/objectInit';

const app = express();

app.use(express.json());

db.on('error', console.error.bind(console, 'Connection to MongoDB error:'));
db.once('open', async () => {
  console.log('✅ Connection to MongoDB is successful');
  // await permissionInit();
  // await roleInit();
  // await objectInit();
  // await userInit();
});

app.use(loggerMiddleware);
app.use('/api/roles', roleRouter);

app.use(errorHandler); // Error handling middleware should be the last middleware in the stack

const start = async (): Promise<void> => {
  try {
    if (!config.DB_URL) {
      throw new Error('❌ DB_URL is not defined in .env file');
    }
    console.log('🔗 Connecting to MongoDB...' + config.DB_URL);

    app.listen(config.PORT, () => {
      console.log(`🚀 Server started on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

start();
