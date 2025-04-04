const express = require('express');
const routes = express.Router();
const { getAllTasks, createTask, getTaskById , deleteTask, updateTask } = require('../controllers/taskController')

routes.get('/', getAllTasks)
    /* .get('/:category') */
    .get('/:id', getTaskById )
    .post("/", createTask)
    .put('/:id', updateTask)
    .delete('/:id', deleteTask)

module.exports = routes