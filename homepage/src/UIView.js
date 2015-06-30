App.UIView = (function(){
	var that = {},
		uiView,
		
	init = function() {
		_initEvents();
	},
		
		
	_initEvents = function () {
		$(".sidebar-nav a").on('click', _showPage);
		$("#buttonShowChart").on('click', showChart);
		$("#button-compare").on('click', _getInput);
	},
		
	_showPage = function (e) {
		e.preventDefault();
   		$('.content').addClass('hide'); // hides all content divs
   		$( $(this).attr('href') ).removeClass('hide');
	//get the href and use it find which div to show
	console.log($(this).attr('href'));
	// if href="#static1" -> trigger -> get data -> show
	// if href="#static2" -> trigger -> get data -> show
			
	},
		
	_getInput = function (e) {
		// jedes Inputfeld auslesen, oben in template befüllen (existiert noch nicht)
	},
	
	// nicht sicher ob öffentlich notwendig
	showChart = function (e) {
		// get inputs and trigger
		$('.chart').removeClass('hide');
	};
	
	
	
	
	
	
	
	
	
	
	that.init = init;
	that.showChart = showChart;
	
	return that;
})();