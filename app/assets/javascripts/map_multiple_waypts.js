
$(function() {

	// var stopOptions = [];
	var boundsArr = [];

	var directionsDisplay = new google.maps.DirectionsRenderer();
	var geocoder = new google.maps.Geocoder();
	var service;
	var infoWindow;
	var map;
	var directionsService = new google.maps.DirectionsService();

	function initialize() {
		// console.log("initialize function has run");
		// directionsDisplay = new google.maps.DirectionsRenderer();
		var myLatlng = new google.maps.LatLng(37.766280, -122.420961);
		var mapOptions = {
	    	zoom: 4,
	    	center: myLatlng
		}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		infoWindow = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		directionsDisplay.setMap(map);
	};

	// ====================================================

	// get back directions from Google (promise)
	var getDirections = function(requestParams) {
		return new Promise(function(resolve, reject) {
			directionsService.route(requestParams, function(response, status) {
				resolve(response);
			});
		});
	};

	// ====================================================

		// var sampleRequest = {
	 //        origin: "343 Vernon St San Francisco, CA",
	 //        destination: "633 Folsom St San Francisco, CA",
	 //        travelMode: google.maps.TravelMode.DRIVING
		// };

		// var sampleDirectionsPromise = getDirections(sampleRequest);
		// sampleDirectionsPromise.then(function(results) {
		// 	console.log(results);
		// });

	// ====================================================

	function compareStopOptions(optionsArr) {
		var len = optionsArr.length;
		var optionLoc; // current location option being dealt with
		var gmapsLocObj; // google maps location object made from optionLoc
		var bestTime = 100000000000000000; // arbitrarily large number
		var bestResponse; // best route, set based on bestTime
		for (var i=0; i<len; i++) {
			optionLoc = optionsArr[i].geometry.location;
			var waypts = [];
			var gmapsLocObj = {location: new google.maps.LatLng(optionLoc.A, optionLoc.F)};
			waypts.push(gmapsLocObj);
		  	var request = {
		        origin: "343 Vernon St San Francisco, CA",
		        destination: "633 Folsom St San Francisco, CA",
		        waypoints: waypts,
		        optimizeWaypoints: true,
		        travelMode: google.maps.TravelMode.DRIVING
		  	};
		  	directionsService.route(request, function(response, status) {
		      	if (status === google.maps.DirectionsStatus.OK) {
			      	var numOfTripLegs = response.routes[0].legs.length;
			      	var tripDuration = 0;
			      	var tripDistance = 0;
			      	for (var i=0; i<numOfTripLegs; i++) {
			      		tripDuration += response.routes[0].legs[i].duration.value;
			      		tripDistance += response.routes[0].legs[i].distance.value;
			      	};
			      	console.log(tripDuration);
			      	if (tripDuration < bestTime) {
			      		bestTime = tripDuration;
			      		bestResponse = response;
			      	}

			      	// ----------------------------------

				    directionsDisplay.setDirections(bestResponse);
			        // var route = response.routes[0];
			        // console.log(route.legs[0].distance.text);

			        // ----------------------------------
				        // var summaryPanel = document.getElementById('directions_panel');
				        // summaryPanel.innerHTML = '';
				        // // For each route, display summary information.
				        // for (var i = 0; i < route.legs.length; i++) {
				        //   var routeSegment = i + 1;
				        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
				        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
				        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
				        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
				        // }
		      	}
		    });
		};
		// directionsDisplay.setDirections(bestResponse);
		// console.log(bestTime);
	};

	// ====================================================

	// return options for each location (e.g. all Safeways within search area) (promise)
	// figure out how to take care of the "reject" condition
	var performSearch = function(requestParams) {
		return new Promise(function(resolve, reject) {
			service.radarSearch(requestParams, function(stuff) {
				resolve(stuff);
			});
		});
	};

	// (promise) (get place details, such as name)
	var getPlaceDetails = function(place) {
		return new Promise(function(resolve, reject) {
			service.getDetails(place, function(result, status) {
				resolve(result);
			});
		});
	};

	function createMarker(place) {
	  var marker = new google.maps.Marker({
	    map: map,
	    position: place.geometry.location,
	    icon: {
	      // Star
	      path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
	      fillColor: '#ffff00',
	      fillOpacity: 1,
	      scale: 1/4,
	      strokeColor: '#bd8d2c',
	      strokeWeight: 1
	    }
	  });

	  google.maps.event.addListener(marker, 'click', function() {
	    service.getDetails(place, function(result, status) {
	      if (status != google.maps.places.PlacesServiceStatus.OK) {
	        alert(status);
	        return;
	      }
	      infoWindow.setContent(result.name);
	      infoWindow.open(map, marker);
	    });
	  });
	};

	// ====================================================

	// geocoding function
	var getGeo = function(address){
	  return new Promise(function(resolve, reject) {
	    geocoder.geocode({'address': address}, function(geo){
	    	resolve(geo);
	    });
	  });
	};

	// ====================================================

		var costcogeo = getGeo("450 10th St San Francisco, CA 94103");

		costcogeo.then(function(results) {
			console.log(results);
		});

	// ====================================================

	// return all combinations of location1, location2, and location3
	var allCombinations = function(arr1, arr2, arr3) {
		var possibilities = [];
		var cur;
		for (var i=0; i<arr1.length; i++) {
			for (var j=0; j<arr2.length; j++) {
				for (var k=0; k<arr3.length; k++) {
					cur = [arr1[i], arr2[j], arr3[k]]
					possibilities.push(cur);
				};
			};
		};
		return possibilities;
	};

	// ====================================================

	$('.submit-search').on('click', function(e) {
		e.preventDefault();

		var origin = "343 Vernon St San Francisco, CA"; // $('#origin_address');
		var stopLoc1 = "Costco Wholesale"; // $('#stop_location_1');
		var stopLoc2 = "CVS"; // $('#stop_location_2');
		var stopLoc3 = "Target"; // $('#stop_location_3');
		var destination = "633 Folsom St San Francisco, CA"; // $('#destination_address');

		// -------------------------------

			// var some = geocodeAddress("4645 Jett Rd Atlanta, GA 30327");
			// console.log(some);

			// origin = {location: geocodeAddress(origin)};
			// origin = {location: new google.maps.LatLng(origin.A, origin.F)}
			// destination = geocodeAddress(destination);
			// destination = {location: new google.maps.LatLng(destination.A, destination.F)}

			// --- Determine SW and NE corners of bounds (TBD) ---

			// var temparr = [];
			// temparr.push(geocodeAddress(origin));
			// temparr.push(geocodeAddress(destination));
			// var place1;
			// var place2;
			// if () {};

		var p1 = getGeo(origin);
		var p2 = getGeo(destination);

		Promise.all([p1, p2]).then(function(results){
		  var p1result = results[0][0].geometry.location;
		  var p2result = results[1][0].geometry.location;
		  var place1 = new google.maps.LatLng(p1result.A, p1result.F);
		  var place2 = new google.maps.LatLng(p2result.A, p2result.F);

		  var searchRequestParams1 = {
		  	  bounds: new google.maps.LatLngBounds(place1, place2),
		  	  name: stopLoc1
		  };
		  var searchRequestParams2 = {
		  	  bounds: new google.maps.LatLngBounds(place1, place2),
		  	  name: stopLoc2
		  };
		  var searchRequestParams3 = {
		  	  bounds: new google.maps.LatLngBounds(place1, place2),
		  	  name: stopLoc3
		  };

		  var stop1Options = performSearch(searchRequestParams1);
		  var stop2Options = performSearch(searchRequestParams2);
		  var stop3Options = performSearch(searchRequestParams3);

		  // var locDetailsPromise;
		  // Promise.all([stop1Options, stop2Options, stop3Options]).then(function(results) {
		  // 	locDetailsPromise =
		  // });

		  Promise.all([stop1Options, stop2Options, stop3Options]).then(function(results) {
		  	var stopLocNameArr = ["Costco Wholesale", "CVS Pharmacy - Photo", "Target"];

		  	console.log(results);

		  	// // ONE EXAMPLE
		  	// var placeDetails = getPlaceDetails(results[2][0]);
		  	// placeDetails.then(function(results) {
		  	// 	console.log(results);
		  	// 	// console.log(results.name);
		  	// 	// if (results.name === stopLocNameArr[2]) {
		  	// 	// 	createMarker(results);
		  	// 	// };
		  	// });

			// var placeDetails1;
		 //    for (var i=0; i<results[0].length; i++) {
		 //    	placeDetails1 = getPlaceDetails(results[0][i]);
		 //    	placeDetails1.then(function(results) {
		 //    		console.log(results);
		 //    		// console.log(results.name);
		 //    		// if (results.name === stopLocNameArr[0]) {
		 //    		// 	createMarker(results);
		 //    		// 	// console.log("it works");
		 //    		// };
		 //    	});
		 //    };

		 //    var placeDetails2;
		 //    for (var j=0; j<results[1].length; j++) {
		 //    	placeDetails2 = getPlaceDetails(results[1][j]);
		 //    	placeDetails2.then(function(results) {
		 //    		// console.log(results);
		 //    		// console.log(results.name);
		 //    		if (results.name === stopLocNameArr[1]) {
		 //    			createMarker(results);
		 //    			// console.log("it works");
		 //    		};
		 //    	});
		 //    };

		 //    var placeDetails3;
		 //    for (var k=0; k<results[2].length; k++) {
		 //    	placeDetails3 = getPlaceDetails(results[2][k]);
		 //    	placeDetails3.then(function(results) {
		 //    		// console.log(results);
		 //    		// console.log(results.name);
		 //    		createMarker(results);
		 //    		// if (results.name === stopLocNameArr[2]) {
		 //    		// 	createMarker(results);
		 //    		// 	// console.log("it works");
		 //    		// };
		 //    	});
		 //    };

		  	// ITERATIVE (DO FOR EACH RESULT)
			  	// for (var i=0; i<3; i++) {
			  	// 	for (var j=0; j<results[i].length; j++) {
			  	// 		var placeDetails = getPlaceDetails(results[i][j]);
			  	// 		placeDetails.then(function(results) {
			  	// 			console.log(results);
			  	// 			// console.log(results[0].name);
			  	// 			// if (results.name === stopLocNameArr[i]) {
			  	// 			// 	// createMarker(results[i][j]);
			  	// 			// 	console.log("it works");
			  	// 			// };
			  	// 		});
			  	// 	};
			  	// };

		  	// allCombinations(results[0], results[1], results[2]);
		  });
		});
	});

	google.maps.event.addDomListener(window, 'load', initialize);
});

// ====================================================

	// The Distance Matrix Service Method
	// var service = new google.maps.DistanceMatrixService();
	// service.getDistanceMatrix(
	//   {
	//     origins: [origin1, origin2],
	//     destinations: [destinationA, destinationB],
	//     travelMode: google.maps.TravelMode.DRIVING,
	//     transitOptions: TransitOptions,
	//     unitSystem: UnitSystem,
	//     durationInTraffic: Boolean,
	//     avoidHighways: Boolean,
	//     avoidTolls: Boolean,
	//   }, callback);

	// function callback(response, status) {
	//   // See Parsing the Results for
	//   // the basics of a callback function.
	// }

// ====================================================

	// var ajaxRequest = $.ajax({
	// 	url: 'main/info',
	// 	type: 'GET',
	// 	dataType: 'JSON',
	// 	data: {origin: origin, stopLoc: stopLoc, destination: destination}
	// });
	// ajaxRequest.done(function(response) {
	// 	console.log("success");
	// });
	// ajaxRequest.fail(function() {
	// 	console.log("error");
	// });

// ====================================================

	// google.maps.event.addListener(map, 'bounds_changed', function() {
	// 	var bounds = map.getBounds();
	// 	searchBox.setBounds(bounds);
	// });

	// function codeAddress() {
	//   var address = document.getElementById("address").value;
	//   geocoder.geocode( { 'address': address}, function(results, status) {
	//     if (status == google.maps.GeocoderStatus.OK) {
	//       map.setCenter(results[0].geometry.location);
	//       var marker = new google.maps.Marker({
	//           map: map,
	//           position: results[0].geometry.location
	//       });
	//     } else {
	//       alert("Geocode was not successful for the following reason: " + status);
	//     }
	//   });
	// }

	// var place2 = new google.maps.LatLng(37.766280, -122.420961);
	// var place1 = new google.maps.LatLng(37.719068, -122.454882);
	// var myRequest = {
	// 	bounds: new google.maps.LatLngBounds(place1, place2),
	// 	name: "Safeway"
	// };

// var stopLoc = {location: new google.maps.LatLng(37.766280, -122.420961)};
// var stopLoc2 = {location: "55 Brighton Ave San Francisco, CA 94112"};