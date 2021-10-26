const Server = require("./models/server");
require("dotenv").config();

//Servidor REST
const server = new Server();

server.Listen();
