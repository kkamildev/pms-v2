
require("dotenv").config();
const config = require("./util/config");

const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const createDatabase = require("./util/createDatabase");


const main = async () => {
    await createDatabase();
    const sequelize = require("./util/db");

    const users = require("./routes/users");
    const mpzp = require("./routes/mpzp");
    const generalPlans = require("./routes/generalPlans");
    const landTypes = require("./routes/landTypes");
    const landPurposes = require("./routes/landPurposes");
    const files = require("./routes/files");
    const owners = require("./routes/owners");
    const renters = require("./routes/renters");

    const app = express();
    // midlewares
    app.use(cors({
      origin:"localhost:5173",
      methods:["GET", "POST", "PUT", "DELETE"],
    }));
    const limiter = rateLimit({
      windowMs: 60 * 1000,
      max: config.requestsPerMinute,
    });
    app.use(limiter);
    app.use(express.json());
    app.use(cookieParser());
    if(!config.development) {
        app.use(express.static(path.join(__dirname, "app", "dist")));
    }

    // routes

    app.use("/api/users", users);
    app.use("/api/land-types", landTypes);
    app.use("/api/land-purposes", landPurposes);
    app.use("/api/mpzp", mpzp);
    app.use("/api/general-plans", generalPlans);
    app.use("/api/files", files);
    app.use("/api/renters", renters);
    app.use("/api/owners", owners);
    

    sequelize.sync({force:false});

};

main();