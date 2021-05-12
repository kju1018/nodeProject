const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
    count: async function() {
        try {
            const result = await db.Notice.count(); 
            return result;  
        } catch (error) {
            throw error;
        }
    },

    getNotices: async function(pager) {
        try {
            const notices = await db.Notice.findAll({
                order: [["boardno", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            })
            return notices;
        } catch (error) {
            throw error;
        }
    },

    create: async function(notice) {
        try {
            notice.bcount = 0;
            notice.bdate = new Date();
            dbNotice = await db.Notice.create(notice);
            return dbNotice;
        } catch (error) {
            throw error;
        }
    },

    getNotice: async function(boardno) {
        try {
            notice = await db.Notice.findOne({
                where: {boardno}
            });
            return notice;
        } catch (error) {
            throw error;
        }
    },

    update: async function(notice) {
        try {
            const row = await db.Notice.update(
                {
                    btitle: notice.btitle,
                    bcontent: notice.bcontent
                },
                {where: { boardno : notice.boardno } });

            return row;
        } catch (error) {
            throw error;
        }
    },

    delete: async function(boardno) {
        try {
            const row = await db.Notice.destroy({where: { boardno } });

            return row;
        } catch (error) {
            throw error;
        }
    },


}