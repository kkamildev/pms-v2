const jwt = require("jsonwebtoken");
const config = require("../util/config");

const authorization = () => {
    const createAccessToken = (req, res, next) => {
        if(req.cookies["REFRESH_TOKEN"]) {
            try {
                const decoded = jwt.verify(req.cookies["REFRESH_TOKEN"], config.refreshTokenKey);
                const { exp, ...safePayload } = decoded;
                const accessToken = jwt.sign(safePayload, config.accessTokenKey, {
                    expiresIn:"10m"
                })
                res.cookie("ACCESS_TOKEN", accessToken, {
                    maxAge:1000*60*10,
                    httpOnly:true,
                    secure:config.cookieSecurity
                });
                req.user = decoded;
                next();
            } catch (err) {
                res.status(401).json({unauthorized:true, error:"Dostęp nieupoważniony"})
            }
        } else {
            res.status(401).json({unauthorized:true, error:"Dostęp nieupoważniony"})
        }
    }
    return (req, res, next) => {
        if(req.cookies["ACCESS_TOKEN"]) {
            try {
                const decoded = jwt.verify(req.cookies["ACCESS_TOKEN"], config.accessTokenKey);
                req.user = decoded;
                next()
            } catch(err) {
               createAccessToken(req, res, next);
            }
        } else {
            createAccessToken(req, res, next);
        }
    }
}
module.exports = authorization;