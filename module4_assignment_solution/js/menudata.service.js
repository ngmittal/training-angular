(function () {
'use strict';

angular.module('data')
.service('MenuDataService',MenuDataService)
.constant('ServicePath','https://davids-restaurant.herokuapp.com/');

MenuDataService.$inject=['$http','ServicePath']
function MenuDataService($http,ServicePath) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: (ServicePath + "categories.json")
    }).then(function (result) {
      return result.data;
    }).catch(function (error) {
      console.log("Error in getting menu categories");
    });

    return response;
  }

  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ServicePath + "menu_items.json"),
      params: {
        category:categoryShortName
      }
    }).then(function (result) {
      return result.data;
    }).catch(function (error) {
      console.log("Error in getting menu items for category",categoryShortName);
    });

    return response;
  }
}

})();
