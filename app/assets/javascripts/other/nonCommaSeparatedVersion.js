// if (oneWayOrReturn === "out-and-back") {

// 	origin = $('.origin_address').val(); // 55 Brighton Ave San Francisco, CA
// 	stopLoc1 = $('.stop_location_1').val(); // Costco
// 	if ($('.stop_location_2').length) {
// 		stopLoc2 = $('.stop_location_2').val(); // CVS
// 	};
// 	if ($('.stop_location_3').length) {
// 		stopLoc3 = $('.stop_location_3').val(); // Trader Joe's
// 	};
// 	destination = origin;

// 	var numStops;
// 	if (stopLoc3 !== null && stopLoc3 !== undefined) {
// 		numStops = 3;
// 	} else if (stopLoc2 !== null && stopLoc2 !== undefined) {
// 		numStops = 2;
// 	} else {
// 		numStops = 1;
// 	};

// 	var originGeo = getGeo(origin);
// 	originGeo.then(function(results) {

// 		console.log(results[0].geometry.location, "geocoding results");

// 		var searchAroundHere = results[0].geometry.location;
// 		searchAroundHere = new google.maps.LatLng(searchAroundHere.G, searchAroundHere.K);
// 		var searchParams1, searchParams2, searchParams3;
// 		var stop1Options, stop2Options, stop3Options;

// 		// ----- With nearbySearch -----

// 		var setRadius = '3000';
// 		searchParams1 = {
// 			location: searchAroundHere,
// 			radius: setRadius,
// 			keyword: stopLoc1
// 		};
// 		stop1Options = performNearbySearch(searchParams1);
// 		if (numStops >= 2) {
// 			searchParams2 = {
// 				location: searchAroundHere,
// 				radius: setRadius,
// 				keyword: stopLoc2
// 			};
// 			stop2Options = performNearbySearch(searchParams2);
// 		};
// 		if (numStops >= 3) {
// 			searchParams3 = {
// 				location: searchAroundHere,
// 				radius: setRadius,
// 				keyword: stopLoc3
// 			};
// 			stop3Options = performNearbySearch(searchParams3);
// 		};

// 		// ----------------------------------

// 		var searchResultsPromises = [stop1Options];
// 		if (numStops >= 2) {
// 			searchResultsPromises.push(stop2Options);
// 		};
// 		if (numStops >= 3) {
// 			searchResultsPromises.push(stop3Options);
// 		};

// 		// ----------------------------------

// 		Promise.all(searchResultsPromises).then(function(results) {
// 			console.log(results, "results from all 1 or 2 or 3 promises");

// 			var newResults;
// 			if (numStops === 3) {
// 				newResults = [[],[],[]];
// 			} else if (numStops === 2) {
// 				newResults = [[],[]];
// 			} else if (numStops === 1) {
// 				newResults = [[]];
// 			};

// 			// console.log(newResults, "newResults before pushing stuff in");

// 			// -------------------------------------
// 				// var culled3 = cullNeighboringDuplicates(results[2]);
// 				// console.log(culled3, "culled3");
// 				// console.log(results[2], "results[2]");

// 			results.forEach(function(results1, index0to2) {
// 				newResults[index0to2] = cullNeighboringDuplicates(results1);
// 			});
// 			newResults.forEach(function(results) {
// 				results.forEach(function(result) {
// 					// console.log(result, "result to make marker out of");
// 					createMarker(result);
// 				});
// 			});

// 			var combinations;
// 			if (numStops === 3) {
// 				combinations = allCombinationsThreeOptions(newResults[0], newResults[1], newResults[2]);
// 			} else if (numStops === 2) {
// 				combinations = allCombinationsTwoOptions(newResults[0], newResults[1]);
// 			} else if (numStops === 1) {
// 				combinations = allCombinationsOneOption(newResults[0]);
// 			};
// 		  		console.log(combinations, "combinations");

// 		  		compareStopOptions(combinations, origin, destination, bestRouteBy);
// 		});
// 	});
// } else if (oneWayOrReturn === "on-my-way") {

// 	origin = $('.origin_address').val(); // 343 Vernon St San Francisco, CA
// 	stopLoc1 = $('.stop_location_1').val(); // Costco
// 	if ($('.stop_location_2').length) {
// 		stopLoc2 = $('.stop_location_2').val(); // CVS
// 	};
// 	if ($('.stop_location_3').length) {
// 		stopLoc3 = $('.stop_location_3').val(); // Trader Joe's
// 	};
// 	destination = $('.destination_address').val(); // 633 Folsom St San Francisco, CA

// 	// var origin = "1982 Rockledge Rd Atlanta, GA";
// 	// var stopLoc1 = "Wendy's";
// 	// var stopLoc2 = "Ace Hardware";
// 	// var stopLoc3 = "Publix";
// 	// var destination = "701 Chase Ln Norcross, GA";

// 	// var origin = "633 Folsom St San Francisco, CA";
// 	// var stopLoc1 = "Trader Joe's";
// 	// var stopLoc2 = "gas station";
// 	// var stopLoc3 = "Costco";
// 	// var destination = "55 Brighton Ave San Francisco, CA";

// 	var numStops;
// 	if (stopLoc3 !== null && stopLoc3 !== undefined) {
// 		numStops = 3;
// 	} else if (stopLoc2 !== null && stopLoc2 !== undefined) {
// 		numStops = 2;
// 	} else {
// 		numStops = 1;
// 	}

// 	var p1 = getGeo(origin);
// 	var p2 = getGeo(destination);

// 	// -----------------------------------

// 	Promise.all([p1, p2]).then(function(results) {
// 	    var p1result = results[0][0].geometry.location;
// 	    var p2result = results[1][0].geometry.location;

// 	    // set up rectangular search bounds
// 	    var bounds = makeBounds(p1result, p2result);
// 	    // showBoundsArea(p1result, p2result);

// 	    // search request params for each stop entry
// 	    var searchRequestParams1 = {
// 	    	bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
// 	    	keyword: stopLoc1
// 	    };
// 	    if (numStops >= 2) {
// 	    	var searchRequestParams2 = {
// 	    		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
// 	    		keyword: stopLoc2
// 	    	};
// 	    };
// 	    if (numStops >= 3) {
// 	    	var searchRequestParams3 = {
// 	    		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
// 	    		keyword: stopLoc3
// 	    	};
// 	    };

// 	    // set up promises for each search of stop within bounds area
// 	    var stop1Options = performSearch(searchRequestParams1);
// 	    if (numStops >= 2) {
// 	    	var stop2Options = performSearch(searchRequestParams2);
// 	    };
// 	    if (numStops >= 3) {
// 	    	var stop3Options = performSearch(searchRequestParams3);
// 	    };

// 	    // direct directions request (get non-stop route going from origin to destination)
// 	    var directDirRequest = {
// 	    	origin: origin,
// 	    	destination: destination,
// 	    	travelMode: google.maps.TravelMode.DRIVING
//         };
//         var directDirectionsRequest = getDirections(directDirRequest);
//         directDirectionsRequest.then(function(results) {

//       		// The below makes use of Kamal's function
//       		var myShape = makeBuffer(results);
//       		console.log(myShape, "myShape");

//       		var promises = [];
//       		promises.push(stop1Options);
//       		if (numStops >= 2) {
//       			promises.push(stop2Options);
//       		};
//       		if (numStops >= 3) {
//       			promises.push(stop3Options);
//       		};

//       		// [stop1Options, stop2Options, stop3Options]
//   		  	Promise.all(promises).then(function(results) {
//   		  		// (optional) check if each place name corresponds to one of the following
//   		  		var stopLocNameArr = [stopLoc1];
//   		  		if (numStops >= 2) {
//   		  			stopLocNameArr.push(stopLoc2);
//   		  		};
//   		  		if (numStops >= 3) {
//   		  			stopLocNameArr.push(stopLoc3);
//   		  		};
//   		  		// var stopLocNameArr = [stopLoc1, stopLoc2, stopLoc3];

//   		  		// Put each place marker on map if inside polyline buffer, and remove options not inside polyline buffer or those that are too close to one another
//   		  		var newResults;
//   		  		if (numStops === 3) {
//   		  			newResults = [[],[],[]];
//   		  		} else if (numStops === 2) {
//   		  			newResults = [[],[]];
//   		  		} else if (numStops === 1) {
//   		  			newResults = [[]];
//   		  		};
//   		  		var newLatLng, newCoords;
//   		  		results.forEach(function(results, index0to2) {
//   		  			results.forEach(function(place, index) {
//   		  				newCoords = place.geometry.location;
//   		  				newLatLng = new google.maps.LatLng(newCoords.G, newCoords.K);
//   		  				if ( google.maps.geometry.poly.containsLocation(newLatLng, myShape) && notTooClose(place, newResults[index0to2]) === true ) {
//   		  					createMarker(place);
//   		  					newResults[index0to2].push(place);
//   		  				};
//   		  			});
//   		  		});

//   		  		console.log(newResults);

// 				var combinations;
// 				if (numStops === 3) {
// 					combinations = allCombinationsThreeOptions(newResults[0], newResults[1], newResults[2]);
// 				} else if (numStops === 2) {
// 					combinations = allCombinationsTwoOptions(newResults[0], newResults[1]);
// 				} else if (numStops === 1) {
// 					combinations = allCombinationsOneOption(newResults[0]);
// 				};
//   		  		compareStopOptions(combinations, origin, destination, bestRouteBy);
//   		  	});
//         });
// 	});
// };