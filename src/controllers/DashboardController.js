const JobData = require('../model/Job')
const ProfileData = require('../model/Profile')
const JobUtils = require('../Utils/jobUtils')

module.exports = {
    index(req, res) {
        const jobs = JobData.get()
        const profile = ProfileData.get()
        //estamos usando o map para mapear o jobs ele faz a mesma coisa que o foreach percorrendo todos os dados dentro do jobs,
        //mas a diferença consiste no fato de a gente poder usar um return no map atribuindo o novo objeto que ele criou para nos
        //com referencia no jobs a alguma variavel por exemplo, nesse caso estamos mapeando o jobs e retornando o novo objeto para
        //a constante updateJobs, mais ou menos isso... o map retorna um novo array com os dados alterados se vc altera-los...
        const updatedJobs = jobs.map((job) => {
            //ajustes no jobs

            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })
        return res.render('index', { jobs: updatedJobs })

    }
}