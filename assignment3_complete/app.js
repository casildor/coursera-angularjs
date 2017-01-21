(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItems)
.constant('RestApiBasePath', 'http://davids-restaurant.herokuapp.com');


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menuItems = this;

	menuItems.found = [];
	menuItems.searchTerm = '';
	menuItems.showError = false;

	menuItems.narrowItDown = function () {
		//menuItems.found = [];

		if (menuItems.searchTerm) {
			var foundMenuItemsPromise = MenuSearchService.getMatchedMenuItems(menuItems.searchTerm);
			foundMenuItemsPromise.then(function (items) {
				menuItems.found = items;
				menuItems.setShowError();
			});
		} else {
			menuItems.setShowError();
		}
	};

	menuItems.removeItem = function (index) {
		menuItems.found.splice(index, 1);
	};

	menuItems.setShowError = function () {
		menuItems.showError = (menuItems.found.length === 0);
	};
}

MenuSearchService.$inject = ['$http', 'RestApiBasePath'];
function MenuSearchService($http, RestApiBasePath) {
	var menuSearchService = this;

	menuSearchService.getMatchedMenuItems = function (searchTerm) {
		return $http({
			method: 'GET',
      		url: (RestApiBasePath + "/menu_items.json"),
		}).then(function (response) {
			// return response.data.menu_items.filter(function (item) {
			// 	return item.description.indexOf(searchTerm) !== -1;
			// });
			var foundItems = response.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);
            return foundItems;
		}).catch(function (error) {
			console.log(error);
		});
	};
}

function FoundItems() {
	var ddo = {
		templateUrl: "foundItems.html",
		scope: {
			items: "<",
			error: "<",
			onRemove: "&"
		}
	};
	return ddo;
}

})();
