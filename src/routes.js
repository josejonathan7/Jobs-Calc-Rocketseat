const express = require('express')
const routes = express.Router();

const views = __dirname + '/views/'

const Profile = {
    data: {
        name: 'josé jonathan',
        avatar: 'https://avatars.githubusercontent.com/u/71531287?v=4',
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res){
            return res.render(views + 'profile', { profile: Profile.data })
        },
        update(req, res){
            //req.body para para
            const data = req.body

            //definir quantas semanas tem um atribuindo
            const weeksPerYears = 52

            //remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
            const weekPeerMonth = (weeksPerYears - data["vacation-per-year"]) / 12

            //quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            //total de horas trabalhadas no mes 
            const monthlyTotalHours = weekTotalHours * weekPeerMonth

            //qual será o valor da hora?
            const valueHours = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHours
            }

            return res.redirect('/profile')
        },
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
        }
    ],
    controllers: {
        index(req, res) {
            //estamos usando o map para mapear o jobs ele faz a mesma coisa que o foreach percorrendo todos os dados dentro do jobs,
            //mas a diferença consiste no fato de a gente poder usar um return no map atribuindo o novo objeto que ele criou para nos
            //com referencia no jobs a alguma variavel por exemplo, nesse caso estamos mapeando o jobs e retornando o novo objeto para
            //a constante updateJobs, mais ou menos isso... o map retorna um novo array com os dados alterados se vc altera-los...
            const updatedJobs = Job.data.map((job) => {
                //ajustes no jobs

                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
                }
            })
            return res.render(views + 'index', { jobs: updatedJobs })

        },
        create(req,res){
            return res.render(views+"job")
        },
        save(req, res){
            //req.body = {name: 'bar', "daily-hours': 5, 'total-hours': 40}
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()//atribuindo a data de hoje em milisegundo desde 1 de janeiro de 1970
            })
            return res.redirect('/')
        },
        show(req, res){

            const jobId =  req.params.id

            //vai procurar algo pra mim, funciona parecido com o foreach ele procura pra mim e retorna se o valor passado na funçaõ que determinei for verdadeiro
            //nesse caso eu estou pegando o id que chega da minha requisição e comparando com os Ids do meu data para ver se tem algum igual
            // se ele achar um Id igual ele retorna o resultado pa minha const job
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return  res.send('job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

            return res.render(views + 'job-edit', {job})
        },
        update(req,res){
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)

        },
        delete(req,res){
            const jobId= req.params.id

            //forEach map filter, find todas essas funções tem funcionalidades parecidas
            // o filter vai compara o id do meu jobId com o id do meu job, se o id for diferente então ele vai manter aquele id
            //no meu registro nesse caso no data, se o id for igual então ele vai remover aquele Id, se ele remover algum id então ele devolve um novo array
            //sem o registro que foi removido
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))


            return res.redirect('/')
        }
    },
    services: {
        remainingDays(job) {
            //calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateinMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateinMs - Date.now()
            //transformar mili segundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            //retam x dias
            return dayDiff
        },
        calculateBudget: (job, valueHours) =>  valueHours * job["total-hours"]
    }
}


routes.get('/', Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.get("/job/:id", Job.controllers.show)
///aqui estou criando um novo objeto chamado profile que recebe o meu objeto constante profile, como ambos tem o mesmo nome eu posso colocar o profile só uma vez que ele vai entender que esse novo objeto é um espelho do meu objeto constante profile
routes.get("/profile", Profile.controllers.index)

routes.post("/job/:id", Job.controllers.update)
routes.post("/job", Job.controllers.save)
routes.post("/profile", Profile.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)

module.exports = routes;

//no filter ele entra em cada posição do array até encontrar o id(nessa caso Id) que seja igual ao que a gente busca, quando encontrar ele remove aquele dado e retorna um novo array sem o registro que ele removeu