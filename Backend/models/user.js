// modele class USER pour la base de données.

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, 
    {
        sequelize,
        modelName: "User"
    })
    return User
}