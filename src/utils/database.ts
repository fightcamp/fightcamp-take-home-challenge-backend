import { connect, disconnect } from 'mongoose';


export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoose = await connect('mongodb://127.0.0.1:27017/post-management');

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
