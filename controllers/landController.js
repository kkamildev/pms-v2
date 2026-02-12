
const fs = require("fs");

const Land = require("../models/Land");
const Location = require("../models/Location");
const Town = require("../models/Town");
const Owner = require("../models/Owner");
const Purchase = require("../models/Purchase");
const Sell = require("../models/Sell");
const LandPurpose = require("../models/LandPurpose");
const LandType = require("../models/LandType");
const Mpzp = require("../models/Mpzp");
const GeneralPlan = require("../models/GeneralPlan");
const Rent = require("../models/Rent");
const LandArea = require("../models/LandArea");
const Renter = require("../models/Renter");
const GroundClass = require("../models/GroundClass");
const Converter = require("../models/Converter");
const { Op} = require("sequelize");
const path = require("path");
const config = require("../util/config");
const withErrorHandling = require("../middlewares/withErrorHandling");
const sequelize = require("../util/db");

exports.getSerialExist = withErrorHandling(async (req, res) => {
    const {serialNumber} = req.query;
    const exist = await Land.count({
        where:{
            serialNumber:{
                [Op.eq]:serialNumber,
                [Op.ne]:"000000_0.0000.0"
            }
        }
    })
    res.status(200).json({success:true, message:"Pobrano pomyślnie", exist})
});

exports.getLand = withErrorHandling(async (req, res) => {
    const {idLand} = req.query;
    const land = await Land.findByPk(idLand, {
        attributes:["id", "serialNumber", "landNumber", "propertyTax", "area", "registerNumber", "mortgage", "description", "waterCompany"],
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
                model:Owner,
                as:"owner",
                attributes:["id", "name", "phone"]
            },
            {
                model:Purchase,
                as:"purchase",
                required:false,
                attributes:["date", "actNumber", "seller", "price"]
            },
            {
                model:Sell,
                as:"sell",
                required:false,
                attributes:["date", "actNumber", "buyer", "price"]
            },
            {
                model:LandPurpose,
                as:"landPurpose",
                required:false,
                attributes:["id", "type"]
            },
            {
                model:LandType,
                as:"landType",
                required:false,
                attributes:["id", "type"]
            },
            {
                model:Mpzp,
                as:"mpzp",
                required:false,
                attributes:["id", "code"]
            },
            {
                model:GeneralPlan,
                as:"generalPlan",
                required:false,
                attributes:["id", "code"]
            },
            {
                model:Rent,
                as:"rent",
                required:false,
                attributes:["id", "startDate", "endDate", "rental"],
                include:{
                    model:Renter,
                    as:"renter",
                    attributes:["id", "name", "phone"]
                }
            },
            {
                model:LandArea,
                as:"areas",
                attributes:["id", "area"],
                required:false,
                include:{
                    model:GroundClass,
                    as:"groundClass",
                    attributes:["id", "class", "tax", "released"],
                    include:{
                        attributes:["converter", "taxDistrict"],
                        model:Converter,
                        as:"converters"
                    }
                }
            }
        ]
    });
    if(!land) {
        res.status(404).json({error:`Taka działka nie istnieje`})  
    } else {
        res.status(200).json({success:true, message:`pobrano działkę o ID ${idLand}`, land})  
    }
});

exports.getRentLands = withErrorHandling(async (req, res) => {
    const lands = await Land.findAll({
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
                model:Rent,
                as:"rent",
                attributes:[]
            },
            {
                model:LandPurpose,
                as:"landPurpose",
                required:true,
                attributes:[],
                where:{
                    type:"Dzierżawa"
                }
            }
        ]
    });
    res.status(200).json({success:true, message:"Pobrano działki przeznaczone do dzierżawy", lands});
});

exports.getLandInsertionRequiredData = withErrorHandling(async (req, res) => {
    const owners = await Owner.findAll({order:[["name", "ASC"]]});
    const landTypes = await LandType.findAll();
    const landPurposes = await LandPurpose.findAll();
    const generalPlans = await GeneralPlan.findAll({order:[["code", "ASC"]]});
    const mpzp = await Mpzp.findAll({order:[["code", "ASC"]]});
    res.status(200).json({success:true, message:"Pobrano dane do dodania nowej działki", data:{
        owners,
        landTypes,
        landPurposes,
        generalPlans,
        mpzp
    }});
});

exports.getLands = withErrorHandling(async (req, res) => {
    const {serialFilter, purchaseYearFilter, lowSellDateFilter, highSellDateFilter, ownerFilter, purposeFilter, rentFilter, lowAreaFilter,
         highAreaFilter, communeFilter, districtFilter, provinceFilter, townFilter, landNumberFilter, groundClassFilter, limit} = req.query;
    const lands = await Land.findAll({
        attributes:["id", "serialNumber", "landNumber", "propertyTax", "area", "registerNumber", "mortgage", "description", "waterCompany"],
        include:[
            {
                model:Town,
                as:"town",
                attributes:["name"],
                where:{
                    name:{
                        [Op.like]:`${townFilter || ""}%`
                    }
                },
                include:{
                    model:Location,
                    as:"location",
                    attributes:["province", "district", "commune", "agriculturalTax", "forestTax", "taxDistrict"],
                    where:{
                        commune:{
                            [Op.like]:`${communeFilter || ""}%`
                        },
                        district:{
                            [Op.like]:`${districtFilter || ""}%`
                        },
                        province:{
                            [Op.like]:`${provinceFilter || ""}%`
                        }
                    }
                }
            },
            {
                model:Sell,
                as:"sell",
                attributes:["date", "price", "buyer", "actNumber"],
                required:lowSellDateFilter || highSellDateFilter,
                where:{
                    ...((lowSellDateFilter || highSellDateFilter) && {
                        date:{
                            ...(lowSellDateFilter && {[Op.lte]:new Date(lowSellDateFilter)}),
                            ...(highSellDateFilter && {[Op.gte]:new Date(highSellDateFilter)}),   
                        }
                    })
                }
            },
            {
                model:Purchase,
                as:"purchase",
                attributes:["date", "price", "seller", "actNumber"],
                required:purchaseYearFilter,
                where:{
                    ...(purchaseYearFilter && {
                        date:{
                            [Op.gte]:new Date(Number(purchaseYearFilter), 0, 1),
                            [Op.lte]:new Date(Number(purchaseYearFilter), 11, 31)
                        }
                    })
                }
            },
            {
                model:Owner,
                as:"owner",
                attributes:["id", "name", "phone"],
                where:{
                    name:{
                        [Op.like]:`%${ownerFilter || ""}%`
                    }
                }
            },
            {
                model:LandType,
                as:"landType",
                required:false,
                attributes:["id", "type"]
            },
            {
                model:LandPurpose,
                as:"landPurpose",
                required:purposeFilter || rentFilter,
                attributes:["id", "type"],
                ...((purposeFilter || rentFilter) && {
                    where:{
                        type:{
                            ...(purposeFilter && {[Op.like]:`${purposeFilter || ""}%`}),
                            ...(rentFilter && {[Op.eq]:"Dzierżawa"})
                        }
                    }
                })
            },
            {
                model:Mpzp,
                as:"mpzp",
                required:false,
                attributes:["id", "code"]
            },
            {
                model:GeneralPlan,
                as:"generalPlan",
                required:false,
                attributes:["id", "code"]
            },
            {
                model:Rent,
                as:"rent",
                required:rentFilter == "true",
                attributes:["id", "startDate", "endDate", "rental"],
                include:{
                    model:Renter,
                    as:"renter",
                    attributes:["id", "name", "phone"]
                }
            },
            {
                model:LandArea,
                as:"areas",
                attributes:["id", "area"],
                required:groundClassFilter,
                include:{
                    model:GroundClass,
                    as:"groundClass",
                    attributes:["id", "class", "tax", "released"],
                    include:{
                        attributes:["converter", "taxDistrict"],
                        model:Converter,
                        as:"converters"
                    },
                    where:{
                        class:{
                            [Op.like]:`%${groundClassFilter || ""}%`
                        }
                    }
                }
            }
        ],
        where:{
            serialNumber:{
                [Op.like]:`${serialFilter || ""}%`
            },
            landNumber:{
                [Op.like]:`${landNumberFilter || ""}%`
            },
            ...((lowAreaFilter || highAreaFilter) && {
                area:{
                    ...(lowAreaFilter && {[Op.gte]:lowAreaFilter}),
                    ...(highAreaFilter && {[Op.lte]:highAreaFilter})
                }
            }),
        },
        ...(limit && {limit:Number(limit)})
    });
    const newLands = lands.map(l => l.get({ plain: true }));
    const landFilesFolder = path.join(__dirname, "..", config.landFilesFolder);
    const folders = fs.readdirSync(landFilesFolder);
    let newFolders = folders.filter((obj) => lands.map((land) => land.id).includes(obj));
    newFolders.forEach((value) => {
        const files = fs.readdirSync(path.join(landFilesFolder, value));
        const index = lands.findIndex((land) => land.id == value);
        newLands[index].files = files
    });
    res.status(200).json({success:true, message:"Pobrano działki", lands:newLands});
});

exports.insertLand = withErrorHandling(async (req, res) => {
    const {serialNumber, landNumber, area, town, commune, district, province, idOwner, registerNumber, mortgage, idLandType, description, idLandPurpose,
         idMpzp, idGeneralPlan, waterCompany, purchaseDate, purchaseActNumber, seller, purchasePrice, sellDate, sellActNumber, buyer, sellPrice, propertyTax} = req.body;
    await sequelize.transaction(async (t) => {
        let idTown;
        const foundTown = await Town.findOne({
            attributes:["id"],
            where:{
                name:town
            },
            transaction:t
        });
        if(foundTown) {
            idTown = foundTown.id;
        } else {
            let idLocation;
            const foundLocation = await Location.findOne({
                attributes:["id"],
                where:{
                    commune,
                    district,
                    province
                },
                transaction:t
            });
            if(foundLocation) {
                idLocation = foundLocation.id;
            } else {
                const taxDistrict = await Location.findOne({
                    attributes:["taxDistrict"],
                    where:{
                        district,
                        province
                    },
                    transaction:t
                });
                const createResult = await Location.create({
                    province,
                    district,
                    commune,
                    taxDistrict:taxDistrict ? taxDistrict.taxDistrict : null
                }, {transaction:t})
                idLocation = createResult.id;
            }
            const createResult = await Town.create({
                idLocation,
                name:town
            }, {transaction:t})
            idTown = createResult.id;
        }
        const createdLand = await Land.create({
            serialNumber,
            landNumber,
            area,
            idTown,
            registerNumber:registerNumber || null,
            mortgage,
            idOwner,
            idLandType:idLandType || null,
            idLandPurpose:idLandPurpose || null,
            idMpzp:idMpzp || null,
            idGeneralPlan:idGeneralPlan || null,
            description,
            waterCompany,
            propertyTax
        }, {transaction:t});
        await Sell.create({
            id:createdLand.id,
            date:sellDate || null,
            actNumber:sellActNumber || null,
            price:sellPrice || null,
            buyer:buyer || null
        }, {transaction:t});
        await Purchase.create({
            id:createdLand.id,
            date:purchaseDate || null,
            actNumber:purchaseActNumber || null,
            price:purchasePrice || null,
            seller:seller || null
        }, {transaction:t});
        res.status(201).json({success:true, message:"Dodano działkę", insertId:createdLand.id})
    });
});

exports.updateLand = withErrorHandling(async (req, res) => {
    const {idLand, serialNumber, landNumber, area, town, commune, district, province, idOwner, registerNumber, mortgage, idLandType, description, idLandPurpose,
         idMpzp, idGeneralPlan, waterCompany, purchaseDate, purchaseActNumber, seller, purchasePrice, sellDate, sellActNumber, buyer, sellPrice, propertyTax} = req.body;
    let idTown;
    await sequelize.transaction(async (t) => {
        const foundTown = await Town.findOne({
            attributes:["id"],
            where:{
                name:town
            }
        });
        if(foundTown) {
            idTown = foundTown.id;
        } else {
            let idLocation;
            const foundLocation = await Location.findOne({
                attributes:["id"],
                where:{
                    commune,
                    district,
                    province
                },
                transaction:t
            });
            if(foundLocation) {
                idLocation = foundLocation.id;
            } else {
                const taxDistrict = await Location.findOne({
                    attributes:["taxDistrict"],
                    where:{
                        district,
                        province
                    },
                    transaction:t
                });
                const createResult = await Location.create({
                    province,
                    district,
                    commune,
                    taxDistrict:taxDistrict ? taxDistrict.taxDistrict : null
                }, {transaction:t})
                idLocation = createResult.id;
            }
            const createResult = await Town.create({
                idLocation,
                name:town
            }, {transaction:t})
            idTown = createResult.id;
        }
        await Sell.update({
            date:sellDate || null,
            actNumber:sellActNumber || null,
            price:sellPrice || null,
            buyer:buyer || null,
        }, {where:{id:idLand}, transaction:t});
        await Purchase.update({
            date:purchaseDate || null,
            actNumber:purchaseActNumber || null,
            price:purchasePrice || null,
            seller:seller || null,
        }, {where:{id:idLand}, transaction:t});
        await Land.update({
            serialNumber,
            landNumber,
            area,
            idTown,
            idOwner,
            registerNumber,
            mortgage,
            idLandPurpose:idLandPurpose || null,
            idLandType:idLandType || null,
            idMpzp:idMpzp || null,
            idGeneralPlan:idGeneralPlan || null,
            description,
            waterCompany,
            propertyTax
        }, {where:{id:idLand}, transaction:t})
        res.status(200).json({success:true, message:"Zaktualizowano działkę"})
    });
});

exports.deleteLand = withErrorHandling(async (req, res) => {
    const {idLand} = req.body;
    const deletedCount = await Land.destroy({where:{id:idLand}})
    res.status(200).json({success:true, message:"Usunięto pomyślnie", deletedCount})
});