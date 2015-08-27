// Deals with adding (and deleting (not yet implemented)) stops from user's route

$(function() {
	$('.fill-form').on('click', '.add-stop', function(e) {
		e.preventDefault();
		// console.log('add stop clicked');
		if ($('.stop_location_3').length) {
			// do nothing;
		} else if ($('.stop_location_2').length) {
			$("<br><label for=''>Stop 3:</label><input class='stop_location_3 form-control stop' class='search-ui' placeholder='(e.g. Costco)'>").insertAfter('.stop_location_2');
			$('.add-stop').remove();
		} else {
			$("<br><label for=''>Stop 2:</label><input class='stop_location_2 form-control stop' class='search-ui' placeholder='(e.g. Trader Joes)'>").insertAfter('.stop_location_1');
		};
	});
});