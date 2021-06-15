const JobData = require('../model/Job')
const JobUtils = require('../Utils/jobUtils')
const ProfileData = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },
    save(req, res) {
        const jobs = JobData.get()
        //req.body = {name: 'bar', "daily-hours': 5, 'total-hours': 40}
        const lastId = jobs[jobs.length - 1]?.id || 0;
        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()//atribuindo a data de hoje em milisegundo desde 1 de janeiro de 1970
        })
        return res.redirect('/')
    },
    show(req, res) {
        const jobs = JobData.get()
        const utils = JobUtils
        const profile = ProfileData.get()

        const jobId = req.params.id

        //vai procurar algo pra mim, funciona parecido com o foreach ele procura pra mim e retorna se o valor passado na funçaõ que determinei for verdadeiro
        //nesse caso eu estou pegando o id que chega da minha requisição e comparando com os Ids do meu data para ver se tem algum igual
        // se ele achar um Id igual ele retorna o resultado pa minha const job
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('job not found!')
        }

        job.budget = utils.calculateBudget(job, profile["value-hour"])

        return res.render('job-edit', { job })
    },
    update(req, res) {
        const jobs = JobData.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        JobData.update(newJobs)

        res.redirect('/job/' + jobId)

    },
    delete(req, res) {
        const jobId = req.params.id
        JobData.delete(jobId)
        return res.redirect('/')
    }
}

