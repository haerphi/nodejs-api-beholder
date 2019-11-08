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
            if (verif.length < 0) {
                const rpe = await bd("game").insert(obj);
                if (rpe.rowCount > 0) {
                    const rep = await bd
                        .from("game")
                        .where("idUser", req.user.id)
                        .where("name", name);
                    res.send({sucess: true, gameId: rep[0].id});
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
        res.send(rep[0]);
    } else {
        res.send({sucess: false, error: "You don't own game with this id"});
    }
};
