'use strict';

// Configuring the Articles module
angular.module('lighthouses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lighthouses', 'lighthouses', 'dropdown', '/lighthouses(/create)?');
		Menus.addSubMenuItem('topbar', 'lighthouses', 'List Lighthouses', 'lighthouses');
		Menus.addSubMenuItem('topbar', 'lighthouses', 'New Lighthouse', 'lighthouses/create');
	}
]);