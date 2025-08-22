const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

var items = [];
app.get("/", function (req, res) {
    res.render("list", { ejes: items })
});



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

app.post("/edit", function (req, res) {
    const index = req.body.index;
    const newTask = req.body.newTask;
    if (index !== undefined && newTask.trim() !== "") {
        items[index].task = newTask;
    }
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    const index = req.body.index;
    if (index !== undefined) {
        items.splice(index, 1);
    }
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("server Started...")
});

