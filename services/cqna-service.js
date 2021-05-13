const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
    count: async function(keyword, searchType) {
        try {
            let where = null;
            if(keyword && searchType){
                if(searchType === "btitlebcontent"){
                    where = {
                        [Op.or]: [
                            { "btitle": {[Op.like]: "%" + keyword + "%" }},
                            { "bcontent": {[Op.like]: "%" + keyword + "%" }}
                        ]
                    }
                } else if(searchType === "userid"){
                    where = {
                        "userid": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            const result = await db.CommunityQna.count({
                where
            }); 
            return result;  
        } catch (error) {
            throw error;
        }
    },
    getQnas: async function(pager ,keyword, searchType) {
        try {
            let where = null;
            let order = null;
            if(keyword && searchType){
                if(searchType === "btitlebcontent"){
                    where = {
                        [Op.or]: [
                            { "btitle": {[Op.like]: "%" + keyword + "%" }},
                            { "bcontent": {[Op.like]: "%" + keyword + "%" }}
                        ]
                    }
                } else if(searchType === "userid"){
                    where = {
                        "userid": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            // order: {
            //     [Op.and]: [
            //         [["originno", "DESC"]],
            //         [["boardno", "ASC"]]
            //     ]
            // },
            const qnas = await db.CommunityQna.findAll({
                where,
                order: [
                    [["originno", "DESC"]],
                    [["boardno", "ASC"]]
                ],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return qnas;  
        } catch (error) {
            throw error;
        }
    },

    getQna: async function(boardno) {
        try {
            const qna = await db.CommunityQna.findOne({
                where: {boardno}
            }); 
            return qna;  
        } catch (error) {
            throw error;
        }
    },

    deleteReview: async function(boardno) {
        try {
            const row = await db.ProductReview.destroy({ where: {boardno}}); 
            return row;  
        } catch (error) {
            throw error;
        }
    }

   
}