function log(req,res,next){
    console.log("Logging");
    next();
}

function authentication(req,res,next){
    console.log("Authentication");
    next();
}
module.exports.log = log;
exports.authentication = authentication;