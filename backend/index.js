
import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

db();

// Routing

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 4000
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))

