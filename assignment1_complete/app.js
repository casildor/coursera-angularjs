(function () {
'use strict';

angular.module('CRApp1', [])
.controller('Assignment1Controller', Assignment1Controller);

Assignment1Controller.$inject = ['$scope', '$filter'];

function Assignment1Controller($scope, $filter) {
  $scope.lunchDishes = '';
  $scope.lunchDishesMessage = '';

  $scope.checkLunchDishes = function () {
    if($scope.lunchDishes != '' && $scope.lunchDishes != ""){
      var dishes = ($scope.lunchDishes).split(',');

      if(dishes != null && dishes.length > 0){
        console.log('nDishes Before='+dishes.length);
        //remove empty white space dishes
        for(var i = dishes.length - 1; i >= 0; i--) {
            if(dishes[i].trim() == '') {
               dishes.splice(i, 1);
            }
        }
        console.log('nDishes After='+dishes.length);
        console.log('--------------------');
        if(dishes.length <= 3)
          $scope.lunchDishesMessage = 'Enjoy!';
        else
          $scope.lunchDishesMessage = 'Too much!';
      }else{
          $scope.lunchDishesMessage = 'Error with list of dishes. Try again.';
      }
    }else{
      $scope.lunchDishesMessage = 'Please enter data first.';
    }
  };

}

})();
