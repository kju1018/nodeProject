const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Notice extends Model {
        static associate(models) { 
          
        }
    }

    Notice.init({
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
            allowNull: false
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
        notiorgimg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notisaveimg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notiimgtype: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    }, {
        sequelize,
        modelName: "Notice",
        tableName: "notices",
        timestamps: false
    });

    return Notice;
}