const express = require("express");
const exphbs = require("express-handlebars");
const api = require("./routes/api");
const passportStrategy = require("./config/passportConfig");
const passport = require("passport");
const connectDB = require("./config/db");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const app = express();
const port = 3000;
const MONGO_URI = process.env.MONGO_URI;

require("dotenv").config();
passportStrategy(passport);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(// to use delete in html
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

//app engine
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//ssesion
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            ttl: 2 * 24 * 60 * 60,
        }),
    })
);

//signup
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", api);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
