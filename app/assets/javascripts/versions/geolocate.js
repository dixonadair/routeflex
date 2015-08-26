// $(function() {

// 	var directionsDisplay = new google.maps.DirectionsRenderer();
// 	var directionsService = new google.maps.DirectionsService();
// 	var service, infoWindow, map;
// 	var geolocate = $('#geolocate');

// 	var getGeolocation = function() {
// 		return new Promise(function(resolve, reject) {
// 			navigator.geolocation.getCurrentPosition(function(position) {
// 				resolve(position);
// 			});
// 		});
// 	};

// 	var centerSF = new google.maps.LatLng(37.766280, -122.420961);
// 	var centerATL = new google.maps.LatLng(33.8, -84.3);
// 	var mapOptions = {
//     	zoom: 11,
//     	mapTypeId: google.maps.MapTypeId.ROADMAP
// 	}
// 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// 	infoWindow = new google.maps.InfoWindow();
// 	service = new google.maps.places.PlacesService(map);
// 	directionsDisplay.setMap(map);

// 	// Geolocation
// 	var compGeolocation, mapCenter;
// 	if (!!navigator.geolocation) {
// 		compGeolocation = getGeolocation()
// 		compGeolocation.then(function(position) {
// 			mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
// 			map.setCenter(mapCenter);
// 		});
// 	} else {
// 		console.log('Geolocation not available');
// 	};
// });