import mongoose from 'mongoose';
import config from '../config/config';

mongoose
  .connect(config.DB_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const db = mongoose.connection;

export default db;
