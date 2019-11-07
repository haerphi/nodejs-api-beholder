import bd from "../bd/bd";
const jwt = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY;

export const register = async (req, res) => {
    if (req.body) {
        const {email, password, firstname, lastname, nickname} = req.body;
        if (email && password && nickname) {
            //verify if email already exists
            const rep = await bd.from("user").where("email", email);
            const rep2 = await bd.from("user").where("nickname", nickname);
            if (rep.length < 1 && rep2.length < 1) {
                const obj = {
                    email,
                    password,
                    nickname,
                };
                if (firstname) {
                    obj.firstname = firstname;
                }
                if (lastname) {
                    obj.lastname = lastname;
                }
                await bd("user").insert(obj);
                res.send({
                    sucess: true,
                    message: `${email} added to the database`,
                });
            } else {
                res.send({
                    sucess: false,
                    error: "This email/name already exists in the database",
                });
            }
        } else {
            res.send({
                sucess: false,
                error: "You need to send more info",
            });
        }
    }
};

//génération du token
export const authentification = async (req, res) => {
    if (req.body) {
        const {email, password} = req.body;
        if (email && password) {
            //verify if email and password matche
            const rep = await bd
                .from("user")
                .where("email", email)
                .where("password", password);
            if (rep.length > 0) {
                //if it matches
                const token = jwt.sign({id: rep[0].id}, secret_key, {
                    expiresIn: "24h",
                });
                const userInfo = {sucess: true, token};
                if (rep[0].role === "admin") {
                    userInfo.admin = true;
                }
                res.send(userInfo);
            } else {
                res.send({
                    sucess: false,
                    error: "Email and password doesn't match",
                });
            }
            //ajouter dans la BD le token
            //TODO
        } else {
            res.send({
                sucess: false,
                error: "You need to send an email and a password",
            });
        }
    } else {
        res.send({sucess: false, error: "No token for you"});
    }
    return null;
};
