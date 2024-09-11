import dayjs from "dayjs";
import { and, count, lte, gte, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

interface ICreateGoalCompletion {
	goalId: string;
}

export async function createGoalCompletion({ goalId }: ICreateGoalCompletion) {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalCompletionCounts = db.$with("goal_completion_counts").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				completionCount: count(goalCompletions.id).as("completionCount"),
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createAt, firstDayOfWeek),
					lte(goalCompletions.createAt, lastDayOfWeek),
				),
			)
			.groupBy(goalCompletions.goalId),
	);

	const result = await db
		.with(goalCompletionCounts)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionsCount:
				sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
					Number,
				),
		})
		.from(goals)
		.leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
		.where(eq(goals.id, goalId))
		.limit(1);

	const { completionsCount, desiredWeeklyFrequency } = result[0];

	if (completionsCount >= desiredWeeklyFrequency) {
		throw new Error("Goal completed this week");
	} 

		const insert = await db
			.insert(goalCompletions)
			.values({ goalId })
			.returning();
	const goalCompletion = insert[0];

	return {
		goalCompletion,
	};
}
