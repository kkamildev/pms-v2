
const LandArea = require("../models/LandArea");

exports.insertArea = async (req, res) => {
    const {idLand, idGroundClass, area, releasedArea} = req.body;
    await LandArea.create({
        idLand,
        idGroundClass,
        area,
        releasedArea
    });
    res.status(201).json({success:true, message:"Dodano powierzchnie działki"});
}

exports.updateArea = async (req, res) => {
    const {idArea, idGroundClass, area, releasedArea} = req.body;
    const [affectedRows] = await LandArea.update({
        idGroundClass,
        area,
        releasedArea
    }, {where:{id:idArea}});
    res.status(200).json({success:true, message:"Zaktualizowano powierzchnie działki", affectedRows})
}

exports.deleteArea = async (req, res) => {
    const {idArea} = req.body;
    const deletedCount = await LandArea.destroy({where:{id:idArea}})
    res.status(200).json({success:true, message:"Usunięto powierzchnie działki", deletedCount})
}