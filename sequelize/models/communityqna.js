const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CommunityQna extends Model {
        static associate(models) { 
        }
    }

    CommunityQna.init({
        boardno:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        btitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bdate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        bcontent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bcount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        originno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        grouplayer: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    }, {
        sequelize,
        modelName: "CommunityQna",
        tableName: "communityqnas",
        timestamps: false
    });

    return CommunityQna;
}