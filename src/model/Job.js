const DataBase = require('../db/config')

module.exports = {
    async get() {
        const db = await DataBase()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            
        }))

    },
    async update(updatedJob, jobId) {
        const db = await DataBase()

        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob['daily-hours']},
            total_hours = ${updatedJob['total-hours']}
            WHERE id = ${jobId}
            `)

        await db.close()
    },
    async delete(id) {
        const db = await DataBase()
        //forEach map filter, find todas essas funções tem funcionalidades parecidas
        // o filter vai compara o id do meu jobId com o id do meu job, se o id for diferente então ele vai manter aquele id
        //no meu registro nesse caso no data, se o id for igual então ele vai remover aquele Id, se ele remover algum id então ele devolve um novo array
        //sem o registro que foi removido

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },
    async create(updatedJob) {
        const db = await DataBase()

        await db.run(`INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${updatedJob.name}",
                ${updatedJob['daily-hours']},
                ${updatedJob['total-hours']},
                ${updatedJob.created_at}
            )
        `)

        await db.close()
    }
}