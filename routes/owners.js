
const express = require("express");

const router = express.Router();

const ownerController = require('../controllers/ownerController');
const { query, body } = require("express-validator");

router.get("/get", [
    query("nameFilter").trim().default(null),
    query("limit").trim().default(null).optional().
    isInt({min:0}).withMessage("limit must be a number greater or equal 0").
    toInt(),
], ownerController.getOwners);

router.post("/insert",[
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({min:1, max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().default(null).optional().
    isMobilePhone("pl-PL").withMessage("phone is not valid phone format")
], ownerController.insertOwner);

router.put("/update",[
    body("idOwner").trim().exists({checkFalsy:true}).withMessage("idOwner is required"),
    body("name").trim().toUpperCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({min:1, max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().default(null).optional().
    isMobilePhone("pl-PL").withMessage("phone is not valid phone format")
], ownerController.updateOwner);

router.delete("/delete",[
    body("idOwner").trim().exists({checkFalsy:true}).withMessage("idOwner is required"),
], ownerController.deleteOwner);

module.exports = router;