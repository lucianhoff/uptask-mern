import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";
const getAllProjects = async (req, res) => {
    const projects = await Project.find().where('owner').equals(req.user._id)
    res.json(projects)
}

const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.owner = req.user._id

    try {
        const savedProject = await project.save()
        res.json({ success: true, data: savedProject })
    } catch (error) {
        console.log(error);
    }
}

const getProject = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id).populate('tasks') || null

    // if (project === id) {
        if (!project) {
            const error = new Error("Project not found")
            return res.status(404).json({ msg: error.message })
        }

        // compare owner with req.user._id to check if the user is the owner of the project
        if (project.owner.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to view this project")
            return res.status(401).json({ msg: error.message })
        }

        // get tasks from the project

        const task = await Task.find().where('project').equals(project._id)

        res.json(project)
    // }
}

const updateProject = async (req, res) => {
    const { id } = req.params

    const project = await Project.findById(id)
    console.log(project)
    // if (project === id) {
        if (!project) {
            // const error = new Error("Project not found")
            // res.status(404).json({ msg: error.message })

            res.json({ success: false, msg: "Project not found" })
        }

        // compare owner with req.user._id to check if the user is the owner of the project
        if (project.owner.toString() !== req.user._id.toString()) {
            // const error = new Error("You are not authorized to view this project")
            // res.status(401).json({ msg: error.message })

            res.json({ success: false, msg: "You are not authorized to view this project" })
        }

        project.name = req.body.name || project.name
        project.description = req.body.description || project.description
        project.deadline = req.body.deadline || project.deadline
        project.client = req.body.client || project.client


        try {
            console.log('entry en el try')
            const savedProject = await project.save()
            res.json(savedProject)
        } catch (error) {
            console.log(error);
        }
    }

// }

const deleteProject = async (req, res) => {
    const { id } = req.params

    const project = await Project.findById(id)
    // if (project === id) {
        if (!project) {
            // const error = new Error("Project not found")
            // res.status(404).json({ msg: error.message })
            res.json({ success: false, msg: "Project not found" })
        }

        // compare owner with req.user._id to check if the user is the owner of the project
        if (project.owner.toString() !== req.user._id.toString()) {
            // const error = new Error("You are not authorized to view this project")
            // res.status(401).json({ msg: error.message })
            res.json({ success: false, msg: "You are not authorized to view this project" })
        }

        try {
            await project.deleteOne()
            res.json({ success: true, msg: "Project deleted", response: project })
        } catch (error) {
            console.log(error);
        }
    // }
}

const addCollaborator = async (req, res) => { }

const removeCollaborator = async (req, res) => { }

export {
    getAllProjects,
    newProject,
    getProject,
    updateProject,
    deleteProject,
    addCollaborator,
    removeCollaborator
}