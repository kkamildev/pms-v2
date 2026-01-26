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
    body("areasData").exists({checkFalsy:true}).withMessage("areasData is required").isArray().withMessage("areasData must be an array"),
    body("areasData.*.idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("areasData.*.idGroundClass is required").
    isLength({min:21, max:21}).withMessage("areasData.*.idGroundClass must be equal 21 characters"),
    body("areasData.*.area").trim().
    exists({checkFalsy:true}).withMessage("areasData.*.area is required").
    isFloat({min:0, max:9999}).withMessage("areasData.*.area must be a positive float value less than 10000").toFloat(),
], areaController.insertAreas);

router.put("/update", [
    body("areasData").exists({checkFalsy:true}).withMessage("areasData is required").isArray().withMessage("areasData must be an array"),
    body("areasData.*.idArea").trim().
    exists({checkFalsy:true}).withMessage("areasData.*.idArea is required"),
    body("areasData.*.idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("areasData.*.idGroundClass is required").
    isLength({min:21, max:21}).withMessage("areasData.*.idGroundClass must be equal 21 characters"),
    body("areasData.*.area").trim().
    exists({checkFalsy:true}).withMessage("areasData.*.area is required").
    isFloat({min:0, max:9999}).withMessage("areasData.*.area must be a positive float value less than 10000").toFloat(),
], areaController.updateAreas);

router.delete("/delete", [
    body("areasIds").exists({checkFalsy:true}).withMessage("areasIds is required").isArray().withMessage("areasIds must be an array"),
    body("areasIds.*.id").trim().exists({checkFalsy:true}).withMessage("areasIds.*.id is required")
], areaController.deleteAreas);

module.exports = router;