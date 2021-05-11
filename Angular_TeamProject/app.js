angular.module("app", ["ngRoute"]) //대괄호가 있으면 생성, 없으면 있는것을 가져다가 쓰는것
    .config(function() {
        // ['$qProvider', function ($qProvider) {

        //     $qProvider.errorOnUnhandledRejections(false);
        
        // }]
    })
    .run(function($rootScope, $http) {

        //세션 저장소에 있는 uid, authToken을 읽기
        $rootScope.uid = sessionStorage.getItem("uid");
        $rootScope.authToken = sessionStorage.getItem("authToken");
        $rootScope.uemail = sessionStorage.getItem("uemail");
        $rootScope.uname = sessionStorage.getItem("uname");

        //$rootScope.authToken의 값의 변화를 감시
        $rootScope.$watch("authToken", (newValue) => {
            if(newValue) {
                $http.defaults.headers.common.authToken = newValue;
            } else {
                delete $http.defaults.headers.common.authToken;
            }
        });
    })
    //중첩된 컨트롤러 범위에서 사용할 수 있는 상태 데이터 및 함수
    .controller("mainController", function($rootScope, $scope, $location, $route){

        $scope.logout = () => {
            $rootScope.uid="";
            $rootScope.uemail="";
            $rootScope.authToken="";
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("uemail");
            sessionStorage.removeItem("authToken");
            $location.url("/home");
        }

        //이전 URL과 동일한 URL일 경우 리프레쉬함
        $scope.reloadable = (path) => {
            if($location.url().includes(path)){//현재 url의 정보가 path를 갖고 있다면 갱신해라
                $route.reload();
            }
        }

        $scope.$on("search", (event, message) => {
            $rootScope.searchType=message.searchType;
            $rootScope.keyword=message.keyword;
        });
    });