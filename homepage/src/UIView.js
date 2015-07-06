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
		$('#x-axis-drowdown li').on('click', _showChart);
	},
		
	_showPage = function (e) {
		e.preventDefault();
   		$('.content').addClass('hide'); // hides all content divs
   		$( $(this).attr('href') ).removeClass('hide');
        userInputArray = [];
		$(".chart").empty();
        _addQueryToList();
	//get the href and use it find which div to show
	console.log($(this).attr('href'));
	// if href="#static1" -> _showChart()
	// if href="#static2" -> _showChart()
			
	},
		
	_getInput = function (request) {
        // e aufbereiten zu byKeyword, ...
		
		var userInput,
			req;
			if (request == "Anzeigen") {
				req = "byKeyword";
			}			
			if (request == "Medium") {
				req = "byMedium";
			}
			if (request == "Bibliothek") {
				req = "byBib";
			}
			if (request == "Seitenzahl") {
				req = "byPages";
			}
			if (request == "Sprache") {
				req = "byLanguage";
			}
			if (request == "Erscheinungsjahr") {
				req = "byYear";
			}
			userInput = {
				req: req,
                kw1: $("#kw1").val(),
                kw2: $("#kw2").val(),
                kw3: $("#kw3").val(),
                kw4: $("#kw4").val(),
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
        $("#kw3").val("");
        $("#kw4").val("");
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
      
	// nicht e übergeben sondern nur text des feldes
	_showChart = function (e) {
        var counter = 0;
        e.preventDefault();
		$('#inputs').find('input').each(function() {
            if($(this).val() != ""){
                counter++;
            }
        });
        
        if (counter>=1||userInputArray.length<1){
            _getInput($(this).text());
            
        }
        $("#filter-options").addClass("hide");
        console.log(userInputArray);
        // art des requests muss in data gespeichert werden um url richtig zusammenzusetzen
		console.log("target", $(this).attr('href'));
		console.log("target-text", $(this).text());
		data = {
            data:userInputArray
        }
        $('body').trigger('userInputs',data);
        userInputArray = [];
	};
	
	
	
	
	
	
	
	
	
	
	that.init = init;
	
	
	return that;
})();