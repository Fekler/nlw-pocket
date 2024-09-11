import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../../business/create-goal-completion";

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (
	app,
	_opts,
) => {
	app.post(
		"/completions",
		{
			schema: {
				body: z.object({
					goalId: z.string(),
				}),
			},
		},
		async (request) => {
			const { goalId } = request.body;
			const result = await createGoalCompletion({
				goalId
			})
		},
	)
}
