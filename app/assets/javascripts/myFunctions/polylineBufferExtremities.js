// shapeOrBounds parameter tells function whether to return the bounds shape object or latlngbounds object
// the two options are "shape" and "bounds"

function polylineBufferExtremities(polylineBufferShape, shapeOrBounds) {
	var north = polylineBufferShape[0].G;
	var south = polylineBufferShape[0].G;
	var east = polylineBufferShape[0].K;
	var west = polylineBufferShape[0].K;
	var len = polylineBufferShape.length;
	for (var i=0; i<len; i++) {
		if (polylineBufferShape[i].G >= north) {
			north = polylineBufferShape[i].G;
		};
		if (polylineBufferShape[i].G <= south) {
			south = polylineBufferShape[i].G;
		};
		if (polylineBufferShape[i].K >= east) {
			east = polylineBufferShape[i].K;
		};
		if (polylineBufferShape[i].K <= west) {
			west = polylineBufferShape[i].K;
		};
	};
	var nw, ne, se, sw;
	nw = new google.maps.LatLng(north, west);
	ne = new google.maps.LatLng(north, east);
	se = new google.maps.LatLng(south, east);
	sw = new google.maps.LatLng(south, west);
	var rectangleBounds = new google.maps.LatLngBounds(sw, ne);
	var bufferCoords = [nw, ne, se, sw];
	var bufferRectangle = new google.maps.Polygon({
		paths: bufferCoords
	});
	if (shapeOrBounds === "shape") {
		return bufferRectangle;
	} else {
		return rectangleBounds;
	};
};