module.exports = function(mongoose) {

    var restaurantSchema = mongoose.Schema(
        {
            yelpID: String,
            name: String,
            address: String
        }
    );

    return restaurantSchema;

};