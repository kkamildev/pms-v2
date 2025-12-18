
const fs = require("fs");
const path = require("path");


const LandPurpose = require("../models/LandPurpose");
const withErrorHandling = require("../middlewares/withErrorHandling");

exports.getAllLandPurposes = withErrorHandling(async (req, res) => {
    const landPurposes = await LandPurpose.findAll();
    res.status(200).json({success:true, message:"Pobrano przeznaczenia działek", landPurposes})
});

exports.insertLandPurpose = withErrorHandling(async (req, res) => {
    const {type} = req.body;
    await LandPurpose.create({type});
    res.status(201).json({success:true, message:"Dodano przeznaczenie działki"})
});

exports.insertLandPurposesFile = withErrorHandling(async (req, res) => {
    const types = await LandPurpose.findAll({attributes:["type"]});
    fs.readFile(path.join(__dirname, "..", "data", "landPurposes.json"),
     "utf8", async (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        for (const obj of json) {
            if(!types.some((value) => obj == value.type)) {
                await LandPurpose.create({type:obj});
            }
        };
        res.status(201).json({success:true, message:"Wstawiono przeznaczenia działek"})
    });
});

exports.updateLandPurpose = withErrorHandling(async (req, res) => {
    const {idLandPurpose, type} = req.body;
    const [affectedRows] = await LandPurpose.update({type}, {where:{id:idLandPurpose}})
    res.status(200).json({success:true, message:"Rodzaj działki zaktulizowany", affectedRows})
});

exports.deleteLandPurpose = withErrorHandling(async (req, res) => {
    const {idLandPurpose} = req.body;
    const deletedCount = await LandPurpose.destroy({where:{id:idLandPurpose}});
    res.status(200).json({success:true, message:"Usunięto przeznaczenie działki", deletedCount})
});