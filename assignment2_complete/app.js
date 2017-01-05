(function () {
'use strict';

angular.module('CRApp2', [])
.controller('ShoppingListController', ShoppingListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

boughtList.$inject = ['ShoppingListCheckOffService'];
function ShoppingListController(ShoppingListCheckOffService) {
  var shoppingList = this;

    shoppingList.items = ShoppingListCheckOffService.getItems();

    shoppingList.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    };
}

BoughtListController.$inject = ['ShoppingListCheckOffService'];
function BoughtListController(ShoppingListCheckOffService) {
  var boughtList = this;

    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Eggs",
      quantity: 12
    },
    {
      name: "Bread",
      quantity: 3
    },
    {
      name: "Carrots",
      quantity: 5
    },
    {
      name: "Onions",
      quantity: 6
    },
    {
      name: "Sugar",
      quantity: 1
    }
  ];
  //list of bought items
  var boughtItems = [];

  //shopping items
  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };
  service.buyItem = function (itemIndex) {
    this.addBoughtItem(items[itemIndex].name,items[itemIndex].quantity);
    items.splice(itemIndex, 1);
  };
  service.getItems = function () {
    return items;
  };
  service.setItems = function (newItems) {
    items = newItems;
  };

  //bought items
  service.addBoughtItem = function (itemName, quantity) {
      var boughtItem = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(boughtItem);
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };

}

})();
