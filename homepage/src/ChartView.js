App.ChartView = (function(){
    var that = {},
        chartView,
        margin = {
            top: 30,
            right: 30,
            bottom: 40,
            left: 40
        },
        
      //dimensionen wichhtig für visualisierung zb für breite eines balkens

    
    
    init = function (){
		google.load('visualization', '1.0', {'packages':['corechart']});
		//google.setOnLoadCallback(drawChart);
		//chartView = document.querySelector('.chart');
    },
        
        
    renderChart= function(data)   {//visualisieren mit google chart
		width = $('#chartContainer').width()-margin.left-margin.right;
		height = 500-margin.top-margin.bottom;
		
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();