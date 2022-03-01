import express from 'express';
import checkAuth from "../middleware/checkAuth.js";
import { newTask, getTask, editTask, deleteTask, changeState } from "../controllers/TaskController.js";

const Router = express.Router();


Router.post("/", checkAuth, newTask)

Router.route("/:id")
    .get(checkAuth, getTask)
    .put(checkAuth, editTask)
    .delete(checkAuth, deleteTask)

Router.post("/state/:id", checkAuth, changeState)

export default Router;