angular.module("app")
  .factory("userService", function($http) {
    const BASE_URL = "http://localhost:8080/auth";
    return {
      list: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/userList", {params:{pageNo}}); 
        return promise;
      },
      namelist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/name", {params:{pageNo}}); 
        return promise;
      },
      emaillist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/email", {params:{pageNo}}); 
        return promise;
      },
      datelist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/joindate", {params:{pageNo}}); 
        return promise;
      },
      idsearchlist: function(search, pageNo) {
        const promise = $http.get(BASE_URL + "/searchuser", {params:{pageNo,search}}); 
        return promise;
      },
      
      namesearchlist: function(search, pageNo) {
        const promise = $http.get(BASE_URL + "/searchname", {params:{pageNo,search}}); 
        return promise;
      },
      
      emailsearchlist: function(search, pageNo) {
        const promise = $http.get(BASE_URL + "/searchemail", {params:{pageNo, search}}); 
        return promise;
      },
      disabled: function(userid) {
        const promise = $http.put(BASE_URL + "/disabled/" +userid);
        return promise;
      },
      activate: function(userid) {
        const promise = $http.put(BASE_URL + "/activate/" +userid);
        return promise;
      },
      update: function(userid) {
        const promise = $http.put(BASE_URL + "/update/" + userid);
        return promise;
      },
      delete: function(boardno) {
        const promise = $http.delete(BASE_URL + "/" + boardno);
        return promise;
      },
      userCount : function() {
        const promise = $http.get(BASE_URL + "/count");
        return promise;
      },
      adminlist : function() {
        const promise = $http.get(BASE_URL + "/list");
        return promise;
      }
    }
  });