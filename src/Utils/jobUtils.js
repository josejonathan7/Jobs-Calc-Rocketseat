
module.exports = {
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
    calculateBudget: (job, valueHours) => valueHours * job["total-hours"]
}