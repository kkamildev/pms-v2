

const Town = require("../models/Town");
const Location = require("../models/Location");
const {Op} = require("sequelize");

exports.getTowns = async (req, res) => {
    const {town} = req.query;
    const towns = await Town.findAll({
        attributes:["id", "name"],
        include:{
            model:Location,
            as:"location",
            attributes:["province", "district", "commune"],
        },
        where:{
            name:{
                [Op.like]:`${town}%`
            }
        },
        order:[["name", "ASC"]]
    });
    res.status(200).json({success:true, message:"Pobrano miejscowości", towns})
}

exports.getLocations = async (req, res) => {
    const {taxDistrict, agriculturalTax, forestTax, commune, district, province, limit} = req.query

    const locations = await Location.findAll({
        where:{
            province:{
                [Op.like]:`${province}%`
            },
            district:{
                [Op.like]:`${district}%`
            },
            commune:{
                [Op.like]:`${commune}%`
            },
            ...(taxDistrict && {taxDistrict}),
            ...(agriculturalTax && (agriculturalTax == "1" ? {agriculturalTax:{[Op.ne]:null}} : {agriculturalTax:{[Op.eq]:null}})),
            ...(forestTax && (forestTax == "1" ? {forestTax:{[Op.ne]:null}} : {forestTax:{[Op.eq]:null}}))
        },
        order:[["province", "ASC"], ["district", "ASC"], ["commune", "ASC"]],
        ...(limit && {limit:Number(limit)})
    });
    res.status(200).json({success:true, message:"Pobrano lokalizacje", locations})
}

exports.updateLocation = async (req, res) => {
    const {idLocation, taxDistrict, agriculturalTax, forestTax} = req.body;
    const [affectedRows] = await Location.update({taxDistrict, agriculturalTax, forestTax}, {where:{id:idLocation}});
    res.status(200).json({success:true, message:"Zaktualizowano lokalizacje", affectedRows})
}