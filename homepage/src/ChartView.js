App.ChartView = (function(){
    var that = {},
        chartView,
        margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        },
        
        width = 960 - margin.left - margin.right,//breite und höhe für graph
        height = 500 - margin.top - margin.bottom, //dimensionen wichhtig für visualisierung zb für breite eines balkens

    
    
    init = function (newChartView){
        chartView = newChartView;
    },
        
        
     renderChart= function(data)   {//visualisieren mit d3
        var y = d3.scale.linear().range([height,0]),//funktion die daten/kundenzahl auf y achse mapt //range wertebereich
            
            x = d3.scale.ordinal().rangeRoundBands([0,width]),
            
            xAxis = d3.svg.axis().scale(x).orient("bottom"),
            
            yAxis = d3.svg.axis().scale(y).orient("left"),
            
            chart = d3.select(chartView).attr("width",width + margin.left+ margin.right).attr("height",height+margin.bottom+margin.top);
        
       /*x.domain(data.map(function(d){
            return d.day;
        }));
        
        
        y.domain([0, d3.max(data, function (d){//d3.max--> sucht maximalen wert aus array
            return d.customers;
        })]);
        
        chart.append("g").attr("class", "x axis").attr("transform", "translate(0,"+height+")").call(xAxis);
        
        chart.append("g").attr('class','y axis').call(yAxis);
        
        chart.selectAll(".bar").data(data).enter().append("rect").attr("class","bar").attr("x", function(d){
            return x(d.day);
        }).attr("y", function(d){
            return y(d.customers);
        }).attr("height", function(d){
            return height - y(d.customers);
        }).attr("width",x.rangeBand()-3).on("mouseover",function(d){
            console.log(d);
        });
        
        */
        
           
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();