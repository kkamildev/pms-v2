
const Mpzp = require("../models/Mpzp");
const withErrorHandling = require("../middlewares/withErrorHandling");
const path = require("path");
const fs = require("fs");

exports.getAllMpzp = withErrorHandling(async (req, res) => {
    const mpzp = await Mpzp.findAll({order:[["code", "ASC"]]});
    res.status(200).json({success:true, message:"pobrano MPZP", mpzp})
});

exports.insertMpzp = withErrorHandling(async (req, res) => {
    const {code, description} = req.body;
    await Mpzp.create({code, description});
    res.status(201).json({success:true, message:"Dodano mpzp"})
});

exports.insertMpzpFile = withErrorHandling(async (req, res) => {
    const codes = await Mpzp.findAll({attributes:["code"]});
    fs.readFile(path.join(__dirname, "..", "data", "mpzp.json"),
     "utf8", async (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        Object.keys(json).forEach(async (key) => {
            if(!codes.some((value) => key == value.code)) {
                await Mpzp.create({code:key, description:json[key]})
            }
        });
        res.status(201).json({success:true, message:"Wstawiono mpzp"})
    });
});

exports.updateMpzp = withErrorHandling(async (req, res) => {
    const {idMpzp, code, description} = req.body;
    const [affectedRows] = await Mpzp.update({code, description}, {where:{id:idMpzp}})
    res.status(200).json({success:true, message:"Mpzp zaktulizowany", affectedRows})
});

exports.deleteMpzp = withErrorHandling(async (req, res) => {
    const {idMpzp} = req.body;
    const deletedCount = await Mpzp.destroy({where:{id:idMpzp}});
    res.status(200).json({success:true, message:"Usunięto mpzp", deletedCount})
});