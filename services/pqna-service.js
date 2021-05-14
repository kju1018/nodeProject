const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
   

    count: async function(keyword, searchType) {
        try {
            let where = { "grouplayer": 0 };
            if(keyword && searchType){
                if(searchType === "userid"){
                    where = {
                        [Op.and]: [
                            { "userid": {[Op.like]: "%" + keyword + "%"} },
                            { "grouplayer": 0 }
                        ]
                    }
                } else if(searchType === "name"){
                    where = {
                        [Op.and]: [
                            { "uname": {[Op.like]: "%" + keyword + "%"} },
                            { "grouplayer": 0 }
                        ]
                    }
                } else if(searchType === "email"){
                    where = {
                        [Op.and]: [
                            { "uemail": {[Op.like]: "%" + keyword + "%"} },
                            { "grouplayer": 0 }
                        ]
                    }
                }
            }

            const totalRows = await db.ProductQna.count({
                where
            });     
            return totalRows;
        } catch (error) {
            throw error;
        }
    },

    getQnas: async function(pager, sort, keyword, searchType ) {

        try {
            let where = { "grouplayer": 0 };
            let where2 = null;
            let order = null;
            let order2 = null;
            if(keyword && searchType){
                if(searchType === "pname"){
                    where2 = {
                        "pname": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "btitle"){
                    where = {
                        [Op.and]: [
                            { "btitle": {[Op.like]: "%" + keyword + "%"} },
                            { "grouplayer": 0 }
                        ]
                    }
                } else if(searchType === "userid"){
                    where = {
                        [Op.and]: [
                            { "userid": {[Op.like]: "%" + keyword + "%"} },
                            { "grouplayer": 0 }
                        ]
                    }
                }
            }
            if(sort === "pname"){
                order2 = [[sort, "DESC"]];
            } else {
                order = [[sort, "DESC"]];
            }
            const qnas = await db.ProductQna.findAll({
                where,
                order,
                include: [{
                    model: db.Product,
                    where: where2,
                    order: order2
                }],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return qnas;
        } catch (error) {
            throw error;
        }
    },

    repCount: async function(boardno) {
        try {
            repTotalRows = await db.ProductQna.count({
                where : {
                    [Op.and]: [
                        { "originno": boardno },
                        { "grouplayer": 1 }
                    ]
                }
            })
            return repTotalRows;
        } catch (error) {
            throw error;
        }
    },

    getReplies: async function(pager ,boardno) {
        try {
            replies = await db.ProductQna.findAll({
                where : {
                    [Op.and]: [
                        { "originno": boardno },
                        { "grouplayer": 1 }
                    ]
                },
                order: [["boardno", "asc"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            })
            return replies;
        } catch (error) {
            throw error;
        }
    },

    getBoard: async function(boardno) {
        try {
            board = await db.ProductQna.findOne({
                where : { boardno }
            })
            return board;
        } catch (error) {
            throw error;
        }
    },

    update: async function(board) {
        try {
            const rows = await db.ProductQna.update({
                bcontent: board.bcontent
            }, {where: {boardno: board.boardno}});
            return rows;
        } catch (error) {
            throw error;
        }
    },

    create: async function(board) {
        try {
            const rows = await db.ProductQna.create(board);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    deleteBoard: async function(boardno) {
        try {
            const rows = await db.ProductQna.destroy({ where: {boardno} });
            return rows;
        } catch (error) {
            throw error;
        }
    }
};
