angular.module("app")
  .controller("communityqnaController", function($scope, communityqnaService, $rootScope, $location) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.showpage = "";
    $scope.keyword = "";
    $scope.searchType = "";
    $scope.boardno = "";
    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/communityqna/communityqna_list.html"
        case "create": return "views/communityqna/communityqna_create.html"
        case "createrepl": return "views/communityqna/communityqna_createrepl.html"
        case "read": return "views/communityqna/communityqna_read.html"
        case "update": return "views/communityqna/communityqna_update.html"
      }
    };
    
    $scope.searchHow = {
      keyword: null,
      type: "btitlebcontent"
    };

  
    
    $scope.getList = (pageNo, type) => {
      if(type != null){
        $scope.searchType = type;
      }

      communityqnaService.list(pageNo, $scope.searchType, $scope.searchHow.keyword)
      .then((response) => { //성공적으로 되면 response 객체 얻음
        $scope.pager = response.data.pager; //오른쪽이 맵으로 보냇을때 이름
        $scope.communityqnas = response.data.communityqnas;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      }).catch((response) => {
        //$window.alert("로그인 실패: ", response.data);
        $location.url("/home")
      });
    };

    $scope.read = (boardno) => {
      communityqnaService.read(boardno)
        .then((response) => {
          $scope.communityqna = response.data;
          $scope.view = "read"; //read라는 view를 보여주기
          $scope.searchHow.type = $scope.searchType;
        });
    };

    $scope.createCqna = (communityqna) => {
      communityqna.userid=sessionStorage.getItem("uid");
      if(communityqna && communityqna.btitle && communityqna.bcontent) {
        
        communityqnaService.create(communityqna)
          .then((response) => {
            $scope.getList(1);
            $scope.view = "list";
          });
      }
    };

    $scope.createCqnaForm = (boardno) => {
      $scope.boardno=boardno
      $scope.view = "create";
    };

    $scope.createReplForm = () => {
      $scope.view = "createrepl";
    };

    $scope.createRepl = (communityqna) => {
      communityqna.userid=sessionStorage.getItem("uid");
      communityqna.btitle="ㄴ["+communityqna.btitle+"글의 답글]";
      console.log(communityqna);
      if(communityqna && communityqna.btitle && communityqna.bcontent) {
        
        communityqnaService.createrepl(communityqna)
          .then((response) => {
            $scope.getList(1);
            $scope.view = "list";
          });
      }
    };

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };

    $scope.updateCqnaForm = () => {
      $scope.view = "update";
    };
  
    $scope.updateCqna = (communityqna) => {

      communityqnaService.update(communityqna)
          .then((response) => {
            $scope.read(communityqna.boardno);
            $scope.view = "read";
          });
       
    };

    $scope.deleteCqna = (boardno) => {
      communityqnaService.delete(boardno)
        .then((response) => {
          $scope.getList($scope.pager.pageNo);
          $scope.view = "list";
        });
    };

  });