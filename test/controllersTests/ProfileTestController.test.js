import jest, { describe, test, expect } from "@jest/globals";

import { index, update } from "../../src/controllers/ProfileController";

describe("#Testando os métodos do job", () => {
	const data ={
		name: "José  ",
		avatar: "https://avatars.githubusercontent.com/u/71531287?v=4",
		"monthly-budget": "6000",
		"hours-per-day": "4",
		"days-per-week": "6",
		"vacation-per-year": "8"
	};

	test("-> ola", async () => {
		const obj = await update(data);



		expect(obj).toHaveBeenCalled();


	});
});
