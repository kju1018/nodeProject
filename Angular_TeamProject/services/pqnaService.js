angular.module("app")
  .factory("pqnaService", function($http) {
    const BASE_URL = "http://localhost:8080/pqnaBoard";
    return {
      list: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/boardlist", {params:{pageNo}}); 
        return promise;
      },
      productnamelist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/productname", {params:{pageNo}}); 
        return promise;
      },
      btitlelist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/btitle", {params:{pageNo}}); 
        return promise;
      },
      useridlist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/userid", {params:{pageNo}}); 
        return promise;
      },
      bdatelist: function(pageNo=1) { 
        const promise = $http.get(BASE_URL + "/bdate", {params:{pageNo}}); 
        return promise;
      },
      pnamesearchlist: function(keyword,pageNo=1) { 
        const promise = $http.get(BASE_URL + "/searchproductname", {params:{pageNo,keyword}}); 
        return promise;
      },
      titlesearchlist: function(keyword,pageNo=1) { 
        const promise = $http.get(BASE_URL + "/searchbtitle", {params:{pageNo,keyword}}); 
        return promise;
      },
      usersearchlist: function(keyword,pageNo=1) { 
        const promise = $http.get(BASE_URL + "/searchuserid", {params:{pageNo,keyword}}); 
        return promise;
      },
      read : function(boardno, pageNo=1) {
        const promise = $http.get(BASE_URL + "/boardread" , {params:{pageNo,boardno}});
        return promise;
      },
      delete: function(boardno) {
        const promise = $http.delete(BASE_URL + "/boarddelete/" + boardno);
        return promise;
      },
      addReview: function(reviewpage) {
        const promise = $http.post(BASE_URL + "/insert" ,reviewpage);
        return promise;
      },
      reviewread: function(boardno){
        const promise = $http.get(BASE_URL + "/rivewread", {params:{boardno}});
        return promise;
      },
      updateReview: function(readreview) {
        const promise = $http.put(BASE_URL + "/rivewupdate", readreview);
        return promise;
      },
      reviewdelete: function(boardno) {
        const promise = $http.delete(BASE_URL + "/reviewdelete/"+boardno);
        return promise;
      }
    
    }
  });