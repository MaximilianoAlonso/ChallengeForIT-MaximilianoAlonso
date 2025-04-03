const express = require('express');
const app = express();
const routes = require('./routes/index')

const PORT = 3000;

app.use(express.json());
app.get('/', routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});