module.exports = function (mongoose) {

    var followsSchema = mongoose.Schema(
        {
            userId: String,
            followedIds: [String]
        },
        {
            collection: 'prjuserfollows'
        }
    );

    return followsSchema;

};