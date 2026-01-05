
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
const { Op} = require("sequelize");
const path = require("path");
const config = require("../util/config");
const withErrorHandling = require("../middlewares/withErrorHandling")

exports.getSerialExist = withErrorHandling(async (req, res) => {
    const {serialNumber} = req.query;
    const exist = await Land.count({
        where:{
            serialNumber
        }
    })
    res.status(200).json({success:true, message:"Pobrano pomyślnie", exist})
});

exports.getLand = withErrorHandling(async (req, res) => {
    const {idLand} = req.query;
    const land = Land.findByPk(idLand, {
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
        ]
    });
    if(!land.id) {
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
                    attributes:["province", "district", "commune", "agriculturalTax", "forestTax"],
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
                    ...((lowSellDateFilter || highAreaFilter) && {
                        date:{
                            ...(lowSellDateFilter && {[Op.gte]:lowSellDateFilter}),
                            ...(highSellDateFilter && {[Op.lte]:highSellDateFilter}),   
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
                attributes:["name", "phone"],
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
                attributes:["type"]
            },
            {
                model:LandPurpose,
                as:"landPurpose",
                required:purposeFilter || rentFilter,
                attributes:["type"],
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
                attributes:["code"]
            },
            {
                model:GeneralPlan,
                as:"generalPlan",
                required:false,
                attributes:["code"]
            },
            {
                model:Rent,
                as:"rent",
                required:rentFilter == "true",
                attributes:["id"],
                include:{
                    model:Renter,
                    as:"renter",
                    attributes:["name", "phone"]
                }
            },
            {
                model:LandArea,
                as:"areas",
                attributes:["id", "area", "releasedArea"],
                required:groundClassFilter,
                include:{
                    model:GroundClass,
                    as:"groundClass",
                    attributes:["id", "class", "converter", "tax"],
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
    const landFilesFolder = path.join(__dirname, "..", config.landFilesFolder);
    const folders = fs.readdirSync(landFilesFolder);
    let newFolders = folders.filter((obj) => lands.map((land) => land.id).includes(Number(obj)));
    newFolders.forEach((value) => {
        const files = fs.readdirSync(path.join(landFilesFolder, value));
        const index = lands.findIndex((land) => land.id == value);
        lands[index]["files"] = files
    });
    res.status(200).json({success:true, message:"Pobrano działki", lands});
});

exports.insertLand = withErrorHandling(async (req, res) => {
    const {serialNumber, landNumber, area, town, commune, district, province, idOwner, registerNumber, mortgage, idLandType, description, idLandPurpose,
         idMpzp, idGeneralPlan, waterCompany, purchaseDate, purchaseActNumber, seller, purchasePrice, sellDate, sellActNumber, buyer, sellPrice, propertyTax} = req.body;
    let idTown;
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
            }
        });
        if(foundLocation) {
            idLocation = foundLocation.id;
        } else {
            const taxDistrict = await Location.findOne({
                attributes:["taxDistrict"],
                where:{
                    district,
                    province
                }
            });
            const createResult = await Location.create({
                province,
                district,
                commune,
                taxDistrict:taxDistrict ? taxDistrict.taxDistrict : null
            })
            idLocation = createResult.id;
        }
        const createResult = await Town.create({
            idLocation,
            name:town
        })
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
    });
    await Sell.create({
        id:createdLand.id,
        date:sellDate || null,
        actNumber:sellActNumber || null,
        price:sellPrice || null,
        buyer:buyer || null
    });
    await Purchase.create({
        id:createdLand.id,
        date:purchaseDate || null,
        actNumber:purchaseActNumber || null,
        price:purchasePrice || null,
        seller:seller || null
    });
    res.status(201).json({success:true, message:"Dodano działkę"})
});

exports.updateLand = withErrorHandling(async (req, res) => {
    const {idLand, serialNumber, landNumber, area, town, commune, district, province, idOwner, registerNumber, mortgage, idLandType, description, idLandPurpose,
         idMpzp, idGeneralPlan, waterCompany, purchaseDate, purchaseActNumber, seller, purchasePrice, sellDate, sellActNumber, buyer, sellPrice, propertyTax} = req.body;
    let idTown;
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
            }
        });
        if(foundLocation) {
            idLocation = foundLocation.id;
        } else {
            const taxDistrict = await Location.findOne({
                attributes:["taxDistrict"],
                where:{
                    district,
                    province
                }
            });
            const createResult = await Location.create({
                province,
                district,
                commune,
                taxDistrict:taxDistrict ? taxDistrict.taxDistrict : null
            })
            idLocation = createResult.id;
        }
        const createResult = await Town.create({
            idLocation,
            name:town
        })
        idTown = createResult.id;
    }
    await Sell.update({
        date:sellDate || null,
        actNumber:sellActNumber || null,
        price:sellPrice || null,
        buyer:buyer || null,
    }, {where:{id:idLand}});
    await Purchase.update({
        date:purchaseDate || null,
        actNumber:purchaseActNumber || null,
        price:purchasePrice || null,
        buyer:seller || null,
    }, {where:{id:idLand}});
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
    }, {where:{id:idLand}})
    res.status(200).json({success:true, message:"Zaktualizowano działkę"})
});

exports.deleteLand = withErrorHandling(async (req, res) => {
    const {idLand} = req.body;
    const deletedCount = await Land.destroy({where:{id:idLand}})
    res.status(200).json({success:true, message:"Usunięto pomyślnie", deletedCount})
});