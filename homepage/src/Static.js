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
		var input1 = _createInput("Erscheinungsjahr", "javascript", "",  1992),
			input2 = _createInput("Erscheinungsjahr", "css", "", 1992),
			input3 = _createInput("Erscheinungsjahr", "html5", "", 1992);

		userInputArray.push(input1);
		userInputArray.push(input2);
		userInputArray.push(input3);
        _trigger();
	},
		
	_showStatic2Chart = function () {
		var input1 = _createInput("Erscheinungsjahr", "", "book", 1980),
			input2 = _createInput("Erscheinungsjahr", "", "ebook", 1980);
       
		userInputArray.push(input1);
		userInputArray.push(input2);
        _trigger();
	},
		
	_showStatic3Chart = function () {
		var input = _createInput("Verlage", "", "", 1940);
		userInputArray.push(input);
        _trigger();
	},
        
    _showStatic4Chart = function(){
        var input =_createInput("Sprache","","", 1940);
        userInputArray.push(input);
        _trigger();
		//$('body').trigger('hideLanguagePices');
    },
        
    _trigger = function () {
        data = {
			data:userInputArray
		}
		$('body').trigger('userInputs',data);
        userInputArray = [];
    },
        
    _createInput = function (req, kw1, medium, minyear) {
		var input = {req: req,
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