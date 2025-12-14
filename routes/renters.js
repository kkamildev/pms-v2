
const express = require("express");

const router = express.Router();

const renterController = require('../controllers/renterController');

router.get("/get-all", renterController.getAllRenters);

router.get("/get", renterController.getRenters);

router.post("/insert", renterController.insertRenter);

router.put("/update", renterController.updateRenter);

router.delete("/delete", renterController.deleteRenter);

module.exports = router;