// import mongoose from "mongoose"

// const MONGODB_URL = process.env.MONGO_URL;

// if (!MONGODB_URL) {
//     throw new Error(
//         "Please define the MONGODB_URI environment variable inside .env.local"
//     )
// }


// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = {con: null, promise: null}
// }

// const dbConnect = async () => {
//     if (cached.conn) {
//         return cached.conn;
//     }


// // If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands : false
//         };

//         cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
//             return mongoose
//         })
//     }

//     try {
//         cached.conn = await cached.promise;
//     } catch (e) {
//         cached.promise = null;
//         throw e;
//     }

//     return cached.conn;
// }

// export default dbConnect;



import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState) return; // Fix: Removed [0]
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connection successfully established");
  } catch (err) {
    console.log(err);
  }
};

export default connect;
