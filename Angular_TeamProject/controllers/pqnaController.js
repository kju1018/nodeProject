angular.module("app")
  .controller("pqnaController", function($scope, pqnaService, $rootScope) { 
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.view =  "list"   

    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/productQna/board_list.html"
        case "read": return "views/productQna/board_read.html"
      }
    };
    $scope.searchHow = {
      keyword: null,
      searchType: "selecopt"
    };
    $scope.listHow = {
      listcase : null
    }
    $scope.readreview = {
      bcontent: null
    }

    $scope.caselist = (caselist) => {
      $scope.searchHow.searchType = "selecopt"
      $scope.searchHow.keyword = null;
      $scope.listHow.listcase = caselist;
      $scope.getList(1);
     
    }

    $scope.searchList = () => {
      console.log("keyword ",$scope.searchHow.keyword);
      console.log("searchType ",$scope.searchHow.searchType);
      if($scope.searchHow.searchType =="selecopt" || $scope.searchHow.keyword == null ){
        alert("검색어 타입 선택 또는 검색어를 입력해주세요");
      }else {
        if($scope.searchHow.searchType == "pname"){
          $scope.getList(1);
          console.log($scope.searchHow.searchType);
         
        }

        if($scope.searchHow.searchType == "title"){
          $scope.getList(1);
          console.log($scope.searchHow.searchType);
        }

        if($scope.searchHow.searchType == "writer"){
          $scope.getList(1);
          console.log($scope.searchHow.searchType);
        }
      }
    }
    
  
    $scope.getList = (pageNo) => {
      sessionStorage.setItem("pageNo", pageNo);
     var resultlist = pqnaService.list(pageNo);
     
     if($scope.listHow.listcase == "title"){
      resultlist=pqnaService.btitlelist(pageNo);
    }
    if($scope.listHow.listcase == "pname"){
      resultlist=pqnaService.productnamelist(pageNo);
    }
    if($scope.listHow.listcase == "writer"){
      resultlist=pqnaService.useridlist(pageNo);
    }
    if($scope.listHow.listcase == "date"){
      resultlist=pqnaService.bdatelist(pageNo);
    }
    if($scope.searchHow.searchType == "pname"){
      resultlist=pqnaService.pnamesearchlist($scope.searchHow.keyword, pageNo);
    }
    if($scope.searchHow.searchType == "title"){
      resultlist=pqnaService.titlesearchlist($scope.searchHow.keyword, pageNo);
    }
    if($scope.searchHow.searchType == "writer"){
      resultlist=pqnaService.usersearchlist($scope.searchHow.keyword, pageNo);
    }
  
     resultlist
      .then((response) => { 
        $scope.pager = response.data.pager;
        $scope.boardlist = response.data.pqnaboardlist;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      })
      .catch((response)=> {
        console.log("fail");
      });
   
    };

    $scope.read = (boardno, pageNo) => {
      pqnaService.read(boardno, pageNo)
      .then((response) => {
        console.log(response)
        $scope.readpager = response.data.pager;
        $scope.reviewlist = response.data.reviewlist;
        $scope.boardpage = response.data.boardpage;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.readpager.startPageNo; i<=$scope.readpager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
      $scope.view = "read";
      })
    }

    $scope.delete = (boardno,pageNo) => {
      pqnaService.delete(boardno)
        .then((response) => {
          $scope.getList(pageNo);
          $scope.view = "list";
        });
    }
    $scope.addReview = (reviewadd, boardpage) => {
      console.log("content",reviewadd.content);
      console.log("boardpage",boardpage);
      var reviewpage = new Object();
      reviewpage.bcontent = reviewadd.content;
      reviewpage.userid = "user1";
      reviewpage.productno = boardpage.productno;
      reviewpage.btitle = boardpage.btitle;
      reviewpage.originno = boardpage.boardno;
      reviewpage.grouplayer = "1";

      pqnaService.addReview(reviewpage)
      .then((response) => {
        console.log(response);
        $scope.read(boardpage.boardno,1);
        reviewadd.content="";
      })
    }

    $scope.reviewread = (boardno) => {
      pqnaService.reviewread(boardno)
      .then((response) => {
        console.log(response);
        $scope.readreview = response.data;
      })
    }

    $scope.updateReview = (readreview,boardno,pageNo) => {
      console.log("dd", readreview);
      pqnaService.updateReview(readreview)
      .then((response) => {
        $scope.read(boardno,pageNo);
      })
    }

    $scope.reviewdelete = (readboadno,boardno, pageNo) => {
      console.log(pageNo);
      console.log(boardno);
      pqnaService.reviewdelete(boardno)
      .then((response) => {
        $scope.read(readboadno,pageNo);
      })
    } 
  
  });