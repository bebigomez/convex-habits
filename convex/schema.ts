import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  habits: defineTable({
    userId: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  habitLogs: defineTable({
    habitId: v.id("habits"),
    userId: v.string(),
    date: v.string(), // "YYYY-MM-DD"
  })
    .index("by_habit_and_date", ["habitId", "date"])
    .index("by_user", ["userId"]),
});
