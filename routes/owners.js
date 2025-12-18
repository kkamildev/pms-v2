
const express = require("express");

const router = express.Router();

const ownerController = require('../controllers/ownerController');
const { query, body } = require("express-validator");
const authorization = require("../middlewares/authorization");
const roleAuthorization = require("../middlewares/roleAuthorization");

// api/owners

router.use(authorization());

router.get("/get", [
    query("nameFilter").trim().default(null),
    query("limit").trim().default(null).optional({checkFalsy:true}).
    isInt({min:0}).withMessage("limit must be a int value greater or equal 0").
    toInt(),
], ownerController.getOwners);

router.post("/insert",[
    body("name").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().default(null).optional({checkFalsy:true}).
    isMobilePhone("pl-PL").withMessage("phone is not valid PL phone format")
], ownerController.insertOwner);

router.put("/update",[
    body("idOwner").trim().exists({checkFalsy:true}).withMessage("idOwner is required"),
    body("name").trim().toLowerCase().
    exists({checkFalsy:true}).withMessage("name is required").
    isLength({max:100}).withMessage("name must be less or equal 100 characters"),
    body("phone").trim().default(null).optional({checkFalsy:true}).
    isMobilePhone("pl-PL").withMessage("phone is not valid PL phone format")
], ownerController.updateOwner);

router.use(roleAuthorization(["ADMIN"]));

router.delete("/delete",[
    body("idOwner").trim().exists({checkFalsy:true}).withMessage("idOwner is required"),
], ownerController.deleteOwner);

module.exports = router;