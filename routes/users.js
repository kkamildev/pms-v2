
const express = require("express");

const router = express.Router();

const userController = require('../controllers/userController');

router.get("/get-all", userController.getAllUsers);

router.get("/", userController.logoutUser)

router.post("/register-admin", userController.registerAdmin);

router.post("/login-user", userController.loginUser);

router.post("/insert", userController.insertUser);

router.put("/update", userController.updateUser);

router.put("/update-password", userController.updateUserPassword);

router.delete("/delete", userController.deleteUser);

module.exports = router;