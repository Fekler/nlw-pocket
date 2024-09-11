import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goals";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { createGoalCompletionRoute } from "./routes/create-completions";
import { getWeekPendingGoals } from "../business/get-week-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
//app.register(getPendingGoalsRoute);
app.register(createGoalCompletionRoute);
app.get("/pending-goals", async () => {
		console.log("entrou 1");

	const { pendingGoals } = await getWeekPendingGoals();
	console.log(pendingGoals);

	return { pendingGoals };
});

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("http server running");
	});
