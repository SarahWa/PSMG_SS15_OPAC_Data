App.Controller = (function(){
    var that = {},
        dataFetcher,
        static,
        chartView,
    
    
    init = function (){
        App.UIView.init($("#querylist"));
        dataFetcher = App.DataFetcher;
		chartView = App.ChartView;
        static = App.Static;
        
        dataFetcher.init();
        chartView.init();
        static.init();
        
        _initEvents();
        
        
    
    },
        
    _initEvents = function(){
        $('body').on("userInputs",_handleUserInputs);
        $('body').on("serverResponse",_handleServerResponse);
        $('body').on("static",_handleStaticClicked);
		//$('body').on("hideLanguagePices", _handleHideLanguagePieces);
    },
        
    _handleServerResponse = function(event, data){
      	chartView.renderChart(data.data);
    },
        
    _handleStaticClicked = function (event,number){
        static.showChart(number);
    },
        
    _handleUserInputs = function(event, data){
		dataFetcher.getData(data);  
    }/*,
		
	_handleHideLanguagePieces = function (event) {
		chartView.updataLanguageChart();
	}*/;
    
    
    
    
    that.init = init;
    
    

   return that; 
})();