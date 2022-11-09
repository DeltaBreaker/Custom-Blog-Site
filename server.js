const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./routes");
const sequelize = require("./sql/connect.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  session({
    secret: "secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Add helper function file below if needed
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.get("/*", (req, res) => {
  res.render("404", {});
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening for requests"));
});

console.log(new Date().toDateString());
