angular.module("app")
  .factory("joinService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/auth";
    //서비스 객체 리턴
    return {
      join: function(user) {
        console.log(user);
        const promise = $http.post(BASE_URL + "/join", user);
        return promise;
      }
    }
  });