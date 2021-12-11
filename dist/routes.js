"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
const routes = _express.Router.call(void 0, );
var _ProfileController = require('./controllers/ProfileController');
var _JobController = require('./controllers/JobController');
var _DashboardController = require('./controllers/DashboardController');

//aqui estou criando um novo objeto chamado profile que recebe o meu objeto constante profile, como ambos tem o mesmo nome eu posso colocar o profile só uma vez que ele vai entender que esse novo objeto é um espelho do meu objeto constante profile
routes.get("/", _DashboardController.index);
routes.get("/job", _JobController.createJobController);
routes.get("/job/:id", _JobController.showJobController);
routes.get("/profile", _ProfileController.index);

routes.post("/job/:id", _JobController.updateJobController);
routes.post("/job", _JobController.saveJobController);
routes.post("/profile", _ProfileController.update);

routes.post("/job/delete/:id", _JobController.deleteJobController);

exports. default = routes;

//no filter ele entra em cada posição do array até encontrar o id(nessa caso Id) que seja igual ao que a gente busca, quando encontrar ele remove aquele dado e retorna um novo array sem o registro que ele removeu
