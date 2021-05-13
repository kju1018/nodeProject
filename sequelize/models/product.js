const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) { 
            models.Product.hasMany(models.OrderProduct,{foreignKey:"productno", sourceKey:"productno"});
            models.Product.hasMany(models.ProductReview,{foreignKey:"productno", sourceKey:"productno"});
            models.Product.hasMany(models.ProductQna,{foreignKey:"productno", sourceKey:"productno"});
        }
    }
    
    Product.init({
        productno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pcategory: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pprice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pregisterdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        psalescount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pstock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        penable: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detailimgoname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detailimgsname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detailimgtype: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: false,
    })

    return Product;
}