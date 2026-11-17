import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI || MONGODB_URI.includes("your_user") || MONGODB_URI.includes("your_password")) {
    console.warn(
      "⚠️ [MongoDB Info]: MONGODB_URI is not configured or using default placeholders. Running in seamless in-memory mode."
    );
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 3000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ [MongoDB]: Successfully connected to database");
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("⚠️ [MongoDB Warning]: Connection failed, continuing in memory mode:", err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.warn("⚠️ [MongoDB Warning]: Unable to connect to MongoDB, using fallback mode:", e.message);
    return null;
  }
}

export default connectToDatabase;
