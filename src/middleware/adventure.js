import bd from "../bd/bd";

export const newAdventure = async (req, res) => {
    if (req.body) {
        const {idGame, name} = req.body;
        if (idGame && name) {
            const obj = {idGame, name};
            const verify = await await bd
                .from("adventure")
                .where("idGame", idGame)
                .where("name", name);
            if (verify.length >= 0) {
                const rpe = await bd("adventure").insert(obj);
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
            res.send({sucess: false, error: "idGame or name missing"});
        }
    } else {
        res.send({sucess: false, error: "Body missing"});
    }
};
