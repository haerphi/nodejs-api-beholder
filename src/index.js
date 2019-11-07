import express from "express";
const bodyParser = require("body-parser");
const cors = require("cors");

import {register, login, isLogin} from "./middleware/auth";

//port for the app
const {APP_PORT, PORT} = process.env;
const port = APP_PORT || PORT || 4001;

const app = new express();

app.use(cors());
app.use(bodyParser.json());

app.post("/register", register);
app.post("/login", login);

app.use(isLogin);

app.get("/", (req, res) => {
    res.send("the app is coming soon");
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🚀🚀🚀 Listening on port: ${port}!`));
