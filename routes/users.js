
const express = require("express");
const {body} = require("express-validator");

const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/users

router.get("/get-all", userController.getAllUsers);

router.get("/logout", userController.logoutUser)

router.post("/register-admin",[
    body("name").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:50}).withMessage("name must be less or equal than 50 characters"),
    body("surname").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("surname is required").
    isLength({max:50}).withMessage("surname must be less or equal than 50 characters"),
    body("password").
    exists({checkFalsy:true}).withMessage("password is required").
    isLength({min:8}).withMessage("password is too weak")
], userController.registerAdmin);

router.post("/login-user",[
    body("idUser").trim().
    exists({checkFalsy:true}).withMessage("idUser is required"),
    body("password").exists({checkFalsy:true}).withMessage("password is required")
], userController.loginUser);

router.use(authorization());
router.use(roleAuthorization(["ADMIN"]));

router.post("/insert",[
    body("name").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:50}).withMessage("name must be less or equal than 50 characters"),
    body("surname").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("surname is required").
    isLength({max:50}).withMessage("surname must be less or equal than 50 characters"),
    body("password").
    exists({checkFalsy:true}).withMessage("password is required").
    isLength({min:8}).withMessage("password is too weak"),
    body("role").
    exists({checkFalsy:true}).withMessage("role is required").
    isIn(["ADMIN", "SEKRETARIAT", "KSIEGOWOSC", "TEREN"]).withMessage("Role is not whitelisted")
], userController.insertUser);

router.put("/update", [
    body("idUser").trim().
    exists({checkFalsy:true}).withMessage("idUser is required"),
    body("name").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:50}).withMessage("name must be less or equal than 50 characters"),
    body("surname").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("surname is required").
    isLength({max:50}).withMessage("surname must be less or equal than 50 characters"),
    body("role").
    exists({checkFalsy:true}).withMessage("role is required").
    isIn(["ADMIN", "SEKRETARIAT", "KSIEGOWOSC", "TEREN"]).withMessage("Role is not whitelisted")
], userController.updateUser);

router.put("/update-password", [
    body("idUser").trim().
    exists({checkFalsy:true}).withMessage("idUser is required"),
    body("password").
    exists({checkFalsy:true}).withMessage("Password is required").
    isLength({min:8}).withMessage("Password is too weak")
], userController.updateUserPassword);

router.delete("/delete", [
    body("idUser").trim().
    exists({checkFalsy:true}).withMessage("idUser is required"),
], userController.deleteUser);

module.exports = router;