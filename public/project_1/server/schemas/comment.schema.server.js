module.exports = function (mongoose) {

    var restaurantSchema = require("./restaurant.schema.server.js")(mongoose);

    var commentSchema = mongoose.Schema(
        {
            restaurant: restaurantSchema,
            comments: [String]
        }
    );

    return commentSchema;

};