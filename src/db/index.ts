import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    // In practice, maybe we would want to return a database-like object
    // so that the app can start up without a DB configured. I've opted for the
    // loud failure here to make types simpler and highlight the missing config.
    throw new Error("DATABASE_URL is not set");
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
