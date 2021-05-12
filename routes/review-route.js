const express = require("express");
const reviewService = require("../services/review-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.keyword;
        const searchType = req.query.searchType;
        const sort = req.query.sort;

        const totalRows = await reviewService.count(keyword, searchType);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const reviews = await reviewService.getReviews(pager ,keyword, searchType, sort);
        res.json({pager, reviews});
    } catch (error) {
        next(error);
    }
});


router.get("/reviewTotalRows", async (req, res, next) => {
    try {
        const result = await reviewService.count();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/bsetReview", async (req, res, next) => {
    try {
        const reviews = await reviewService.getBestReview();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.get("/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        const review = await reviewService.getReview(boardno);
        res.json(review);
    } catch (error) {
        next(error);
    }
});

router.delete("/:boardno", async (req, res, next) => {
    try {
        const boardno = parseInt(req.params.boardno);
        console.log(boardno);
        const row = await reviewService.deleteReview(boardno);
        res.json(row);
    } catch (error) {
        next(error);
    }
});

router.get("/battach/:boardno",async (req, res, next) => {
    const boardno = req.params.boardno;
    const review = await reviewService.getReview(boardno);
    const fileOriginalName = review.borgimg;
    const fileSavePath = process.env.UPLOAD_PATH + review.bsaveimg;
    res.download(fileSavePath, fileOriginalName);
})


module.exports = router;

