(function () {
'use strict';

angular.module("LunchCheck", [])

.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = [$scope];

function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.tooMuchorNot = "";

  $scope.checkTooMuch = function () {
    var totalItems = $scope.lunchMenu.split(",").length;
	if ($scope.lunchMenu == "")
		$scope.tooMuchorNot = "Please Enter Data First!";
    else if (totalItems <=3 ) 
		$scope.tooMuchorNot = "Enjoy!";
	else 
		$scope.tooMuchorNot = "Too Much!";
  };
}

})();