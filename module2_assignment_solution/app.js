(function () {
'use strict';

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
      {name:"Cookies", quantity:20},
      {name:"Chips", quantity:10},
      {name:"Soda", quantity:5},
      {name:"Water", quantity:3},
      {name:"Candies", quantity:20},
      {name:"Magazines", quantity:2},
      {name:"Popsicles", quantity:10}
    ];
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    toBuyItems.push(item);
  };

  service.buyItem = function (itemIndex) {
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
