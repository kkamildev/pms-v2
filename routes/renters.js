
const express = require("express");

const router = express.Router();

const renterController = require('../controllers/renterController');
const { query, body } = require("express-validator");
const roleAuthorization = require("../middlewares/roleAuthorization");
const authorization = require("../middlewares/authorization");

router.use(authorization());

router.get("/get-all", renterController.getAllRenters);

router.get("/get", [
    query("monthFilter").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("monthFilter must be a int value").toInt(),
    query("nameFilter").trim(),
    query("endYearFilter").trim().default(null).optional({checkFalsy:true}).
    isInt().withMessage("monthFilter must be a int value").toInt(),
    query("ownerNameFilter").trim().default(null),
    query("limit").trim().optional({checkFalsy:true}).
    isInt({min:0}).withMessage("limit must be a int value greater or equal 0").
    toInt(),
    query("showExpired").trim().default(null).optional({checkFalsy:true}).
    toBoolean()
], renterController.getRenters);

router.post("/insert",[
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().
    exists({checkFalsy:true}).withMessage("phone is required").
    isMobilePhone("pl-PL").withMessage("phone is not valid PL phone format")
], renterController.insertRenter);

router.put("/update", [
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required"),
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().
    exists({checkFalsy:true}).withMessage("phone is required").
    isMobilePhone("pl-PL").withMessage("phone is not valid PL phone format")
], renterController.updateRenter);

router.use(roleAuthorization(["ADMIN"]));

router.delete("/delete",[
    body("idRenter").trim().
    exists({checkFalsy:true}).withMessage("idRenter is required")
], renterController.deleteRenter);

module.exports = router;