
const express = require("express");

const router = express.Router();

const rentController = require('../controllers/rentController');
const { body } = require("express-validator");

router.post("/insert",[
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required").
    isLength({min:21, max:21}).withMessage("idRenter must be equal 21 characters"),
    body("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required").
    isLength({min:21, max:21}).withMessage("idLand must be equal 21 characters"),
    body("startDate").trim().
    exists({checkFalsy:true}).withMessage("startDate is required").
    isDate().withMessage("startDate must be a date").toDate(),
    body("endDate").trim().
    exists({checkFalsy:true}).withMessage("endDate is required").
    isDate().withMessage("endDate must be a date").toDate(),
    body("rental").trim().
    exists({checkFalsy:true}).withMessage("rental is required").
    isInt({max:8000000000}).withMessage("rental must be int value less or equal 8 milions").
    toInt(),
    body("issueRentalFactureDate").trim().
    exists({checkFalsy:true}).withMessage("issueRentalFactureDate is required").
    isDate().withMessage("issueRentalFactureDate must be a date").toDate(),
], rentController.insertRent);

router.put("/update",[
    body("idRent").trim().
    exists({checkFalsy:true}).withMessage("idRent is required"),
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required").
    isLength({min:21, max:21}).withMessage("idRenter must be equal 21 characters"),
    body("startDate").trim().
    exists({checkFalsy:true}).withMessage("startDate is required").
    isDate().withMessage("startDate must be a date").toDate(),
    body("endDate").trim().
    exists({checkFalsy:true}).withMessage("endDate is required").
    isDate().withMessage("endDate must be a date").toDate(),
    body("rental").trim().
    exists({checkFalsy:true}).withMessage("rental is required").
    isInt({max:8000000000}).withMessage("rental must be int value less or equal 8 milions").
    toInt(),
    body("issueRentalFactureDate").trim().
    exists({checkFalsy:true}).withMessage("issueRentalFactureDate is required").
    isDate().withMessage("issueRentalFactureDate must be a date").toDate(),
], rentController.updateRent);

router.delete("/delete", [
    body("idRent").trim().
    exists({checkFalsy:true}).withMessage("idRent is required"),
], rentController.deleteRent);

module.exports = router;