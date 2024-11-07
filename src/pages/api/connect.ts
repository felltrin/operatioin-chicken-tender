import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise;

// Ensure MongoClient is only initialized once
if (!global._mongoClientPromise) {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client
    .connect()
    .then(() => {
      console.log("Connected to MongoDB");
      return client;
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error);
    });
  global._mongoClientPromise = clientPromise;
} else {
  clientPromise = global._mongoClientPromise;
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("your-database-name");
  const data = await db.collection("your-collection").find({}).toArray();
  res
    .status(200)
    .json({ message: "Connected to MongoDB and retrieved data", data });
}
