
const cron = require("node-cron");
const config = require("./config");

const createReport = require("./reportCreation");
const createBackup = require("./createBackup");

const createShedule = () => {
    cron.schedule(config.cronExpression, () => {
        const weekNumber = Math.floor((new Date().getTime() / (1000 * 60 * 60 * 24 * 7)));
        if (weekNumber % 4 == 0) {
            createReport();
            createBackup();
        }
    });
    console.log("Cron shedule created");
}

module.exports = createShedule;