const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) { 
            models.Order.hasMany(models.OrderProduct, {foreignKey:"orderno", sourceKey:"orderno"});
        }
    }

    Order.init({
        orderno:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oaddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        oreceiver: {
            type: DataTypes.STRING,
            allowNull: false
        },
        omessage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        omethod:{
            type: DataTypes.STRING,
            allowNull: false
        },
        odate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ostatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ozipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        onumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: false, //createAt과 updateAt 컬럼을 사용 안함
    });//왜 이닛을 만드냐

    return Order;
}