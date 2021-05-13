const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductQna extends Model {
        static associate(models) { 
            models.ProductQna.belongsTo(models.Product, {foreignKey:"productno", targetKey:"productno"});
        }
    }

    ProductQna.init({
        boardno:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productno: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            allowNull: true
        },
        grouplayer: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    }, {
        sequelize,
        modelName: "ProductQna",
        tableName: "productqnas",
        timestamps: false
    });

    return ProductQna;
}