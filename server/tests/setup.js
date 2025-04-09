import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

// Connect to the in-memory MongoDB server before running tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

// Clear all data between tests
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
});
  
// Disconnect and close the database after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});