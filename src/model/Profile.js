import {database as DataBase} from "../db/config";

async function getProfileService() {
	const db = await DataBase();

	const data = await db.get("SELECT * FROM profile");

	await db.close();

	return {
		name: data.name,
		avatar: data.avatar,
		monthlyBudget: data.monthly_budget,
		daysPerWeek: data.days_per_week,
		hoursPerDay: data.hours_per_day,
		vacationPerYear: data.vacation_per_year,
		valueHour: data.value_hour
	};
}

async function updateProfileService(newData) {
	const db = await DataBase();

	db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData.monthlyBudget},
        days_per_week = ${newData.daysPerWeek},
        hours_per_day = ${newData.hoursPerDay},
        vacation_per_year = ${newData.vacationPerYear},
        value_hour = ${newData.valueHour}
        `);


	await db.close();
}

export { getProfileService, updateProfileService };
