angular.module("app")
  .factory("productService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/product";
    //서비스 객체 리턴
    return {
      list: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL, {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      list1: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL+"/list1", {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      list2: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL+"/list2", {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      list3: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL+"/list3", {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      list4: function(pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL+"/list4", {params:{pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      mainlist: function() { 
        const promise = $http.get(BASE_URL+ "/mainlist");
        return promise;
      },
      read: function(productno) {
        const promise = $http.get(BASE_URL + "/" + productno);
        return promise;
      },
      readimgs: function(productno) {
        const promise = $http.get(BASE_URL + "/" + productno);
        return promise;
      },
      battachUrl: function(productno){
        return BASE_URL + "/battach/" + productno;
      },
      imgbattachUrl: function(imgno){
        return BASE_URL + "/imgbattach/" + imgno;
      },
      create: function(formData) {
        const promise = $http.post(BASE_URL, formData, {headers:{"Content-Type":undefined}}); //undefined
        return promise;
      },
      update: function(formData) {
        const promise = $http.put(BASE_URL, formData, {headers:{"Content-Type":undefined}});
        return promise;
      },
      delete: function(productno) {
        const promise = $http.delete(BASE_URL + "/" + productno);
        return promise;
      }
    }
  });
