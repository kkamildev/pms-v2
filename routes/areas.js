const express = require("express");

const router = express.Router();

const areaController = require('../controllers/areaController');
const { body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/areas

router.use(authorization());
router.use(roleAuthorization(["KSIEGOWOSC", "SEKRETARIAT"]));

router.post("/insert", [
    body("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required").
    isLength({min:21, max:21}).withMessage("idLand must be equal 21 characters"),
    body("idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("idGroundClass is required").
    isLength({min:21, max:21}).withMessage("idGroundClass must be equal 21 characters"),
    body("area").trim().
    exists({checkFalsy:true}).withMessage("area is required").
    isFloat({min:0, max:9999}).withMessage("area must be a positive float value less than 10000").toFloat(),
    body("releasedArea").trim().default(0).optional({checkFalsy:true}).
    isFloat({min:0, max:9999}).withMessage("releasedArea must be float positive value less than 10000").toFloat()
], areaController.insertArea);

router.post("/update", [
    body("idArea").trim().
    exists({checkFalsy:true}).withMessage("idArea is required"),
    body("idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("idGroundClass is required").
    isLength({min:21, max:21}).withMessage("idGroundClass must be equal 21 characters"),
    body("area").trim().
    exists({checkFalsy:true}).withMessage("area is required").
    isFloat({min:0, max:9999}).withMessage("area must be a positive float value less than 10000").toFloat(),
    body("releasedArea").trim().default(0).optional({checkFalsy:true}).
    isFloat({min:0, max:9999}).withMessage("releasedArea must be float positive value less than 10000").toFloat()
], areaController.updateArea);

router.post("/delete", [
    body("idArea").trim().
    exists({checkFalsy:true}).withMessage("idArea is required")
], areaController.deleteArea);

module.exports = router;