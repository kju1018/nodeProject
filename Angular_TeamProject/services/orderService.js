angular.module("app")
    .factory("orderService", function($http){

        const BASE_URL = "http://localhost:8080/orders";

        return {
            list: function(pageNo=1, searchType, keyword) {// 주문리스트 조회
                const promise = $http.get(BASE_URL, {params: {pageNo, searchType, keyword}});
                return promise;
            },

            orderView: function(orderno) { // 주문서 조회
                const promise = $http.get(BASE_URL+"/"+ orderno);
                return promise;
            },

            orderCount: function() { // 주문서 개수
                const promise = $http.get(BASE_URL+"/orderTotalRows");
                return promise;
            },

            updateStatus: function(order) { // 주문서 업데이트
                const promise = $http.put(BASE_URL, order);
                return promise;
            }
        }

    })