const app = require("./app");
const { port } = require("./secret");
const connectDb = require("./src/config/db");
const logger = require("./src/controller/loggerController");

app.listen(port, async (req, res) => {
  logger.log('info',`server is running at http://localhost:${port}`);
  await connectDb();
});
