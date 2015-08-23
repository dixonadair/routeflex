
// $(function() {

// 	var map;
// 	var infoWindow;
// 	var service;

// 	function initialize() {
// 	  map = new google.maps.Map(document.getElementById('map-canvas'), {
// 	    center: new google.maps.LatLng(-33.8668283734, 151.2064891821),
// 	    zoom: 15,
// 	    styles: [
// 	      {
// 	        stylers: [
// 	          { visibility: 'simplified' }
// 	        ]
// 	      },
// 	      {
// 	        elementType: 'labels',
// 	        stylers: [
// 	          { visibility: 'off' }
// 	        ]
// 	      }
// 	    ]
// 	  });

// 	  infoWindow = new google.maps.InfoWindow();
// 	  service = new google.maps.places.PlacesService(map);

// 	  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
// 	}

// 	console.log(service);

// 	function performSearch() {
// 	  var request = {
// 	    bounds: map.getBounds(),
// 	    keyword: 'best view'
// 	  };
// 	  service.radarSearch(request, callback);
// 	}

// 	function callback(results, status) {
// 	  if (status != google.maps.places.PlacesServiceStatus.OK) {
// 	    alert(status);
// 	    return;
// 	  }
// 	  for (var i = 0, result; result = results[i]; i++) {
// 	    // createMarker(result);
// 	    console.log(result);
// 	  }
// 	}

// 	google.maps.event.addDomListener(window, 'load', initialize);
// });