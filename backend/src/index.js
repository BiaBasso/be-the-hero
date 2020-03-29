const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors()); // Como é a parte de dev, então pode deixar a aplicação assim, pois qualquer front pode acessar o meu backend
app.use(express.json());
app.use(routes);

app.listen(3333);