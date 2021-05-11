const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");

module.exports = {
    login: async function(user) {
        try {
            const dbUser = await db.User.findOne({
                where: {userid: user.userid}
            });
            let result = {};
            if(dbUser) {
                const passwordCheck = await bcrypt.compare(user.upassword, dbUser.upassword);
                if(passwordCheck){
                    result = {id:"success",userid:dbUser.userid, uemail: dbUser.uemail, uname: dbUser.uname};//여기 result는 내 맘대로
                } else {
                    result = {id:"wrongUserPassword", message: "패스워드가 틀립니다."};//여기 result는 내 맘대로
                }
            } else {
                result = {id:"wrongUserid", message: "아이디가 존재하지 않습니다."};//여기 result는 내 맘대로
            }
            return result;
        } catch (error) {
            throw error;
        }
    },

    count: async function() {
        try {
            const result = await db.User.count();
            return result;
        } catch (error) {
            throw error;
        }
    },

    adminList: async function() {
        try {
            const result = await db.User.findAll({
                where: {uauthority: 'ROLE_ADMIN'}
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    list: async function(pager) {

        try {
            console.log("시작");
            const result = await db.User.findAll({
                where: {uauthority: 'ROLE_USER'},
                order: [["userid", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    nameList: async function(pager) {

        try {
            console.log("시작");
            const result = await db.User.findAll({
                where: {uauthority: 'ROLE_USER'},
                order: [["uname", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
};
