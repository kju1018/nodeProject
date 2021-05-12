const { Model, Sequelize } = require("sequelize");//sequelize라는 모듈에서 Model, Sequelize를 사용하겠다.

module.exports = (sequelize, DataTypes) => {
    //모델 클래스 선언
    class User extends Model {
        // static init({}) 이렇게 작성해도됨
        static associate(models) {
            models.User.hasMany(models.ProductReview,{foreignKey:"userid", sourceKey:"userid"}); 
        }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    User.init({//이건 extends Model이 갖고있는 정적메소드, 재정의 하겠다는 뜻
        userid:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        upassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uzipcode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        uaddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        uemail:{
            type: DataTypes.STRING,
            allowNull: false
        },
        utel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ubirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        uenabled: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ujoindate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        uauthority: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false, //createAt과 updateAt 컬럼을 사용 안함
    })//왜 이닛을 만드냐

    //모델클래스 리턴
    return User;
};