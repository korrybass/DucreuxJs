
//console.log(du);
//du.validate('input');
du.equalizer();
du.videoBox();
//du.geoLocate();
//du.mask();
function testDir (){
	console.log('ran the directive');
}
du.directive('test.html', 'data-directivetest', testDir);