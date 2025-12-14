
const express = require("express");

const router = express.Router();

const ownerController = require('../controllers/ownerController');

router.get("/get", ownerController.getOwners);

router.post("/insert", ownerController.insertOwner);

router.put("/update", ownerController.updateOwner);

router.delete("/delete", ownerController.deleteOwner);

module.exports = router;