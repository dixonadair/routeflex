// $(function() {
// 	var geocoder = new google.maps.Geocoder();
// 	function getGeo(address){
// 	  return new Promise(function(resolve, reject) {
// 	    geocoder.geocode({'address': address}, function(geo){
// 	    	resolve(geo);
// 	    });
// 	  });
// 	};

// 	// var sampleAddress = "55 Brighton Ave San Francisco, CA 94112";
// 	// var geocodedAddr = getGeo(sampleAddress);
// 	// geocodedAddr.then(function(result) {
// 	// 	console.log(result);
// 	// });
// });

function getGeo(address){
  return new Promise(function(resolve, reject) {
    new google.maps.Geocoder().geocode({'address': address}, function(geo){
    	resolve(geo);
    });
  });
};