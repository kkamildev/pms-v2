
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
    

    sequelize.sync({force:false});

};

main();