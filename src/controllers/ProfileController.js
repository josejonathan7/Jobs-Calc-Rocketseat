const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() })
    },
    async update(req, res) {
        //req.body para para
        const data = req.body
        const profile = await Profile.get()

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

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHours
        })

        return res.redirect('/profile')
    },
}