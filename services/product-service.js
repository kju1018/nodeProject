const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;
module.exports = {
    count: async function(category) {
        try {
            let where = null
            if(category){
                where = {
                    "pcategory": category
                }
            }
            
            const totalRows = await db.Product.count({
                where
            });
            return totalRows;
        } catch (error) {
            throw error;
        }
    },

    create: async function(product) {
        try {
            const dbProduct = await db.Product.create(product);
            return dbProduct;
        } catch (error) {
            throw error;
        }
    },
    update: async function(product, isDetail) {
        try {
            let row = null;
            if(isDetail == 1){
                row = await db.Product.update(
                    { 
                        pname: product.pname,
                        pcategory: product.pcategory,
                        pprice: product.pprice,
                        psalescount: product.psalescount,
                        pstock: product.pstock,
                        penable: product.penable,
                        detailimgoname: product.detailimgoname,
                        detailimgsname: product.detailimgsname,
                        detailimgtype: product.detailimgtype
                    },
                    {where: {productno: product.productno}});
            } else {
                row = await db.Product.update(
                    { 
                        pname: product.pname,
                        pcategory: product.pcategory,
                        pprice: product.pprice,
                        psalescount: product.psalescount,
                        pstock: product.pstock,
                        penable: product.penable
                    },
                    {where: {productno: product.productno}});
            }
            return row;
        } catch (error) {
            throw error;
        }
    },
    getProducts: async function(pager, category) {
        try {
            let where = null;
            if(category){
                where = {
                    "pcategory": category
                }
            }
            const products = await db.Product.findAll({
                where,
                order: [["productno", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return products;
        } catch (error) {
            throw error;
        }
    },

    getBestProducts: async function(){
        try {
            const products = await db.Product.findAll({
                order: [["psalescount", "DESC"]],
                limit: 7,
                offset: 0
            });
            return products;
        } catch (error) {
            throw error;
        }
    },

    getNewProducts: async function(){
        try {
            const products = await db.Product.findAll({
                order: [["pregisterdate", "DESC"]],
                limit: 7,
                offset: 0
            });
            return products;
        } catch (error) {
            throw error;
        }
    },

    getProduct: async function(productno) {
        try {
            const product = await db.Product.findOne({
                where: { productno }
            });
            product.dataValues.imglist = await product.getProductImgs({
                where: { productno },
                order: [["imgno", "ASC"]]
            });
            return product;
        } catch (error) {
            throw error;
        }
    },
    enabled: async function(productno) {
        try {
            row = await db.Product.update(
                { penable: 0 },
                {where: {productno}});
            return row
        } catch (error) {
            throw error;
        }
    },

}