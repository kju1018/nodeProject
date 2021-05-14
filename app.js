//모듈 가져오기 
const express = require("express");
const path = require("path");
const nunjucks =  require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { sequelize } = require("./sequelize/models/index");//./sequelize/models/여기까지 해도 상관없음 하지만 지금은 명시적으로 작성
const jwtAuth = require("./security/jwtAuth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const session = require("express-session");

//라우터 가져오기
const userRoute = require("./routes/user-route");
const orderRoute = require("./routes/order-route");
const reviewRoute = require("./routes/review-route");
const noticeRoute =require("./routes/notice-route");
const pqnaRoute = require("./routes/pqna-route");
const cqnaRoute = require("./routes/cqna-route");
const productRoute = require("./routes/product-route");


// .env파일을 읽어서 process.env에 추가
dotenv.config();

//애플리케이션 객체 생성
const app = express();
app.set("port", process.env.PORT);

// 템플릿 엔진으로 nunjucks 설정
// view 파일의 확장명을 .html로 한다.
// app.set("view engine", "html");

// // //뷰 파일의 폴더 설정
// nunjucks.configure("views", {
//     express: app,
//     watch: true
// });

//sequelize 데이터 연결과 동시에 모델과 테이블을 매칭(동기화)
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패", err.message);
    });

app.use(cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    credentials: false
}));


//정적 파일들을 제공하는 폴더 지정
app.use(express.static(path.join(__dirname, "Angular_TeamProject")));//use는 모든 요청 방식을 다 허용, 모든요청에 해당하는 미들웨어
// app.use(express.static(path.join(__dirname, "public")));

// 브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

//요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서
//req.body 객체로 만드는 미들웨어 적용
app.use(express.urlencoded({extended:true})); //x-www-form-urlencoded: param1=value1&param2=value2 
app.use(express.json());//raw/json: {"param1":"value1", "param2":"value2"}

app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use((req, res, next) => {
//     //JWT인증일 경우
//     jwtAuth.setAuth(req, res);
//     next();
// })

app.use("/auth", userRoute);
app.use("/orders", orderRoute);
app.use("/productReview", reviewRoute);
app.use("/community/notice", noticeRoute);
app.use("/pqnaBoard", pqnaRoute);
app.use("/community/communityqna", cqnaRoute);
app.use("/product", productRoute);



app.use((req, res, next) => {
    
    const error = new Error("잘못된 요청");// 에러 객체
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err:{};
    error.message = err.message;
    error.status = err.status || 500;
    res.status(error.status);
    res.json({error});
});

//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});