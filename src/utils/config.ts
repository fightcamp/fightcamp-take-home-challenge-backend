import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/post-management',
  PORT: Number(process.env.PORT) || 4000,  
}