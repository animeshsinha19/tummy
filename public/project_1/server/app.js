module.exports = function (app, db, mongoose) {

    // Model dependencies
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var restaurantModel = require("./models/restaurant.model.server.js")(db, mongoose, userModel);

    // Service dependencies
    var userService = require("./services/user.service.server.js")(app, userModel);
    var restaurantService = require("./services/restaurant.service.server.js_backup")(app, restaurantModel, userModel);

}