### How to Run BookNest

1. **Start the Frontend:**
   - Open a terminal and run the following:
     ```bash
     cd booknest
     npm install
     npm run dev
     ```

2. **Start the Backend:**
   - Open a **new** terminal window or tab.
   - Make sure **MongoDB is running** on your system.
   - Then run:
     ```bash
     cd server
     npm install
     npm run seed
     npm run dev
     ```

> Ensure MongoDB is running before starting the server. If it's not running, the backend will not work correctly.