import bd from "../bd/bd";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret_key = process.env.SECRET_KEY;

//génération du token
export const login = async (req, res) => {
    if (req.body) {
        const {email, password} = req.body;
        if (email && password) {
            //verify if email and password matche
            const rep = await bd.from("user").where("email", email);
            if (rep.length > 0) {
                if (bcrypt.compareSync(password, rep[0].password)) {
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
                    //password doesn't match
                    res.send({
                        sucess: false,
                        error: "Email and password doesn't match",
                    });
                }
            } else {
                //email doesn't match
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
                    password: bcrypt.hashSync(password, 10),
                    nickname,
                };
                if (firstname) {
                    obj.firstname = firstname;
                }
                if (lastname) {
                    obj.lastname = lastname;
                }
                await bd("user").insert(obj);
                login(req, res);
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

export const isLogin = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, secret_key);
            if (decoded) {
                const user = await bd.from("user").where("id", decoded.id);
                //- leny told its ok.
                // eslint-disable-next-line require-atomic-updates
                req.user = user[0];
                next();
            } else {
                res.send({
                    error: "Error dans le login",
                });
            }
        } catch (err) {
            res.send({error: err.message});
        }
    } else {
        res.send("You need login to go this way.");
    }
};

export const isAdmin = (req, res, next) => {
    next();
};
