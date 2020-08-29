function admin(req,res,next){
    console.log("Logging");
    next();
}
module.exports = admin;