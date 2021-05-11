angular.module("app")
  .controller("userController", function($scope, userService) { 
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.view =  "list "

    $scope.searchHow = {
      keyword: null,
      searchType: "selecopt"
    };
    $scope.listHow = {
      listcase : null
    }
   

    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/user/user_list.html"
      }
    };

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
        if($scope.searchHow.searchType == "id"){
          $scope.getList(1);
         
        }

        if($scope.searchHow.searchType == "name"){
          $scope.getList(1);
        }

        if($scope.searchHow.searchType == "email"){
          $scope.getList(1);
        }
      }
    }
    
  
    $scope.getList = (pageNo) => {
      sessionStorage.setItem("pageNo", pageNo);
     var resultlist = userService.list(pageNo);
     
     if($scope.listHow.listcase == "name"){
      resultlist=userService.namelist(pageNo)
    }
     if($scope.listHow.listcase == "email"){
      resultlist=userService.emaillist(pageNo);
    }
    if($scope.listHow.listcase == "date"){
      resultlist=userService.datelist(pageNo);
    }
    if($scope.searchHow.searchType == "id"){
      resultlist=userService.idsearchlist($scope.searchHow.keyword, pageNo);
    }
    if($scope.searchHow.searchType == "name"){
      resultlist=userService.namesearchlist($scope.searchHow.keyword, pageNo);
    }
    if($scope.searchHow.searchType == "email"){
      resultlist=userService.emailsearchlist($scope.searchHow.keyword, pageNo);
    }
     resultlist
      .then((response) => { 
        console.log(response)
        $scope.pager = response.data.pager;
        $scope.users = response.data.userlist;
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


    $scope.disabled = (userid) => {
      userService.disabled(userid)
      .then((response) => {
        $scope.getList(sessionStorage.getItem("pageNo"));
      });
    }

    $scope.activate = (userid) => {
      userService.activate(userid)
      .then((response) => {
        $scope.getList(sessionStorage.getItem("pageNo"));
      });
    }

    $scope.update = (userid) => {
      userService.update(userid)
      .then((response) => {
        $scope.getList(sessionStorage.getItem("pageNo"));
      })
    }


    // $scope.cancel = () => {
    //   $scope.getList($scope.pager.pageNo);
    //   $scope.view = "list";
    // };


    // $scope.updateNotice = (notice) => {

    //     noticeService.update(notice)
    //       .then((response) => {
    //         $scope.read(notice.boardno);
    //         $scope.view = "read";
    //       });
       
    // };

    // $scope.deleteNotice = (boardno) => {
    //   noticeService.delete(boardno)
    //     .then((response) => {
    //       $scope.getList($scope.pager.pageNo);
    //       $scope.view = "list";
    //     });
    // }
  });