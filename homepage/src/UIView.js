App.UIView = (function(){
	var that = {},
		uiView,
        userInputArray = [],
        querylist,
		selectedMedium ="",
		selectedLanguage ="",
		request = "Bibliotheken",
		
	init = function(list) {
		$('#button-compare').tooltip();
		querylist = list;
        _initEvents();
        selectedMedium = "";
		selectedLanguage = "";
	},
		
		
	_initEvents = function () {
		$(".sidebar-nav a").on('click', _showPage);
		$("#buttonShowChart").on('click', _showChart);
		$("#button-compare").on('click', _getInput);
		$('#x-axis-drowdown li').on('click', _getChartByXAxisCall);
		$('#language-dropdown li').on('click', _updateLanguage);
		$('#medium-dropdown li').on('click', _updateMedium);
		$('#button-show-filter').on('click', _showFilterOptions);
        $("#querylist").on('click', '.edit',_handleEditQuery);
        $("#querylist").on('click', '.delete',_handleDeleteQuery);
       
	},
        
    _handleDeleteQuery = function (e){
        var li = e.currentTarget.parentElement.parentElement,
            ul = e.currentTarget.parentElement.parentElement.parentElement,
            index = $(li).index();
        index = index/2;
        userInputArray.splice(index,1);
        _addQueryToList();
        data = {
            data:userInputArray
        }
		$('body').trigger('userInputs',data);
        
        
    },
        
    _handleEditQuery = function (e){
         var li = e.currentTarget.parentElement.parentElement,
            ul = e.currentTarget.parentElement.parentElement.parentElement,
            index = $(li).index();
        index = index/2;
        input = userInputArray[index];
        $('#filter-options').removeClass('hide');
        $('#button-show-filter').addClass('hide');
        $("#kw1").val(input.kw1);
        $("#kw2").val(input.kw2);
        $("#author").val(input.author);
        $("#publisher").val(input.publisher);
        $("#yearMin").val(input.yearMin);
        $("#yearMax").val(input.yearMax);
        $("#pagesMin").val(input.pagesMin);
        $("#pagesMax").val(input.pagesMax);
        $("#place").val(input.place);
		$("#language").val(input.language);
		$("#medium").val(input.medium);
        userInputArray.splice(index,1);
        _addQueryToList();
    },
		
	_showFilterOptions = function (e) {
		$(this).addClass('hide');
		$('#filter-options').removeClass('hide');
        
	},
		
	_updateMedium = function (e) {
		selectedMedium = $(this).text();
	},
		
	_updateLanguage = function (e) {
		selectedLanguage = $(this).text();
	},
		
	_showPage = function (e) {
		e.preventDefault();
   		$('.content').addClass('hide'); // hides all content divs
   		$( $(this).attr('href')).removeClass('hide');
		$("html, body").animate({ scrollTop: 0 }, "slow");
        userInputArray = [];
        _addQueryToList();
		if ($(this).attr('href')=="#start") {
			request = "Bibliotheken";
			_changeChart();
		}
		if ($(this).attr('href') == "#static1") {
			_showStatic1Chart();
		}
		
	//get the href and use it find which div to show
	// if href="#static1" -> _showChart()
	// if href="#static2" -> _showChart()
			
	},
		
		
	_getInput = function (request) {
		var userInput;
			userInput = {
				req: request,
                kw1: $("#kw1").val().toLowerCase().replace("ä","ae").replace("ö","oe").replace("ü","ue"),
                kw2: $("#kw2").val().toLowerCase().replace("ä","ae").replace("ö","oe").replace("ü","ue"),
                author: $("#author").val().toLowerCase().replace("ä","ae").replace("ö","oe").replace("ü","ue"),
                publisher: $("#publisher").val().toLowerCase().replace("ä","ae").replace("ö","oe").replace("ü","ue"),
                yearMin: $("#yearMin").val(),
                yearMax: $("#yearMax").val(),
                pagesMin: $("#pagesMin").val(),
                pagesMax: $("#pagesMax").val(),
                place: $("#place").val().toLowerCase().replace("ä","ae").replace("ö","oe").replace("ü","ue") ,
				language: selectedLanguage,
				medium: selectedMedium,
                num: userInputArray.length
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
		$("#language").val();
		$("#medium").val();
        
       	if(userInput.yearMin =="") {
		   userInput.yearMin = 1940;
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
		selectedLanguage ="";
		selectedMedium="";
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
		
	_getChartByXAxisCall = function(e) {
		request = $(this).text();
		_changeChart();
	},
		
	_changeChart = function () {
		var input;
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
                place: "",
				language: "",
				medium: ""
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
		
	_showStatic1Chart = function () {
		var input1 =_createInput("Erscheinungsjahr", "html", 1994),
			input2 = _createInput("Erscheinungsjahr", "css", 1994),
			input3 = _createInput("Erscheinungsjahr", "html5", 1994)
		userInputArray.push(input1);
		userInputArray.push(input2);
		userInputArray.push(input3);
		
		data = {
			data:userInputArray
		}
		$('body').trigger('userInputs',data);
		_addQueryToList();
	},
		
	_createInput = function (req, kw1, minyear) {
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
				medium: ""
			}
		return input;
	},
      
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
				userInputArray[i].req = request;
		}
		
        $("#filter-options").addClass("hide");
		$("#button-show-filter").removeClass("hide");
		data = {
            data:userInputArray
        }
        $('body').trigger('userInputs',data);
        
	};
	
	
	
	
	
	
	
	
	
	
	that.init = init;
	
	
	return that;
})();