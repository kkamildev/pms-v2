

const Owner = require("../models/Owner");
const Town = require("../models/Town");
const LandPurpose = require("../models/LandPurpose");
const Location = require("../models/Location");
const Land = require("../models/Land");
const {Op} = require("sequelize");
const withErrorHandling = require("../middlewares/withErrorHandling");

exports.getOwners = withErrorHandling(async (req, res) => {
    const {nameFilter, limit} = req.query;
    const owners = await Owner.findAll({
        attributes:["id", "name", "phone"],
        include:{
            model:Land,
            as:"lands",
            attributes:["id", "serialNumber", "landNumber", "area"],
            include:[
                {
                    model:Town,
                    as:"town",
                    attributes:["name"],
                    include:{
                        model:Location,
                        as:"location",
                        attributes:["province", "district", "commune"]
                    }
                },
                {
                    model:LandPurpose,
                    as:"landPurpose",
                    attributes:["type"],
                    required:false
                }
            ]
        },
        where:{
            name:{
                [Op.like]:`%${nameFilter || ""}%`
            }
        },
        ...(limit && {limit:Number(limit)})
    })
    res.status(200).json({success:true, message:"Pobrano włascicieli i ich dzialki", owners})
});

exports.insertOwner = withErrorHandling(async (req, res) => {
    const {name, phone} = req.body;
    const owner = await Owner.create({name, phone:phone || null});
    res.status(201).json({success:true, message:"Dodano właściciela", idOwmer:owner.id})
});

exports.updateOwner = withErrorHandling(async (req, res) => {
    const {idOwner, name, phone} = req.body;
    const [affectedRows] = await Owner.update({name, phone:phone || null}, {where:{id:idOwner}})
    res.status(200).json({success:true, message:"Zaktualizowanego właściciela", affectedRows})
});

exports.deleteOwner = withErrorHandling(async (req, res) => {
    const {idOwner} = req.body;
    const deletedCount = await Owner.destroy({where:{id:idOwner}})
    res.status(200).json({success:true, message:"Usunięto właściciela", deletedCount})
});