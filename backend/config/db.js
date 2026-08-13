import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.1:27017/sunspark';
    
    // Attempt standard connection
    try {
      const conn = await mongoose.connect(connUri, {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`[Database] Connected to MongoDB: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.log('[Database] Local/Atlas MongoDB not detected. Starting in-memory MongoDB fallback engine...');
    }

    // In-memory fallback
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    await mongoose.connect(uri);
    console.log(`[Database] In-Memory MongoDB Server initialized and connected at: ${uri}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};
