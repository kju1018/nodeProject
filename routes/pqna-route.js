const express = require("express");
const pqnaService = require("../services/pqna-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("/boardlist", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await pqnaService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager,"boardno");
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/productname", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await pqnaService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "pname");
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/btitle", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await pqnaService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "btitle");
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/userid", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await pqnaService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "userid");
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/bdate", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await pqnaService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "bdate");
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/searchproductname", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = "pname";
        const totalRows = await pqnaService.count(keyword, searchType);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "boardno", keyword, searchType);
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/searchbtitle", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = "btitle";
        const totalRows = await pqnaService.count(keyword, searchType);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "boardno", keyword, searchType);
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/searchuserid", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = "userid";
        const totalRows = await pqnaService.count(keyword, searchType);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const qnas = await pqnaService.getQnas(pager, "boardno", keyword, searchType);
        res.json({pager, pqnaboardlist: qnas});
    } catch (error) {
        next(error);
    }
});

router.get("/boardread", async (req, res, next) => {
    try {
        const boardno = parseInt(req.query.boardno);
        const pageNo = parseInt(req.query.pageNo);

        repTotalRow = await pqnaService.repCount(boardno);
        const pager = paging.init(5, 5, pageNo, repTotalRow);
        console.log(repTotalRow);
        const reviewlist = await pqnaService.getReplies(pager, boardno);
        const boardpage = await pqnaService.getBoard(boardno);
        
        res.json({pager, reviewlist, boardpage});
    } catch (error) {
        next(error);
    }
});

router.get("/reviewread", async (req, res, next) => {
    try {
        const boardno = parseInt(req.query.boardno);
        const board = await pqnaService.getBoard(boardno);

        res.json(board);
    
    } catch (error) {
        next(error);
    }
});

router.put("/rivewupdate", async (req, res, next) => {
    try {
        const readreview = req.body;
        const row = await pqnaService.update(readreview);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.post("/insert", async (req, res, next) => {
    try {
        const readreview = req.body;
        console.log(readreview);
        pqnaService.create(readreview);
        
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.delete("/boarddelete/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        pqnaService.deleteBoard(boardno);

        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.delete("/reviewdelete/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        pqnaService.deleteBoard(boardno);

        res.json("success");
    } catch (error) {
        next(error);
    }
});


module.exports = router;

