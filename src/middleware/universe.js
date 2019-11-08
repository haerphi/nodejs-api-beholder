import bd from "../bd/bd";

export const newUniverse = async (req, res) => {
    if (req.body) {
        const {name, style} = req.body;
        if (name) {
            const obj = {name};
            if (style) {
                obj.style = style;
            }
            await bd("universe").insert(obj);
            res.send({sucess: true, message: "world created"});
        } else {
            res.send({sucess: false, error: "Name property missing"});
        }
    } else {
        res.send({sucess: false, error: "Body missing"});
    }
};

export const getUniverses = async (req, res) => {
    const rep = await bd.from("universe");
    res.send(rep);
};

export const getUniverse = async (req, res) => {
    const rep = await bd.from("universe").where("id", req.params.id);
    res.send(rep[0]);
};

export const newCharacterSheet = async (req, res) => {
    if (req.body) {
        const {idUniverse, property} = req.body;
        if (idUniverse && property) {
            const obj = {
                idUniverse,
                property,
            };
            const rep = await bd("character_sheet").insert(obj);
            if (rep.rowCount > 0) {
                res.send({
                    sucess: true,
                    message: `A new Character sheet has been added to the universe: ${idUniverse}`,
                });
            } else {
                res.send({
                    sucess: false,
                    error: "Error in insert",
                });
            }
        } else {
            res.send({
                sucess: false,
                error: "idUniverse or property is missing",
            });
        }
    } else {
        res.send({sucess: false, error: "Body missing"});
    }
};
