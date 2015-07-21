
$(function() {
	function initialize() {
		var myLatlng = new google.maps.LatLng(37, -122);
		var mapOptions = {
	    	zoom: 4,
	    	center: myLatlng
		}
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	$('.submit-search').on('click', function(e) {
		e.preventDefault();

		var origin = $('#origin_address');
		var stopLoc = $('#stop_address');
		var destination = $('#destination_address');
		
		var ajaxRequest = $.ajax({
			url: 'main/info',
			type: 'GET',
			dataType: 'JSON',
			data: {origin: origin, stopLoc: stopLoc, destination: destination}
		});
		ajaxRequest.done(function(response) {
			console.log("success");
		});
		ajaxRequest.fail(function() {
			console.log("error");
		});
	});

	google.maps.event.addDomListener(window, 'load', initialize);
});