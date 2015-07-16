App.Static = (function(){
    var that = {},
        userInputArray = [],

    init = function (){
        
    },
        
    showChart = function (number){
        switch (number) {
            case "1": 
                _showStatic1Chart();
                break;
            case "2": 
                _showStatic2Chart();
                break;
            case "3": 
                _showStatic3Chart();
                break;
            case "4": 
                _showStatic4Chart();
                break;  
        }
    },
        
    _showStatic1Chart = function () {
		var input1 = _createInput("static1", "Erscheinungsjahr", "javascript", "",  1992),
			input2 = _createInput("static1", "Erscheinungsjahr", "css", "", 1992),
			input3 = _createInput("static1", "Erscheinungsjahr", "html5", "", 1992);

		userInputArray.push(input1);
		userInputArray.push(input2);
		userInputArray.push(input3);
		$('.chart-desc').addClass('hide');
		$('#chart-desc-1').removeClass('hide');
        _trigger();
	},
		
	_showStatic2Chart = function () {
		var input1 = _createInput("static2", "Erscheinungsjahr", "", "book", 1980),
			input2 = _createInput("static2", "Erscheinungsjahr", "", "ebook", 1980);
       
		userInputArray.push(input1);
		userInputArray.push(input2);
		$('.chart-desc').addClass('hide');
		$('#chart-desc-2').removeClass('hide');
        _trigger();
	},
		
	_showStatic3Chart = function () {
		var input = _createInput("static3", "Verlage", "", "", 1940);
		userInputArray.push(input);
		$('.chart-desc').addClass('hide');
		$('#chart-desc-3').removeClass('hide');
        _trigger();
	},
        
    _showStatic4Chart = function(){
        var input =_createInput("static4", "Sprache","","", 1940);
        userInputArray.push(input);
		$('.chart-desc').addClass('hide');
		$('#chart-desc-4').removeClass('hide');
        _trigger();
    },
        
    _trigger = function () {
        data = {
			data:userInputArray
		}
		$('body').trigger('userInputs',data);
		console.log("static data", data);
        userInputArray = [];
    },
        
    _createInput = function (stat, req, kw1, medium, minyear) {
		var input = {
				stat: stat,
				req: req,
                kw1: kw1,
                kw2: "",
                author: "",
                publisher: "",
                yearMin: minyear,
                yearMax: 2017,
                pagesMin: 0,
                pagesMax: 9999,
                place: "",
				language: "",
				medium: medium,
				num: userInputArray.length
			}
		return input;
	};

    that.init = init;
    that.showChart = showChart;
   return that; 
})();