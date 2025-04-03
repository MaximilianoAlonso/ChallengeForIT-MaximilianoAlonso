  const db = require("../database/models");

  module.exports = {
      getAllTasks: async () => {
          try {
            return await db.Task.findAll();
          } catch (error) {
            throw new Error("Error al obtener las tareas: " + error.message);
          }
      
      },
    filterTask: (req,res) => {

    },
    findTask: (req,re) => {

    },
    createTask: (req,res) => {

    },
    updateTask: (req,re) => {

    },
    deleteTask: (req,res) => {

    }






}