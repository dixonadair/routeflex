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