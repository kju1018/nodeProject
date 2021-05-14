const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
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
                } else if(searchType === "orderno"){
                    where = {
                        "orderno": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            const result = await db.Order.count({
                where
            }); 
            return result;  
        } catch (error) {
            throw error;
        }
    },

    list: async function(pager ,keyword, searchType) {
        try {
            let where = null;
            if(keyword && searchType){
                if(searchType === "userid"){
                    where = {
                        "userid": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                } else if(searchType === "orderno"){
                    where = {
                        "orderno": {
                            [Op.like]: "%" + keyword + "%"
                        }
                    }
                }
            }
            const orders = await db.Order.findAll({
                where,
                order: [["odate", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return orders;  
        } catch (error) {
            throw error;
        }
    },

    getOrder: async function(orderno) {
        try {
            const order = await db.Order.findOne({
                where: {orderno},
                include: [{
                    model: db.OrderProduct,
                    include: [{
                        model: db.Product,
                        attributes:["productno", "pname", "pprice"]
                    }]
                }]
            });
            
            return order;
        } catch (error) {
            throw error;
        }
    },

    updateStatus: async function(order) {
        try {

            const rows = await db.Order.update({
                ostatus: order.ostatus
            }, {where: {orderno: order.orderno}});

            return rows;
        } catch (error) {
            throw error;
        }
    }
}