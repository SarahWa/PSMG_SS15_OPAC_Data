App.ChartView = (function(){
    var that = {},
       	chartData,
		options,
		chart,
        colorArrayBars = ["#3366cc","#3366cc","#dc3912","#dc3912","#ff9900","#ff9900","#109618","#109618","#990099","#990099","#0099c6","#0099c6","#dd4477","#dd4477"],
    
    init = function (){
		google.load('visualization', '1.1', {'packages':['controls', 'corechart', 'bar']});
		$('#chartContainer').height(750);
	},
		
	_renderSingleChart = function(data) {
		var dashboard = new google.visualization.Dashboard(
            document.getElementById('chartWrapper'));
		console.log(data.data[0].req);
		chartData = new google.visualization.DataTable();
		if (data.data[0].req == "Erscheinungsjahr" && data.data[0].req == "Seitenzahl" ) {
			console.log("juhu Erscheinungsjahr || Seitenzahl");
		chartData.addColumn('number', data.data[0].req);
		programmaticSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'controlContainer',
          'options': {
            'filterColumnLabel': data.data[0].req,
            'ui': {'labelStacking': 'vertical'}
          }
        });
	}
		else {
			chartData.addColumn('string', data.data[0].req);
			programmaticSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'controlContainer',
          'options': {
            'filterColumnLabel': 'Anzahl',
            'ui': {'labelStacking': 'vertical'}
          }
        });
		}
		
		programmaticChart  = new google.visualization.ChartWrapper({
        'chartType': 'ColumnChart',
        'containerId': 'chartContainer',
        'options': {
    	  title: "Anzahl der gefundenen Bücher, unterteilt nach:  "+data.data[0].req,
			hAxis: {
				
			},
			vAxis: {
				title: "Anzahl"
			},
            legend: {
                position: 'none'
            }
        }
      });
		
		/*chartData.addColumn('string', data.data[0].req);*/
		chartData.addColumn('number', "Anzahl");
		
		for (var i = 0; i< data.data[0].num.length; i++) {
			chartData.addRow([data.data[0].num[i].name, data.data[0].num[i].num]);
		}
		
		dashboard.bind(programmaticSlider, programmaticChart);
		dashboard.draw(chartData);
	},
		
	_renderComparedChart = function(data) {
		var title,
            j,
			row = [];
		console.log(data);
		chartData = new google.visualization.DataTable();
		chartData.addColumn('string', data.data[0].req);
		for (var i = 0; i < data.data.length; i++) {
			chartData.addColumn('number', "Anzahl");
		}
		for (var i = 0; i< data.data[0].num.length; i++) {
			j = 0;
			row.push(data.data[0].num[i].name);
			// nur pushen wenn nicht alle 0
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
		chart = new google.visualization.ColumnChart(document.getElementById('chartContainer'));
		chart.draw(chartData, options);
		
	},
    
    _fillQueryBackground = function (){
        $('li.template').each(function (i){
            $(this).css({"background":colorArrayBars[i]});
        });
    },
        
        
    renderChart = function(data)   {
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