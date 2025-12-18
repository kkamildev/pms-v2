
const express = require("express");

const router = express.Router();

const landTypeController = require('../controllers/landTypeController');
const { body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/land-types

router.use(authorization());

router.get("/get-all", landTypeController.getAllLandTypes);

router.use(roleAuthorization(["ADMIN"]));

router.post("/insert", [
    body("type").trim().
    exists({checkFalsy:true}).withMessage("type is required").
    isLength({max:50}).withMessage("type must be less or equal 50 characters")
], landTypeController.insertLandType);

router.post("/insert-file", landTypeController.insertLandTypesFile);

router.put("/update", [
    body("idLandType").trim().
    exists({checkFalsy:true}).withMessage("idLandType is required"),
    body("type").trim().
    exists({checkFalsy:true}).withMessage("type is required").
    isLength({max:50}).withMessage("type must be less or equal 50 characters")
], landTypeController.updateLandType);

router.delete("/delete", [
    body("idLandType").trim().
    exists({checkFalsy:true}).withMessage("idLandType is required"),
], landTypeController.deleteLandType);

module.exports = router;