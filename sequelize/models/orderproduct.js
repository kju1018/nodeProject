const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class OrderProduct extends Model {
        static associate(models) { 
            models.OrderProduct.belongsTo(models.Order,{foreignKey:"orderno", targetKey:"orderno"});
            models.OrderProduct.belongsTo(models.Product, {foreignKey:"productno", targetKey:"productno"});
        }
    }

    OrderProduct.init({
        orderno:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        productno: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        oquantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "OrderProduct",
        tableName: "orderproducts",
        timestamps: false, //createAt과 updateAt 컬럼을 사용 안함
    })//왜 이닛을 만드냐

    return OrderProduct;
}