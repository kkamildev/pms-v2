

const sequelize = require("../util/db");
const { DataTypes} = require('sequelize');
const {nanoid} = require("nanoid");

const Mpzp = require("./Mpzp");
const GeneralPlan = require("./GeneralPlan");
const LandType = require("./LandType");
const LandPurpose = require("./LandPurpose");
const Rent = require("./Rent");
const Purchase = require("./Purchase");
const Town = require("./Town");
const Owner = require("./Owner");
const Sell = require("./Sell");

const Land = sequelize.define("Land", {
    id:{
        type:DataTypes.CHAR(21),
        allowNull:false,
        primaryKey:true,
        defaultValue: () => nanoid()
    },
    serialNumber:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    landNumber:{
        type:DataTypes.STRING(7),
        allowNull:false
    },
    area:{
        type:DataTypes.DECIMAL(8, 4),
        allowNull:false
    },
    idTown:{
        type:DataTypes.CHAR(21),
        allowNull:false
    },
    idOwner:{
        type:DataTypes.CHAR(21),
        allowNull:false
    },
    registerNumber:{
        type:DataTypes.STRING(15),
        allowNull:true,
        defaultValue:null
    },
    mortgage:{
        type:DataTypes.BOOLEAN(),
        defaultValue:false,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT(),
    },
    idLandType:{
        type:DataTypes.CHAR(21),
        allowNull:true,
        defaultValue:null
    },
    idLandPurpose:{
        type:DataTypes.CHAR(21),
        allowNull:true,
        defaultValue:null
    },
    idMpzp:{
        type:DataTypes.CHAR(21),
        allowNull:true,
        defaultValue:null
    },
    idGeneralPlan:{
        type:DataTypes.CHAR(21),
        allowNull:true,
        defaultValue:null
    },
    waterCompany:{
        type:DataTypes.BOOLEAN(),
        allowNull:false,
        defaultValue:false
    },
    propertyTax:{
        type:DataTypes.BOOLEAN(),
        allowNull:false,
        defaultValue:false
    },
}, {
    tableName:"lands",
    timestamps: false,
    indexes:[
        {
            name:"idx_town",
            fields:["idTown"]
        },
        {
            name:"idx_owner",
            fields:["idOwner"]
        },
        {
            name:"idx_landType",
            fields:["idLandType"]
        },
        {
            name:"idx_landPurpose",
            fields:["idlandPurpose"]
        },
        {
            name:"idx_mpzp",
            fields:["idMpzp"]
        },
        {
            name:"idx_generalPlan",
            fields:["idGeneralPlan"]
        }
    ]
});

Land.belongsTo(Mpzp, {
    foreignKey:"idMpzp",
    as:"mpzp",
    onDelete:"SET NULL"
});
Mpzp.hasMany(Land, {
    foreignKey:"idMpzp",
    as:"lands",
    onDelete:"SET NULL"
});

Land.belongsTo(GeneralPlan, {
    foreignKey:"idGeneralPlan",
    as:"generalPlan",
    onDelete:"SET NULL"
});
GeneralPlan.hasMany(Land, {
    foreignKey:"idGeneralPlan",
    as:"lands",
    onDelete:"SET NULL"
});

Land.belongsTo(LandType, {
    foreignKey:"idLandType",
    as:"landType",
    onDelete:"SET NULL"
});
LandType.hasMany(Land, {
    foreignKey:"idLandType",
    as:"lands",
    onDelete:"SET NULL"
});

Land.belongsTo(LandPurpose, {
    foreignKey:"idLandPurpose",
    as:"landPurpose",
    onDelete:"SET NULL"
});
LandPurpose.hasMany(Land, {
    foreignKey:"idLandPurpose",
    as:"lands",
    onDelete:"SET NULL"
});

Land.hasOne(Rent, {
    foreignKey:"id",
    as:"rent",
    onDelete:"CASCADE"
});
Rent.belongsTo(Land, {
    foreignKey:"id",
    as:"land",
    onDelete:"CASCADE"
});

Land.hasOne(Purchase, {
    foreignKey:"id",
    as:"purchase",
    onDelete:"CASCADE"
});
Purchase.belongsTo(Land, {
    foreignKey:"id",
    as:"land",
    onDelete:"CASCADE"
});

Land.hasOne(Sell, {
    foreignKey:"id",
    as:"sell",
    onDelete:"CASCADE"
});
Sell.belongsTo(Land, {
    foreignKey:"id",
    as:"land",
    onDelete:"CASCADE"
});

Land.belongsTo(Town, {
    foreignKey:"idTown",
    as:"town",
    onDelete:"CASCADE"
});
Town.hasMany(Land, {
    foreignKey:"idTown",
    as:"lands",
    onDelete:"CASCADE"
})

Land.belongsTo(Owner, {
    foreignKey:"idOwner",
    as:"owner",
    onDelete:"CASCADE"
});
Owner.hasMany(Land, {
    foreignKey:"idOwner",
    as:"lands",
    onDelete:"CASCADE"
})

module.exports = Land;