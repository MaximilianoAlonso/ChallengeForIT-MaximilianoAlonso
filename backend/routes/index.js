const express = require('express');
const routes = express.Router();
const { getAllTasks, createTask, findTask, deleteTask, updateTask } = require('../controllers/taskController')

routes.get('/', getAllTasks)
    /* .get('/:category') */
    .get('/:id', findTask)
    .post("/", createTask)
    .put('/:id', updateTask)
    .delete('/:id', deleteTask)

module.exports = routes