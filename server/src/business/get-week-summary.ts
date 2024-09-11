import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, lte, gte, eq, sql } from "drizzle-orm";

export async function getWeekSummary() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreateUpToWeek = db.$with("goals_createup_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency
			})
			.from(goals)
			.where(lte(goals.createAt, lastDayOfWeek)),
	);

	const goalsCompletedInWeek = db.$with("goals_Completed_In_Week").as(
		db
			.select({
				id: goalCompletions.id,
				title: goals.title,
				createdAt: goals.createAt,
				completed: goalCompletions.createAt,
				completedAtDate: sql /*sql*/`DATE(${goalCompletions.createAt})`.as(
					"completedAtDate",
				),
			})
			.from(goalCompletions)
			.innerJoin(goals, eq(goals.id, goalCompletions.goalId))
			.where(
				and(
					gte(goalCompletions.createAt, firstDayOfWeek),
					lte(goalCompletions.createAt, lastDayOfWeek),
				),
			),
	);
	const goalsCompletedByWeek = db.$with("goals_completed_by_week").as(
		db
			.select({
				completedAtDate: goalsCompletedInWeek.completedAtDate,
				completions: sql`
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', ${goalsCompletedInWeek.id},
                            'title', ${goalsCompletedInWeek.title},
                            'completedAt', ${goalsCompletedInWeek.completed}
                        )
                    )
                `.as("completions"),
			})
			.from(goalsCompletedInWeek)
			.groupBy(goalsCompletedInWeek.completedAtDate),
	);
	const result = await db
		.with(goalsCreateUpToWeek, goalsCompletedInWeek, goalsCompletedByWeek)
		.select()
		.from(goalsCompletedByWeek);

	return {
		summary: result,
	};
}
