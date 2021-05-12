angular.module("app")
  .controller("loginController", function($scope, loginService, reviewService,userService, productService, noticeService,
                                          orderService ,$window, $rootScope, $location) { //서비스(exam26Service) 주입받음
    $scope.$on("$routeChangeSuccess", () => {
      if($rootScope.uid != null){
        $scope.getReviewCount();
        $scope.getOrderCount();
        $scope.getReviewList();
        $scope.userCount();
        $scope.adminlist();
        // $scope.getMainList();
        // $scope.getNotice(1);
      }
    });


    $scope.login = (user) => {
      loginService.login(user)
        .then((response) => {
          $rootScope.uid = response.data.uid; //스프링의 map의 정보를 받음
          $rootScope.authToken = response.data.authToken;
          $rootScope.uemail = response.data.email;
          $rootScope.uname = response.data.uname;

          sessionStorage.setItem("uid", response.data.uid); //세션에 저장(웹의 네트워크 콘솔)
          sessionStorage.setItem("uemail", response.data.email);
          sessionStorage.setItem("uname", response.data.uname);
          sessionStorage.setItem("authToken", response.data.authToken);
          $location.url("/");
        })
        .catch((response) => {
          $window.alert("로그인 실패: "+ response.data.error.message);
        });
    }

    $scope.getReviewCount = () => {
      reviewService.reviewCount()
        .then((response) => {
          $scope.reviewCount = response.data;
        });
    }

    $scope.getOrderCount = () => {
      orderService.orderCount()
        .then((response) => {
          $scope.orderCount = response.data;
        });
    }

    $scope.getReviewList = () => {
      reviewService.bestReview()
        .then((response) => {
          console.log(response.data);
          $scope.reviews = response.data;
        });
    }

    
    $scope.battachUrl = (boardno) => {
        return reviewService.battachUrl(boardno);
    };

    $scope.userCount = () => {
      userService.userCount()
      .then((response => {
        $scope.usercount = response.data;
      }))
    }

    $scope.adminlist = () => {
      userService.adminlist()
      .then((response) => {
       $scope.adminlists = response.data;
      })
    }

    $scope.getMainList = () => {      
      productService.mainlist()
      .then((response) => {
        $scope.totalRows = response.data.totalRows;
        $scope.best = response.data.best;
        $scope.newitem = response.data.newitem;
      });
    }

    $scope.getNotice = (pageNo) => {
      noticeService.getnotice(pageNo)
      .then((response) => {
        console.log(response);
        $scope.pager = response.data.pager;
        console.log($scope.pager);
        $scope.notices = response.data.notice;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
      });
    }

  });