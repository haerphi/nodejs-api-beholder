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
