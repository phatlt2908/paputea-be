module.exports = function (app) {
  app.route("/").get((req, res) => {
    res.send({ msg: "Welcome to Paputea" });
  });

  app.use("/auth", require("./master/auth-router"));
  app.use("/user", require("./master/user-router"));
  app.use("/master/class", require("./master/class-router"));
  app.use("/master/tutor", require("./master/tutor-router"));

  app.use("/tutor", require("./service/tutor-router"));
  app.use("/class", require("./service/class-router"));
  app.use("/static", require("./service/static-router"));
  app.use("/image", require("./service/image-router"));

  app.all("*", (req, res) => {
    res.status(404).send({ msg: "not found" });
  });
};
