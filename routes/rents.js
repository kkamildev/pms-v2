
const express = require("express");

const router = express.Router();

const rentController = require('../controllers/rentController');
const { body } = require("express-validator");

router.post("/insert",[
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required"),
    body("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required"),
    body("startDate").trim().
    exists({checkFalsy:true}).withMessage("startDate is required").
    isDate().withMessage("startDate is not valid date format").toDate(),
    body("endDate").trim().
    exists({checkFalsy:true}).withMessage("endDate is required").
    isDate().withMessage("endDate is not valid date format").toDate(),
    body("rental").trim().
    exists({checkFalsy:true}).withMessage("rental is required").
    isInt({min:1, max:8000000000}).withMessage("rental must be less or equal 8 milions").
    toInt(),
    body("issueRentalFactureDate").trim().
    exists({checkFalsy:true}).withMessage("issueRentalFactureDate is required").
    isDate().withMessage("issueRentalFactureDate is not valid date format").toDate(),
], rentController.insertRent);

router.put("/update",[
    body("idRent").trim().
    exists({checkFalsy:true}).withMessage("idRent is required"),
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required"),
    body("startDate").trim().
    exists({checkFalsy:true}).withMessage("startDate is required").
    isDate().withMessage("startDate is not valid date format").toDate(),
    body("endDate").trim().
    exists({checkFalsy:true}).withMessage("endDate is required").
    isDate().withMessage("endDate is not valid date format").toDate(),
    body("rental").trim().
    exists({checkFalsy:true}).withMessage("rental is required").
    isInt({min:1, max:8000000000}).withMessage("rental must be less or equal 8 milions").
    toInt(),
    body("issueRentalFactureDate").trim().
    exists({checkFalsy:true}).withMessage("issueRentalFactureDate is required").
    isDate().withMessage("issueRentalFactureDate is not valid date format").toDate(),
], rentController.updateRent);

router.delete("/delete", [
    body("idRent").trim().
    exists({checkFalsy:true}).withMessage("idRent is required"),
], rentController.deleteRent);

module.exports = router;