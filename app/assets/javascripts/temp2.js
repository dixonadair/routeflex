	// } else if (oneWayOrReturn === "on-my-way") {

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
	//       		if (showPolylineBufferOnMap === true) {
	//       			myShape.setMap(map);
	//       		};
	//       		var myBufferCoords = returnBufferCoords(results);
	//       		var polylineExtremities = polylineBufferExtremities(myBufferCoords, "shape");
	//       		if (showRectangleAroundPolylineBuffer === true) {
	//       			polylineExtremities.setMap(map);
	//       		};

	//       		var promises = [];
	//       		promises.push(stop1Options);
	//       		if (numStops >= 2) {
	//       			promises.push(stop2Options);
	//       		};
	//       		if (numStops >= 3) {
	//       			promises.push(stop3Options);
	//       		};

	//       		// [stop1Options, stop2Options, stop3Options]
 //      		  	Promise.all(promises).then(function(results) {
 //      		  		// (optional) check if each place name corresponds to one of the following
 //      		  		var stopLocNameArr = [stopLoc1];
 //      		  		if (numStops >= 2) {
 //      		  			stopLocNameArr.push(stopLoc2);
 //      		  		};
 //      		  		if (numStops >= 3) {
 //      		  			stopLocNameArr.push(stopLoc3);
 //      		  		};
 //      		  		// var stopLocNameArr = [stopLoc1, stopLoc2, stopLoc3];

 //      		  		// Put each place marker on map if inside polyline buffer, and remove options not inside polyline buffer or those that are too close to one another
 //      		  		var newResults;
 //      		  		if (numStops === 3) {
 //      		  			newResults = [[],[],[]];
 //      		  		} else if (numStops === 2) {
 //      		  			newResults = [[],[]];
 //      		  		} else if (numStops === 1) {
 //      		  			newResults = [[]];
 //      		  		};
 //      		  		var newLatLng, newCoords;
 //      		  		results.forEach(function(results, index0to2) {
 //      		  			results.forEach(function(place, index) {
 //      		  				newCoords = place.geometry.location;
 //      		  				newLatLng = new google.maps.LatLng(newCoords.G, newCoords.K);
 //      		  				if ( google.maps.geometry.poly.containsLocation(newLatLng, myShape) && notTooClose(place, newResults[index0to2]) === true ) {
 //      		  					createMarker(place);
 //      		  					newResults[index0to2].push(place);
 //      		  				};
 //      		  			});
 //      		  		});

 //      		  		console.log(newResults);

	// 				var combinations;
	// 				if (numStops === 3) {
	// 					combinations = allCombinationsThreeOptions(newResults[0], newResults[1], newResults[2]);
	// 				} else if (numStops === 2) {
	// 					combinations = allCombinationsTwoOptions(newResults[0], newResults[1]);
	// 				} else if (numStops === 1) {
	// 					combinations = allCombinationsOneOption(newResults[0]);
	// 				};
 //      		  		compareStopOptions(combinations, origin, destination, bestRouteBy);
 //      		  	});
	//         });
	// 	});
	// };