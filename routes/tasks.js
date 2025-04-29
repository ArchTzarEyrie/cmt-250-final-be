var express = require('express');
var router = express.Router();
var fs = require('fs');

const tasks = require('../database.json');

router.get('/', function(req, res, next) {
    res.send({tasks});
});

const writeTasks = () => {
    fs.writeFile(
        `${__dirname}/../database.json`,
        JSON.stringify(tasks),
        'utf8',
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
}

router.post('/update/:taskId', function(req, res, next) {
    const updatedTask = req.body;
    const compareId = Number.parseInt(req.params.taskId);
    if (compareId === updatedTask.id) {
        const taskIndex = tasks.findIndex(task => task.id === compareId);
        tasks[taskIndex] = updatedTask;
        try {
            writeTasks();
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
        }
        
    } else {
        console.log('Throwing error');
        res.sendStatus(500);
    }
});

router.post('/create', function(req, res, next) {
    const newTask = req.body;;
    tasks.push(newTask);
    try {
        writeTasks();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/delete/:taskId', function(req, res, next) {
    const idToDelete = Number.parseInt(req.params.taskId);
    const index = tasks.findIndex(task => task.id === idToDelete);
    tasks.splice(index, 1);
    try {
        writeTasks();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
