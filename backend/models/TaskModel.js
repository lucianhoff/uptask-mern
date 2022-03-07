import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    name: {type: String, trim: true, required: true},
    description: {type: String, trim: true, required: true},
    state: {type: Boolean, default: false},
    deadline: {type: Date, required: true, default: Date.now},
    priority: {type: String, required: true, enum: ["Low", "Medium", "High"]},
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    taskManager: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

}, {timestamps: true})

const Task = mongoose.model("Task", TaskSchema)

export default Task