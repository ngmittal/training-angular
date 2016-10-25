(function () {
'use strict';

angular.module('data')
.component('itemList',{
  templateUrl: 'templates/itemList.template.html',
  bindings: {
    list : '<'
  }
});

})();
