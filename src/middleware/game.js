import bd from "../bd/bd";

export const newGame = async (req, res) => {
    if (req.body) {
        const {name, idUniverse} = req.body;
        if (name && idUniverse) {
            const obj = {name, idUniverse, idUser: req.user.id};
            //vérif si game n'existe pas déjà
            const verif = await bd
                .from("game")
                .where("idUser", req.user.id)
                .where("name", name);
            if (verif.length <= 0) {
                const rpe = await bd("game").insert(obj);
                if (rpe.rowCount > 0) {
                    const rep = await bd
                        .from("game")
                        .where("idUser", req.user.id)
                        .where("name", name);
                    res.send({sucess: true, adventureId: rep[0].id});
                } else {
                    res.send({sucess: false, error: "rien n'a été ajouter"});
                }
            } else {
                res.send({sucess: false, error: "this name is already use"});
            }
        } else {
            res.send({sucess: false, error: "name or idUniverse missing"});
        }
    } else {
        res.send({sucess: false, error: "Body missing"});
    }
};

export const getGame = async (req, res) => {
    const rep = await bd
        .from("game")
        .where("idUser", req.user.id)
        .where("id", req.params.id);
    if (rep.length > 0) {
        rep[0].character = await bd
            .from("character")
            .where("idGame", req.params.id);
        rep[0].characterSheet = (await bd
            .from("character_sheet")
            .where("idUniverse", rep[0].idUniverse))[0];
        rep[0].adventures = [
            {id: 1, name: "adventure1"},
            {id: 2, name: "adventure2"},
        ];
        rep[0].campagnes = [
            {name: "Campagne1", adventures: [3, 4]},
            {name: "Campagne2", adventures: [5, 6]},
        ];
        res.send(rep[0]);
    } else {
        res.send({sucess: false, error: "You don't own game with this id"});
    }
};

export const getGames = async (req, res) => {
    const rep = await bd.from("game").where("idUser", req.user.id);
    res.send(rep);
};

export const gameNewCharacter = async (req, res) => {
    if (req.body) {
        const {idGame, property, status} = req.body;
        if (idGame && property && status) {
            //vérif qu'il possède la game
            const repown = await bd
                .from("game")
                .where("idUser", req.user.id)
                .where("id", idGame);
            if (repown.length > 0) {
                const obj = {idGame, property, status};
                const rep = await bd("character").insert(obj);
                if (rep.rowCount > 0) {
                    res.send({
                        sucess: true,
                        message: "Nouveau personnage ajouter !",
                    });
                } else {
                    res.send({sucess: false, error: "insert error"});
                }
            } else {
                res.send({
                    sucess: false,
                    error: "You don't have a game with this id",
                });
            }
        } else {
            res.send({
                sucess: false,
                error: "idGame or property or status missing",
            });
        }
    } else {
        res.send({sucess: false, error: "Body missing"});
    }
};
