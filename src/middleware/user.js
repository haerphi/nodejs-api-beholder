import bd from "../bd/bd";

const getTabContact = async id => {
    const rep = await bd("user_x_user")
        .where("idUser1", id)
        .orWhere("idUser2", id);

    const tabPromises = [];
    for (const element of rep) {
        if (element.idUser1 !== id) {
            tabPromises.push(bd("user").where("id", element.idUser1));
        } else {
            tabPromises.push(bd("user").where("id", element.idUser2));
        }
    }
    const tabRep = await Promise.all(tabPromises);
    const final = [];
    for (const element of tabRep) {
        delete element[0].password;
        delete element[0].email;
        final.push(element[0]);
    }

    return final;
};

export const getUser = async (req, res) => {
    const contact = await getTabContact(req.user.id);
    const obj = {
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        nickname: req.user.nickname,
        avatar: req.user.avatar,
        contact,
    };
    res.send(obj);
};
