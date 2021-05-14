const express = require("express");
const cqnaService = require("../services/cqna-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("/search", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = req.query.searchType;
        const totalRows = await cqnaService.count(keyword, searchType);
        
        const pager = paging.init(5, 5, pageNo, totalRows);

        const communityqnas = await cqnaService.getQnas(pager, keyword, searchType);
        res.json({pager, communityqnas});

    } catch (error) {
        next(error);
    }
});

router.post("/repl", async (req, res, next) => {
    try {
        const repl = req.body;
        await cqnaService.createRepl(repl);
        res.json("success");

    } catch (error) {
        next(error);
    }
});

router.get("/:boardno", async (req, res, next) => {
    try {
        const boardno = req.params.boardno;
        const qna = await cqnaService.getQna(boardno);
        res.json(qna);
    } catch (error) {
        next(error);
    }
});

router.put("/", async(req, res, next) => {
    try {
        const qna = req.body;
        cqnaService.updateQna(qna);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.delete("/:boardno", async (req, res, next) => {
    try {
        const boardno = req.params.boardno;
        cqnaService.deleteQna(boardno);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

module.exports = router;

