const express = require("express");
const productService = require("../services/product-service");
const imgService = require("../services/img-service");
const paging = require("../utils/paging");
const multipartFormData = require("../utils/multipart-from-data");
const router = express.Router();

router.get("", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo;
        const totalRows = await productService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);

        const products = await productService.getProducts(pager);
        res.json({pager, products});

    } catch (error) {
        next(error);
    }
});

router.get("/list1", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo;
        const totalRows = await productService.count(1);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const products = await productService.getProducts(pager, 1);
        res.json({pager, products});

    } catch (error) {
        next(error);
    }
});

router.get("/list2", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo;
        const totalRows = await productService.count(2);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const products = await productService.getProducts(pager, 2);
        res.json({pager, products});

    } catch (error) {
        next(error);
    }
});

router.get("/list3", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo;
        const totalRows = await productService.count(3);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const products = await productService.getProducts(pager, 3);
        res.json({pager, products});

    } catch (error) {
        next(error);
    }
});

router.get("/list4", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo;
        const totalRows = await productService.count(4);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const products = await productService.getProducts(pager, 4);
        res.json({pager, products});

    } catch (error) {
        next(error);
    }
});

router.get("/mainlist", async (req, res, next) => {
    try {
        const totalRows = await productService.count();
        const best = await productService.getBestProducts();

        const newitem = await productService.getNewProducts();
        res.json({totalRows, best, newitem});

    } catch (error) {
        next(error);
    }
});

router.get("/imgbattach", async (req, res, next) => {
    try {
        const imgoname = req.query.imgoname;
        const imgsname = req.query.imgsname;
        const fileOriginalName = imgoname;
        const fileSavePath = process.env.UPLOAD_PATH + imgsname;
        res.download(fileSavePath, fileOriginalName);
    } catch (error) {
        next(error);
    }
});

router.get("/:productno", async (req, res, next) => {
    try {
        const productno = req.params.productno;
        const product = await productService.getProduct(productno);
        
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("", multipartFormData.fields([{name:"pattach1"}, {name:"pattach2"}, {name:"pattach3"},
                                        {name:"pattach4"}, {name:"pattach5"}]), async (req, res, next) => {

    try {
        const product = req.body;
        const files = req.files;
        let dbProduct = null

        if(files.pattach1){
            product.detailimgoname = files.pattach1[0].originalname;
            product.detailimgsname = files.pattach1[0].filename;
            product.detailimgtype = files.pattach1[0].mimetype;
            dbProduct = await productService.create(product);
        }
        let imglist = new Array();

        if(files.pattach2){
            let img = {};
            img.ioriginalname = files.pattach2[0].originalname;
            img.isavename = files.pattach2[0].filename;
            img.imgtype = files.pattach2[0].mimetype;
            img.ipriority = 1;
            imglist.push(img);
        } else {
            let img = {};
            img.ioriginalname = "null";
            img.isavename = "null";
            img.imgtype = "null";
            img.ipriority = 1;
            imglist.push(img);
        }

        if(files.pattach3){
            let img = {};
            img.ioriginalname = files.pattach3[0].originalname;
            img.isavename = files.pattach3[0].filename;
            img.imgtype = files.pattach3[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } else {
            let img = {};
            img.ioriginalname = "null";
            img.isavename = "null";
            img.imgtype = "null";
            img.ipriority = 0;
            imglist.push(img);
        }

        if(files.pattach4){
            let img = {};
            img.ioriginalname = files.pattach4[0].originalname;
            img.isavename = files.pattach4[0].filename;
            img.imgtype = files.pattach4[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } else {
            let img = {};
            img.ioriginalname = "null";
            img.isavename = "null";
            img.imgtype = "null";
            img.ipriority = 0;
            imglist.push(img);
        }

        if(files.pattach5){
            let img = {};
            img.ioriginalname = files.pattach5[0].originalname;
            img.isavename = files.pattach5[0].filename;
            img.imgtype = files.pattach5[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } else {
            let img = {};
            img.ioriginalname = "null";
            img.isavename = "null";
            img.imgtype = "null";
            img.ipriority = 0;
            imglist.push(img);
        }

        imgService.create(imglist, dbProduct.productno);
        
        res.json("success");

    } catch (error) {
        next(error);
    }

});


router.put("", multipartFormData.fields([{name:"pattach1"}, {name:"pattach2"}, {name:"pattach3"},
                                        {name:"pattach4"}, {name:"pattach5"}]), async (req, res, next) => {

    try {
        const product = req.body;
        const files = req.files;

        if(files.pattach1){
            product.detailimgoname = files.pattach1[0].originalname;
            product.detailimgsname = files.pattach1[0].filename;
            product.detailimgtype = files.pattach1[0].mimetype;
            await productService.update(product, 1);
        } else {
            await productService.update(product, 0);
        }
        let imglist = new Array();

        if(files.pattach2){
            let img = {};
            img.imgno = product.imgno1;
            img.ioriginalname = files.pattach2[0].originalname;
            img.isavename = files.pattach2[0].filename;
            img.imgtype = files.pattach2[0].mimetype;
            img.ipriority = 1;
            imglist.push(img);
        } 

        if(files.pattach3){
            let img = {};
            img.imgno = product.imgno2;
            img.ioriginalname = files.pattach3[0].originalname;
            img.isavename = files.pattach3[0].filename;
            img.imgtype = files.pattach3[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } 

        if(files.pattach4){
            let img = {};
            img.imgno = product.imgno3;
            img.ioriginalname = files.pattach4[0].originalname;
            img.isavename = files.pattach4[0].filename;
            img.imgtype = files.pattach4[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } 

        if(files.pattach5){
            let img = {};
            img.imgno = product.imgno4;
            img.ioriginalname = files.pattach5[0].originalname;
            img.isavename = files.pattach5[0].filename;
            img.imgtype = files.pattach5[0].mimetype;
            img.ipriority = 0;
            imglist.push(img);
        } 

        imgService.update(imglist);
        
        res.json("success");

    } catch (error) {
        next(error);
    }

});

router.delete("/:productno", async (req, res, next) => {
    try {
        const productno = req.params.productno;
        productService.enabled(productno);

        res.json("success")
    } catch (error) {
        next(error);
    }
})

module.exports = router;

