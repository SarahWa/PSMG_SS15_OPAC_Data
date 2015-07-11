App.ChartView = (function(){
    var that = {},
		options,
    
    init = function (){
		$('#chartContainer').height(600);
	},
		
	_getDataForSingleCharts = function (data) {
		var categoryArray = [],
			seriesArray = [];
		console.log(data);
		categoryArray.push(null);
		seriesArray.push("Anzahl");
		for(var i = 0; i < data.length; i++) {
			categoryArray.push(data[i].name);
			seriesArray.push(data[i].num);
		}
		
		return [categoryArray , seriesArray];
	},
		
	_getDataForComparedCharts = function (data) {
		var categoryArray = [],
			resultArray = [],
			seriesArray = [],
			j=0;
		console.log(data);
		categoryArray.push(null);
		for (var i = 0; i < data[0].num.length; i++) {
			categoryArray.push(data[0].num[i].name);
		}
		resultArray.push(categoryArray);
		for(var i = 0; i < data.length; i++) {
			seriesArray.push(data[i].kw1);					// _getLegend(data[i])
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
		var chart1 = new Highcharts.Chart(options);
		//console.log(chart1.options.colors);
	},
		
	_showComparedLineChart= function (data, req) {
		//console.log(dataArray);
		options.title.text = 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req;
		options.chart.type = 'line';
		options.legend.enabled = true;
		options.data.columns = _getDataForComparedCharts(data);
		var chart1 = new Highcharts.Chart(options);
	},
		
	_showComparedColumnChart = function (data, req) {
		options.title.text = 'Anzahl der gefundenen Ressourcen aufgeteilt nach '+req;
		options.chart.type = 'column';
		options.legend.enabled = true;
		options.data.columns = _getDataForComparedCharts(data);
		var chart1 = new Highcharts.Chart(options);
	},
    
    _fillQueryBackground = function (){
        /*$('li.template').each(function (i){
            $(this).css({"background":colorArrayBars[i]});
        });*/
    },
        
    _legende = function(){
      /* $("#data-one").css({"color":colorArrayBars[0],"font-weight":"bold"});
       $("#data-two").css({"color":colorArrayBars[2],"font-weight":"bold"}); 
       $("#data-three").css({"color":colorArrayBars[4],"font-weight":"bold"}); */   
    },
        
        
    renderChart = function(data)   {
		if(data.length <=1) {
			_showSingleColumnChart(data[0].num, data[0].req);
			if(data[0].req == "Sprache") {
				options.chart.type = 'pie';
				options.legend.enabled = true;
				options.data.columns = _getDataForSingleCharts(data[0].num);
				options.tooltip.pointFormat = '{series.name}: <b>{point.y} </b> <b>({point.percentage:.1f}%)</b>';
				var chart1 = new Highcharts.Chart(options);
			}
		}
		else {
			if (data[0].req == "Erscheinungsjahr" || data[0].req == "Seitenzahl"){
				_showComparedLineChart(data, data[0].req);
			}
			else {
				_showComparedColumnChart(data, data[0].req);
			}
		}
			_fillQueryBackground();
			_legende();
		
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();