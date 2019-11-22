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
import {newAdventure} from "./middleware/adventure";

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
//update user
//delete user
//friend request
//friend delete

app.get("/getUniverses", getUniverses);
app.get("/getUniverse/:id", getUniverse);

app.post("/newGame", newGame);
app.get("/getGames", getGames);
app.get("/getGame/:id", getGame);
//delete Game

app.post("/game/newAdventure", newAdventure);
//get adventure => return tout les actes avec les chapitres et scenes
//delete adventure

//new campagne
//delete campagne

app.post("/game/newCharacter", gameNewCharacter);
//delete character

app.use(isAdmin);

app.post("/newUniverse", newUniverse);
//delete universe
//update universe
app.post("/newCharacterSheet", newCharacterSheet);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🚀🚀🚀 Listening on port: ${port}!`));
