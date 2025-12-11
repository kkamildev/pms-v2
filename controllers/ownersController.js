

const Owner = require("../models/Owner");

exports.getOwners = async (req, res) => {
    const {nameFilter, limit} = req.query;
    const owners = await Owner.findAll({
        include:{
            model:Land,
            as:"lands",
            attributes:["serialNumber", "landNumber", "area"],
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
                [Op.like]:`%${nameFilter}%`
            }
        },
        ...(limit && {limit:Number(limit)})
    })
    res.status(200).json({success:true, message:"pobrano włascicieli i ich dzialki", owners})
}

exports.insertOwner = async (req, res) => {
    const {name, phone} = req.body;
    const owner = await Owner.create({name, phone:phone || null});
    res.status(201).json({success:true, message:"Dodano właściciela", idOwmer:owner.id})
}

exports.updateOwner = async (req, res) => {
    const {idOwner, name, phone} = req.body;
    const [affectedRows] = await Owner.update({name, phone:phone || null}, {where:{id:idOwner}})
    res.status(200).json({success:true, message:"Zaktualizowanego właściciela", affectedRows})
}

exports.deleteOwner = async (req, res) => {
    const {idOwner} = req.body;
    const deletedCount = await Owner.destroy({where:{id:idOwner}})
    res.status(200).json({success:true, message:"Usunięto właściciela", deletedCount})
}