App.DataFetcher = (function(){
    var that = {},
        responseDataArray=[],
        length=0,
    
    
    init = function (){
        var input= [{req: "Bibliotheken", kw1: "", kw2: "", author: "", publisher: "", yearMin: "", yearMax: "", pagesMin: "", pagesMax: "", place: "", language: "", medium: "", stat : "",}],
			data = {
				data: input
			};
		getData(data);	
    },
		
    getData = function(data){
        var url="",
            minYear=1940,
            maxYear=2017,
            minPage=0,
            maxPage=9999;
        
        length = data.data.length;
        
        for(var i=0;i<length;i++){
            
            if(data.data[i].yearMin!=""){
                minYear=data.data[i].yearMin;
            }
            if(data.data[i].yearMax!=""){
                maxYear=data.data[i].yearMax;
            }
            if(data.data[i].pagesMin!=""){
                minPage=data.data[i].pagesMin;
            }
            if(data.data[i].pagesMax!=""){
                maxPage=data.data[i].pagesMax;
            }
            
            
        url = "http://localhost:3333/api/get/"+data.data[i].req+"/"+data.data[i].kw1+"/"+data.data[i].kw2+"/"+data.data[i].author+"/"+data.data[i].publisher+"/"+data.data[i].place+"/"+data.data[i].language+"/"+minYear+"/"+maxYear+"/"+data.data[i].medium+"/"+minPage+"/"+maxPage+"/"+data.data[i].stat+"/";
            $.ajax({
                url: url,
                type: "GET",
                contentType: "text/javascript",
                success: _serverResponse
            });
 
        }
    },
        
    _serverResponse = function(data) {
		responseDataArray.push(data);
        if(responseDataArray.length==length){
            response =  {
                data: responseDataArray
            }
            $('body').trigger('serverResponse',response);
			responseDataArray=[];
        }
    };

    that.init = init;
    that.getData = getData;
    
    

   return that; 
})();