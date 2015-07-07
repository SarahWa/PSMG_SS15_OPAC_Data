App.Controller = (function(){
    var that = {},
        dataFetcher,
        uIView,
        chartView,
    
    
    init = function (){
        dataFetcher =  App.DataFetcher;
        uIView = App.UIView;
		chartView = App.ChartView;
        
        dataFetcher.init();
        uIView.init($("#querylist"));
        chartView.init();
        
        _initEvents();
        
        
    
    },
        
    _initEvents = function(){
        $('body').on("userInputs",_handleUserInputs);
        $('body').on("serverResponse",_handleServerResponse);
    },
        
    _handleServerResponse = function(event, data){
        console.log("server",data);
      	chartView.renderChart(data);
    },
        
    _handleUserInputs = function(event, data){
         console.log("inputcontroller",data);
         dataFetcher.getData(data);  
    };
    
    
    
    
    that.init = init;
    
    

   return that; 
})();