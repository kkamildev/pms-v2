const express = require("express");

const router = express.Router();

const locationController = require('../controllers/locationController');
const { query, body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/locations

router.use(authorization());

router.get("/get-towns", [
    query("town").trim().default(null)
], locationController.getTowns);

router.use(roleAuthorization(["KSIEGOWOSC", "SEKRETARIAT"]))

router.get("/get", [
    query("taxDistrict").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("taxDistrict must be a int value")
    .toInt(),
    query("agriculturalTax").trim().default(null).optional({checkFalsy:true}).
    isIn(["0", "1"]).withMessage("agriculturalTax must be 0 or 1"),
    query("forestTax").trim().default(null).optional({checkFalsy:true}).
    isIn(["0", "1"]).withMessage("forestTax must be 0 or 1"),
    query("commune").trim().default(null),
    query("district").trim().default(null),
    query("province").trim().default(null),
    query("limit").trim().default(null).optional({checkFalsy:true}).
    isInt({min:0}).withMessage("limit must be int value greater or equal 0").
    toInt()
], locationController.getLocations);

router.put("/update", [
    body("idLocation").trim().
    exists({checkFalsy:true}).withMessage("idLocation is required"),
    body("taxDistrict").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("taxDistrict must be a int value")
    .toInt(),
    body("agriculturalTax").trim().default(null).optional({checkFalsy:true}).
    isFloat({min:0, max:9999}).withMessage("agriculturalTax must be a float positive value less than 10000").
    toFloat(),
    body("forestTax").trim().default(null).optional({checkFalsy:true}).
    isFloat({min:0, max:9999}).withMessage("forestTax must be a float positive value less than 10000").
    toFloat()
], locationController.updateLocation);

module.exports = router;