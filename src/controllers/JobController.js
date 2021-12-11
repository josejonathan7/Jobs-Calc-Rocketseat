import { createJobsService, getJobsService,  updateJobsService, deleteJobsService } from "../model/Job";
import {calculateBudget } from "../Utils/jobUtils";
import { getProfileService } from "../model/Profile";

export function createJobController(req, res) {
	return res.render("job");
}

export async function saveJobController(req, res) {
	//req.body = {name: 'bar', "daily-hours': 5, 'total-hours': 40}
	await createJobsService({
		name: req.body.name,
		dailyHours: req.body.dailyHours,
		totalHours: req.body.totalHours,
		created_at: Date.now() //atribuindo a data de hoje em milisegundo desde 1 de janeiro de 1970
	});

	return res.redirect("/");
}

export async function showJobController(req, res) {
	const jobs = await getJobsService();
	const profile = await getProfileService();

	const jobId = req.params.id;

	//vai procurar algo pra mim, funciona parecido com o foreach ele procura pra mim e retorna se o valor passado na funçaõ que determinei for verdadeiro
	//nesse caso eu estou pegando o id que chega da minha requisição e comparando com os Ids do meu data para ver se tem algum igual
	// se ele achar um Id igual ele retorna o resultado pa minha const job
	const job = jobs.find(job => Number(job.id) === Number(jobId));
	if (!job) {
		return res.send("job not found!");
	}

	job.budget = calculateBudget(job, profile["value-hour"]);

	return res.render("job-edit", { job });
}

export async function updateJobController(req, res) {
	const jobId = req.params.id;

	const updatedJob = {
		name: req.body.name,
		totalHours: req.body.totalHours,
		dailyHours: req.body.dailyHours
	};

	await updateJobsService(updatedJob, jobId);

	res.redirect("/job/" + jobId);

}

export async function deleteJobController(req, res) {
	const jobId = req.params.id;
	await deleteJobsService(jobId);
	return res.redirect("/");
}

