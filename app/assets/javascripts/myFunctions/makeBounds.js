// For the "on-my-way" searches
function makeBounds(origin, destination) {
	var offsetAmt = 0.025;
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