import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, lte, gte, eq, sql } from "drizzle-orm";

export async function getWeekPendingGoals() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreateUpToWeek = db.$with("goals_createup_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createAt: goals.createAt,
			})
			.from(goals)
			.where(lte(goals.createAt, lastDayOfWeek)),
	);

	const goalCompletionCounts = db.$with("goal_completion_counts").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				completionCount: count(goalCompletions.id)
					.mapWith(Number)
					.as("completionCount"),
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

	const pendingGoals = await db
		.with(goalsCreateUpToWeek, goalCompletionCounts)
		.select({
			id: goalsCreateUpToWeek.id,
			title: goalsCreateUpToWeek.title,
			desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
			completionsCount:
				sql /*sql*/`COALESCE(${goalCompletionCounts.completionCount},0)
                `.mapWith(Number),
		})
		.from(goalsCreateUpToWeek)
		.leftJoin(
			goalCompletionCounts,
			eq(goalCompletionCounts.goalId, goalsCreateUpToWeek.id),
		);

	return {
		pendingGoals,
	};
}
