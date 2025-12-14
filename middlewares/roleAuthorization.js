const roleAuthorization = (requiredRoles) => {
    return (req, res, next) => {
        if(req.user) {
            if(requiredRoles.includes(req.user.role)) {
                next();
            } else {
                res.status(403).json({error:"Zasób zablokowany dla tej roli", forbidden:true})
            }
        } else {
            res.status(401).json({error:"Nie dokonano autoryzacji wstępnej", unauthorized:true})
        }
    }
}
module.exports = roleAuthorization;