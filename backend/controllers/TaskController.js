import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";
import generateToken from "../helpers/generateToken.js";
import generateJWT from "../helpers/generateJWT.js";
// import 
const newTask = async (req, res) => {
    const { project } = req.body;

    const projectExist = await Project.findById(project);

    // console.log(projectExist)

    // console.log(req.body)

    if (!projectExist) {
        const error = new Error("Project not found");
        return res.status(400).json({ msg: error.message });
    }

    if (projectExist.owner.toString() !== req.user.id) {
        const error = new Error("You are not the owner of this project");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const taskSaved = await Task.create(req.body);

        // SAVE TASK IN PROJECT

        projectExist.tasks.push(taskSaved._id);

        await projectExist.save();

        res.json(taskSaved);
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            const error = new Error("Task not found");
            return res.status(404).json({ msg: error.message });
        }

        if (task.project.owner.toString() !== req.user.id) {
            const error = new Error("You are not the owner of this project");
            return res.status(403).json({ msg: error.message });
        }

        res.json(task);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const editTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            const error = new Error("Task not found");
            return res.status(404).json({ msg: error.message });
        }

        if (task.project.owner.toString() !== req.user.id.toString()) {
            const error = new Error("You are not the owner of this project");
            return res.status(403).json({ msg: error.message });
        }

        task.name = req.body.name || task.name;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.deadline = req.body.deadline || task.deadline;

        try {
            const taskSaved = await task.save();
            res.json({ success: true, msg: "task edited", data: taskSaved });
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const deleteTask = async (req, res) => {

    const { id } = req.params;

    const task = await Task.findById(id).populate("project");

    if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if (task.project.owner.toString() !== req.user.id.toString()) {
        const error = new Error("You are not the owner of this project");
        return res.status(403).json({ msg: error.message });
    }

    try {
        const project = await Project.findById(task.project);
        project.tasks.pull(task._id);

        await Promise.allSettled([project.save(), await task.deleteOne()]);


        res.json({ success: true, msg: "task deleted" });
    } catch (error) {
        console.log(error);
    }
}

const changeState = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    const task = await Task.findById(id).populate("project");

    if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if (task.project.owner.toString() !== req.user._id.toString() && !task.project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())) {
        const error = new Error("You are not authorized to change the state of this task");
        return res.status(401).json({ msg: error.message })
    }

    task.state = !task.state
    task.taskManager = req.user._id

    await task.save()
    const taskUpdate = await Task.findById(id).populate("project").populate("taskManager");

    // console.log(taskUpdate)
    res.json({ success: true, msg: "task state changed", data: taskUpdate });
}

export {
    newTask,
    getTask,
    editTask,
    deleteTask,
    changeState
}