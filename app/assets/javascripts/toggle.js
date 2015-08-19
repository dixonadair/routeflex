// This file controls user interaction with "on-my-way" and "out-and-back" buttons

$(function() {
	$('.menu-ui a').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		if ($(this).hasClass('out-and-back')) {
			// console.log('out-and-back');
			oneWayOrReturn = "out-and-back";
		} else if ($(this).hasClass('on-my-way')) {
			// console.log('on-my-way');
			oneWayOrReturn = "out-and-back";
		};
	});
});