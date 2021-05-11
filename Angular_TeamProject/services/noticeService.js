angular.module("app")
  .factory("noticeService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/community/notice";
    //서비스 객체 리턴
    return {
      list: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL, {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      read: function(boardno) {
        const promise = $http.get(BASE_URL + "/" + boardno);
        return promise;
      },
      create: function(notice) {
        const promise = $http.post(BASE_URL, notice); //json으로 보냄
        return promise;
      },
      update: function(notice) {
        const promise = $http.put(BASE_URL, notice);
        return promise;
      },
      delete: function(boardno) {
        const promise = $http.delete(BASE_URL + "/" + boardno);
        return promise;
      },
      getnotice: function(pageNo=1) {
        const promise = $http.get(BASE_URL + "/list", {params:{pageNo}});
        return promise;
      }
    }
  });