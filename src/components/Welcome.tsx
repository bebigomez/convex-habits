import { authClient } from "../lib/auth-client";
import HabitTracker from "./HabitTracker";

export default function Welcome() {
  const { data: session } = authClient.useSession();
  const name = session?.user?.name;

  return (
    <div id="welcome-layout">
      <header className="app-header">
        <span className="app-header-user">
          {name ? `Hi, ${name}` : "Hi!"}
        </span>
        <button
          className="auth-form-submit welcome-signout"
          onClick={() => authClient.signOut()}
        >
          Sign Out
        </button>
      </header>
      <main className="app-main">
        <HabitTracker />
      </main>
    </div>
  );
}
