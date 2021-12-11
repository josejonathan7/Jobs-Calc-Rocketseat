import express, { urlencoded } from "express";
const server = express();
import routes from "./routes";
import { join } from "path";

//usando template engine , estamos dizendo para o motor de visualização que estamos trabalhando com ejs
server.set("view engine", "ejs");

//mudar a licalização da pasta views
server.set("views", join(__dirname, "views"));

//habilitar arquivos estaticos, que não são alterados com frequencia
server.use(express.static("public"));

//usar o req.body
server.use(urlencoded({extended: true}));

//rotas
server.use(routes);

server.listen(3000, () => console.log("O servidor esta rodando"));
