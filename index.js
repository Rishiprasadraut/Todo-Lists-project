const express = require('express');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Allows PUT & DELETE through forms

var items = [];

// GET - Display list
app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

// POST - Add new task
app.post("/", function (req, res) {
    const item = {
        task: req.body.ele1,
        priority: req.body.priority || "Medium"
    };
    if (!item.task || item.task.trim() === '') {
        return res.status(400).send('Input cannot be empty!');
    }
    items.push(item);
    res.redirect("/");
});

// **PUT - Edit Task**
app.put("/edit/:index", function (req, res) {
    const index = req.params.index;
    const newTask = req.body.newTask;

    if (index !== undefined && newTask.trim() !== "") {
        items[index].task = newTask;
    }
    res.redirect("/");
});

// **DELETE - Delete Task**
app.delete("/delete/:index", function (req, res) {
    const index = req.params.index;
    if (index !== undefined) {
        items.splice(index, 1);
    }
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("Server Started on port 8000...");
});
