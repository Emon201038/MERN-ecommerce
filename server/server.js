const app = require("./app");
const { port } = require("./secret");
const dbConnection = require("./src/config/db");

app.listen(port, (req, res) => {
  console.log(`server is running at http://localhost:${port}`);
  dbConnection();
});
