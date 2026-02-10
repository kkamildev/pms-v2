

const Town = require("../models/Town");
const Location = require("../models/Location");
const withErrorHandling = require("../middlewares/withErrorHandling");
const {Op, Sequelize} = require("sequelize");

exports.getTowns = withErrorHandling(async (req, res) => {
    const {town, commune, district, province} = req.query;
    const towns = await Town.findAll({
        attributes:["id", "name"],
        include:{
            model:Location,
            as:"location",
            attributes:["province", "district", "commune"],
            where:{
                province:{
                    [Op.like]:`${province || ""}%`
                },
                commune:{
                    [Op.like]:`${district || ""}%`
                },
                commune:{
                    [Op.like]:`${commune || ""}%`
                },
                
            }
        },
        where:{
            name:{
                [Op.like]:`${town || ""}%`,
            }
        },
        order:[["name", "ASC"]]
    });
    res.status(200).json({success:true, message:"Pobrano miejscowości", towns})
});


exports.getUniqueLocationsData = withErrorHandling(async (req, res) => {
    const provinces = await Location.findAll({
        attributes:[
            [Sequelize.fn("DISTINCT", Sequelize.col("province")), "name"]
        ]
    });
    const districts = await Location.findAll({
        attributes:[
            [Sequelize.fn("DISTINCT", Sequelize.col("district")), "name"]
        ]
    })
    const communes = await Location.findAll({
        attributes:[["commune", "name"]]
    });
    const towns = await Town.findAll({
        attributes:["name"]
    });
    res.status(200).json({success:true, message:"Pobrano unikatowe dane lokalizacji", locationsData:{provinces, districts, communes, towns}})
});

exports.getLocations = withErrorHandling(async (req, res) => {
    const {taxDistrict, agriculturalTax, forestTax, commune, district, province, limit} = req.query;
    const locations = await Location.findAll({
        where:{
            province:{
                [Op.like]:`${province || ""}%`
            },
            district:{
                [Op.like]:`${district || ""}%`
            },
            commune:{
                [Op.like]:`${commune || ""}%`
            },
            ...(taxDistrict && {taxDistrict}),
            ...(agriculturalTax && (agriculturalTax == "1" ? {agriculturalTax:{[Op.ne]:null}} : {agriculturalTax:{[Op.eq]:null}})),
            ...(forestTax && (forestTax == "1" ? {forestTax:{[Op.ne]:null}} : {forestTax:{[Op.eq]:null}}))
        },
        order:[["province", "ASC"], ["district", "ASC"], ["commune", "ASC"]],
        ...(limit && {limit:Number(limit)})
    });
    res.status(200).json({success:true, message:"Pobrano lokalizacje", locations})
});

exports.updateLocation = withErrorHandling(async (req, res) => {
    const {idLocation, taxDistrict, agriculturalTax, forestTax} = req.body;
    const [affectedRows] = await Location.update({taxDistrict, agriculturalTax, forestTax}, {where:{id:idLocation}});
    res.status(200).json({success:true, message:"Zaktualizowano lokalizacje", affectedRows})
});

exports.updateAllLocations = withErrorHandling(async (req, res) => {
    const {agriculturalTax, forestTax} = req.body;
    const [affectedRows] = await Location.update({...(agriculturalTax && {agriculturalTax}), ...(forestTax && {forestTax})}, {where:{}});
    res.status(200).json({success:true, message:"Zaktualizowano lokalizacje", affectedRows})
});