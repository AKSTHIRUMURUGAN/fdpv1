import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cached variable to prevent opening multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If there's already a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise is defined, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  
  // Await the connection and store it in the cached object
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
