const services = require('../services/index')

module.exports = {
    getAllTasks: async (req,res)  => {
        try {
            const task = await services.getAllTasks()
            res.json(task)

        } catch (error) {
            res.status(500).json({message: 'error',error: error.message})
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