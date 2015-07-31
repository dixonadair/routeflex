
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
	    	zoom: 12,
	    	center: myLatlng
		}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		infoWindow = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		directionsDisplay.setMap(map);
	};

	// ====================================================

	var directionsCount = 0;
	// get back directions from Google (promise)
	var getDirections = function(requestParams) {
		return new Promise(function(resolve, reject) {
			directionsService.route(requestParams, function(response, status) {
				resolve(response);
				// console.log("getDirections status", status);
				if (status !== "OVER_QUERY_LIMIT") {
					directionsCount++;
					console.log(directionsCount);
				};
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

	// ====================================================
		// --- Jared Debugging ---

		// var WTF_IS_HAPPENING={}

		// // (promise) (get place details, such as name)
		// var getPlaceDetails = function(place) {
		// 	var promise = new Promise(function(resolve, reject) {
		// 		var UUID = Math.random().toString().slice(2,8)

		// 		service.getDetails(place, function(result, status) {
		// 			if (UUID in WTF_IS_HAPPENING){ debugger }
		// 			WTF_IS_HAPPENING[UUID] = {place:place, result:result}
		// 			console.log(WTF_IS_HAPPENING)
		// 			resolve(result);
		// 		});
		// 	});
		// 	return promise.then(function(){ 45 }, function(){ debugger })
		// };

	// ====================================================

	var getPlaceDetails = function(place) {
		return new Promise(function(resolve, reject) {
			service.getDetails(place, function(result, status) {
				// console.log("getPlaceDetails status", status);
				resolve(result);
			});
		});
	};

	// ====================================================

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

	// return all combinations of location1, location2, and location3
	var allCombinationsThreeOptions = function(arr1, arr2, arr3) {
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

	var allCombinationsTwoOptions = function(arr1, arr2) {
		var possibilities = [];
		var cur;
		for (var i=0; i<arr1.length; i++) {
			for (var j=0; j<arr2.length; j++) {
				cur = [arr1[i], arr2[j]]
				possibilities.push(cur);
			};
		};
		return possibilities;
	};

	// ====================================================

	// compareStopOptions function with setTimeout (working semi-successfully but slow)
	function compareStopOptions(optionsArr, origin, destination) {
		var bestTime = 10000000000000000000; // arbitrarily large number
		var bestResponse; // best route, based on bestTime
		var bestWaypts; // the waypts that are visited when taking the best route
		var len = 10; // optionsArr.length;

		for (var i=0; i<len; i++) {
			setTimeout(
			(function(i) {
				return function() {
					var waypts = [];
					var pCoords;
					var placeObj;
					optionsArr[i].forEach(function(place) {
						pCoords = place.geometry.location;
						placeObj = {location: new google.maps.LatLng(pCoords.G, pCoords.K)}
						waypts.push(placeObj);
					});
					var dirRequest = {
				        origin: origin,
				        destination: destination,
				        waypoints: waypts,
				        optimizeWaypoints: true,
				        travelMode: google.maps.TravelMode.DRIVING
				  	};
				  	var dirPromise = getDirections(dirRequest);
				  	dirPromise.then(function(response) {
				  		if (response !== null) {
				  			// console.log('routes issue', response);
				  			var numTripLegs = response.routes[0].legs.length;
				  			var tripDuration = 0;
				  			var tripDistance = 0;
				  			for (var i=0; i<numTripLegs; i++) {
				  				tripDuration += response.routes[0].legs[i].duration.value;
				  				tripDistance += response.routes[0].legs[i].distance.value;
				  			};
				  			// console.log(tripDuration);
				  			if (tripDuration < bestTime) {
				  				bestTime = tripDuration;
				  				bestResponse = response;
				  				// bestWaypts = waypts;
				  				optionsArr[i].forEach(function(waypt) {
				  					// getWayptDets(waypt);
				  				});

				  			};
				  			directionsDisplay.setDirections(bestResponse);
				  			// console.log(bestWaypts);
				  			console.log(bestTime);
				  		} else {
				  			console.log("directions request: response was null");
				  		};
				  	});
				};
			})(i), i*150)
		};
	};

	function getWayptDets(waypt) {
		var dets = getPlaceDetails(waypt);
		dets.then(function(result) {
			console.log(result.name);
		});
	};

	// ====================================================

	// $('.seeInput').on('click', function(e) {
	// 	e.preventDefault();

	// 	var origin = $('#origin_address').val(); // 633 Folsom St San Francisco, CA
	// 	var stopLoc1 = $('#stop_location_1').val(); // Costco
	// 	var stopLoc2 = $('#stop_location_2').val(); // CVS
	// 	var stopLoc3 = $('#stop_location_3').val(); // Trader Joe's
	// 	var destination = $('#destination_address').val(); // 343 Vernon St San Francisco, CA

	// 	var p1 = getGeo(origin);
	// 	var p2 = getGeo(destination);

	// 	console.log(origin);
	// 	// console.log($('#origin_address'));
	// 	// console.log(stopLoc1, stopLoc2, stopLoc3, destination);
	// });

	$('.submit-search').on('click', function(e) {
		e.preventDefault();

		// var origin = $('#origin_address').val(); // 343 Vernon St San Francisco, CA
		// var stopLoc1 = $('#stop_location_1').val(); // Costco
		// var stopLoc2 = $('#stop_location_2').val(); // CVS
		// var stopLoc3 = $('#stop_location_3').val(); // Trader Joe's
		// var destination = $('#destination_address').val(); // 633 Folsom St San Francisco, CA

		// var origin = "1982 Rockledge Rd Atlanta, GA";
		// var stopLoc1 = "Wendy's";
		// var stopLoc2 = "Publix";
		// var stopLoc3 = "Ace Hardware";
		// var destination = "701 Chase Ln Norcross, GA";

		var origin = "343 Vernon St San Francisco, CA";
		var stopLoc1 = "Trader Joe's";
		var stopLoc2 = "Costco";
		var stopLoc3 = "Wells Fargo Bank";
		var destination = "633 Folsom St San Francisco, CA";

		var p1 = getGeo(origin);
		var p2 = getGeo(destination);

		Promise.all([p1, p2]).then(function(results){
		  var p1result = results[0][0].geometry.location;
		  var p2result = results[1][0].geometry.location;
		  var place1 = new google.maps.LatLng(p1result.G, p1result.K);
		  var place2 = new google.maps.LatLng(p2result.G, p2result.K);

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

		  Promise.all([stop1Options, stop2Options, stop3Options]).then(function(results) {
		  	// console.log("results[0]", results[0]);

		  	// (optional) check if each place name corresponds to one of the following
		  	var stopLocNameArr = [stopLoc1, stopLoc2, stopLoc3];

		  	// Put each place marker on map, regardless
		  	results.forEach(function(results) {
		  		results.forEach(function(place) {
		  			createMarker(place);
		  		});
		  	});

		  	// ------------------------------------------
			  	// Put each place marker on map ONLY if it has correct name
			  	// results.forEach(function(results) {
			  	// 	results.forEach(function(place) {
			  	// 		// createMarker(place);
			  	// 		var placeDetails = getPlaceDetails(place);
			  	// 		placeDetails.then(function(result) {
			  	// 			if (result!==null && stopLocNameArr.indexOf(result.name) !== -1) {
			  	// 				createMarker(place);
			  	// 				// console.log(result);
			  	// 				// console.log(result.name);
			  	// 			};
			  	// 		});
			  	// 	});
			  	// });

		    var combinations = allCombinationsThreeOptions(results[0], results[1], results[2])
		  	// var combinations = allCombinationsTwoOptions(results[0], results[1]);
		  	// console.log("combinations", combinations);

		  	compareStopOptions(combinations, origin, destination);

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

// ====================================================

	// var compareRoutes = function(options) {
	// 	for (var i=0; i<len; i++) {
	// 		optionLoc = optionsArr[i].geometry.location;
	// 		var waypts = [];
	// 		var gmapsLocObj = {location: new google.maps.LatLng(optionLoc.G, optionLoc.K)};
	// 		waypts.push(gmapsLocObj);
	// 	  	var request = {
	// 	        origin: origin,
	// 	        destination: destination,
	// 	        waypoints: waypts,
	// 	        optimizeWaypoints: true,
	// 	        travelMode: google.maps.TravelMode.DRIVING
	// 	  	};
	// 	  	directionsService.route(request, function(response, status) {
	// 	      	if (status === google.maps.DirectionsStatus.OK) {
	// 		      	var numOfTripLegs = response.routes[0].legs.length;
	// 		      	var tripDuration = 0;
	// 		      	var tripDistance = 0;
	// 		      	for (var i=0; i<numOfTripLegs; i++) {
	// 		      		tripDuration += response.routes[0].legs[i].duration.value;
	// 		      		tripDistance += response.routes[0].legs[i].distance.value;
	// 		      	};
	// 		      	console.log(tripDuration);
	// 		      	if (tripDuration < bestTime) {
	// 		      		bestTime = tripDuration;
	// 		      		bestResponse = response;
	// 		      	}

	// 		      	// ----------------------------------

	// 			    directionsDisplay.setDirections(bestResponse);
	// 		        // var route = response.routes[0];
	// 		        // console.log(route.legs[0].distance.text);

	// 		        // ----------------------------------
	// 			        // var summaryPanel = document.getElementById('directions_panel');
	// 			        // summaryPanel.innerHTML = '';
	// 			        // // For each route, display summary information.
	// 			        // for (var i = 0; i < route.legs.length; i++) {
	// 			        //   var routeSegment = i + 1;
	// 			        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
	// 			        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
	// 			        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
	// 			        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
	// 			        // }
	// 	      	}
	// 	    });
	// 	};
	// };

// ====================================================

	// Original compareStopOptions function without setTimeout
  	function compareStopOptions(optionsArr, origin, destination) {
  		var bestTime = 10000000000000000000; // arbitrarily large number
  		var bestResponse; // best route, based on bestTime

  		optionsArr.forEach(function(optionGroup) {
  			var waypts = [];
  			var pCoords;
  			var placeObj;
  			optionGroup.forEach(function(place) {
  				pCoords = place.geometry.location;
  				placeObj = {location: new google.maps.LatLng(pCoords.G, pCoords.K)}
  				waypts.push(placeObj);
  			});
			var dirRequest = {
		        origin: origin,
		        destination: destination,
		        waypoints: waypts,
		        optimizeWaypoints: true,
		        travelMode: google.maps.TravelMode.DRIVING
		  	};
		  	var dirPromise = getDirections(dirRequest);
		  	dirPromise.then(function(response) {
		  		if (response !== null) {
		  			// console.log('routes issue', response);
		  			var numTripLegs = response.routes[0].legs.length;
		  			var tripDuration = 0;
		  			var tripDistance = 0;
		  			for (var i=0; i<numTripLegs; i++) {
		  				tripDuration += response.routes[0].legs[i].duration.value;
		  				tripDistance += response.routes[0].legs[i].distance.value;
		  			};
		  			// console.log(tripDuration);
		  			if (tripDuration < bestTime) {
		  				bestTime = tripDuration;
		  				bestResponse = response;
		  			};
		  			directionsDisplay.setDirections(bestResponse);
		  		} else {
		  			console.log("directions request: response was null");
		  		};
		  	});
  		});
	};

// ====================================================

	// var costcogeo = getGeo("450 10th St San Francisco, CA 94103");

	// costcogeo.then(function(results) {
	// 	console.log(results);
	// });

// var stopLoc = {location: new google.maps.LatLng(37.766280, -122.420961)};
// var stopLoc2 = {location: "55 Brighton Ave San Francisco, CA 94112"};