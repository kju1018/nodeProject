const express = require("express");
const orderService = require("../services/order-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = req.query.searchType;

        const totalRows = await orderService.count(keyword, searchType);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const orders = await orderService.list(pager ,keyword, searchType);
        res.json({pager, orders});
    } catch (error) {
       next(error); 
    }
});

router.get("/orderTotalRows", async (req, res, next) => {
    try {
        const result = await orderService.count();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const order = req.body;
        orderService.updateStatus(order);
        res.json(order);
    } catch (error) {
        next(error);
    }
});

router.get("/:orderno", async (req, res, next) => {
    try {
        const orderno = parseInt(req.params.orderno);
        const order = await orderService.getOrder(orderno);
        res.json(order);
    } catch (error) {
        next(error);
    }
})


module.exports = router;

