angular.module("app")
  .controller("joinController", function($scope, joinService, $location, $window) {

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
        console.log(response.data);
        $window.alert("회원가입 성공: "+ response.data.message);
        $location.url("/home");
      }).catch((response) => {
        $window.alert("회원가입 실패: "+ response.data.error.message);
      });
    }
  });