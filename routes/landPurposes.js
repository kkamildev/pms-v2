
const express = require("express");

const router = express.Router();

const landPurposeController = require('../controllers/landPurposeController');
const { body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/land-purposes

router.use(authorization());

router.get("/get-all", landPurposeController.getAllLandPurposes);

router.use(roleAuthorization(["ADMIN"]));

router.post("/insert", [
    body("type").trim().
    exists({checkFalsy:true}).withMessage("type is required").
    isLength({max:50}).withMessage("type must be less or equal 50 characters")
], landPurposeController.insertLandPurpose);

router.post("/insert-file", landPurposeController.insertLandPurposesFile);

router.put("/update", [
    body("idLandPurpose").trim().
    exists({checkFalsy:true}).withMessage("idLandPurpose is required"),
    body("type").trim().
    exists({checkFalsy:true}).withMessage("type is required").
    isLength({max:50}).withMessage("type must be less or equal 50 characters")
], landPurposeController.updateLandPurpose);

router.delete("/delete", [
    body("idLandPurpose").trim().
    exists({checkFalsy:true}).withMessage("idLandPurpose is required")
], landPurposeController.deleteLandPurpose);

module.exports = router;