const express = require("express");
const { cadastrar } = require("../controllers/cliente");
const rotas = express();

rotas.post('/clientes', cadastrar);

module.exports = rotas;