
const express = require("express");

const router = express.Router();

const landController = require('../controllers/landController');
const { query, body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/lands

router.use(authorization());

router.get("/serial-exist", [
    query("serialNumber").trim().
    exists({checkFalsy:true}).withMessage("serialNumber is required")
], landController.getSerialExist);

router.get("/get-one", [
    query("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required")
], landController.getLand);

router.get("/get", [
    query("serialFilter").trim().default(null),
    query("purchaseYearFilter").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("purchaseYearFilter must be a int value").toInt(),
    query("lowSellDateFilter").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("lowSellDateFilter must be a date").toDate(),
    query("highSellDateFilter").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("highSellDateFilter must be a date").toDate(),
    query("ownerFilter").trim().default(null),
    query("purposeFilter").trim().default(null),
    query("rentFilter").trim().default(null).optional({checkFalsy:false}).
    isBoolean().withMessage("rentFilter must be a boolean value").toBoolean(),
    query("lowAreaFilter").trim().default(null).optional({checkFalsy:true}).
    isFloat().withMessage("lowAreaFilter must be a float value").toFloat(),
    query("highAreaFilter").trim().default(null).optional({checkFalsy:true}).
    isFloat().withMessage("highAreaFilter must be a float value").toFloat(),
    query("communeFilter").trim().default(null),
    query("districtFilter").trim().default(null),
    query("provinceFilter").trim().default(null),
    query("townFilter").trim().default(null),
    query("landNumberFilter").trim().default(null),
    query("groundClassFilter").trim().default(null),
    query("limit").trim().default(null).optional({checkFalsy:true}).
    isInt({min:0}).withMessage("limit must be a int value greater or equal 0").toInt()

], landController.getLands);

router.get("/get-rent", landController.getRentLands);

router.get("/get-insertion-data", landController.getLandInsertionRequiredData);

router.post("/insert", [
    body("serialNumber").trim().exists({checkFalsy:true}).withMessage("serialNumber is required").
    isLength({max:20}).withMessage("serialNumber must be less or equal 20 characters"),
    body("landNumber").trim().
    exists({checkFalsy:true}).withMessage("landNumber is required").
    isLength({max:7}).withMessage("landNumber must be less or equal 7 characters"),
    body("area").trim().
    exists({checkFalsy:true}).withMessage("area is required").
    isFloat({min:0, max:9999.9999}).withMessage("area must be a float positive value less than 10000").toFloat(),
    body("town").trim().
    exists({checkFalsy:true}).withMessage("town is required").
    isLength({max:50}).withMessage("town must be less or equal 50 characters"),
    body("commune").trim().
    exists({checkFalsy:true}).withMessage("commune is required").
    isLength({max:50}).withMessage("commune must be less or equal 50 characters"),
    body("district").trim().
    exists({checkFalsy:true}).withMessage("district is required").
    isLength({max:50}).withMessage("district must be less or equal 50 characters"),
    body("province").trim().
    exists({checkFalsy:true}).withMessage("province is required").
    isLength({max:50}).withMessage("province must be less or equal 50 characters"),
    body("idOwner").trim().
    exists({checkFalsy:true}).withMessage("idOwner is required").
    isLength({min:21, max:21}).withMessage("idOwner must be equal 21 characters"),
    body("registerNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:15}).withMessage("registerNumber must be less or equal 15 characters"),
    body("mortgage").trim().default(false).optional({checkFalsy:true}).
    isBoolean().withMessage("mortage must be a boolean value").toBoolean(),
    body("idLandType").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idLandType must be equal 21 characters"),
    body("description").trim().default(null).optional({checkFalsy:true}).
    isLength({max:65535}).withMessage("description must be less or equal 65535 characters"),
    body("idLandPurpose").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idLandPurpose must be equal 21 characters"),
    body("idMpzp").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idMpzp must be equal 21 characters"),
    body("idGeneralPlan").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idGeneralPlan must be equal 21 characters"),
    body("waterCompany").trim().default(false).optional({checkFalsy:true}).
    isBoolean().withMessage("waterCompany must be a boolean value"),
    body("purchaseDate").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("purchaseDate must be a date"),
    body("purchaseActNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:21}).withMessage("purchaseActNumber must be less or equal 21 characters"),
    body("seller").trim().default(null).optional({checkFalsy:true}).
    isLength({max:50}).withMessage("seller must be less or equal 50 characters"),
    body("purchasePrice").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("purchasePrice must be a int value").toInt(),
    body("sellDate").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("sellDate must be a date"),
    body("sellActNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:21}).withMessage("sellActNumber must be less or equal 21 characters"),
    body("buyer").trim().default(null).optional({checkFalsy:true}).
    isLength({max:50}).withMessage("buyer must be less or equal 50 characters"),
    body("sellPrice").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("sellPrice must be a int value").toInt(),
    body("propertyTax").trim().
    exists({checkFalsy:true}).withMessage("propertyTax is required").
    isBoolean().withMessage("propertyTax must be a boolean value").toBoolean()

], landController.insertLand);

router.put("/update", [
    body("idLand").trim().exists({checkFalsy:true}).withMessage("idLand is required"),
    body("serialNumber").trim().exists({checkFalsy:true}).withMessage("serialNumber is required").
    isLength({max:20}).withMessage("serialNumber must be less or equal 20 characters"),
    body("landNumber").trim().
    exists({checkFalsy:true}).withMessage("landNumber is required").
    isLength({max:7}).withMessage("landNumber must be less or equal 7 characters"),
    body("area").trim().
    exists({checkFalsy:true}).withMessage("area is required").
    isFloat({min:0, max:9999.9999}).withMessage("area must be a float positive value less than 10000").toFloat(),
    body("town").trim().
    exists({checkFalsy:true}).withMessage("town is required").
    isLength({max:50}).withMessage("town must be less or equal 50 characters"),
    body("commune").trim().
    exists({checkFalsy:true}).withMessage("commune is required").
    isLength({max:50}).withMessage("commune must be less or equal 50 characters"),
    body("district").trim().
    exists({checkFalsy:true}).withMessage("district is required").
    isLength({max:50}).withMessage("district must be less or equal 50 characters"),
    body("province").trim().
    exists({checkFalsy:true}).withMessage("province is required").
    isLength({max:50}).withMessage("province must be less or equal 50 characters"),
    body("idOwner").trim().
    exists({checkFalsy:true}).withMessage("idOwner is required").
    isLength({min:21, max:21}).withMessage("idOwner must be equal 21 characters"),
    body("registerNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:15}).withMessage("registerNumber must be less or equal 15 characters"),
    body("mortgage").trim().default(false).optional({checkFalsy:true}).
    isBoolean().withMessage("mortage must be a boolean value").toBoolean(),
    body("idLandType").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idLandType must be equal 21 characters"),
    body("description").trim().default(null).optional({checkFalsy:true}).
    isLength({max:65535}).withMessage("description must be less or equal 65535 characters"),
    body("idLandPurpose").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idLandPurpose must be equal 21 characters"),
    body("idMpzp").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idMpzp must be equal 21 characters"),
    body("idGeneralPlan").trim().default(null).optional({checkFalsy:true}).
    isLength({min:21, max:21}).withMessage("idGeneralPlan must be equal 21 characters"),
    body("waterCompany").trim().default(false).optional({checkFalsy:true}).
    isBoolean().withMessage("waterCompany must be a boolean value"),
    body("purchaseDate").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("purchaseDate must be a date"),
    body("purchaseActNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:21}).withMessage("purchaseActNumber must be less or equal 21 characters"),
    body("seller").trim().default(null).optional({checkFalsy:true}).
    isLength({max:50}).withMessage("seller must be less or equal 50 characters"),
    body("purchasePrice").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("purchasePrice must be a int value").toInt(),
    body("sellDate").trim().default(null).optional({checkFalsy:true}).
    isDate().withMessage("sellDate must be a date"),
    body("sellActNumber").trim().default(null).optional({checkFalsy:true}).
    isLength({max:21}).withMessage("sellActNumber must be less or equal 21 characters"),
    body("buyer").trim().default(null).optional({checkFalsy:true}).
    isLength({max:50}).withMessage("buyer must be less or equal 50 characters"),
    body("sellPrice").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("sellPrice must be a int value").toInt(),
    body("propertyTax").trim().
    exists({checkFalsy:true}).withMessage("propertyTax is required").
    isBoolean().withMessage("propertyTax must be a boolean value").toBoolean()
], landController.updateLand);

router.use(roleAuthorization(["ADMIN"]));

router.delete("/delete",[
    body("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required")
], landController.deleteLand);

module.exports = router;