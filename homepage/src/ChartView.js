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
		chartView = document.querySelector('.chart');
    },
        
        
     renderChart= function(data)   {//visualisieren mit d3
 		var formatCount = d3.format(",.0f");
		$('#chartWrapper').removeClass('hide');
		width = $('#chartContainer').width()-margin.left-margin.right;
		console.log(width);
		height = 500-margin.top-margin.bottom;
		 var y = d3.scale.linear().range([height,0]),//funktion die daten/kundenzahl auf y achse mapt //range wertebereich
            
            x = d3.scale.ordinal().rangeRoundBands([0,width]),
            
            xAxis = d3.svg.axis().scale(x).orient("bottom"),
            
            yAxis = d3.svg.axis().scale(y).orient("left");
            
            chart = d3.select(chartView).attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom);
        console.log(data.data[0]);
       x.domain(data.data.map(function(d){
           console.log(d.req);
		   return d.kw1;
        }));
        
        
        y.domain([0, d3.max(data.data, function (d){//d3.max--> sucht maximalen wert aus array
            return d.num;
        })]);
       
        chart.append("g").attr("class", "x axis").attr("transform", "translate(0,"+height+")").call(xAxis);
        
        chart.append("g").attr('class','y axis').call(yAxis);
        
        chart.selectAll(".bar").data(data.data).enter().append("rect").attr("class","bar").attr("x", function(d){
            return x(d.kw1);
        }).attr("y", function(d){
            return y(d.num);
        }).attr("height", function(d){
            return height - y(d.num);
        }).attr("width",x.rangeBand()-3); 
	 
           
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();