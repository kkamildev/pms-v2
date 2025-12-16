const express = require("express");

const router = express.Router();

const locationController = require('../controllers/locationController');
const { query, body } = require("express-validator");

router.get("/get", [
    query("taxDistrict").trim().default(null).optional().
    isInt().withMessage("taxDistrict must be a number")
    .toInt(),
    query("agriculturalTax").trim().default(null).optional().
    isWhitelisted(["0", "1"]).withMessage("agriculturalTax must be 0 or 1"),
    query("forestTax").trim().default(null).optional().
    isWhitelisted(["0", "1"]).withMessage("forestTax must be 0 or 1"),
    query("commune").trim().default(null),
    query("district").trim().default(null),
    query("province").trim().default(null),
    query("limit").trim().default(null).optional().
    isInt({min:0}).withMessage("limit must be greater or equal 0").
    toInt()
], locationController.getLocations);

router.get("/get-towns", [
    query("town").trim().default(null)
], locationController.getTowns);

router.put("/update", [
    body("idLocation").trim().
    exists({checkFalsy:true}).withMessage("idLocation is required"),
    body("taxDistrict").trim().default(null).optional().
    isInt().withMessage("taxDistrict must be a number")
    .toInt(),
    body("agriculturalTax").trim().default(null).optional().
    isFloat().withMessage("agriculturalTax must be a decimal value"),
    body("forestTax").trim().default(null).optional().
    isFloat().withMessage("forestTax must be a decimal value")
], locationController.updateLocation);

module.exports = router;