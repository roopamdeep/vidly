const config = require("config");
module.exports = function () {
  if (!config.get("privatekey")) {
    console.error("Fatal Error: privatekey is not defined");
    process.exit(1);
  }
};
