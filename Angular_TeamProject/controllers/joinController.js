angular.module("app")
  .controller("joinController", function($scope, joinService, $location) {

    $scope.user = {
      userid: "",
      upassword: "",
      utel: "",
      uname: "",
      ubirth: "",
      uemail: "",
      ujoindate: "",
      uenabled: "",
      uauthority: "",
    }


    $scope.join = (user) => {
      user.uenabled = 1;
      user.uauthority = "ROLE_ADMIN";
      joinService.join(user)
      .then((response) => {
        console.log(response);
        $location.url("/home");
      }).catch((response) => {
        console.log(response);
        //$window.alert("로그인 실패: ", response.data);
        $location.url("/home")
      });
    }
  });