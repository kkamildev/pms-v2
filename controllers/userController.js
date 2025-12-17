
const bcrypt = require("bcrypt");

const User = require("../models/User");
const config = require("../util/config");
const withErrorHandling = require("../middlewares/withErrorHandling");
const jwt = require("jsonwebtoken");

exports.getAllUsers = withErrorHandling(async (req, res) => {
    const users = await User.findAll({
        attributes:["id", "name", "surname", "role"],
        order:[
            ["role", "ASC"]
        ]
    });
    res.status(200).json({success:true, message:"Pobrano użytkowników", users});
});

exports.registerAdmin = withErrorHandling(async (req, res) => {
    const {name, surname, password} = req.body;
    const adminExist = await User.count({
        where:{
            role:"ADMIN"
        }
    });
    const passwordHash = await bcrypt.hash(password, config.saltOrRounds);
    if(adminExist == 0) {
        await User.create({
            name,
            surname,
            passwordHash,
            role:"ADMIN"
        });
        res.status(200).json({success:true, message:"Zarejestrowano pomyślnie konto ADMIN"})
    } else {
        res.status(406).json({error:"Konto Admin już istnieje"})
    }
});

exports.loginUser = withErrorHandling(async (req, res) => {
    const {idUser, password} = req.body;
    const userExist = await User.count({where:{id:idUser}});
    if(userExist == 0) {
        res.status(400).json({error:"Nie ma takiego użytkownika"})
    } else {
        const user = await User.findByPk(idUser);
        if(await bcrypt.compare(password, user.passwordHash)) {
            // create token
            const payload = {
                id:user.id,
                name:user.name,
                surname:user.surname,
                role:user.role
            }
            const refreshToken = jwt.sign(payload, config.refreshTokenKey, {expiresIn:"8h"})
            res.cookie("REFRESH_TOKEN", refreshToken, {
                maxAge:1000 * 60 * 60 * 8,
                httpOnly:true,
                secure:config.cookieSecurity
            })
            res.status(200).json({success:true, message:"Zalogowano pomyślnie", payload})
        } else {
            res.status(400).json({error:"Złe hasło"})
        }
    }
});

exports.logoutUser = withErrorHandling(async (req, res) => {
    res.clearCookie("ACCESS_TOKEN")
    res.clearCookie("REFRESH_TOKEN")
    res.status(200).json({success:true, message:"Wylogowano"})
});

exports.updateUser = withErrorHandling(async (req, res) => {
    const {idUser, name, surname, role} = req.body
    const [affectedRows] = await User.update({name, surname, role}, {where:{id:idUser}})
    res.status(200).json({success:true, message:"Użytkownik zaktualizowany", affectedRows});
});

exports.updateUserPassword = withErrorHandling(async (req, res) => {
    const {idUser, password} = req.body;
    const passwordHash = await bcrypt.hash(password, config.saltOrRounds);
    const [affectedRows] = await User.update({passwordHash}, {where:{id:idUser}})
    res.status(200).json({success:true, message:"Hasło zaktualizowane", affectedRows});
});

exports.insertUser = withErrorHandling(async (req, res) => {
    const {name, surname, password, role} = req.body
    const passwordHash = await bcrypt.hash(password, config.saltOrRounds);
    await User.create({name, surname, passwordHash, role});
    res.status(201).json({success:true, message:"Dodano użytkownika"});
})

exports.deleteUser = withErrorHandling(async (req, res) => {
    const {idUser} = req.body;
    const deletedRows = await User.destroy({where:{id:idUser}})
    res.status(200).json({success:true, message:"Usunięto użytkowika", deletedRows});
});
