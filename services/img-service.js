const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;
module.exports = {
    create: async function(imglist, productno) {
        try {
            imglist.forEach(element => {
                element.productno = productno;
                db.ProductImg.create(element);
            });
            return "success";
        } catch (error) {
            throw error;
        }
    },

    update: async function(imglist) {
        try {
            imglist.forEach(element => {
                db.ProductImg.update(
                    {
                        ioriginalname: element.ioriginalname,
                        isavename: element.isavename,
                        imgtype: element.imgtype
                    },
                    { where: {imgno : element.imgno} });
            });
            return "success";
        } catch (error) {
            throw error;
        }
    }
}