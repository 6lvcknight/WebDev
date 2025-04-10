# WebDev

## Getting Started

Follow the steps below to run the application locally:

### 1. Start the Frontend

```bash
cd booknest
npm install
npm run dev
```

### 2. Start the Backend

> **Make sure MongoDB is running locally** before starting the backend.

1. Navigate to the backend folder:
   ```bash
   cd server
   ```

2. Add your `.env` file to the `server` directory. It should include your MongoDB connection string and any other required environment variables. Example:

   ```
   MONGODB_URI=mongodb://localhost:27017/booknest
   PORT=5000
   ```

3. Then run the following commands:

   ```bash
   npm install
   npm run seed
   npm run dev
   ```
