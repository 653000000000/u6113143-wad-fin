import mongoose from 'mongoose';

// Get the MongoDB URI from the environment variable
const MONGO_URI = process.env.MONGO_URI;

// Check if the MONGO_URI is defined, otherwise throw an error
if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside your .env.local file.'
    );
}

// Use global to maintain a cached connection across hot reloads in development
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // If a cached connection exists, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If there is no promise, create one to connect to MongoDB
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering of commands
        };

        // Create a promise to connect to MongoDB
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('DB connected successfully');
            return mongoose;
        }).catch((error) => {
            console.error('Error connecting to DB:', error);
            throw error;
        });
    }

    // Wait for the promise to resolve and cache the connection
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset the promise in case of an error
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
