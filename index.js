const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const Task = require("./models/task.js");

const app = express();

const port = process.env.PORT || 3000;

const connectDB = require("./db/connect.js");
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//route for getting all tasks
app.get("/", async (req, res) => {
  const data = await Task.find({});

  if (data.length === 0) {
    res.status(404).send("No tasks found");
  } else {
    res.send(data);
  }
});

//route for adding new task
app.post("/newtodo", async (req, res) => {
  var newTask = new Task({
    id: req.body.id,
    task_name: req.body.task_name,
    completed: req.body.completed,
  });

  const createTask = await Task.create(newTask);
  if (createTask) {
    console.log("New task added")
    res.send("Task added successfully");
  } else {
    console.log("Error in adding new task");
    res.send("Error in adding new task");
  }
});

//route to delete a task by id
app.delete("/delete/:id", async (req, res) => {
  var taskId = req.params.id; 
  console.log(req.params.id);
  const delTask = await mongoose.model("Task").deleteOne({ id: taskId});
    if (delTask.deletedCount === 1) {
        console.log("Task deleted successfully");
        res.send("Task deleted successfully");
        }
    else {
        console.log("Error in deleting task");
        res.send("Error in deleting task");
        }

});

//route for deleting all tasks
app.post("/delAlltodo", async (req, res) => {

  const delTask = await mongoose.model("Task").deleteMany({});
    if (delTask) {
        console.log(delTask)
        console.log("All Task deleted successfully");
        res.send("All tasks deleted successfully");
        }
    else {
        console.log("Error in deleting task");
        res.send("Error in deleting task");
        }

});

//route for updating a task
app.patch("/update/:id", async (req, res) => {
    const id = req.params.id; 
    const completed = req.body.completed; 

console.log(completed, id)
    const updateTask = await Task.updateOne({id : id}, {completed: completed},{new : true});
    if (updateTask) {
        console.log("Task updated successfully");
        const updatedTask = await Task.findOne({id: id})
        res.send(updatedTask);
        }
    else {
        console.log("Error in updating task");
        res.send("Error in updating task");
        }
  
});



app.listen(port, (error) => {
  if (error) {
    console.log("Issue in connecting to the server");
  } else {
    console.log("Successfully connected to the server");
  }
});
