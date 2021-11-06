import database from "./database";
import { seedDatabase } from "./seed-database";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "sqlite:src/api/db.sqlite";
}

console.log("DATABASE:", process.env.DATABASE_URL);

(async () => {
  await database.connect();
  await seedDatabase();
  await database.disconnect();
  console.log("Done!");
})();
