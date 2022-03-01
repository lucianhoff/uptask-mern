import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, trim: true, required: true},
    deadline: {type: Date, default: Date.now},
    client: {type: String, trim: true, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ],
}, {
    timestamps: true
})

const Project = mongoose.model("Project", ProjectSchema)

export default Project