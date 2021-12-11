"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _Job = require('../model/Job');
var _jobUtils = require('../Utils/jobUtils');
var _Profile = require('../model/Profile');

 function createJobController(req, res) {
	return res.render("job");
} exports.createJobController = createJobController;

 async function saveJobController(req, res) {
	//req.body = {name: 'bar', "daily-hours': 5, 'total-hours': 40}
	await _Job.createJobsService.call(void 0, {
		name: req.body.name,
		"daily-hours": req.body["daily-hours"],
		"total-hours": req.body["total-hours"],
		created_at: Date.now() //atribuindo a data de hoje em milisegundo desde 1 de janeiro de 1970
	});

	return res.redirect("/");
} exports.saveJobController = saveJobController;

 async function showJobController(req, res) {
	const jobs = await _Job.getJobsService.call(void 0, );
	const profile = await _Profile.getProfileService.call(void 0, );

	const jobId = req.params.id;

	//vai procurar algo pra mim, funciona parecido com o foreach ele procura pra mim e retorna se o valor passado na funçaõ que determinei for verdadeiro
	//nesse caso eu estou pegando o id que chega da minha requisição e comparando com os Ids do meu data para ver se tem algum igual
	// se ele achar um Id igual ele retorna o resultado pa minha const job
	const job = jobs.find(job => Number(job.id) === Number(jobId));
	if (!job) {
		return res.send("job not found!");
	}

	job.budget = _jobUtils.calculateBudget.call(void 0, job, profile["value-hour"]);

	return res.render("job-edit", { job });
} exports.showJobController = showJobController;

 async function updateJobController(req, res) {
	const jobId = req.params.id;

	const updatedJob = {
		name: req.body.name,
		"total-hours": req.body["total-hours"],
		"daily-hours": req.body["daily-hours"]
	};

	await _Job.updateJobsService.call(void 0, updatedJob, jobId);

	res.redirect("/job/" + jobId);

} exports.updateJobController = updateJobController;

 async function deleteJobController(req, res) {
	const jobId = req.params.id;
	await _Job.deleteJobsService.call(void 0, jobId);
	return res.redirect("/");
} exports.deleteJobController = deleteJobController;

