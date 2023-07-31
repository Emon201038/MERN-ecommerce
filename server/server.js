const app = require("./app");
const { port } = require("./secret");
const connectDb = require("./src/config/db");

app.listen(port, async (req, res) => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDb();
});
