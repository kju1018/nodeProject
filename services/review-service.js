const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
    count: async function(keyword, searchType) {
        try {
            let where = null;
            let where2 = null;
            if(keyword && searchType){
                if(searchType === "titlecontent"){
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
                } else if(searchType === "productname"){
                    where2 = {
                        "pname": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            const result = await db.ProductReview.count({
                where,
                include:[{
                    model: db.Product,
                    where: where2
                }]
            }); 
            return result;  
        } catch (error) {
            throw error;
        }
    },

    getBestReview: async function() {
        try {
            let where = null;
            const reviews = await db.ProductReview.findAll({
                where,
                order: [["bcount", "DESC"]],
                limit: 7,
                offset: 0,
                include: [{
                    model: db.Product,
                    attributes:["productno", "pname"]
                }]
            }); 
            return reviews;  
        } catch (error) {
            throw error;
        }
    },
    getReviews: async function(pager ,keyword, searchType, sort) {
        try {
            let where = null;
            let where2 = null;
            let order = null;
            let order2 = null;
            if(keyword && searchType){
                if(searchType === "titlecontent"){
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
                } else if(searchType === "productname"){
                    where2 = {
                        "pname": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            if(sort == "pname"){
                order2 = [[sort, "DESC"]];
            } else {
                order = [[sort, "DESC"]];
            }
            const reviews = await db.ProductReview.findAll({
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
            return reviews;  
        } catch (error) {
            throw error;
        }
    },

    getReview: async function(boardno) {
        try {
            const review = await db.ProductReview.findOne({
                where: {boardno},
                include: [{
                    model: db.Product,
                    attributes:["productno", "pname"]
                }]
            }); 
            return review;  
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