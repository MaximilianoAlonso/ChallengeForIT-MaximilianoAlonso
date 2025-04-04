const { createTask, getTaskById, deleteTaskService, getAllTasks, updateTaskService } = require('../services/index.js')

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const task = await getAllTasks()
            res.json(task)

        } catch (error) {
            res.status(500).json({ 
            message: 'Error al listar todas las tareas ', 
            error: error.message })
        }

    },
    getTaskById: async (req, res) => {
      const {id} = req.params

        try {
            const taskId = await getTaskById(id)
            res.json(taskId)

        } catch (error) {
            res.status(404).json({ 
            message: 'Error al buscar la tarea: ' + id,
            error: error.message })
        }
    },
    createTask: async (req, res) => {
        try {
            const newTask = await createTask(req.body)
            res.status(201).json(newTask);
        } catch (error) {
            res.status(400).json({ 
            message: 'Error al crear la tarea', 
            error: error.message 
        });
        }
    },
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await updateTaskService({ id, ...req.body });
            res.json(updated);
        } catch (error) {
            res.status(404).json({
             error: error.message 
            });
        }
    },
    deleteTask:async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await deleteTaskService(id);
            res.json(deleted);
        } catch (error) {
            res.status(404).json({
            error: error.message
         });
        }
    }

}