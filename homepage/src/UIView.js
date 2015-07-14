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
        var index = _getIndex(e);
        userInputArray.splice(index,1);

        if( userInputArray.length==0){
            _changeChart();
            _addQueryToList();
        }else{
            _addQueryToList();
            data = {
                data:userInputArray
            }
		  $('body').trigger('userInputs',data);
        }
    },
        
    _handleEditQuery = function (e){
        var index = _getIndex(e);
        input = userInputArray[index];
        $('#filter-options').removeClass('hide');
        $('#button-show-filter').addClass('hide');
        _setInput(input.kw1,input.kw2,input.author,input.publisher,input.yearMin,input.yearMax,input.pagesMin,input.pagesMax,input.place,input.language,input.medium);
       
        userInputArray.splice(index,1);
        _addQueryToList();
    },
    _getIndex = function (e){
        var li = e.currentTarget.parentElement.parentElement,
            index = $(li).index();
        index = index/2;
        return index;
    },
        
    _setInput = function (kw1,kw2,author,publisher,yearMin,yearMax,pagesMin,pagesMax,place,language,medium){
        $("#kw1").val(kw1);
        $("#kw2").val(kw2);
        $("#author").val(author);
        $("#publisher").val(publisher);
        $("#yearMin").val(yearMin);
        $("#yearMax").val(yearMax);
        $("#pagesMin").val(pagesMin);
        $("#pagesMax").val(pagesMax);
        $("#place").val(place);
		$("#language").val(language);
		$("#medium").val(medium);
    },
		
	_showFilterOptions = function (e) {
		$(this).addClass('hide');
		$('#filter-options').removeClass('hide');
	},
		
	_updateMedium = function (e) {
		selectedMedium = $(this).text();
        
        if (selectedMedium=="all"){
           selectedMedium = ""; 
            $('#medium-dropdown').parents('#medium-dropdown-container').find('.dropdown-toggle').html("Medium");
        }else{
            $('#medium-dropdown').parents('#medium-dropdown-container').find('.dropdown-toggle').html(selectedMedium);
            
        }  
	},
		
	_updateLanguage = function (e) {
		selectedLanguage = $(this).text();
        
        if (selectedLanguage=="all"){
           selectedLanguage = ""; 
            $('#language-dropdown').parents('#language-dropdown-container').find('.dropdown-toggle').html("Sprache");
        }else{
           $('#language-dropdown').parents('#language-dropdown-container').find('.dropdown-toggle').html(selectedLanguage); 
        }
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
			$('#filterButton').removeClass('hide');
			_changeChart();
		}else 
            if($(this).attr('href')== "#filter-options"){
		  	$('#filterButton').removeClass('hide');
            $('#x-axis-drowdown').parents('#filterButton').find('.dropdown-toggle').html(request);
		}else{
            $('body').trigger('static',$(this).attr('href').replace('#static',''));
        }
        
		$('#x-axis-drowdown').parents('#filterButton').find('.dropdown-toggle').html(request);
			
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
				medium: selectedMedium
        };
        
        _setInput("","","","","","","","","","","");
        
        
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
        $('#language-dropdown').parents('#language-dropdown-container').find('.dropdown-toggle').html("Sprache");
        $('#medium-dropdown').parents('#medium-dropdown-container').find('.dropdown-toggle').html("Medium");
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
        $(this).parents('#filterButton').find('.dropdown-toggle').html(request);
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
		$('#language-dropdown').parents('#language-dropdown-container').find('.dropdown-toggle').html("Sprache");
        $('#medium-dropdown').parents('#medium-dropdown-container').find('.dropdown-toggle').html("Medium");
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