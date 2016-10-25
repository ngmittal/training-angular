(function () {
'use strict';

angular.module('data')
.controller('MenuCategoriesController',MenuCategoriesController);

MenuCategoriesController.$inject = ['categories'];
function MenuCategoriesController(categories) {
  var ctrl = this;
  ctrl.categoriesList = categories;
}

})();
