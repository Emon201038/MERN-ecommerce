//server.ts
import app from "./app";
import { envVars } from "./app/config/env";

app.listen(envVars.PORT, () => {
  console.log("Server is running on http://localhost:" + envVars.PORT);
});
