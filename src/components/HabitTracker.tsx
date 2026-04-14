import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

// Build an array of the last `weeks` weeks of dates (Mon→Sun rows)
function buildGrid(weeks = 18) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Align to the most recent Sunday as the grid end
  const endDay = new Date(today);
  endDay.setDate(today.getDate() + (6 - today.getDay()));

  const days: string[] = [];
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(endDay);
    d.setDate(endDay.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKS = 18;

function HabitRow({ habitId, name }: { habitId: Id<"habits">; name: string }) {
  const logs = useQuery(api.habits.getLogsForHabit, { habitId });
  const toggle = useMutation(api.habits.toggleLog);
  const deleteHabit = useMutation(api.habits.deleteHabit);

  const doneSet = new Set((logs ?? []).map((l) => l.date));
  const grid = buildGrid(WEEKS);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="habit-row">
      <div className="habit-row-header">
        <span className="habit-name">{name}</span>
        <div className="habit-stats">
          <span className="habit-count">{doneSet.size} days</span>
          <button
            className="habit-delete"
            title="Delete habit"
            onClick={() => {
              if (confirm(`Delete "${name}"?`)) deleteHabit({ habitId });
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div className="habit-grid-wrapper">
        <div className="day-labels">
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div
          className="habit-grid"
          style={{ gridTemplateRows: `repeat(7, 1fr)`, gridAutoFlow: "column" }}
        >
          {grid.map((date) => {
            const done = doneSet.has(date);
            const isToday = date === today;
            const isFuture = date > today;
            return (
              <button
                key={date}
                className={`habit-cell${done ? " done" : ""}${isToday ? " today" : ""}${isFuture ? " future" : ""}`}
                title={date}
                disabled={isFuture}
                onClick={() => toggle({ habitId, date })}
                aria-label={`${date}${done ? " (done)" : ""}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HabitTracker() {
  const habits = useQuery(api.habits.listHabits);
  const createHabit = useMutation(api.habits.createHabit);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);
    try {
      await createHabit({ name });
      setNewName("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="tracker">
      <div className="tracker-header">
        <h1>Habit Tracker</h1>
        <form className="add-habit-form" onSubmit={handleAdd}>
          <input
            className="add-habit-input"
            placeholder="New habit…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            maxLength={60}
            required
          />
          <button className="add-habit-btn" type="submit" disabled={adding}>
            + Add
          </button>
        </form>
      </div>

      {habits === undefined && (
        <div className="tracker-loading">
          <div className="auth-loading-spinner" />
        </div>
      )}

      {habits?.length === 0 && (
        <p className="tracker-empty">
          No habits yet. Add one above to get started!
        </p>
      )}

      <div className="habit-list">
        {habits?.map((h) => (
          <HabitRow key={h._id} habitId={h._id} name={h.name} />
        ))}
      </div>
    </div>
  );
}
