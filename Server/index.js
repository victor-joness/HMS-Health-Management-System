import dotenv from "dotenv";
import app from "./server.js"

dotenv.config();

const port = process.env.PORT || 3000; // Define a default value if PORT is not set

app.listen(port, () => {
  console.log(`Server online na porta ${port}`);
});