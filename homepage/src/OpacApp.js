var App = {
    
    init : function(){
    
        App.DataFetcher.init();
        App.Controller.init();
        App.View.init(document.querySelector(".chart"));
        
    }
    
};