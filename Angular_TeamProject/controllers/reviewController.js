angular.module("app")
    .controller("reviewController", function($scope, reviewService, $window) {

        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view) {
                case "list": return "views/productReview/reviewList.html";
                case "read": return "views/productReview/reviewRead.html";
            }
        }

        $scope.searchType = "titlecontent";
        $scope.reviewSort = "boardno";

        $scope.getList = (pageNo, type, word, sort) => {
            if(type != null && word != null){
                $scope.searchType = type;
                $scope.keyword = word;
            }
            if(sort != null){
                $scope.reviewSort = sort;
            }
            reviewService.list(pageNo, $scope.searchType, $scope.keyword, $scope.reviewSort)//promise를 가져옴
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.reviews = response.data.reviews;
                    $scope.pageRange = [];
                    for(let i = $scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i);
                    }
                    $scope.view = "list";
                });
        };


        $scope.read = (boardno) => {
            reviewService.readReview(boardno)
                .then((response) => {
                    $scope.review = response.data;
                    $scope.view = "read";
                });
        };

        $scope.deleteBoard = (boardno) => {

            if($window.confirm("리뷰를 삭제 하시겠습니까?")){
                reviewService.deleteReview(boardno)
                .then((response) => {
                    $scope.getList(1);
                    $scope.view = "list";
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

        $scope.battachUrl = (boardno) => {
            return reviewService.battachUrl(boardno);
        };

    });