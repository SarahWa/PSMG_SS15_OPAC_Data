App.UIView = (function(){
	var that = {},
		uiView,
        userInputArray = [],
        querylist,
		
	init = function(list) {
		querylist = list;
        _initEvents();
        
	},
		
		
	_initEvents = function () {
		$(".sidebar-nav a").on('click', _showPage);
		$("#buttonShowChart").on('click', _showChart);
		$("#button-compare").on('click', _getInput);
		$('#x-axis-drowdown li').on('click', _changeChart);
	},
		
	_showPage = function (e) {
		e.preventDefault();
   		$('.content').addClass('hide'); // hides all content divs
   		$( $(this).attr('href')).removeClass('hide');
        userInputArray = [];
        _addQueryToList();
	//get the href and use it find which div to show
	// if href="#static1" -> _showChart()
	// if href="#static2" -> _showChart()
			
	},
		
		
	_getInput = function (request) {
		var userInput;
		if (request == "Anzeigen") {
			request = "Stichwort"
		}
			userInput = {
				req: request,
                kw1: $("#kw1").val(),
                kw2: $("#kw2").val(),
                author: $("#author").val(),
                publisher: $("#publisher").val(),
                yearMin: $("#yearMin").val(),
                yearMax: $("#yearMax").val(),
                pagesMin: $("#pagesMin").val(),
                pagesMax: $("#pagesMax").val(),
                place: $("#place").val()   
        };
        
        $("#kw1").val("");
        $("#kw2").val("");
        $("#author").val("");
        $("#publisher").val("");
        $("#yearMin").val("");
        $("#yearMax").val("");
        $("#pagesMin").val("");
        $("#pagesMax").val("");
        $("#place").val("");
        
       	if(userInput.yearMin =="") {
		   userInput.yearMin = 0;
	   	}
		if(userInput.yearMax =="") {
		   userInput.yearMax = 2017;
	   	}
		if(userInput.pagesMin =="") {
		   userInput.pagesMin = 0;
	   	}
		if(userInput.pagesMax =="") {
		   userInput.pagesMax = 9999;
	   	}

        userInputArray.push(userInput);
        _addQueryToList();
	},
	
	_addQueryToList = function(){
        querylist.empty();
        
        for (var i = 0;i<userInputArray.length;i++){
            querylist.append(_getContainerForQuery(userInputArray[i]));   
        }
    },
        
    _getContainerForQuery = function (query){
        compile = _.template($('#queryTemplate').html());
            return compile(query);   
    },
		
	_changeChart = function (e) {
		var request = $(this).text(),
			input;
		if (userInputArray.length <1) {
			input = {req: request,
                kw1: "",
                kw2: "",
                author: "",
                publisher: "",
                yearMin: 0,
                yearMax: 2017,
                pagesMin: 0,
                pagesMax: 9999,
                place: ""
			}
			userInputArray.push(input);
		}
		for (var i = 0; i < userInputArray.length; i++) {
			userInputArray[i].req = request;
		}
		data = {
            data:userInputArray
        }
		$('body').trigger('userInputs',data);
	},
      
	// nicht e übergeben sondern nur text des feldes
	_showChart = function (e) {
        var counter = 0;
        e.preventDefault();
		$('#chartWrapper').removeClass('hide');
		
		$('#inputs').find('input').each(function() {
            if($(this).val() != ""){
                counter++;
            }
        });
        
        if (counter>=1||userInputArray.length<1){
            _getInput($(this).text()); 
        }
		for (var i = 0; i < userInputArray.length; i++) {
			userInputArray[i].req = "Stichwort";
		}
        $("#filter-options").addClass("hide");
		data = {
            data:userInputArray
        }
        $('body').trigger('userInputs',data);
        //userInputArray = [];
	};
	
	
	
	
	
	
	
	
	
	
	that.init = init;
	
	
	return that;
})();