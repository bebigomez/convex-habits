import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

async function requireUserId(ctx: Parameters<typeof authComponent.getAuthUser>[0]) {
  const user = await authComponent.getAuthUser(ctx);
  if (!user) throw new Error("Not authenticated");
  return user._id as string;
}

// ── Habits ──────────────────────────────────────────────────────────────────

export const listHabits = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    return ctx.db
      .query("habits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const createHabit = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await requireUserId(ctx);
    console.log('userId ->', userId);
    
    return ctx.db.insert("habits", {
      userId,
      name: name.trim(),
      createdAt: Date.now(),
    });
  },
});

export const deleteHabit = mutation({
  args: { habitId: v.id("habits") },
  handler: async (ctx, { habitId }) => {
    const userId = await requireUserId(ctx);
    const habit = await ctx.db.get(habitId);
    if (!habit || habit.userId !== userId) throw new Error("Not found");
    // Remove all logs for this habit
    const logs = await ctx.db
      .query("habitLogs")
      .withIndex("by_habit_and_date", (q) => q.eq("habitId", habitId))
      .collect();
    await Promise.all(logs.map((l) => ctx.db.delete(l._id)));
    await ctx.db.delete(habitId);
  },
});

// ── Habit Logs ───────────────────────────────────────────────────────────────

export const getLogsForHabit = query({
  args: { habitId: v.id("habits") },
  handler: async (ctx, { habitId }) => {
    const userId = await requireUserId(ctx);
    const habit = await ctx.db.get(habitId);
    if (!habit || habit.userId !== userId) return [];
    return ctx.db
      .query("habitLogs")
      .withIndex("by_habit_and_date", (q) => q.eq("habitId", habitId))
      .collect();
  },
});

export const toggleLog = mutation({
  args: { habitId: v.id("habits"), date: v.string() },
  handler: async (ctx, { habitId, date }) => {
    const userId = await requireUserId(ctx);
    const habit = await ctx.db.get(habitId);
    if (!habit || habit.userId !== userId) throw new Error("Not found");

    const existing = await ctx.db
      .query("habitLogs")
      .withIndex("by_habit_and_date", (q) =>
        q.eq("habitId", habitId).eq("date", date)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("habitLogs", { habitId, userId, date });
      return true;
    }
  },
});
