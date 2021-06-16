const JobData = require('../model/Job')
const ProfileData = require('../model/Profile')
const JobUtils = require('../Utils/jobUtils')

module.exports = {
    async index(req, res) {
        const jobs = await JobData.get()
        const profile = await ProfileData.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        //estamos usando o map para mapear o jobs ele faz a mesma coisa que o foreach percorrendo todos os dados dentro do jobs,
        //mas a diferença consiste no fato de a gente poder usar um return no map atribuindo o novo objeto que ele criou para nos
        //com referencia no jobs a alguma variavel por exemplo, nesse caso estamos mapeando o jobs e retornando o novo objeto para
        //a constante updateJobs, mais ou menos isso... o map retorna um novo array com os dados alterados se vc altera-los...
        const updatedJobs = jobs.map((job) => {
            //ajustes no jobs

            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            //somando a quantidade de status progress/done
            statusCount[status] += 1

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']): jobTotalHours
        
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })

        //qtd de horas que quero trabalhar (profile) - a qtd de horas nos job em progress
        const freeHours = profile['hours-per-day'] - jobTotalHours

        return res.render('index', { jobs: updatedJobs, statusCount : statusCount, profile: profile, freeHours: freeHours})

    }
}