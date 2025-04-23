import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  ENV: string;
  DB_URL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/esgi-myges-api'
};

export default config;
