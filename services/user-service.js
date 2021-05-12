const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
    login: async function(user) {
        try {
            const dbUser = await db.User.findOne({
                where: {userid: user.userid}
            });
            let result = {};
            if(dbUser) {
                if(dbUser.uauthority == 'ROLE_USER'){
                    result = {id:"no permission", message: "관리자 계정이 아닙니다."};
                    return result;
                } else if(dbUser.uenabled == 0){
                    result = {id:"no enabled", message: "활성화 된 계정이 아닙니다."};
                    return result;
                }
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

    join: async function(user) {
        user.upassword = await bcrypt.hash(user.upassword, 12);
        const dbUser = await db.User.create(user);
        return dbUser;
    },

    checkUser: async function(userid) {
        try {
            const dbUser = await db.User.findOne({
                where: {userid}
            });
            let result = {id:"success", message: "회원가입 완료!"};
            if(dbUser) {
                result = {id:"fail", message: "계정이 이미 존재합니다."};
                return result;
            } else  {
                return result;  
            }
        } catch (error) {
            throw error;
        }
    },

    count: async function(keyword, searchType) {
        try {
            let where = null;
            if(keyword && searchType){
                if(searchType === "userid"){
                    where = {
                        "userid": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "name"){
                    where = {
                        "uname": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "email"){
                    where = {
                        "uemail": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            const totalRows = await db.User.count({
                where
            });     
            return totalRows;
        } catch (error) {
            throw error;
        }
    },

    adminList: async function() {
        try {
            const admins = await db.User.findAll({
                where: {uauthority: 'ROLE_ADMIN'}
            });
            return admins;
        } catch (error) {
            throw error;
        }
    },
    list: async function(pager, keyword, searchType) {

        try {
            let where = null;
            if(keyword && searchType){
                if(searchType === "userid"){
                    where = {
                        "userid": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "name"){
                    where = {
                        "uname": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "email"){
                    where = {
                        "uemail": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }


            const users = await db.User.findAll({
                where,
                order: [["userid", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return users;
        } catch (error) {
            throw error;
        }
    },

    nameList: async function(pager) {

        try {
            const users = await db.User.findAll({
                order: [["uname", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return users;
        } catch (error) {
            throw error;
        }
    },

    emailList: async function(pager) {

        try {
            const users = await db.User.findAll({
                order: [["uemail", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return users;
        } catch (error) {
            throw error;
        }
    },

    dateList: async function(pager) {

        try {
            const users = await db.User.findAll({
                order: [["ujoindate", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return users;
        } catch (error) {
            throw error;
        }
    },

    userDisabled: async function(userid) {
        try {
            const rows = await db.User.update({
                uenabled: 0
            }, { where: {userid} });
            return rows;
        } catch (error) {
            throw error;
        }
    },
    userActivate: async function(userid) {
        try {
            const rows = await db.User.update({
                uenabled: 1
            }, { where: {userid} });
            return rows;
        } catch (error) {
            throw error;
        }
    },

    passwordReset: async function(userid) {
        try {
            let password = userid+"team5";
            password = await bcrypt.hash(password, 12);
            const rows = await db.User.update({
                upassword: password
            }, {where: {userid}});
            return rows;
        } catch (error) {
            throw error;
        }
    }
};
