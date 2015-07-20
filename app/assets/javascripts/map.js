
$(function() {
	function initialize() {
		var myLatlng = new google.maps.LatLng(37, -122);
		var mapOptions = {
	    	zoom: 4,
	    	center: myLatlng
		}
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});