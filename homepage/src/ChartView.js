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
		
	_renderChart = function(data, dataLength) {
		var title,
            j,
			row = [],
			dashboard = new google.visualization.Dashboard(
            document.getElementById('chartWrapper'));
		console.log(data.data[0].req);
		chartData = new google.visualization.DataTable();
		chartData.addColumn('string', data.data[0].req);
		programmaticSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'controlContainer',
          'options': {
            'filterColumnLabel': 'Anzahl',
            'ui': {'labelStacking': 'vertical'}
          }
        });
		
		if (dataLength <= 1) {
		/*chartData.addColumn('string', data.data[0].req);*/
			chartData.addColumn('number', "Anzahl");
			for (var i = 0; i< data.data[0].num.length; i++) {
				chartData.addRow([data.data[0].num[i].name, data.data[0].num[i].num]);
			}
            if(data.data[0].req!="Sprache"){
			programmaticChart  = new google.visualization.ChartWrapper({'chartType': 'ColumnChart',
				'containerId': 'chartContainer',
				'options': {
				  title: "Anzahl der gefundenen Ressourcen, unterteilt nach:  "+data.data[0].req,
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
            }else{
                programmaticChart  = new google.visualization.ChartWrapper({'chartType': 'PieChart',
				'containerId': 'chartContainer',
				'options': {
				  title: "Anzahl der gefundenen Ressourcen, unterteilt nach:  "+data.data[0].req,
					hAxis: {

					},
					vAxis: {
						title: "Anzahl"
					}
					
				}
                                                                            });
            }
		}
		else {
			for (var i = 0; i < data.data.length; i++) {
			chartData.addColumn('number', "Anzahl");
		}
		for (var i = 0; i< data.data[0].num.length; i++) {
			j = 0;
			row.push(data.data[0].num[i].name);
			while (j<data.data.length) {
				row.push(data.data[j].num[i].num);
				j++;
			}
			chartData.addRow(row);
			row = [];
		}
        title = data.data[0].req;
        if(title =="Stichwort"){
            title = ""
        }
		programmaticChart  = new google.visualization.ChartWrapper({'chartType': 'ColumnChart',
        'containerId': 'chartContainer',
        'options': {
    	  title: "Vergleich der jeweils gefundenen Ressourcen, unterteilt nach: Filteranfrage, "+title,
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
		}
		//chartData.getSortedRows({column: 1, desc: true});
		
		dashboard.bind(programmaticSlider, programmaticChart);
		dashboard.draw(chartData);
	},
    
    _fillQueryBackground = function (){
        $('li.template').each(function (i){
            $(this).css({"background":colorArrayBars[i]});
        });
    },
        
    _legende = function(){
       $("#data-one").css({"color":colorArrayBars[0],"font-weight":"bold"});
       $("#data-two").css({"color":colorArrayBars[2],"font-weight":"bold"}); 
       $("#data-three").css({"color":colorArrayBars[4],"font-weight":"bold"});    
    },
        
        
    renderChart = function(data)   {
		_renderChart(data, data.data.length);
        _fillQueryBackground();
        _legende();
		
    };
    
    
    
    
    that.init = init;
    that.renderChart= renderChart;
    

   return that; 
})();