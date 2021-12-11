import { Router } from "express";
const routes = Router();
import { index, update } from "./controllers/ProfileController";
import { createJobController, showJobController, updateJobController, saveJobController, deleteJobController } from "./controllers/JobController";
import { index as _index } from "./controllers/DashboardController";

//aqui estou criando um novo objeto chamado profile que recebe o meu objeto constante profile, como ambos tem o mesmo nome eu posso colocar o profile só uma vez que ele vai entender que esse novo objeto é um espelho do meu objeto constante profile
routes.get("/", _index);
routes.get("/job", createJobController);
routes.get("/job/:id", showJobController);
routes.get("/profile", index);

routes.post("/job/:id", updateJobController);
routes.post("/job", saveJobController);
routes.post("/profile", update);

routes.post("/job/delete/:id", deleteJobController);

export default routes;

//no filter ele entra em cada posição do array até encontrar o id(nessa caso Id) que seja igual ao que a gente busca, quando encontrar ele remove aquele dado e retorna um novo array sem o registro que ele removeu
