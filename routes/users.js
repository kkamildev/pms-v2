
const express = require("express");
const {body} = require("express-validator");

const router = express.Router();
const userController = require('../controllers/userController');

router.get("/get-all", userController.getAllUsers);

router.get("/logout", userController.logoutUser)

router.post("/register-admin",[
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Name is required").
    isLength({max:50}).withMessage("Name must be less or equal than 50 characters"),
    body("surname").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Surname is required").
    isLength({max:50}).withMessage("Surname must be less or equal than 50 characters"),
    body("password").
    exists({checkFalsy:true}).withMessage("Password is required").
    isLength({min:8}).withMessage("Password is too weak")
], userController.registerAdmin);

router.post("/login-user", userController.loginUser);

router.post("/insert",[
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Name is required").
    isLength({max:50}).withMessage("Name must be less or equal than 50 characters"),
    body("surname").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Surname is required").
    isLength({max:50}).withMessage("Surname must be less or equal than 50 characters"),
    body("password").
    exists({checkFalsy:true}).withMessage("Password is required").
    isLength({min:8}).withMessage("Password is too weak"),
    body("role").
    exists({checkFalsy:true}).withMessage("Role is required").
    isWhitelisted(["ADMIN", "SEKRETARIAT", "KSIEGOWOSC", "TEREN"]).withMessage("Role is not whitelisted")
], userController.insertUser);

router.put("/update", [
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Name is required").
    isLength({max:50}).withMessage("Name must be less or equal than 50 characters"),
    body("surname").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("Surname is required").
    isLength({max:50}).withMessage("Surname must be less or equal than 50 characters"),
    body("password").
    exists({checkFalsy:true}).withMessage("Password is required").
    isLength({min:8}).withMessage("Password is too weak"),
    body("role").
    exists({checkFalsy:true}).withMessage("Role is required").
    isWhitelisted(["ADMIN", "SEKRETARIAT", "KSIEGOWOSC", "TEREN"]).withMessage("Role is not whitelisted")
], userController.updateUser);

router.put("/update-password", [
    body("password").
    exists({checkFalsy:true}).withMessage("Password is required").
    isLength({min:8}).withMessage("Password is too weak")
], userController.updateUserPassword);

router.delete("/delete", userController.deleteUser);

module.exports = router;