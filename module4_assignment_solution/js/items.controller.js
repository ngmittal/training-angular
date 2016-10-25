(function () {
'use strict';

angular.module('data')
.controller('MenuItemsController',MenuItemsController);

MenuItemsController.$inject = ['items'];
function MenuItemsController(items) {
  var ctrl = this;
  ctrl.itemList = items;
  console.log(ctrl.itemList);
}

})();
