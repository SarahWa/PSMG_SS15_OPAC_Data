App.ChartView = (function(){
    var that = {},
       	chartData,
		options,
		chart,
        colorArrayBars = ["#3366cc","#3366cc","#dc3912","#dc3912","#ff9900","#ff9900","#109618","#109618","#990099","#990099","#0099c6","#0099c6","#dd4477","#dd4477"],
    
    init = function (){
		google.load('visualization', '1.0', {'packages':['corechart', 'bar']});
		$('#chartContainer').height(800);
		//google.setOnLoadCallback(drawChart);
		//chartView = document.querySelector('.chart');
	},
		
	_renderSingleChart = function(data) {
		chartData = new google.visualization.DataTable();
		chartData.addColumn('string', data.data[0].req);
		chartData.addColumn('number', "Anzahl");
		
		for (var i = 0; i< data.data[0].num.length; i++) {
			chartData.addRow([data.data[0].num[i].name, data.data[0].num[i].num]);
		}
		
		options = {
            title: "Anzahl der gefundenen Bücher, unterteilt nach:  "+data.data[0].req,
			hAxis: {
				
			},
			vAxis: {
				title: "Anzahl"
			},
            legend: {
                position: 'none'
            }
		};
		console.log("Data", chartData);
		chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
		chart.draw(chartData, options);
		console.log("Chart", chart);
		
		/*dataArray.push([data.data[0].req, ""]);
		for (var i = 0; i < data.data.length; i++) {
			for(var j = 0; j < data.data[i].num.length; j++){
				dataArray.push([data.data[i].num[j].name, data.data[i].num[j].num]);
			}
		}
	
		
		console.log("chartData",data);
		chartData  = new google.visualization.arrayToDataTable(dataArray);
		options = {
			hAxis: {
				title: 'Anzahl',
				minValue: 0
			}
		};
		material = new google.charts.Bar(document.getElementById('chartContainer'));
		material.draw(chartData, options);*/
	},
		
	_renderComparedChart = function(data) {
		var title,
            j,
			row = [];
		chartData = new google.visualization.DataTable();
		chartData.addColumn('string', data.data[0].req);
		for (var i = 0; i < data.data.length; i++) {
			chartData.addColumn('number', "Anzahl");
			console.log(i);
		}
		for (var i = 0; i< data.data[0].num.length; i++) {
			j = 0;
			row.push(data.data[0].num[i].name);
			while (j<data.data.length) {
				row.push(data.data[j].num[i].num);
				j++;
			}
			console.log(row);
			chartData.addRow(row);
			row = [];
		}
        title = data.data[0].req;
        if(title =="Stichwort"){
            title = ""
        }
		options = {
            title: "Vergleich der jeweils gefundenen Bücher, unterteilt nach: Filteranfrage, "+title,
			hAxis: {
				
			},
			vAxis: {
				title: "Anzahl"
			},
            legend: {
                position: 'none'
            }
		};
		console.log("Data", chartData);
		chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
		chart.draw(chartData, options);
		
	},
    
    _fillQueryBackground = function (){
        $('li.template').each(function (i){
            $(this).css({"background":colorArrayBars[i]});
        });
    },
        
        
    renderChart = function(data)   {//visualisieren mit google chart
		if (data.data.length <= 1) {
			_renderSingleChart(data);
		}
		else {
			_renderComparedChart(data);
		}
        _fillQueryBackground();
		
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();