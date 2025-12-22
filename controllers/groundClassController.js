
const GroundClass = require("../models/GroundClass");
const withErrorHandling = require("../middlewares/withErrorHandling");
const {Sequelize} = require("sequelize");

exports.getGroundClassCount = withErrorHandling(async (req, res) => {
    const {groundClass, taxDistrict} = req.query;
    const count = await GroundClass.count({where:{class:groundClass, taxDistrict}})
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
    const {taxDistrict} = req.query;
    const classes = await GroundClass.findAll({
        attributes:["class", "converter", "tax", "id"],
        where:{
            taxDistrict
        },
        order:[["class", "ASC"]]
    });
    res.status(200).json({success:true, message:`Pobrano klasy gruntu dla okręgu ${taxDistrict}`, classes})
});

exports.updateGroundClass = withErrorHandling(async (req, res) => {
    const {idGroundClass, groundClass, converter, taxDistrict, tax} = req.body;
    const [affectedRows] = await GroundClass.update({
        class:groundClass,
        converter,
        taxDistrict,
        tax
    }, {where:{id:idGroundClass}});
    res.status(200).json({success:true, message:"Klasa gruntu zaktualizowana", affectedRows})
});

exports.insertGroundClass = withErrorHandling(async (req, res) => {
    const {groundClass, converter, taxDistrict, tax} = req.body;
    await GroundClass.create({
        class:groundClass,
        converter,
        taxDistrict,
        tax
    })
    res.status(201).json({success:true, message:"wstawiono klasę gruntu"})
});

exports.deleteGroundClass = withErrorHandling(async (req, res) => {
    const {idGroundClass} = req.body;
    const deletedCount = await GroundClass.destroy({where:{id:idGroundClass}});
    res.status(200).json({success:true, message:"usunięto klasę gruntu", deletedCount})
});