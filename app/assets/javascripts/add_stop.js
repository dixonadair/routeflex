// Deals with adding (and deleting (not yet implemented)) stops from user's route

$(function() {
	$('.fill-form').on('click', '.add-stop', function(e) {
		e.preventDefault();
		// console.log('add stop clicked');
		if ($('.stop_location_3').length) {
			// do nothing;
			// console.log("no need to do anything");
		} else if ($('.stop_location_2').length) {
			$("<input class='stop_location_3' class='search-ui' placeholder='Stop 3 (e.g. Costco)'>").insertAfter('.stop_location_2');
			$('.add-stop').remove();
		} else {
			$("<input class='stop_location_2' class='search-ui' placeholder='Stop 2 (e.g. Trader Joe's)'>").insertAfter('.stop_location_1');
		};
	});
});