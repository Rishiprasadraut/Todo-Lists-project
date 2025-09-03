const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');


// Middlware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect("mongodb+srv://rishiprasadraut595_db_user:3UG9jLN7tVbSMXbX@todo.mslooqa.mongodb.net/?retryWrites=true&w=majority&appName=todo")
    .then(() => console.log(" MongoDB Connected..."))

//  Connect to MongoDB
mongoose.connect("mongodb+srv://rishiprasadraut595_db_user:3UG9jLN7tVbSMXbX@todo.mslooqa.mongodb.net/?retryWrites=true&w=majority&appName=todo")
    .then(() => console.log("MongoDB Connected..."))

    .catch(err => console.error("MongoDB Error:", err));


// Task Schema
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        pri: ["High", "Medium", "Low"],
        default: "Medium"
    }
});



// Model
const Task = mongoose.model("Task", taskSchema);



// Display list
app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("list", { ejes: tasks });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add new task
app.post("/", async (req, res) => {
    try {
        const newTask = new Task({
            task: req.body.ele1,
            priority: req.body.priority || "Medium"
        });

        await newTask.save();
        res.redirect("/");
    } catch (err) {
        res.status(400).send("Input cannot be empty!");
    }
});


// Edit Task
app.put("/edit/:id", async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, { task: req.body.newTask });
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Delete Task
app.delete("/delete/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(8000, function () {
    console.log("Server Started on port 8000...");
});
