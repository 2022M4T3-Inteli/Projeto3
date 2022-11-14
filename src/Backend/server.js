// environment variables
require("dotenv").config({ path: "./config.env" });

// server
const app = require("./app");

app.listen(process.env.PORT || 8000, process.env.HOST || "10.128.64.73", () =>
  console.log(`Server running on port ${process.env.PORT || 8000}`)
);
