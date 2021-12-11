"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _Profile = require('../model/Profile');

 async function index(req, res) {
	return res.render("profile", { profile: await _Profile.getProfileService.call(void 0, ) });
} exports.index = index;

 async function update(req, res) {
	//req.body para para
	const data = req.body;
	const profile = await _Profile.getProfileService.call(void 0, );

	//definir quantas semanas tem um atribuindo
	const weeksPerYears = 52;

	//remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
	const weekPeerMonth = (weeksPerYears - data["vacation-per-year"]) / 12;

	//quantas horas por semana estou trabalhando
	const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

	//total de horas trabalhadas no mes
	const monthlyTotalHours = weekTotalHours * weekPeerMonth;

	//qual será o valor da hora?
	const valueHours = data["monthly-budget"] / monthlyTotalHours;

	await _Profile.updateProfileService.call(void 0, {
		...profile,
		...req.body,
		"value-hour": valueHours
	});

	return res.redirect("/profile");
} exports.update = update;
