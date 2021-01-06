const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {}
    
    Comment.init({
        comment: {
            type: DataTypes.TEXT
        }
    }, 
    {
        sequelize,
        modelName: "Comment"
    })
    return Comment
}