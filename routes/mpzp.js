
const express = require("express");

const router = express.Router();

const mpzpController = require('../controllers/mpzpController');
const { body } = require("express-validator");

router.get("/get-all", mpzpController.getAllMpzp);

router.post("/insert", [
    body("code").trim().
    exists({checkFalsy:true}).withMessage("code is required").
    isLength({max:5}).withMessage("code must be less or equal 5 characters"),
    body("description").trim().
    exists({checkFalsy:true}).withMessage("description is required").
    isLength({max:70}).withMessage("description must be less or equal 70 characters"),
], mpzpController.insertMpzp);

router.post("/insert-file", mpzpController.insertMpzpFile);

router.put("/update", [
    body("idMpzp").trim().
    exists({checkFalsy:true}).withMessage("idMpzp is required"),
    body("code").trim().
    exists({checkFalsy:true}).withMessage("code is required").
    isLength({max:5}).withMessage("code must be less or equal 5 characters"),
    body("description").trim().
    exists({checkFalsy:true}).withMessage("description is required").
    isLength({max:70}).withMessage("description must be less or equal 70 characters"),
], mpzpController.updateMpzp);

router.delete("/delete", [
    body("idMpzp").trim().
    exists({checkFalsy:true}).withMessage("idMpzp is required")
], mpzpController.deleteMpzp);

module.exports = router;