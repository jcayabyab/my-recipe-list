const express = require("express");
const bodyParser = require("body-parser");
require("./services/exampleService");

const app = express();

// middlewares / services go here
app.use(bodyParser.json());

// routes go here
require("./routes/serverRoutes")(app);
require("./routes/devRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
