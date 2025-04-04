const express = require('express');
const app = express();
const routes = require('./routes/index')
const cors = require("cors")

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});