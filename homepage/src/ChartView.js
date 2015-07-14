App.ChartView = (function(){
    var that = {},
		options,
		chart1,
    
    init = function (){
		$('#chartContainer').height(600);
	},
		
	_getDataForSingleCharts = function (data) {
		var categoryArray = [],
			seriesArray = [];
		categoryArray.push(null);
		seriesArray.push("Anzahl");
		if (data.length == 1) {
			categoryArray.push("Alle Ressourcen");
			seriesArray.push(data[0].num);
		}
		else {
			for(var i = 0; i < data.length; i++) {
				categoryArray.push(data[i].name);
				seriesArray.push(data[i].num);
			}
		}
		return [categoryArray , seriesArray];
	},
		
	_getLegendString = function (data) {
		var resultString = "";
		if (data.kw1 != "") {
			resultString += data.kw1 + " ";
		}
		if (data.kw2 != "") {
			resultString += data.kw2 + " ";
		}
		if (data.language != "") {
			resultString += data.language + " ";
		}
		if (data.medium != "") {
			resultString += data.medium + " ";
		}
		if (data.place != "") {
			resultString += data.kw2 + " ";
		}
		if (data.publisher != "") {
			resultString += data.publisher + " ";
		}
		if (data.author != "") {
			resultString += data.author;
		}
		return resultString;
	},
		
	_getDataForComparedCharts = function (data) {
		var categoryArray = [],
			resultArray = [],
			seriesArray = [],
			j=0;
		categoryArray.push(null);
		for (var i = 0; i < data[0].num.length; i++) {
			categoryArray.push(data[0].num[i].name);
		}
		resultArray.push(categoryArray);
		for(var i = 0; i < data.length; i++) {
			seriesArray.push(_getLegendString(data[i]));					
			j=0;
			while (j<data[i].num.length) {
				seriesArray.push(data[i].num[j].num);
				j++;
			}
			resultArray.push(seriesArray);
			seriesArray = [];
		}
		
		return resultArray;
	},
	
	_showSingleColumnChart = function(data, req) {
		var dataArray = _getDataForSingleCharts(data);
		
		options = {
			chart: {
				renderTo: 'chartContainer',
				type: 'column',
				zoomType: 'x'
			},

			title: {
				text: 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req
			},
			data: {
				columns: dataArray
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Anzahl an Ressourcen'
				}
			},
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
  			},
			plotOptions: {
				pie: {
					showInLegend: true,
					allowPointSelect: true,
					dataLabels: {
						enabled: false,
					}
            	}
       		},
			
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y} </b>'
			}
    	};
		chart1 = new Highcharts.Chart(options);
	},
		
	_showSinglePieChart = function (data, req) {
		options.chart.type = 'pie';
		options.title.text = 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req;
		options.legend.enabled = true;
		options.data.columns = _getDataForSingleCharts(data);
		console.log(options.data.columns);
		options.tooltip.pointFormat = '{series.name}: <br> <b>{point.y} </b> <b>({point.percentage:.1f}%)</b>';
		chart1 = new Highcharts.Chart(options);
	},
		
	_showComparedAreaChart= function (data, req) {
		options.title.text = 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req;
		options.chart.type = 'area';
		options.legend.enabled = true;
		options.tooltip.crosshairs = [true];
		options.tooltip = {
    		crosshairs: true,
    		shared: true,
    		headerFormat: '{point.key}<table>',
    		pointFormat: '<tr><td style=\"color: {series.color}\">{series.name}: <b></td><td>{point.y} </b></td></tr>',
			useHTML: true,
    		footerFormat: '</table>',
		},
		options.data.columns = _getDataForComparedCharts(data);
		chart1 = new Highcharts.Chart(options);
	},
		
	_showComparedColumnChart = function (data, req) {
		options.title.text = 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req;
		options.chart.type = 'column';
		options.legend.enabled = true;
		options.tooltip.pointFormat = '{series.name}: <b>{point.y} </b>'
		options.data.columns = _getDataForComparedCharts(data);
		chart1 = new Highcharts.Chart(options);
	},
		
	_showInfo = function (chartType) {
		$("#chartWrapper .info").addClass('hide');
		switch (chartType) {
			case "pie":
				$("#info-text-pie").removeClass('hide');
				break;
			case "column":
				$("#info-text-column").removeClass('hide');
				break;
			case "area":
				$("#info-text-area").removeClass('hide');
				break;
		}
	},
		
	/*updateLanguageChart = function () {
		for (var i = 0; i<= 2; i++) {
			chart1.series[0].points[i].setVisible(false);
		}
	},*/
         
        
    renderChart = function(data)   {
		if(data.length <=1) {
			if(data[0].req == "Sprache" || data[0].req == "Medium" || data[0].req == "Verlage") {
				_showSinglePieChart(data[0].num, data[0].req);
				_showInfo("pie");
			}
			else {
				_showSingleColumnChart(data[0].num, data[0].req);
				_showInfo("column");
			}
		}
		else {
			if (data[0].req == "Erscheinungsjahr" || data[0].req == "Seitenzahl"){
				_showComparedAreaChart(data, data[0].req);
				_showInfo("area");
			}
			else {
				_showComparedColumnChart(data, data[0].req);
				_showInfo("column");
			}
		}
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
	that.updataLanguageChart = updateLanguageChart;
    

   return that; 
})();