const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        required : true
    }
},{timestamps : true});

const Task = mongoose.model('Task',tasksSchema);

module.exports = Task;