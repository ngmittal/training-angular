(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ServicePath',"https://davids-restaurant.herokuapp.com/")
.directive('foundItems',FoundItems)
.directive('itemsLoaderIndicator',ItemsLoaderIndicator);

function ItemsLoaderIndicator() {
    var ddo = {
      template: ''
    };

    return ddo;
}

function FoundItems(){
  var ddo = {
  template: `
  <h4 ng-if="narrowCtrl.itemList.length === 0" class="alert">Nothing Found !!</h4>
  <h4 ng-if="narrowCtrl.itemList.length > 0">Total <span class="label-primary">{{narrowCtrl.itemList.length}}</span> item(s) on list !!</h4>
  <ul class="list-group">
    <li class="list-group-item" ng-repeat="item in narrowCtrl.itemList">
      <h4>({{item.short_name}}). {{item.name}}</h4>
      {{item.description}}
      <button class="btn btn-info" ng-click="narrowCtrl.onRemove({index: $index});">Don't Want This One !!</button>
    </li>
  </ul>
  `,
  scope:{
    itemList: '<',
    onRemove: '&'
  },
  controller: NarrowItDownController,
  controllerAs: 'narrowCtrl',
  bindToController: true

  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;
  narrowCtrl.searchTerm = "";
  narrowCtrl.menuItemList;

  narrowCtrl.getMatchedItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);

    promise.then(function(response){
      narrowCtrl.menuItemList = response;
    }).catch(function(error){
      console.log(error);
    })
  }

  narrowCtrl.removeItem = function (index) {
    narrowCtrl.menuItemList.splice(index,1);
  }
}

MenuSearchService.$inject = ['$http','ServicePath']
function MenuSearchService($http,ServicePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
      var searchInput = searchTerm.toLowerCase();
      var response = $http({
        method: "GET",
        url: (ServicePath + "menu_items.json")
      }).then(function(result){
        var itemList = result.data;
        var foundItems = [];
        for (var i=0; i<itemList.menu_items.length; i++){
          var itemDesc = itemList.menu_items[i].description;
          var itemName = itemList.menu_items[i].name;

          //check item name first
          if(itemName.toLowerCase().indexOf(searchInput) !== -1) {
            //found matching name, push it to array
            foundItems.push(itemList.menu_items[i]);
          } else {
            //check item description if name not matching
            if(itemDesc.toLowerCase().indexOf(searchInput) !== -1) {
              foundItems.push(itemList.menu_items[i]);
            }
          }
        }
        return foundItems;

      }).catch(function(error){
        console.log("Error in retrieving the menu from server");
      });

      return response;
  };

}

})();
