module.exports = app => {
  /**
   * app.post is a function that accepts two arguments: a string and a callback function.
   * When a request is made to the first argument (/api/calculator/square), then
   * the callback function in the second arument is invoked.
   *
   * This callback function also accepts two arguments: req and res.
   * req is a JavaScript that contains all of the request data (another JS object)
   * inside of the attribute req.body.
   *
   */
  app.post("/api/calculator/square", (req, res) => {
    // I console.log req.body here. As you can see, it is a javascript object.
    // Sidenote: console.log accepts multiple arguments to display. Use multiple
    // arguments instead of string concatenation.
    console.log("req.body: ", req.body);

    // JS objects can be accessed just like Java objects with the dot notation.
    console.log("req.body.input: " + req.body.input);

    const number = req.body.input;

    // res.send is a function that accepts a javascript object. This completes the
    // HTTP request and sends the object back to the front end.
    res.send({ result: Math.pow(number, 2) });
  });

  app.post("/api/calcuator/negative", (req, res) => {
    // Implement the negative of the number
  });

  app.get("/api/test", (req, res) => {
    res.send({result: "Hello"});
  })
};
