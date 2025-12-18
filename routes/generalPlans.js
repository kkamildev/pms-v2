
const express = require("express");

const router = express.Router();

const generalPlanController = require('../controllers/generalPlanController');
const { body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/general-plans

router.use(authorization());

router.get("/get-all", generalPlanController.getAllGeneralPlans);

router.use(roleAuthorization(["ADMIN"]));

router.post("/insert", [
    body("code").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("code is required").
    isLength({max:5}).withMessage("code must be less or equal 5 characters"),
    body("description").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("description is required").
    isLength({max:70}).withMessage("description must be less or equal 70 characters"),
], generalPlanController.insertGeneralPlan);

router.post("/insert-file", generalPlanController.insertGeneralPlansFile);

router.put("/update", [
    body("idGeneralPlan").trim().
    exists({checkFalsy:true}).withMessage("idGeneralPlan is required"),
    body("code").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("code is required").
    isLength({max:5}).withMessage("code must be less or equal 5 characters"),
    body("description").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("description is required").
    isLength({max:70}).withMessage("description must be less or equal 70 characters"),
], generalPlanController.updateGeneralPlan);

router.delete("/delete", [
    body("idGeneralPlan").trim().
    exists({checkFalsy:true}).withMessage("idGeneralPlan is required"),
], generalPlanController.deleteGeneralPlan);

module.exports = router;