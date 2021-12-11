"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _config = require('../db/config'); var _config2 = _interopRequireDefault(_config);

async function getJobsService() {
	const db = await _config2.default.call(void 0, );

	const jobs = await db.all("SELECT * FROM jobs");

	await db.close();

	return jobs.map(job => ({
		id: job.id,
		name: job.name,
		"daily-hours": job.daily_hours,
		"total-hours": job.total_hours,
		created_at: job.created_at
	}));

}

async function updateJobsService(updatedJob, jobId) {
	const db = await _config2.default.call(void 0, );

	await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
            `);

	await db.close();
}

async function deleteJobsService(id) {
	const db = await _config2.default.call(void 0, );
	//forEach map filter, find todas essas funções tem funcionalidades parecidas
	// o filter vai compara o id do meu jobId com o id do meu job, se o id for diferente então ele vai manter aquele id
	//no meu registro nesse caso no data, se o id for igual então ele vai remover aquele Id, se ele remover algum id então ele devolve um novo array
	//sem o registro que foi removido
	await db.run(`DELETE FROM jobs WHERE id = ${id}`);

	await db.close();
}

async function createJobsService(updatedJob) {
	const db = await _config2.default.call(void 0, );

	await db.run(`INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${updatedJob.name}",
                ${updatedJob["daily-hours"]},
                ${updatedJob["total-hours"]},
                ${updatedJob.created_at}
            )
        `);

	await db.close();
}


exports.createJobsService = createJobsService; exports.deleteJobsService = deleteJobsService; exports.getJobsService = getJobsService; exports.updateJobsService = updateJobsService;
