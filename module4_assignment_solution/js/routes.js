(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'templates/home.template.html'
    })
    .state('categories',{
      url:'/categories',
      templateUrl:'templates/categories.template.html',
      controller: 'MenuCategoriesController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items',{
      url:'/items/{category}',
      templateUrl:'templates/items.template.html',
      controller: 'MenuItemsController as itemCtrl',
      resolve: {
        items: ['$stateParams','MenuDataService',function ($stateParams,MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    })
}

})();
