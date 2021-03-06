"use strict";var _config = require('./config');

const initDb = {
	async init() {

		const db = await _config.database.call(void 0, );

		await db.exec(`CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT
            );
        `);

		await db.exec(`CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            );
        `);

		await db.run(`INSERT INTO profile(
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                value_hour
            ) VALUES(
                "José Jonathan",
                "https://avatars.githubusercontent.com/u/71531287?v=4",
                3000,
                5,
                5,
                5,
                70
            );
        `);

		await db.run(`INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES(
                "Pizzaria Guloso",
                2,
                1,
                1617515376018
            );
        `);

		await db.run(`INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES(
                "OneTwo Project",
                3,
                47,
                1617515376018
            );
        `);

		await db.close();
	}
};

initDb.init();
