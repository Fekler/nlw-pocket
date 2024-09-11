import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../business/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (
	app,
	_opts,
) => {
	app.get("/pending-goals", async () => {
		const { pendingGoals } = await getWeekPendingGoals();
		console.log(pendingGoals);

		return { pendingGoals };
	});
};
