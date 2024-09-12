import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goals";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { createGoalCompletionRoute } from "./routes/create-completions";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(getPendingGoalsRoute);
app.register(createGoalCompletionRoute);
app.register(getWeekSummaryRoute);

app.register(fastifyCors, { origin: "*" });

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("http server running");
	});
