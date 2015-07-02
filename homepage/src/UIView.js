App.UIView = (function(){
	var that = {},
		uiView,
        userInputArray = [],
        $qerylist,
		
	init = function(list) {
		$querylist = list;
        _initEvents();
        
	},
		
		
	_initEvents = function () {
		$(".sidebar-nav a").on('click', _showPage);
		$("#buttonShowChart").on('click', _showChart);
		$("#button-compare").on('click', _getInput);
        
	},
		
	_showPage = function (e) {
		e.preventDefault();
   		$('.content').addClass('hide'); // hides all content divs
   		$( $(this).attr('href') ).removeClass('hide');
        userInputArray = [];
        _addQueryToList();
	//get the href and use it find which div to show
	console.log($(this).attr('href'));
	// if href="#static1" -> trigger -> get data -> show
	// if href="#static2" -> trigger -> get data -> show
			
	},
		
	_getInput = function (e) {
        var userInput = {
        
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
        
       
        userInputArray.push(userInput);
        _addQueryToList();
        
	},
	
	_addQueryToList = function(){
        $querylist.empty();
        
        for (var i = 0;i<userInputArray.length;i++){
            $querylist.append(_getContainerForQuery(userInputArray[i]));   
        }
    },
        
    _getContainerForQuery = function (query){
        compile = _.template($('#queryTemplate').html());
            return compile(query);   
    },
        
	_showChart = function (e) {
        var counter = 0;
        
        $('#inputs').find('input').each(function() {
            if($(this).val() != ""){
                counter++;
            }
        });
        
        if (counter>=1||userInputArray.length<1){
            _getInput();
            
        }
        $("#filter-options").addClass("hide");
        console.log(userInputArray);
        data = {
            data:userInputArray
        }
		$('.chart').removeClass('hide');
        $('body').trigger('userInputs',data);
        userInputArray = [];
	};
	
	
	
	
	
	
	
	
	
	
	that.init = init;
	
	
	return that;
})();