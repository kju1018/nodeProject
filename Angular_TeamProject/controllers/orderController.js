angular.module("app")
    .controller("orderController", function($scope, orderService, 
                $window, $location, $routeParams, $rootScope) {
        
        $scope.$on("$routeChangeSuccess", () => {
            const orderno = $routeParams.orderno;

            if(orderno != null){ // 상세페이지로 들어갔을경우
                orderService.orderView(orderno)
                .then((response) => {
                    $scope.order = response.data;
                });
            } else { // 리스트로 들어갔을때
                if($rootScope.orderPageNo == null &&
                    $rootScope.orderSearchType == null &&
                    $rootScope.orderKeyword == null){
                        $scope.getList(1);
                } else { // 상세 페이지에서 다시 주문 내역으로 나왔을때
                 
                    $scope.searchType =  $rootScope.orderSearchType;
                    $scope.keyword = $rootScope.orderKeyword;
                    $scope.pageNo = $rootScope.orderPageNo;
                    $scope.type =  $rootScope.orderSearchType;
                    $scope.word = $rootScope.orderKeyword;

                    $rootScope.orderSearchType = null;
                    $rootScope.orderKeyword = null;
                    $rootScope.orderPageNo = null;
                    $scope.getList($scope.pageNo);
                }

            }
        });
        $scope.type = "userid";

        $scope.getList = (pageNo, searchType, word) => {
            if(searchType != null && word != null){
                $scope.searchType = searchType;
                $scope.keyword = word;
            }

            orderService.list(pageNo, $scope.searchType, $scope.keyword)//promise를 가져옴
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.orders = response.data.orders;
                    $scope.pageRange = [];
                    for(let i = $scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i);
                    }
          
                });
        };

        $scope.orderView = (orderno) => {
            
            $rootScope.orderPageNo = $scope.pager.pageNo;
            if($scope.searchType == null){
                $rootScope.orderSearchType = $scope.type;
            } else {
                $rootScope.orderSearchType = $scope.searchType;
            }
            
            $rootScope.orderKeyword = $scope.keyword;

            const path = `/ordered_view/${orderno}`;
            $location.url(path);
        };

        $scope.cancelStatus = () => {
            if($window.confirm("배송을 취소 하시겠습니까?")){
                $scope.order.ostatus = "취소";
                orderService.updateStatus($scope.order)
                    .then((response) => {
                        $scope.order = response.data;
                });
            } else {
                $window.alert("취소");
            }
            
        };

        $scope.completeStatus = () => {
            if($window.confirm("배송을 완료 하시겠습니까?")){
                $scope.order.ostatus = "배송완료";
                orderService.updateStatus($scope.order)
                    .then((response) => {
                        $scope.order = response.data;
                });
            } else {
                $window.alert("취소");
            }
            
        };

        $scope.onKeyPress = function($event, type, word){
            if($event.keyCode == 13){
                $scope.getList(1, type, word);
            }else{
                console.log("not pressed enter key");
            }
        };

    });