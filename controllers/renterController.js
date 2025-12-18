
const Renter = require("../models/Renter");
const Rent = require("../models/Rent");
const Land = require("../models/Land");
const Owner = require("../models/Owner");
const Town = require("../models/Town");
const Location = require("../models/Location");
const {Op} = require("sequelize");
const withErrorhandling = require("../middlewares/withErrorHandling");

exports.getRenters = withErrorhandling(async (req, res) => {
    const {monthFilter, nameFilter, endYearFilter, ownerNameFilter, limit, showExpired} = req.query;
    const renters = await Renter.findAll({
        subQuery:false,
        attributes:["id", "name", "phone"],
        include:{
            model:Rent,
            as:"rents",
            required:false,
            include:{
                model:Land,
                as:"land",
                attributes:["id", "serialNumber", "area"],
                include:[
                    {
                        model:Owner,
                        as:"owner",
                        attributes:["id", "name", "phone"],
                        where:{
                            name:{
                                [Op.like]:`%${ownerNameFilter || ""}%`
                            }
                        }
                    },
                    {
                        model:Town,
                        as:"town",
                        attributes:["name"],
                        include:{
                            model:Location,
                            as:"location",
                            attributes:["province", "district", "commune"]
                        }
                    }
                ]
            },
            where:{
                ...(monthFilter && {
                    issueRentalFactureDate:{
                        [Op.gte]:new Date(new Date().getFullYear(), monthFilter - 1, 1),
                        [Op.lte]:new Date(new Date().getFullYear(), monthFilter - 1, new Date(new Date().getFullYear(), monthFilter, 0).getDate())
                    }
                }),
                ...(endYearFilter && {
                    endDate:{
                        [Op.lte]:new Date(endYearFilter, 11, 31)
                    }
                }),
                ...(!showExpired && {
                    endDate:{
                        [Op.gte]:new Date()
                    }
                })

            }
        },
        ...(limit && {limit:Number(limit)}),
        where:{
            name:{
                [Op.like]:`%${nameFilter || ""}%`
            }
        },
        order:[["name", "ASC"]]
    });
    
    res.status(200).json({success:true, message:"pobrano dzierżawców i ich dzierżawy", renters});
});

exports.getAllRenters = withErrorhandling(async (req, res) => {
    const renters = await Renter.findAll({order:[["name", "ASC"]]})
    res.status(200).json({success:true, message:"pobrano dane dzierżawców", renters});
});

exports.insertRenter = withErrorhandling(async (req, res) => {
    const {name, phone} = req.body;
    const renter = await Renter.create({name, phone});
    res.status(201).json({success:true, message:"dodano dzierżawce", idRenter:renter.id});
});

exports.updateRenter = withErrorhandling(async (req, res) => {
    const {idRenter, name, phone} = req.body;
    const [affectedRows] = await Renter.update({name, phone}, {where:{id:idRenter}})
    res.status(200).json({success:true, message:"zaktualizowano dzierżawce", affectedRows});
});

exports.deleteRenter = withErrorhandling(async (req, res) => {
    const {idRenter} = req.body;
    const deletedCount = await Renter.destroy({where:{id:idRenter}});
    res.status(200).json({success:true, message:"usunięto dzierżawcę", deletedCount});
});