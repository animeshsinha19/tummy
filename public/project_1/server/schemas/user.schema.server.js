module.exports = function (mongoose) {

    var commentSchema = require("./comment.schema.server.js")(mongoose);
    var restaurantSchema = require("./restaurant.schema.server.js")(mongoose);

    var userSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: {
                type: [String],
                default: ['normal']
            },
            likes: {
                type: [restaurantSchema],
                default: []
            },
            comments: {
                type: [commentSchema],
                default: []
            },
            follows: {
                type: [String],
                default: []
            }
        },
        {
            collection: 'prjusers'
        }
    );

    return userSchema;

};