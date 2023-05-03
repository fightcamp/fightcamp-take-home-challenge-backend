import { connect, disconnect } from 'mongoose';
import { config } from './config';

export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoose = await connect(config.MONGO_URL);

    await mongoose.Connection;

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
};
