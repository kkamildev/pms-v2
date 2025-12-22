

const express = require("express");

const router = express.Router();

const fileController = require('../controllers/fileController');
const { param, body, validationResult } = require("express-validator");
const authorization = require("../middlewares/authorization");

// api/files

router.use(authorization());

router.get("/get/:idLand/:filename", [
    param("idLand").trim().
    exists({checkFalsy:true}).withMessage("idLand is required"),
    param("filename").trim().
    exists({checkFalsy:true}).withMessage("filename is required"),
], fileController.getFile);

router.post("/upload/:idLand",[
    param("idLand").trim().exists({checkFalsy:true}).withMessage("idLand is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        } 
        next();
    },
], fileController.upload.array("files"), fileController.confirmUpload);

router.delete("/delete", [
    body("idLand").trim().exists({checkFalsy:true}).withMessage("idLand is required"),
    body("filename").trim().exists({checkFalsy:true}).withMessage("filename is required"),
], fileController.deleteFile);

module.exports = router;