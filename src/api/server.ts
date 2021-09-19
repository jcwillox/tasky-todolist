import "dotenv/config";
import app from "./app";
import database from "./database/database";

const PORT = process.env.PORT || 5000;

database.connect();

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
