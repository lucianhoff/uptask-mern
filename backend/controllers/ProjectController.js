import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";

const getAllProjects = async (req, res) => {

    // find take object as a parameter
    const projects = await Project.find({
        $or: [
            { collaborators: { $in: req.user._id } },
            { owner: { $in: req.user._id } }
        ]
    }).select('-tasks -collaborators')
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
    const project = await Project.findById(id).populate({ path: 'tasks', populate: { path: "taskManager", select: "name lastname image" } }).populate('collaborators', "name lastname image email") || null
    // .pupulate('collaborators', "atributos para traer")

    // if (project === id) {
    if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ msg: error.message })
    }

    // compare owner with req.user._id to check if the user is the owner of the project
    if (project.owner.toString() !== req.user._id.toString() && !project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())) {
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

const searchCollaborator = async (req, res) => {
    console.log(req.body)

    const { email } = req.body

    const user = await User.findOne({ email }).select('-createdAt -updatedAt -__v -password -token -confirmed')

    if (!user) {
        //return  res.json({ success: false, msg: "User not found" })
        const error = new Error("User not found")
        return res.status(404).json({ success: false, msg: error.message })
    }

    res.json(user)

}

const addCollaborator = async (req, res) => {
    // console.log(req.params.id)

    const project = await Project.findById(req.params.id)

    if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ msg: error.message })
    }

    // compare owner with req.user._id to check if the user is the owner of the project

    if (project.owner.toString() !== req.user._id.toString()) {
        const error = new Error("You are not authorized")
        return res.status(404).json({ msg: error.message })
    }

    const { email } = req.body

    const user = await User.findOne({ email }).select('-createdAt -updatedAt -__v -password -token -confirmed')

    if (!user) {
        //return  res.json({ success: false, msg: "User not found" })
        const error = new Error("User not found")
        return res.status(404).json({ success: false, msg: error.message })
    }

    if (project.owner.toString() === user._id.toString()) {
        const error = new Error("You can't add yourself as a collaborator")
        return res.status(401).json({ success: false, msg: error.message })
    }

    if (project.collaborators.includes(user._id)) {
        const error = new Error("User already added")
        return res.status(403).json({ success: false, msg: error.message })
    }

    // add user to the project

    await project.collaborators.push(user._id)

    project.save()
    res.json({ msg: "User added", user })
    // console.log(req.body)
}

const removeCollaborator = async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ msg: error.message })
    }

    // compare owner with req.user._id to check if the user is the owner of the project

    if (project.owner.toString() !== req.user._id.toString()) {
        const error = new Error("You are not authorized")
        return res.status(404).json({ msg: error.message })
    }

    // delete user from the project

    project.collaborators.pull(req.body.id)

    await project.save()

    res.json({ msg: "User removed" })
}

export {
    getAllProjects,
    newProject,
    getProject,
    updateProject,
    deleteProject,
    addCollaborator,
    removeCollaborator,
    searchCollaborator
}