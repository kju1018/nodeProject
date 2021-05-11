angular.module("app")
  .factory("communityqnaService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/community/communityqna";
    //서비스 객체 리턴
    return {
      list: function(pageNo=1,searchType, keyword) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        if(keyword == null) {
          return $http.get(BASE_URL+"/search", {params:{pageNo, searchType}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        } else {
          return $http.get(BASE_URL+"/search", {params:{pageNo, searchType, keyword}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        }
      },
      read: function(boardno) {
        const promise = $http.get(BASE_URL + "/" + boardno);
        return promise;
      },
      create: function(communityqna) {
        const promise = $http.post(BASE_URL, communityqna); //json으로 보냄
        return promise;
      },
      createrepl: function(communityqna) {
        const promise = $http.post(BASE_URL+"/repl", communityqna); //json으로 보냄
        return promise;
      },
      update: function(communityqna) {
        const promise = $http.put(BASE_URL, communityqna);
        return promise;
      },
      delete: function(boardno) {
        const promise = $http.delete(BASE_URL + "/" + boardno);
        return promise;
      }
    }
  });