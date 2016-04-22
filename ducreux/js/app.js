
du.equalizer();
du.videoBox();
// du.geoLocate(function(position){
// 	console.log(position);
// });
//du.mask();
function testDir (){console.log('directive engaged')}

du.directive('test.html', 'data-directivetest', testDir);