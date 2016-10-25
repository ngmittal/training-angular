(function () {
'use strict';

angular.module('data')
.component('categoriesList',{
  templateUrl: 'templates/categoriesList.template.html',
  bindings:{
    list: '<'
  }
});

})();
