require("dotenv").config();

const express = require('express');
const app = express();
const routes = require('./routes/index')
const morgan = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});