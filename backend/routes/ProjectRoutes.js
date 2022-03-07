import express from 'express';
import checkAuth from "../middleware/checkAuth.js";
import { getAllProjects, newProject, getProject, updateProject, deleteProject, addCollaborator, removeCollaborator, searchCollaborator } from "../controllers/ProjectController.js";

const Router = express.Router();

Router.route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject)

Router.route('/')
    .get(checkAuth, getAllProjects)
    .post(checkAuth, newProject)

Router.post('/collaborators', checkAuth, searchCollaborator)

Router.post('/collaborators/:id', checkAuth, addCollaborator)
Router.post('/remove-collaborator/:id', checkAuth, removeCollaborator)

// Router.route('/collaborators/:id', checkAuth)
//     .post(checkAuth, addCollaborator)
//     .delete(checkAuth, removeCollaborator)

export default Router;