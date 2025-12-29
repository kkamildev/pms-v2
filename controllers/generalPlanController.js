
const GeneralPlan = require("../models/GeneralPlan");
const withErrorHandling = require("../middlewares/withErrorHandling");
const path = require("path");
const fs = require("fs");

exports.getAllGeneralPlans = withErrorHandling(async (req, res) => {
    const generalPlans = await GeneralPlan.findAll({order:[["code", "ASC"]]});
    res.status(200).json({success:true, message:"pobrano plany ogólne", generalPlans})
});

exports.insertGeneralPlan = withErrorHandling(async (req, res) => {
    const {code, description} = req.body;
    await GeneralPlan.create({code, description});
    res.status(201).json({success:true, message:"Dodano plan ogólny"})
});

exports.insertGeneralPlansFile = withErrorHandling(async (req, res) => {
    const codes = await GeneralPlan.findAll({attributes:["code"]});
    fs.readFile(path.join(__dirname, "..", "data", "generalPlans.json"),
     "utf8", async (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        Object.keys(json).forEach(async (key) => {
            if(!codes.some((value) => key == value.code)) {
                await GeneralPlan.create({code:key, description:json[key]})
            }
        });
        res.status(201).json({success:true, message:"Wstawiono plany ogólne"})
    });
});

exports.updateGeneralPlan = withErrorHandling(async (req, res) => {
    const {idGeneralPlan, code, description} = req.body;
    const [affectedRows] = await GeneralPlan.update({code, description}, {where:{id:idGeneralPlan}})
    res.status(200).json({success:true, message:"Plan ogólny zaktulizowany", affectedRows})
});

exports.deleteGeneralPlan = withErrorHandling(async (req, res) => {
    const {idGeneralPlan} = req.body;
    const deletedCount = await GeneralPlan.destroy({where:{id:idGeneralPlan}});
    res.status(200).json({success:true, message:"Usunięto plan ogólny", deletedCount})
});