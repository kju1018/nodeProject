const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductReview extends Model {
        static associate(models) { 
            models.ProductReview.belongsTo(models.Product, {foreignKey:"productno", targetKey:"productno"});
            models.ProductReview.belongsTo(models.User, {foreignKey:"userid", targetKey:"userid"});
        }
    }

    ProductReview.init({
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
        bcontent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bdate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        borgimg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bsaveimg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bimgtype: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bcount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: "ProductReview",
        tableName: "productreviews",
        timestamps: false
    });

    return ProductReview;
}