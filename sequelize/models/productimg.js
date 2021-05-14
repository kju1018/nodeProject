const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductImg extends Model {
        static associate(models) { 
            models.ProductImg.belongsTo(models.Product, {foreignKey:"productno", targetKey:"productno"});
        }
    }
    
    ProductImg.init({
        imgno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ioriginalname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isavename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgtype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ipriority:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "ProductImg",
        tableName: "productimgs",
        timestamps: false,
    })

    return ProductImg;
}