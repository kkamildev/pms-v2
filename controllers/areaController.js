
const LandArea = require("../models/LandArea");
const withErrorHandling = require("../middlewares/withErrorHandling");
const sequelize = require("../util/db");

exports.insertAreas = withErrorHandling(async (req, res) => {
    const {idLand, areasData} = req.body;
    await sequelize.transaction(async (t) => {
        for(const index in areasData) {
            await LandArea.create({
                idLand,
                idGroundClass:areasData[index].idGroundClass,
                area:areasData[index].area
            }, {transaction:t})
        }
        res.status(201).json({success:true, message:"Dodano powierzchnie działki"});
    });
});

exports.updateAreas = withErrorHandling(async (req, res) => {
    const {areasData} = req.body;
    await sequelize.transaction(async (t) => {
        let affectedRowsSum = 0;
        for(const index in areasData) {
            const [affectedRows] = await LandArea.update({
                idGroundClass:areasData[index].idGroundClass,
                area:areasData[index].area
            }, {where:{id:areasData[index].idArea}, transaction:t})
            affectedRowsSum += affectedRows;
        }
        res.status(201).json({success:true, message:"Dodano powierzchnie działki", affectedRows:affectedRowsSum});
    });
});

exports.deleteAreas = withErrorHandling(async (req, res) => {
    const {areasIds} = req.body;
    await sequelize.transaction(async (t) => {
        let deletedCountSum = 0;
        for(const index in areasIds) {
            const deletedCount = await LandArea.destroy({where:{id:areasIds[index]}, transaction:t})
            deletedCountSum+= deletedCount;
        }
        res.status(200).json({success:true, message:"Usunięto powierzchnie działki", deletedCount:deletedCountSum})
    });
});