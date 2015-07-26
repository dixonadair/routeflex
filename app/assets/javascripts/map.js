
// $(function() {

// 	var stopOptions = [];
// 	var boundsArr = [];

// 	var directionsDisplay = new google.maps.DirectionsRenderer();
// 	var geocoder = new google.maps.Geocoder();
// 	var service;
// 	var infoWindow;
// 	var map;
// 	var directionsService = new google.maps.DirectionsService();

// 	function initialize() {
// 		// console.log("initialize function has run");
// 		// directionsDisplay = new google.maps.DirectionsRenderer();
// 		var myLatlng = new google.maps.LatLng(37.766280, -122.420961);
// 		var mapOptions = {
// 	    	zoom: 4,
// 	    	center: myLatlng
// 		}
// 		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// 		infoWindow = new google.maps.InfoWindow();
// 		service = new google.maps.places.PlacesService(map);
// 		directionsDisplay.setMap(map);
// 	};

// 	// ====================================================

// 	function compareStopOptions(optionsArr) {
// 		var len = optionsArr.length;
// 		var optionLoc; // current location option being dealt with
// 		var gmapsLocObj; // google maps location object made from optionLoc
// 		var bestTime = 100000000000000000; // arbitrarily large number
// 		var bestResponse; // best route, set based on bestTime
// 		for (var i=0; i<len; i++) {
// 			optionLoc = optionsArr[i].geometry.location;
// 			var waypts = [];
// 			var gmapsLocObj = {location: new google.maps.LatLng(optionLoc.A, optionLoc.F)};
// 			waypts.push(gmapsLocObj);
// 		  	var request = {
// 		        origin: "343 Vernon St San Francisco, CA",
// 		        destination: "633 Folsom St San Francisco, CA",
// 		        waypoints: waypts,
// 		        optimizeWaypoints: true,
// 		        travelMode: google.maps.TravelMode.DRIVING
// 		  	};
// 		  	directionsService.route(request, function(response, status) {
// 		      	if (status === google.maps.DirectionsStatus.OK) {
// 			      	var numOfTripLegs = response.routes[0].legs.length;
// 			      	var tripDuration = 0;
// 			      	var tripDistance = 0;
// 			      	for (var i=0; i<numOfTripLegs; i++) {
// 			      		tripDuration += response.routes[0].legs[i].duration.value;
// 			      		tripDistance += response.routes[0].legs[i].distance.value;
// 			      	};
// 			      	console.log(tripDuration);
// 			      	if (tripDuration < bestTime) {
// 			      		bestTime = tripDuration;
// 			      		bestResponse = response;
// 			      	}

// 			      	// ----------------------------------

// 				    directionsDisplay.setDirections(bestResponse);
// 			        // var route = response.routes[0];
// 			        // console.log(route.legs[0].distance.text);

// 			        // ----------------------------------
// 				        // var summaryPanel = document.getElementById('directions_panel');
// 				        // summaryPanel.innerHTML = '';
// 				        // // For each route, display summary information.
// 				        // for (var i = 0; i < route.legs.length; i++) {
// 				        //   var routeSegment = i + 1;
// 				        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
// 				        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
// 				        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
// 				        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
// 				        // }
// 		      	}
// 		    });
// 		};
// 		// directionsDisplay.setDirections(bestResponse);
// 		// console.log(bestTime);
// 	};

// 	// ====================================================

// 	function performSearch(requestParams) {
// 	  var request = requestParams;
// 	  service.radarSearch(request, callback);
// 	}

// 	function callback(results, status) {
// 	  if (status != google.maps.places.PlacesServiceStatus.OK) {
// 	    alert(status);
// 	    return;
// 	  }
// 	  for (var i = 0, result; result = results[i]; i++) {
// 	    createMarker(result);
// 	    var stopOptLatLng = $(result)[0].geometry.location;
// 	    stopOptions.push(result);
// 	  }
// 	  // console.log(stopOptions);
// 	  compareStopOptions(stopOptions);
// 	}

// 	function createMarker(place) {
// 	  var marker = new google.maps.Marker({
// 	    map: map,
// 	    position: place.geometry.location,
// 	    icon: {
// 	      // Star
// 	      path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
// 	      fillColor: '#ffff00',
// 	      fillOpacity: 1,
// 	      scale: 1/4,
// 	      strokeColor: '#bd8d2c',
// 	      strokeWeight: 1
// 	    }
// 	  });

// 	  google.maps.event.addListener(marker, 'click', function() {
// 	    service.getDetails(place, function(result, status) {
// 	      if (status != google.maps.places.PlacesServiceStatus.OK) {
// 	        alert(status);
// 	        return;
// 	      }
// 	      infoWindow.setContent(result.name);
// 	      infoWindow.open(map, marker);
// 	    });
// 	  });
// 	}

// 	// ====================================================

// 	$('.submit-search').on('click', function(e) {
// 		e.preventDefault();

// 		var origin = "343 Vernon St San Francisco, CA"; // $('#origin_address');
// 		var stopLoc = "Safeway"; // $('#stop_location');
// 		var destination = "633 Folsom St San Francisco, CA"; // $('#destination_address');

// 		// -------------------------------

// 			// var some = geocodeAddress("4645 Jett Rd Atlanta, GA 30327");
// 			// console.log(some);

// 			// origin = {location: geocodeAddress(origin)};
// 			// origin = {location: new google.maps.LatLng(origin.A, origin.F)}
// 			// destination = geocodeAddress(destination);
// 			// destination = {location: new google.maps.LatLng(destination.A, destination.F)}

// 			// --- Determine SW and NE corners of bounds (TBD) ---

// 			// var temparr = [];
// 			// temparr.push(geocodeAddress(origin));
// 			// temparr.push(geocodeAddress(destination));
// 			// var place1;
// 			// var place2;
// 			// if () {};

// 		// geocoding origin and destination, then call the next function in the process
// 		var getGeo = function(address){
// 		  return new Promise(function(resolve, reject) {
// 		    geocoder.geocode({'address': address}, function(geo){
// 		    	resolve(geo);
// 		    });
// 		  });
// 		};
// 		var p1 = getGeo(origin);
// 		var p2 = getGeo(destination);
// 		Promise.all([p1, p2]).then(function(results){
// 		  var p1result = results[0][0].geometry.location;
// 		  var p2result = results[1][0].geometry.location;
// 		  var place1 = new google.maps.LatLng(p1result.A, p1result.F);
// 		  var place2 = new google.maps.LatLng(p2result.A, p2result.F);
// 		  var searchRequestParams = {
// 		  	bounds: new google.maps.LatLngBounds(place1, place2),
// 		  	name: "Safeway"
// 		  };
// 		  performSearch(searchRequestParams);
// 		});
// 		// console.log(stopOptions);
// 	});

// 	google.maps.event.addDomListener(window, 'load', initialize);
// });

// // ====================================================

// 	// The Distance Matrix Service Method
// 	// var service = new google.maps.DistanceMatrixService();
// 	// service.getDistanceMatrix(
// 	//   {
// 	//     origins: [origin1, origin2],
// 	//     destinations: [destinationA, destinationB],
// 	//     travelMode: google.maps.TravelMode.DRIVING,
// 	//     transitOptions: TransitOptions,
// 	//     unitSystem: UnitSystem,
// 	//     durationInTraffic: Boolean,
// 	//     avoidHighways: Boolean,
// 	//     avoidTolls: Boolean,
// 	//   }, callback);

// 	// function callback(response, status) {
// 	//   // See Parsing the Results for
// 	//   // the basics of a callback function.
// 	// }

// // ====================================================

// 	// var ajaxRequest = $.ajax({
// 	// 	url: 'main/info',
// 	// 	type: 'GET',
// 	// 	dataType: 'JSON',
// 	// 	data: {origin: origin, stopLoc: stopLoc, destination: destination}
// 	// });
// 	// ajaxRequest.done(function(response) {
// 	// 	console.log("success");
// 	// });
// 	// ajaxRequest.fail(function() {
// 	// 	console.log("error");
// 	// });

// // ====================================================

// 	// google.maps.event.addListener(map, 'bounds_changed', function() {
// 	// 	var bounds = map.getBounds();
// 	// 	searchBox.setBounds(bounds);
// 	// });

// 	// function codeAddress() {
// 	//   var address = document.getElementById("address").value;
// 	//   geocoder.geocode( { 'address': address}, function(results, status) {
// 	//     if (status == google.maps.GeocoderStatus.OK) {
// 	//       map.setCenter(results[0].geometry.location);
// 	//       var marker = new google.maps.Marker({
// 	//           map: map,
// 	//           position: results[0].geometry.location
// 	//       });
// 	//     } else {
// 	//       alert("Geocode was not successful for the following reason: " + status);
// 	//     }
// 	//   });
// 	// }

// 	// var place2 = new google.maps.LatLng(37.766280, -122.420961);
// 	// var place1 = new google.maps.LatLng(37.719068, -122.454882);
// 	// var myRequest = {
// 	// 	bounds: new google.maps.LatLngBounds(place1, place2),
// 	// 	name: "Safeway"
// 	// };

// // var stopLoc = {location: new google.maps.LatLng(37.766280, -122.420961)};
// // var stopLoc2 = {location: "55 Brighton Ave San Francisco, CA 94112"};