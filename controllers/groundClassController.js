
const GroundClass = require("../models/GroundClass");
const withErrorHandling = require("../middlewares/withErrorHandling");
const {Sequelize} = require("sequelize");
const Converter = require("../models/Converter");
const sequelize = require("../util/db");

exports.getGroundClassCount = withErrorHandling(async (req, res) => {
    const {groundClass} = req.query;
    const count = await GroundClass.count({where:{class:groundClass}})
    res.status(200).json({success:true, message:"Pobrano ilość", count});
});

exports.getUniqueGroundClasses = withErrorHandling(async (req, res) => {
    const classes = await GroundClass.findAll({
        attributes:[
            [Sequelize.fn("DISTINCT", Sequelize.col("class")), "class"]
        ]
    });
    res.status(200).json({success:true, message:"Pobrano unikatowe klasy", classes});
});

exports.getGroundClasses = withErrorHandling(async (req, res) => {
    const classes = await GroundClass.findAll({
        attributes:["id", "class", "tax", "released"],
        include:{
            model:Converter,
            as:"converters",
            attributes:["id", "converter", "taxDistrict"]
        },
        order:[["class", "ASC"]]
    })
    res.status(200).json({success:true, message:`Pobrano klasy gruntu`, classes})
});

exports.updateGroundClass = withErrorHandling(async (req, res) => {
    const {idGroundClass, groundClass, tax, convertersData, released} = req.body;
    await sequelize.transaction(async (t) => {
        const [affectedRows] = await GroundClass.update({
            class:groundClass,
            tax,
            released
        }, {where:{id:idGroundClass}, transaction:t});
        for(let i = 0;i<convertersData.length;i++) {
            await Converter.update({
                converter:convertersData[i]
            }, {where:{taxDistrict:i + 1, idGroundClass}, transaction:t})
        }
        res.status(200).json({success:true, message:"Klasa gruntu zaktualizowana", affectedRows})
    })
});

exports.insertGroundClass = withErrorHandling(async (req, res) => {
    const {groundClass, tax, released, convertersData} = req.body;
    await sequelize.transaction(async (t) => {
        const groundClassObject = await GroundClass.create({
            class:groundClass,
            tax,
            released
        }, {transaction:t});
        for(let i = 0;i<convertersData.length;i++) {
            await Converter.create({
                idGroundClass:groundClassObject.id,
                converter:convertersData[i],
                taxDistrict:i + 1
            }, {transaction:t})
        }
        res.status(201).json({success:true, message:"wstawiono klasę gruntu"})
    });
});

exports.deleteGroundClass = withErrorHandling(async (req, res) => {
    const {idGroundClass} = req.body;
    const deletedCount = await GroundClass.destroy({where:{id:idGroundClass}});
    res.status(200).json({success:true, message:"usunięto klasę gruntu", deletedCount})
});