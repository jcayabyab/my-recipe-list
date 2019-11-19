module.exports = app => {
  app.get("/api/server", async (req, res) => {
    res.send({});
  });
};
