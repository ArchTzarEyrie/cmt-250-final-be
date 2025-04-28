var express = require('express');
var router = express.Router();
var fs = require('fs');

const tasks = require('../database.json');

router.get('/', function(req, res, next) {
    res.send({tasks});
});

router.post('/update/:taskId', function(req, res, next) {
    const updatedTask = req.body;
    const compareId = Number.parseInt(req.params.taskId);
    if (compareId === updatedTask.id) {
        const taskIndex = tasks.findIndex(task => task.id === compareId);
        tasks[taskIndex] = updatedTask;
        try {
            fs.writeFile(
                `${__dirname}/../database.json`,
                JSON.stringify(tasks),
                'utf8',
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.sendStatus(200);
                }
            );
        } catch (err) {
            console.log(err);
        }
        
    } else {
        console.log('Throwing error');
        res.sendStatus(500);
    }
})

module.exports = router;
