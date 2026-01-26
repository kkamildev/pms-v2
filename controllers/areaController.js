
const LandArea = require("../models/LandArea");
const withErrorHandling = require("../middlewares/withErrorHandling");
const sequelize = require("../util/db");

exports.insertAreas = withErrorHandling(async (req, res) => {
    const {idLand, areasData} = req.body;
    await sequelize.transaction(async (t) => {
        for(const area in areasData) {
            await LandArea.create({
                idLand,
                idGroundClass:area.idGroundClass,
                area:area.area
            }, {transaction:t})
        }
        res.status(201).json({success:true, message:"Dodano powierzchnie działki"});
    });
});

exports.updateAreas = withErrorHandling(async (req, res) => {
    const {areasData} = req.body;
    await sequelize.transaction(async (t) => {
        let affectedRowsSum = 0;
        for(const area in areasData) {
            const [affectedRows] = await LandArea.update({
                idGroundClass:area.idGroundClass,
                area:area.area
            }, {where:{id:area.idArea}, transaction:t})
            affectedRowsSum += affectedRows;
        }
        res.status(201).json({success:true, message:"Dodano powierzchnie działki", affectedRows:affectedRowsSum});
    });
});

exports.deleteAreas = withErrorHandling(async (req, res) => {
    const {areasIds} = req.body;
    await sequelize.transaction(async (t) => {
        let deletedCountSum = 0;
        for(const id in areasIds) {
            const deletedCount = await LandArea.destroy({where:{id}, transaction:t})
            deletedCountSum+= deletedCount;
        }
        res.status(200).json({success:true, message:"Usunięto powierzchnie działki", deletedCount:deletedCountSum})
    });
});