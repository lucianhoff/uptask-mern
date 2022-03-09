
import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import userRoutes from "./routes/UserRoutes.js";
import projectRoutes from "./routes/ProjectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());

dotenv.config();

db();

// cors

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin)) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // }
    origin: process.env.FRONTEND_URL
}

// app.use(cors(corsOptions));

app.use(cors());

// Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000
app.use(express.json());

const sv = app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))

// SOCKET IO

import { Server } from "socket.io";

// const io = new Server(sv, {
//     pingTimeout: 60000,
//     cors : {
//         origin: process.env.FRONTEND_URL
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
// });

// io.on('connection', (socket) => {
//     console.log('Conectado a socket.io')

//     socket.on('nueva tarea', (tarea) => {
//         console.log('Nueva tarea', tarea)
        
//         // enviar tarea al frontend 

//         socket.on(tarea.project).emit('tarea agreada', tarea)

//     })

// })