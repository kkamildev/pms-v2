const express = require("express");

const router = express.Router();

const groundClassController = require('../controllers/groundClassController');
const { query, body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/ground-classes

router.use(authorization());

router.get("/get",[
    query("taxDistrict").trim().
    exists({checkFalsy:true}).withMessage("taxDistrict is required").
    isInt().withMessage("taxDistrict must be a int value").toInt(),
], groundClassController.getGroundClasses);

router.get("/count",[
    query("groundClass").trim().
    exists({checkFalsy:true}).withMessage("groundClass is required"),
    query("taxDistrict").trim().
    exists({checkFalsy:true}).withMessage("taxDistrict is required").
    isInt().withMessage("taxDistrict must be a int value").toInt(),
], groundClassController.getGroundClassCount);

router.get("/get-unique", groundClassController.getUniqueGroundClasses);

router.use(roleAuthorization(["KSIEGOWOSC", "SEKRETARIAT"]));

router.post("/insert", [
    body("groundClass").trim().
    exists({checkFalsy:true}).withMessage("groundClass is required").
    isLength({max:10}).withMessage("groundClass must be less or equal 10 characters"),
    body("converter").trim().
    exists({checkFalsy:true}).withMessage("converter is required").
    isFloat({min:0, max:9}).withMessage("converter must be a float positive value less than 10").toFloat(),
    body("taxDistrict").trim().
    exists({checkFalsy:true}).withMessage("taxDistrict is required").
    isInt().withMessage("taxDistrict must be int value").toInt(),
    body("tax").trim().
    exists({checkFalsy:true}).withMessage("tax is required").
    isIn(["rolny", "lesny", "brak"]).withMessage("tax is not whitelisted")
], groundClassController.insertGroundClass);

router.put("/update", [
    body("idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("idGroundClass is required"),
    body("groundClass").trim().
    exists({checkFalsy:true}).withMessage("groundClass is required").
    isLength({max:10}).withMessage("groundClass must be less or equal 10 characters"),
    body("converter").trim().
    exists({checkFalsy:true}).withMessage("converter is required").
    isFloat({min:0, max:9}).withMessage("converter must be a float positive value less than 10").toFloat(),
    body("taxDistrict").trim().
    exists({checkFalsy:true}).withMessage("taxDistrict is required").
    isInt().withMessage("taxDistrict must be a int value").toInt(),
    body("tax").trim().
    exists({checkFalsy:true}).withMessage("tax is required").
    isIn(["rolny", "lesny", "brak"]).withMessage("tax is not whitelisted")
], groundClassController.updateGroundClass);

router.delete("/delete", [
    body("idGroundClass").trim().
    exists({checkFalsy:true}).withMessage("idGroundClass is required"),
], groundClassController.deleteGroundClass);

module.exports = router;