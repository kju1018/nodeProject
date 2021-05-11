angular.module("app")
  .controller("noticeController", function($scope, noticeService, $rootScope, $location) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/notice/notice_list.html"
        case "create": return "views/notice/notice_create.html"
        case "read": return "views/notice/notice_read.html"
        case "update": return "views/notice/notice_update.html"
      }
    };
    
    $scope.createNoticeForm = () => {
      $scope.notice = null;
      $scope.view = "create";
    };

    $scope.getList = (pageNo) => {
      noticeService.list(pageNo)
      .then((response) => { //성공적으로 되면 response 객체 얻음
        $scope.pager = response.data.pager;
        $scope.notices = response.data.notices;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      }) .catch((response) => {
        //$window.alert("로그인 실패: ", response.data);
        $location.url("/home")
      });
    };

    $scope.read = (boardno) => {
      noticeService.read(boardno)
        .then((response) => {
          $scope.notice = response.data;
          $scope.view = "read"; //read라는 view를 보여주기
        });
    };

    $scope.createNotice = (notice) => {
      console.log(notice)
      notice.userid=sessionStorage.getItem("uid");
      console.log(notice)
      if(notice && notice.btitle && notice.bcontent) {
        
        noticeService.create(notice)
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

    $scope.updateNoticeForm = () => {
      $scope.view = "update";
    };
  
    $scope.updateNotice = (notice) => {

        noticeService.update(notice)
          .then((response) => {
            $scope.read(notice.boardno);
            $scope.view = "read";
          });
       
    };

    $scope.deleteNotice = (boardno) => {
      noticeService.delete(boardno)
        .then((response) => {
          $scope.getList($scope.pager.pageNo);
          $scope.view = "list";
        });
    }

  });