// HAS CORRECT BOUNDS FOR DOING SEARCHES REGARDLESS OF INPUT ORIGIN AND DESTINATION
// IN PROGRESS: AFTER SEARCHING IN BOUNDS, CHECK TO SEE IF EACH SEARCH RESULT IS WITHIN THE POLYLINE BUFFER CREATED FROM THE DIRECT DIRECTIONS BETWEEN ORIGIN AND DESTINATION

$(function() {

	// var stopOptions = [];
	var boundsArr = [];

	var directionsDisplay = new google.maps.DirectionsRenderer();
	var geocoder = new google.maps.Geocoder();
	var service;
	var infoWindow;
	var map;
	var directionsService = new google.maps.DirectionsService();
	// The variable "oneWayOrReturn" says whether the user is searching for stops along their way from point A to point B ("on-my-way") or is simply going out from point A to do errands and then return to point A ("out-and-back"); the default is "on-my-way"
	var oneWayOrReturn = "out-and-back";

	function initialize() {
		// console.log("initialize function has run");
		// directionsDisplay = new google.maps.DirectionsRenderer();
		var centerSF = new google.maps.LatLng(37.766280, -122.420961);
		var centerATL = new google.maps.LatLng(33.8, -84.3);
		var myLatlng = centerSF;
		var mapOptions = {
	    	zoom: 11,
	    	center: myLatlng
		}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		infoWindow = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		directionsDisplay.setMap(map);

		// ----------------------

		// var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
		// var request = {
		//   location: pyrmont,
		//   radius: '500',
		//   types: ['store']
		// };
		// service.nearbySearch(request, callback);

		// ----------------------

		// var nbRequest = {
		// 	location: new google.maps.LatLng(-33.8665433,151.1956316),
		// 	radius: '500',
		// 	types: ['store']
		// };

		// var nearbyTest = performNearbySearch(nbRequest);
		// nearbyTest.then(function(results) {
		// 	console.log(results);
		// });
	};

	// function callback(results, status) {
	//   if (status === google.maps.places.PlacesServiceStatus.OK) {
	//     for (var i = 0; i < results.length; i++) {
	//       // createMarker(results[i]);
	//       console.log(results[i]);
	//     };
	//   };
	// };

	// ====================================================

	// var paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
	//              [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]]; 
	// var co1 = new ClipperLib.ClipperOffset(2, 0.25);
	// co1.AddPaths(paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
	// console.log(co1);

	  // var polygons = [[{"X":72,"Y":39.55},{"X":136,"Y":66},{"X":170,"Y":99},{"X":171,"Y":114},{"X":183,"Y":125},{"X":218,"Y":165},{"X":254,"Y":195},{"X":283,"Y":195},{"X":292,"Y":202},{"X":325,"Y":213},{"X":397,"Y":245},{"X":417,"Y":248}]]; 
	  // var scale = 100;
	  // // reverse_copy(polygons);
	  // polygons = scaleup(polygons, scale);
	  // var cpr = new ClipperLib.Clipper();
	  // var delta = 25;
	  // var joinType = ClipperLib.JoinType.jtRound;
	  // var miterLimit = 2;
	  // var AutoFix = true;
	  // var svg, offsetted_polygon;
	  // // cont = document.getElementById('svgcontainer');
	  // offsetted_polygon = cpr.OffsetPolygons(polygons, delta * scale, joinType, miterLimit, AutoFix);
	  // console.log(offsetted_polygon);

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

	// nearbySearch used for out-and-back user requests, vs radarSearch used for on-my-way requests
	var performNearbySearch = function(params) {
		return new Promise(function(resolve, reject) {
			service.nearbySearch(params, function(stuff) {
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
	      infoWindow.setContent(result.name, result.formatted_address);
	      console.log(result);
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
	function compareStopOptions(optionsArr, origin, destination, timeOrDist) {
		var bestTime = 604800; // arbitrarily large number (one week in seconds)
		var bestDistance = 40000000; // arbitrarily large number (~25,000 miles in meters)
		var bestResponse; // best route, based on bestTime
		var bestWaypts; // the waypts that are visited when taking the best route
		var len = optionsArr.length;
		console.log(len, "len");

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
				  			if (timeOrDist === "distance") {
				  				if (tripDistance < bestDistance) {
				  					bestDistance = tripDistance;
				  					bestResponse = response;
				  					// bestWaypts = waypts;
				  					optionsArr[i].forEach(function(waypt) {
				  						// getWayptDets(waypt);
				  					});
				  				};
				  			} else {
				  				if (tripDuration < bestTime) {
				  					bestTime = tripDuration;
				  					bestResponse = response;
				  					// bestWaypts = waypts;
				  					optionsArr[i].forEach(function(waypt) {
				  						// getWayptDets(waypt);
				  					});
				  				};
				  			}
				  			directionsDisplay.setDirections(bestResponse);
				  			// console.log(bestWaypts);
				  			if (timeOrDist === "distance") {
					  			console.log(bestDistance);
					  		} else {
					  			console.log(bestTime);
					  		}
				  		} else {
				  			console.log("directions request: response was null");
				  		};
				  	});
				};
			})(i), i*300)
		};
	};

	function getWayptDets(waypt) {
		var dets = getPlaceDetails(waypt);
		dets.then(function(result) {
			console.log(result.name);
		});
	};

	// ====================================================

	// For the "on-my-way" searches
	function makeBounds(origin, destination) {
		var offsetAmt = 0.010;
		var north, south, east, west;
		if (origin.G >= destination.G) {
			north = origin.G;
			south = destination.G;
		} else if (origin.G < destination.G) {
			north = destination.G;
			south = origin.G;
		}
		if (origin.K >= destination.K) {
			east = origin.K;
			west = destination.K;
		} else if (origin.K < destination.K) {
			east = destination.K;
			west = origin.K;
		}
		south = south - offsetAmt;
		north = north + offsetAmt;
		west = west - offsetAmt;
		east = east + offsetAmt;
		var swBounds = new google.maps.LatLng(south, west);
		var neBounds = new google.maps.LatLng(north, east);
		return [swBounds, neBounds];
	};

	// For the "out-and-back" searches
	var offsetAmt = 0.050;
	function makeBoundsAroundLocation(location) {
		var north, south, east, west;
		north = location.G + offsetAmt;
		south = location.G - offsetAmt;
		east = location.K + offsetAmt;
		west = location.K - offsetAmt;
		var swBounds = new google.maps.LatLng(south, west);
		var neBounds = new google.maps.LatLng(north, east);
		return [swBounds, neBounds];
	};

	function showBoundsAroundLocation(location) {
		var north, south, east, west;
		north = location.G + offsetAmt;
		south = location.G - offsetAmt;
		east = location.K + offsetAmt;
		west = location.K - offsetAmt;
		var boundCoords = [
			new google.maps.LatLng(north, west),
			new google.maps.LatLng(north, east),
			new google.maps.LatLng(south, east),
			new google.maps.LatLng(south, west)
		];
		var boundShape = new google.maps.Polygon({
			paths: boundCoords,
			map: map
		});
	};

	// ====================================================

	// (Kamal's Function)
	function returnBufferCoords(polyline) {
		var overviewPath = polyline.routes[0].overview_path, overviewPathGeo = [];
		for (var i=0; i<overviewPath.length; i++) {
			overviewPathGeo.push( [overviewPath[i].lng(), overviewPath[i].lat()] );
		};
		
		// var distance = 10/111.12; // Roughly 10km
		var distance = 2/100;
		var geoInput = {
			type: "LineString",
			coordinates: overviewPathGeo
		};
		
		var geoReader = new jsts.io.GeoJSONReader(),
		geoWriter = new jsts.io.GeoJSONWriter();
		var geometry = geoReader.read(geoInput).buffer(distance);
		var polygon = geoWriter.write(geometry);
		
		// this polygon variable contains array of lat lon

		var bufferCoords = [];
		var allCoords = polygon.coordinates[0];
		var lenlen = allCoords.length;

		for (var i=0; i<lenlen; i++) {
			// console.log(allCoords[i]);
			bufferCoords.push(new google.maps.LatLng(allCoords[i][1], allCoords[i][0]) );
		}
		return bufferCoords;
	};

	function makeBuffer(polyline) {
		var overviewPath = polyline.routes[0].overview_path, overviewPathGeo = [];
		for (var i=0; i<overviewPath.length; i++) {
			overviewPathGeo.push( [overviewPath[i].lng(), overviewPath[i].lat()] );
		};
		
		// var distance = 10/111.12; // Roughly 10km
		var distance = 2/100;
		var geoInput = {
			type: "LineString",
			coordinates: overviewPathGeo
		};
		
		var geoReader = new jsts.io.GeoJSONReader(),
		geoWriter = new jsts.io.GeoJSONWriter();
		var geometry = geoReader.read(geoInput).buffer(distance);
		var polygon = geoWriter.write(geometry);
		
		// this polygon variable contains array of lat lon

		// console.log(polygon.coordinates[0].length);

		var bufferCoords = [];
		var allCoords = polygon.coordinates[0];
		var lenlen = allCoords.length;

		for (var i=0; i<lenlen; i++) {
			// console.log(allCoords[i]);
			bufferCoords.push(new google.maps.LatLng(allCoords[i][1], allCoords[i][0]) );
		}

		var myShape = new google.maps.Polygon({
			paths: bufferCoords
			// map: map
		});
		return myShape;
	};

	// ====================================================

	// Make sure that two locations of the same category (e.g. two given results from searching for "Costco" in a certain area) are not so close to each other such as to make it inefficient to consider the points as separate possibilities in the compareStopOptions function. Sometimes, each department of a big box store, for instance, "Costco Vision Center" and "Costco Tire Center", are considered as separate entities even though it's all the same Costco.

	// compares each point to each other point in existing array
	function notTooClose(point, arrOfPts) {
		if (arrOfPts === []) {
			return true;
		}
		var dist = 100; // 100 meters (arbitrarily small distance)
		var farEnough = true; // "farEnough" is another way of saying "notTooClose" w/o same name as function
		var pointLatLng = new google.maps.LatLng(point.geometry.location.G, point.geometry.location.K);

		var ptInArrCoords; // get the {G: __, K: __} object first
		var ptInArrLatLng; // then make a Gmaps LatLng object out of it
		arrOfPts.forEach(function(ptInArr) {
			ptInArrCoords = ptInArr.geometry.location
			ptInArrLatLng = new google.maps.LatLng(ptInArrCoords.G, ptInArrCoords.K);
			if (google.maps.geometry.spherical.computeDistanceBetween(ptInArrLatLng, pointLatLng) < dist) {
				farEnough = false;
			}
		});
		return farEnough;
	};

	// eliminates all overly close points for whole array of points
	function cullNeighboringDuplicates(arrOfPts) {
		var acceptedPts = [arrOfPts[0]]; // need first point as "starting point" for comparison of subsequent ones
		arrOfPts.forEach(function(point) {
			if (notTooClose(point, acceptedPts) === true) {
				acceptedPts.push(point);
			};
		});
		return acceptedPts;
	};

	// ====================================================

	// ADD STOP FUNCTION IS IN ITS OWN JS FILE CALLED ADD_STOP.JS

	// ====================================================

	// From JS Fiddle for use with Clipper Library
	// function scaleup(poly, scale) {
	//   var i, j;
	//   if (!scale) scale = 1;
	//   for(i = 0; i < poly.length; i++) {
	//     for(j = 0; j < poly[i].length; j++) {
	//       poly[i][j].X *= scale;
	//       poly[i][j].Y *= scale;
	//     }
	//   }
	//   return poly;
	// };

	// ========= MAIN FUNCTION TO DEAL WITH USER CLICKING ENTER =========
	$('.submit-search').on('click', function(e) {
		e.preventDefault();

		// var origin, stopLoc1, stopLoc2, stopLoc3, destination = null;

		// ------------------------------------

			// var nbRequest = {
			// 	location: new google.maps.LatLng(-33.8665433,151.1956316),
			// 	radius: '500', // radius is in meters
			// 	types: ['store']
			// };

			// var nearbyTest = performNearbySearch(nbRequest);
			// nearbyTest.then(function(results) {
			// 	console.log(results);
			// });

		// ------------------------------------

		if (oneWayOrReturn === "out-and-back") {
			var origin, stopLoc1, stopLoc2, stopLoc3, destination = null;

			var origin = "633 Folsom St San Francisco, CA";
			var stopLoc1 = "CVS";
			var stopLoc2 = "Trader Joe's";
			var stopLoc3 = "Costco";
			var destination = origin;

			var numStops;
			if (stopLoc3 !== null) {
				numStops = 3;
			} else if (stopLoc2 !== null) {
				numStops = 2;
			} else {
				numStops = 1;
			};

			console.log(numStops, "numStops");

			var originGeo = getGeo(origin);
			originGeo.then(function(results) {

				console.log(results[0].geometry.location, "geocoding results");

				var searchAroundHere = results[0].geometry.location;
				searchAroundHere = new google.maps.LatLng(searchAroundHere.G, searchAroundHere.K);
				var searchParams1, searchParams2, searchParams3;
				var stop1Options, stop2Options, stop3Options;

				// ----- With nearbySearch -----

				var setRadius = '2000';
				searchParams1 = {
					location: searchAroundHere,
					radius: setRadius,
					keyword: stopLoc1
				};
				stop1Options = performNearbySearch(searchParams1);
				if (numStops >= 2) {
					searchParams2 = {
						location: searchAroundHere,
						radius: setRadius,
						name: stopLoc2
					};
					stop2Options = performNearbySearch(searchParams2);
				};
				if (numStops >= 3) {
					searchParams3 = {
						location: searchAroundHere,
						radius: setRadius,
						name: stopLoc3
					};
					stop3Options = performNearbySearch(searchParams3);
				};

				// -------- With radarSearch --------

					// var bounds = makeBoundsAroundLocation(searchAroundHere);
					// searchParams1 = {
					// 	bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
					// 	name: stopLoc1
					// };
					// stop1Options = performSearch(searchParams1);
					// if (numStops >= 2) {
					// 	searchParams2 = {
					// 		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
					// 		name: stopLoc2
					// 	};
					// 	stop2Options = performSearch(searchParams2);
					// };
					// if (numStops >= 3) {
					// 	searchParams3 = {
					// 		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
					// 		name: stopLoc3
					// 	};
					// 	stop3Options = performSearch(searchParams3);
					// };
					// showBoundsAroundLocation(searchAroundHere);

				// ----------------------------------

				var searchResultsPromises = [stop1Options];
				if (numStops >= 2) {
					searchResultsPromises.push(stop2Options);
				};
				if (numStops >= 3) {
					searchResultsPromises.push(stop3Options);
				};

				// ----------------------------------

				Promise.all(searchResultsPromises).then(function(results) {
					var newResults;
					if (numStops === 3) {
						newResults = [[],[],[]];
					} else if (numStops === 2) {
						newResults = [[],[]];
					} else if (numStops === 1) {
						newResults = [[]];
					};

					// var culled3 = cullNeighboringDuplicates(results[2]);
					// console.log(culled3, "culled3");
					// console.log(results[2], "results[2]");

					results.forEach(function(results1, index0to2) {
						newResults[index0to2] = cullNeighboringDuplicates(results1);
						// console.log(results1);
					});
					newResults.forEach(function(results) {
						results.forEach(function(result) {
							createMarker(result);
						});
					});

					console.log(newResults);

					var combinations;
					if (numStops === 3) {
						combinations = allCombinationsThreeOptions(newResults[0], newResults[1], newResults[2]);
					} else if (numStops === 2) {
						combinations = allCombinationsTwoOptions(newResults[0], newResults[1]);
					} else if (numStops === 1) {
						// ...
					};
      		  		var bestRouteBy = "time";
      		  		console.log(combinations);

      		  		compareStopOptions(combinations, origin, destination, bestRouteBy);
				});
			});

			// var stop1Options = performNearbySearch(); ....
		} else if (oneWayOrReturn === "on-my-way") {
			var origin, stopLoc1, stopLoc2, stopLoc3, destination = null;
			// origin = $('.origin_address').val(); // 343 Vernon St San Francisco, CA
			// stopLoc1 = $('.stop_location_1').val(); // Costco
			// if ($('.stop_location_2').length) {
			// 	stopLoc2 = $('.stop_location_2').val(); // CVS
			// };
			// if ($('.stop_location_3').length) {
			// 	stopLoc3 = $('.stop_location_3').val(); // Trader Joe's
			// };
			// destination = $('.destination_address').val(); // 633 Folsom St San Francisco, CA

			// var origin = $('.origin_address').val(); // 343 Vernon St San Francisco, CA
			// var stopLoc1 = $('.stop_location_1').val(); // Costco
			// var stopLoc2 = null;
			// if ($('.stop_location_2').length) {
			// 	stopLoc2 = $('.stop_location_2').val(); // CVS
			// };
			// var stopLoc3 = null;
			// if ($('.stop_location_3').length) {
			// 	stopLoc3 = $('.stop_location_3').val(); // Trader Joe's
			// };
			// var destination = $('.destination_address').val(); // 633 Folsom St San Francisco, CA

			// var origin = "1982 Rockledge Rd Atlanta, GA";
			// var stopLoc1 = "Wendy's";
			// var stopLoc2 = "Ace Hardware";
			// var stopLoc3 = "Publix";
			// var destination = "701 Chase Ln Norcross, GA";

			var origin = "633 Folsom St San Francisco, CA";
			var stopLoc1 = "Trader Joe's";
			var stopLoc2 = "CVS";
			var stopLoc3 = "Costco";
			var destination = "343 Vernon St San Francisco, CA";

			var numStops;
			if (stopLoc3 !== null) {
				numStops = 3;
			} else if (stopLoc2 !== null) {
				numStops = 2;
			} else {
				numStops = 1;
			}

			var p1 = getGeo(origin);
			var p2 = getGeo(destination);

			// -----------------------------------

				// var triangleCoords = [
				//   new google.maps.LatLng(25.774252, -80.190262),
				//   new google.maps.LatLng(18.466465, -66.118292),
				//   new google.maps.LatLng(32.321384, -64.75737)
				// ];

				// var bermudaTriangle = new google.maps.Polygon({
				//   paths: triangleCoords,
				//   map: map
				// });

			// -----------------------------------

			Promise.all([p1, p2]).then(function(results) {
			    var p1result = results[0][0].geometry.location;
			    var p2result = results[1][0].geometry.location;

			    // set up rectangular search bounds
			    var bounds = makeBounds(p1result, p2result);

			    // search request params for each stop entry
			    var searchRequestParams1 = {
			    	bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
			    	name: stopLoc1
			    };
			    if (numStops >= 2) {
			    	var searchRequestParams2 = {
			    		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
			    		name: stopLoc2
			    	};
			    };
			    if (numStops >= 3) {
			    	var searchRequestParams3 = {
			    		bounds: new google.maps.LatLngBounds(bounds[0], bounds[1]),
			    		name: stopLoc3
			    	};
			    };

			    // set up promises for each search of stop within bounds area
			    var stop1Options = performSearch(searchRequestParams1);
			    if (numStops >= 2) {
			    	var stop2Options = performSearch(searchRequestParams2);
			    };
			    if (numStops >= 3) {
			    	var stop3Options = performSearch(searchRequestParams3);
			    };

			    // direct directions request (get non-stop route going from origin to destination)
			    var directDirRequest = {
			    	origin: origin,
			    	destination: destination,
			    	travelMode: google.maps.TravelMode.DRIVING
		        };
		        var directDirectionsRequest = getDirections(directDirRequest);
		        directDirectionsRequest.then(function(results) {

		      		// The below makes use of Kamal's function
		      		var myShape = makeBuffer(results);
		      		console.log(myShape, "myShape");

		      		var promises = [];
		      		promises.push(stop1Options);
		      		if (numStops >= 2) {
		      			promises.push(stop2Options);
		      		};
		      		if (numStops >= 3) {
		      			promises.push(stop3Options);
		      		};

		      		// [stop1Options, stop2Options, stop3Options]
	      		  	Promise.all(promises).then(function(results) {
	      		  		// (optional) check if each place name corresponds to one of the following
	      		  		var stopLocNameArr = [stopLoc1];
	      		  		if (numStops >= 2) {
	      		  			stopLocNameArr.push(stopLoc2);
	      		  		};
	      		  		if (numStops >= 3) {
	      		  			stopLocNameArr.push(stopLoc3);
	      		  		};
	      		  		// var stopLocNameArr = [stopLoc1, stopLoc2, stopLoc3];

	      		  		// ------------------------------------------
		      		  		// // Put each place marker on map, regardless
		      		  		// results.forEach(function(results) {
		      		  		// 	results.forEach(function(place) {
		      		  		// 		createMarker(place); // UNCOMMENT!
		      		  		// 	});
		      		  		// });

	      		  		// Put each place marker on map if inside polyline buffer, and remove options not inside polyline buffer or those that are too close to one another
	      		  		var newResults;
	      		  		if (numStops === 3) {
	      		  			newResults = [[],[],[]];
	      		  		} else if (numStops === 2) {
	      		  			newResults = [[],[]];
	      		  		} else if (numStops === 1) {
	      		  			newResults = [[]];
	      		  		};
	      		  		var newLatLng, newCoords;
	      		  		results.forEach(function(results, index0to2) {
	      		  			results.forEach(function(place, index) {
	      		  				newCoords = place.geometry.location;
	      		  				newLatLng = new google.maps.LatLng(newCoords.G, newCoords.K);
	      		  				if ( google.maps.geometry.poly.containsLocation(newLatLng, myShape) && notTooClose(place, newResults[index0to2]) === true ) {
	      		  					createMarker(place);
	      		  					newResults[index0to2].push(place);
	      		  				};
	      		  			});
	      		  		});

						var combinations;
						if (numStops === 3) {
							combinations = allCombinationsThreeOptions(newResults[0], newResults[1], newResults[2]);
						} else if (numStops === 2) {
							combinations = allCombinationsTwoOptions(newResults[0], newResults[1]);
						} else if (numStops === 1) {
							// ...
						};
	      		  		var bestRouteBy = "time";
	      		  		// compareStopOptions(combinations, origin, destination, bestRouteBy);
	      		  	});
		        });
			});
		};
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

// ====================================================

      	// ------------------- CLIPPER STUFF -------------------

	      	// var scale = 1; // 1;
	      	// // reverse_copy(polygons);
	      	// polyline = scaleup(polyline, scale);
	      	// var cpr = new ClipperLib.Clipper();
	      	// var delta = 25;
	      	// var joinType = 25;
	      	// // var miterLimit = 2;
	      	// var AutoFix = false;
	      	// var endType = ClipperLib.EndType_.etRound; // ClipperLib.EndType.etOpenRound;
	      	// // var svg, offsetted_polygon;
	      	// // cont = document.getElementById('svgcontainer');
	      	// var offsetted_polygon = ClipperLib.Clipper.OffsetPaths(polyline, 10, joinType, endType, 0.25);
	      	// console.log(offsetted_polygon);

	      	// // offsetted_polygon = cpr.OffsetPolygons(polyline, delta*scale, joinType, AutoFix);
	      	// // console.log(offsetted_polygon);

	      	// var offsetBufferCoords = [];
	      	// var offsetPolyLen = offsetted_polygon[0].length;
	      	// var offsetTempLat, offsetTempLng;
	      	// for (var i=0; i<offsetPolyLen; i++) {
	      	// 	offsetTempLng = offsetted_polygon[0][i].X;
	      	// 	offsetTempLat = offsetted_polygon[0][i].Y;
	      	// 	offsetBufferCoords.push(new google.maps.LatLng(offsetTempLat, offsetTempLng));
	      	// };

	      	// var offsetBuffer = new google.maps.Polygon({
	      	//   paths: offsetBufferCoords,
	      	//   map: map
	      	// });

// ====================================================

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

// var stopLoc = {location: new google.maps.LatLng(37.766280, -122.420961)};
// var stopLoc2 = {location: "55 Brighton Ave San Francisco, CA 94112"};