import { getProfileService,  updateProfileService } from "../model/Profile";

export async function index(req, res) {
	return res.render("profile", { profile: await getProfileService() });
}

export async function update(req, res) {
	//req.body para para
	const data = req.body;
	const profile = await getProfileService();

	//definir quantas semanas tem um atribuindo
	const weeksPerYears = 52;

	//remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
	const weekPeerMonth = (weeksPerYears - data.vacationPerYear) / 12;

	//quantas horas por semana estou trabalhando
	const weekTotalHours = data.hoursPerDay * data.daysPerWeek;

	//total de horas trabalhadas no mes
	const monthlyTotalHours = weekTotalHours * weekPeerMonth;

	//qual será o valor da hora?
	const valueHours = data.monthlyBudget / monthlyTotalHours;

	await updateProfileService({
		...profile,
		...req.body,
		valueHour: valueHours
	});

	return res.redirect("/profile");
}
