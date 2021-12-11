"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _config = require('../db/config'); var _config2 = _interopRequireDefault(_config);

async function getProfileService() {
	const db = await _config2.default.call(void 0, );

	const data = await db.get("SELECT * FROM profile");

	await db.close();

	return {
		name: data.name,
		avatar: data.avatar,
		"monthly-budget": data.monthly_budget,
		"days-per-week": data.days_per_week,
		"hours-per-day": data.hours_per_day,
		"vacation-per-year": data.vacation_per_year,
		"value-hour": data.value_hour
	};
}

async function updateProfileService(newData) {
	const db = await _config2.default.call(void 0, );

	db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}
        `);


	await db.close();
}

exports.getProfileService = getProfileService; exports.updateProfileService = updateProfileService;
