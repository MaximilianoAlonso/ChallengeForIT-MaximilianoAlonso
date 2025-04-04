require("dotenv").config();
const express = require('express');
const app = express();
const routes = require('./routes/index')
const morgan = require("morgan")
const cors = require("cors")

const PORT = 3000/* process.env.PORT */;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

/* Express.json viene a reemplazar a bodyParser (NO LO SABIA!!)*/

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});