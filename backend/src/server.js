import "dotenv/config";

import app from "./app.js";
import connectDB from "./DB/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️ Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    });