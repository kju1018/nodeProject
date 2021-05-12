const express = require("express");
const noticeService = require("../services/notice-service");
const paging = require("../utils/paging");

const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const pageNo = parseInt(req.query.pageNo);
        const totalRows = await noticeService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);

        const notices = await noticeService.getNotices(pager);
        res.json({pager, notices});
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const notice = req.body;
        noticeService.create(notice);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const notice = req.body;
        noticeService.update(notice);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.delete("/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        await noticeService.delete(boardno);
        res.json("success");
    } catch (error) {
        next(error);
    }
});

router.get("/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        const notice = await noticeService.getNotice(boardno);
        res.json(notice);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

