
const fs = require("fs");
const path = require("path");

const LandType = require("../models/LandType");

exports.getAllLandTypes = async (req, res) => {
    const landTypes = await LandType.findAll();
    res.status(200).json({success:true, message:"Pobrano typy działek", landTypes})
}

exports.insertLandType = async (req, res) => {
    const {type} = req.body;
    await LandType.create({type});
    res.status(201).json({success:true, message:"Dodano typ działki"})
}

exports.insertLandTypesFile = async (req, res) => {
    const types = await LandType.findAll({attributes:["type"]});
    fs.readFile(path.join(__dirname, "..", "data", "landTypes.json"),
     "utf8", async (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        for (const obj of json) {
            if(!types.some((value) => obj == value.type)) {
                await LandType.create({type:obj});
            }
        };
        res.status(201).json({success:true, message:"Wstawiono typy działek"})
    });
}

exports.updateLandType = async (req, res) => {
    const {idLandType, type} = req.body;
    const [affectedRows] = await LandType.update({type}, {where:{id:idLandType}})
    res.status(200).json({success:true, message:"Typ działki zaktulizowany", affectedRows})
}

exports.deleteLandType = async (req, res) => {
    const {idLandType} = req.body;
    const deletedCount = await LandType.destroy({where:{id:idLandType}});
    res.status(200).json({success:true, message:"Usunięto typ działki", deletedCount})
}