var App = {
    
    init : function(){
    
        App.DataFetcher.init();
        App.Controller.init();
        App.UIView.init();
		App.ChartView.init(document.querySelector(".chart"));
    }
    
};