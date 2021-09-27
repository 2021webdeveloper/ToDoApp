const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    userName: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    taskDescription: { type: String, required: true },
    insertedAt: { type : Date, default: Date.now },
    updatedAt: { type : Date, default: Date.now },
    assignedDate: { type : Date, required: true },
    assignedTime: { type: Number, required: true },
    priority: { type : String }
});

module.exports = Project = mongoose.model("toDos", todoSchema);

