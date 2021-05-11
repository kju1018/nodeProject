const express = require("express");
const userService = require("../services/user-service");
const jwtAuth = require("../security/jwtAuth");
const paging = require("../utils/paging");

const router = express.Router();

router.post("/login", async (req, res, next) =>{
    try {
        const user = req.body;
        const result = await userService.login(user);
        if(result.id !== "success"){//로그인 실패
            throw result;
        } else {
            //JWT 인증일 경우
            console.log(result);
            const authToken = jwtAuth.createJwt(user.userid);
            res.json({uid: result.userid, authToken, email: result.uemail, uname: result.uname });
        } 
    } catch (err) {
        next(err);
    }
});

router.get("/count", async (req, res, next) => {
    try {
        const totalRows = await userService.count();
        res.json(totalRows);
    } catch (error) {
        next(error)
    }
});

router.get("/list", async (req, res, next) => {
    try {
        const result = await userService.adminList();
        res.json(result);
    } catch (error) {
        next(error)
    }
});

router.get("/userList", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await userService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const userlist = await userService.list(pager); 
        res.json({pager, userlist});
    } catch (error) {
        next(error);
    }
});

router.get("/name", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await userService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const userlist = await userService.nameList(pager); 
        res.json({pager, userlist}); 
    } catch (error) {
        next(error);
    }
});


module.exports = router;

