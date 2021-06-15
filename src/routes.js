const express = require('express')
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

//aqui estou criando um novo objeto chamado profile que recebe o meu objeto constante profile, como ambos tem o mesmo nome eu posso colocar o profile só uma vez que ele vai entender que esse novo objeto é um espelho do meu objeto constante profile
routes.get('/', DashboardController.index)
routes.get("/job", JobController.create)
routes.get("/job/:id", JobController.show)
routes.get("/profile", ProfileController.index)

routes.post("/job/:id", JobController.update)
routes.post("/job", JobController.save)
routes.post("/profile", ProfileController.update)

routes.post('/job/delete/:id', JobController.delete)

module.exports = routes;

//no filter ele entra em cada posição do array até encontrar o id(nessa caso Id) que seja igual ao que a gente busca, quando encontrar ele remove aquele dado e retorna um novo array sem o registro que ele removeu