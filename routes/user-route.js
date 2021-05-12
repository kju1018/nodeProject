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
            const authToken = jwtAuth.createJwt(user.userid);
            res.json({uid: result.userid, authToken, email: result.uemail, uname: result.uname });
        } 
    } catch (err) {
        next(err);
    }
});

router.post("/join", async (req, res, next) => {
    try {
        const user = {...req.body, ujoindate: new Date()};
        console.log(user);
        const result = await userService.checkUser(user.userid);
        if(result.id === "success") {
            await userService.join(user);
            res.json(result);
        } else {
            throw result;
        }
    } catch (error) {
        console.log(error);
        next(error)
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

router.get("/email", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await userService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const userlist = await userService.emailList(pager); 
        res.json({pager, userlist}); 
    } catch (error) {
        next(error);
    }
});

router.get("/joindate", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await userService.count();
        const pager = paging.init(5, 5, pageNo, totalRows);
        const userlist = await userService.dateList(pager); 
        res.json({pager, userlist}); 
    } catch (error) {
        next(error);
    }
});

router.get("/searchuser", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.search;
        const searchType = "userid";

        const totalRows = await userService.count(keyword, searchType);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const userlist = await userService.list(pager, keyword, searchType);
        res.json({pager, userlist});
    } catch (error) {
        next(error);
    }
});

router.get("/searchname", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.search;
        const searchType = "name";

        const totalRows = await userService.count(keyword, searchType);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const userlist = await userService.list(pager, keyword, searchType);
        res.json({pager, userlist});
    } catch (error) {
        next(error);
    }
});

router.get("/searchemail", async (req, res, next) => {
    try {
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const keyword = req.query.search;
        const searchType = "email";

        const totalRows = await userService.count(keyword, searchType);
        const pager = paging.init(5, 5, pageNo, totalRows);

        const userlist = await userService.list(pager, keyword, searchType);
        res.json({pager, userlist});
    } catch (error) {
        next(error);
    }
});

router.put("/disabled/:userid", async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const rows = await userService.userDisabled(userid);
        res.json({result:"success"});
    } catch (error) {
        next(error);
    }
});

router.put("/activate/:userid", async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const rows = await userService.userActivate(userid);
        res.json({result:"success"});
    } catch (error) {
        next(error);
    }
});

router.put("/update/:userid", async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const rows = await userService.passwordReset(userid);
        res.json({result:"success"});
    } catch (error) {
        next(error);
    }
})








module.exports = router;

