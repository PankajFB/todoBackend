// Import required modules
const mongoose = require("mongoose");

// Create a Mongoose schema for the "Task" collection
const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  task_name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the "Task" model based on the schema
const Task = mongoose.model("Task", taskSchema);

// Export the model to be used in other parts of the application
module.exports = Task;
