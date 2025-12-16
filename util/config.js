

module.exports = {
    dbName:process.env.DB_NAME || "pms",
    dbHost:process.env.DB_HOST || "localhost",
    dbUser:process.env.DB_USER || "root",
    dbPassword:process.env.DB_PASSWORD || "",
    development:Number(process.env.DEVELOPMENT),
    appPort:process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
    cookieSecurity:Number(process.env.COOKIE_SECURITY),
    refreshTokenKey:process.env.REFRESH_TOKEN_KEY || "inWhm0r9gfwJ_s07KEYrX",
    accessTokenKey:process.env.ACCESS_TOKEN_KEY || "K1BjP6-xTEAS8uKoq1vNm",
    saltOrRounds:Number(process.env.SALT_OR_ROUNDS) || 12,
    landFilesFolder:process.env.LAND_FILES_FOLDER || "landFiles",
    fileMaxSize:process.env.FILE_MAX_SIZE ? Number(process.env.FILE_MAX_SIZE) : (10 * 1024 * 1024),
    requestsPerMinute:process.env.REQUESTS_PER_MINUTE ? Number(process.env.REQUESTS_PER_MINUTE) : 1000,
    mailHost:process.env.MAIL_HOST || "",
    mailPort:process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 110,
    mailUser:process.env.MAIL_USER || "name.surname@domain.com",
    mailPassword:process.env.MAIL_PASSWORD || "123456",
    mailAdmin:process.env.MAIL_ADMIN || "name.surname@domain.com",
    backupDir:process.env.BACKUP_DIR || "./backups",
    cronExpression:process.env.CRON_EXPRESSION || "0 12 * * 1"
};