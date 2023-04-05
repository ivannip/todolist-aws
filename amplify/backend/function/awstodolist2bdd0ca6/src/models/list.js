const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "task is required"]
    },
    doneStatus: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("List", listSchema)