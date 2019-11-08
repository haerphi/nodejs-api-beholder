import express from "express";
const bodyParser = require("body-parser");
const cors = require("cors");

import {register, login, isLogin, isAdmin} from "./middleware/auth";
import {getUser} from "./middleware/user";
import {
    newUniverse,
    getUniverses,
    getUniverse,
    newCharacterSheet,
} from "./middleware/universe";
import {newGame, getGames, getGame, gameNewCharacter} from "./middleware/game";

//port for the app
const {APP_PORT, PORT} = process.env;
const port = APP_PORT || PORT || 4001;

const app = new express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("the app is coming soon");
});

app.post("/register", register);
app.post("/login", login);

app.use(isLogin);

app.get("/getUser", getUser);

app.get("/getUniverses", getUniverses);
app.get("/getUniverse/:id", getUniverse);

app.post("/newGame", newGame);
app.get("/getGames", getGames);
app.get("/getGame/:id", getGame);
app.post("/game/newCharacter", gameNewCharacter);

app.use(isAdmin);

app.post("/newUniverse", newUniverse);
app.post("/newCharacterSheet", newCharacterSheet);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🚀🚀🚀 Listening on port: ${port}!`));
