const jwt = require("jsonwebtoken");

const jwtAuth = {
    createJwt: function(userid) {
        const authToken = jwt.sign({userid},process.env.JWT_SECRET, {expiresIn:"12h"});
        return authToken;
    },
    setAuth: function(req, res) {
        //jwt 얻기
        let authToken = null;
        if(req.signedCookies.authToken){
            // console.log("jwt가 쿠키로 넘어왔을 때");
            //jwt가 쿠키로 넘어왔을 때
            authToken = req.signedCookies.authToken;
        } else if (req.headers.authtoken){
            // console.log("jwt가 다른 헤더명으로 넘어왔을 때");
            //jwt가 다른 헤더명으로 넘어왔을 때
            authToken = req.headers.authtoken;
        } else if (req.query.authToken){
            // console.log("jwt가 쿼리스트링으로 넘어왔을 때");
            //jwt가 쿼리스트링으로 넘어왔을 때
            authToken = req.query.authToken;
        }
        //jwt 유효성 검사-----------------------------
        if(authToken){
            // console.log("유효성 검사");
            //서명을 확인하고 페이로드를 얻어냄
            //jwt 파싱(해석)
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

            //jwt의 만료 시간(초) 얻기
            const expires = decoded.exp;

            //현재 시간(초) 얻기
            const now = Math.floor(Date.now()/1000);
            //만료시간과 현재시간을 비교
            //유효기간이 남아있다면
            if((expires - now) > 0){
                if(decoded.userid){
                    //req에 userid를 저장
                    req.userid = decoded.userid;
                }
            }
        }
    },
    checkAuth: function(req, res, next) {
        if(req.userid){
            next();
        } else{
            //MPA 일 경우
            res.redirect("/exam12/loginForm");
            //RESTful API일 경우
            // const error = new Error("인증 필요");
            // error.status = 403;
            // next(error);
        }
    }
}

module.exports = jwtAuth;
