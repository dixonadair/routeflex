// // This file controls user interaction with "on-my-way" and "out-and-back" buttons

// $(function() {

// 	var oneWayOrReturn;

// 	var outBackForm = $("<input class='origin_address' class='search-ui' placeholder='Start/End Address'><input class='stop_location_1' class='search-ui' placeholder='Stop 1 (e.g. CVS)'><button class='add-stop'>Add stop</button><button class='submit-search'>Enter</button>");
// 	var onWayForm = $("<input class='origin_address' class='search-ui' placeholder='Start Address'><input class='stop_location_1' class='search-ui' placeholder='Stop 1 (e.g. CVS)'><button class='add-stop'>Add stop</button><input class='destination_address' class='search-ui' placeholder='End Address'><button class='submit-search'>Enter</button>");

// 	// ".empty()" + ".html(...)" way
// 	$('.menu-ui a').on('click', function(e) {
// 		e.preventDefault();
// 		$(this).addClass('active').siblings().removeClass('active');
// 		if ($(this).hasClass('out-and-back')) {
// 			$('.fill-form').html(outBackForm);
// 			oneWayOrReturn = "out-and-back";
// 			console.log(oneWayOrReturn, "oneWayOrReturn");
// 		} else if ($(this).hasClass('on-my-way')) {
// 			$('.fill-form').html(onWayForm);
// 			oneWayOrReturn = "on-my-way";
// 			console.log(oneWayOrReturn, "oneWayOrReturn");
// 		};
// 	});

// });

// // -------------------------------------------------------
// 		// // ".insertAfter()" way
// 		// $('.menu-ui a').on('click', function(e) {
// 		// 	e.preventDefault();
// 		// 	$(this).addClass('active').siblings().removeClass('active');
// 		// 	if ($(this).hasClass('out-and-back')) {
// 		// 		// console.log('out-and-back');
// 		// 		outBackForm.insertAfter('nav');
// 		// 		oneWayOrReturn = "out-and-back";
// 		// 	} else if ($(this).hasClass('on-my-way')) {
// 		// 		// console.log('on-my-way');
// 		// 		onWayForm.insertAfter('nav');
// 		// 		oneWayOrReturn = "out-and-back";
// 		// 	};
// 		// });