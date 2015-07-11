App.ChartView = (function(){
    var that = {},
		options,
    
    init = function (){
		$('#chartContainer').height(600);
	},
		
	_getDataForSingleCharts = function (data) {
		var categoryArray = [],
			seriesArray = [];
		categoryArray.push(null);
		seriesArray.push("Anzahl");
		for(var i = 0; i < data.length; i++) {
			categoryArray.push(data[i].name);
			seriesArray.push(data[i].num);
		}
		
		return [categoryArray , seriesArray];
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
		console.log(chart1.options.colors);
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
		_showSingleColumnChart(data.data[0].num, data.data[0].req);
		if(data.data[0].req == "Sprache") {
        	options.chart.type = 'pie';
			options.legend.enabled = true;
			options.data.columns = _getDataForSingleCharts(data.data[0].num);
			options.tooltip.pointFormat = '{series.name}: <b>{point.y} </b> <b>({point.percentage:.1f}%)</b>';
        	var chart1 = new Highcharts.Chart(options);
		}
        _fillQueryBackground();
        _legende();
		
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();