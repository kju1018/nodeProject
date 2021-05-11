angular.module("app")
    .factory("reviewService", function($http){

        const BASE_URL = "http://localhost:8080/productReview";

        return {
            list: function(pageNo=1, searchType, keyword, sort) { // 리뷰 리스트 조회
                const promise = $http.get(BASE_URL, {params: {pageNo, searchType, keyword, sort}});
                return promise;
            },

            bestReview: function() { // 베스트 리뷰 조회
                const promise = $http.get(BASE_URL + "/bsetReview");
                return promise;
            },

            readReview: function(boardno) { // 리뷰 조회
                const promise = $http.get(BASE_URL+"/"+ boardno);
                return promise;
            },
            deleteReview: function(boardno){ //리뷰 삭제
                const promise = $http.delete(BASE_URL + "/" + boardno);

                return promise;
            },

            reviewCount: function() { // 리뷰 개수
                const promise = $http.get(BASE_URL+"/reviewTotalRows");
                return promise;
            },

            battachUrl: function(boardno) { // 사진 다운
                return BASE_URL + "/battach/" + boardno;
            }
        }

    })