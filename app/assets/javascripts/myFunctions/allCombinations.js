// return all combinations of location1, location2, and location3
var allCombinationsThreeOptions = function(arr1, arr2, arr3) {
	var possibilities = [];
	var cur;
	for (var i=0; i<arr1.length; i++) {
		for (var j=0; j<arr2.length; j++) {
			for (var k=0; k<arr3.length; k++) {
				cur = [arr1[i], arr2[j], arr3[k]]
				possibilities.push(cur);
			};
		};
	};
	return possibilities;
};

var allCombinationsTwoOptions = function(arr1, arr2) {
	var possibilities = [];
	var cur;
	for (var i=0; i<arr1.length; i++) {
		for (var j=0; j<arr2.length; j++) {
			cur = [arr1[i], arr2[j]]
			possibilities.push(cur);
		};
	};
	return possibilities;
};