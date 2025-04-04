const db = require("../database/models");
const tasks = db.Task

module.exports = {
  /* todas las tareas    */
  getAllTasksService: async () => {
    const allTasks = await tasks.findAll();
    const totalTasks = allTasks.length;
    const pendingTasks = allTasks.filter(task => task.status === false).length;
    const completedTasks = allTasks.filter(task => task.status === true).length;
    if (allTasks.length === 0) {
      throw new Error("No hay tareas")
    }
    return ({ message: "Todas las tareas encontradas", totalTasks, pendingTasks, completedTasks, tasks: allTasks })



  },
  /*     filterTask: (req,res) => {
  
      }, */

  /* Tareas por id */

  getTaskByIdService: async (id) => {
    const taskById = await tasks.findByPk(id);
    if (!taskById) {
      throw new Error("La tarea no existe")
    }
    return taskById
  },

  /* crear tarea */
  createTaskService: async ({ title, description }) => {
    if (!title || !description) {
      throw new Error('Faltan datos');
    }
    const newTask = await tasks.create({
      title: title,
      description: description,
      status: false
    })
    return newTask
  },
  updateTaskService: async ({ id, title, description, status }) => {
    const updated = await tasks.update({
      title,
      description,
      status,
      updatedAt: new Date()
    }, {
      where: { id }
    });

    if (updated[0] === 0) {
      throw new Error('Tarea no encontrada o no se actualizó');
    }

    return { message: 'Tarea actualizada correctamente' };
  },
  deleteTaskService: async (id) => {
    const deleteTask = await tasks.destroy({ where: { id } })
    if (!deleteTask) {
      throw new Error("La tarea no existe")
    }
    return ({ message: "Tarea borrada" })
  }






}