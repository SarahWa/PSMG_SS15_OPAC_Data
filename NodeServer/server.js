(function () {
    "use strict";
    /* eslint-env node */

    /* required node modules */
    var express = require("express");
    var path = require("path");
    var fs = require("fs");
    var cors = require("cors");
    var csvtojson = require("csvtojson");

    /* http server */
    var server = express();

    /* mensa data */
    var data;

    /* configuration */
    var PORT = 3333;
    var WWW = path.join(__dirname, "./www/");
    var DATA = path.join(__dirname, "./data/");
    var BOOKS = path.join(DATA, "book.csv");

    /**
     * returns the meal served on a given day
     */
    function getDataByYear(year) {
      	var result = [];
		for (var i = 0; i< data.length; i++) {
			if (data[i].publishingyear == year) {
				result.push(data[i]);
			}
		}
		return result;
    }
	
	function getSignatures() {
		var result = [];
		for (var i = 0; i< data.length; i++) {
			result.push(data[i].signature)
		}
		return result;
	}
	
	function getDataByKeyword(kw1, kw2, kw3, kw4, author, publisher, place) {
		var result = [],
			counter = 0;
		for (var i = 0; i< data.length; i++) {
			if (keywordSearch(kw1, data[i])) {
				counter++;
			}
			if (keywordSearch(kw2, data[i])) {
				counter++;
			}
			if (keywordSearch(kw3, data[i])) {
				counter++;
			}
			if (keywordSearch(kw4, data[i])) {
				counter++;
			}
			if (data[i].author.indexOf(author)>=0 || author == "") {
				counter++;
			}
			if (data[i].publisher.indexOf(publisher)>=0 || publisher == "") {
				counter++;
			}
			if (data[i].publishingplace.indexOf(place)>=0 || place == "") {
				counter++;
			}
			
			if (counter == 7) {	
				result.push(data[i]);
			}
			counter = 0;
			
		}
		return result;
	}
	
	function keywordSearch(keyword, data) {
		if (keyword == "") {
			return true;
		}
		keyword = keyword.toLowerCase();
		if (data.title.indexOf(keyword) >= 0 || data.subtitle.indexOf(keyword)>=0 || data.tags.indexOf(keyword) >=0) {
			return true;
		}
		return false;
	}
	
	// for analysis
	function getLanguages() {
		var result = [];
		
		for (var i = 0; i< data.length; i++) {
			if (result.indexOf(data[i].language) < 0 ) {
				result.push(data[i].language);
			}		
			
		}
		return result;
	}

    /**
     * loads the csv formatted data 
     */
    function initData() {
        var Converter = csvtojson.core.Converter,
            fileStream = fs.createReadStream(BOOKS),
            csvConverter = new Converter({
                constructResult: true
            });
        csvConverter.on("end_parsed", function (jsonArray) {
            data = jsonArray;
			for (var i = 0; i < data.length; i++) {
				data[i].title = data[i].title.toLowerCase();
				data[i].subtitle = data[i].subtitle.toLowerCase();
				data[i].tags = data[i].tags.toLowerCase();
            }
			console.log("json fertig");
        });
        fileStream.pipe(csvConverter);
    }

    /**
     * starts serving a static web site from ./www
     * starts routing api requests from /api/get/
     */
    function start() {
        server.use(cors());
        /*server.get("/api/get/customers", function (req, res) {
            res.sendFile(CUSTOMERS);
        });
        server.get("/api/get/meals/*", function (req, res) {
            var requestedDay = req.params[0];
            res.send({
                day: requestedDay,
                meal: getMealForDay(requestedDay)
            });
        });*/
		server.get("/api/get/year/*", function (req, res) {
			var requestedYear = req.params[0];
			res.send({
				year: requestedYear,
				booktitle: getDataByYear(requestedYear)
			});
		});
		server.get("/api/get/allsignatures", function (req, res) {
			res.send({
				signatures: getSignatures()
			});
		});
		server.get("/api/get/byKeyword/*/*/*/*/*/*/*", function (req, res) {
			var kw1 = req.params[0],
				kw2 = req.params[1],
				kw3 = req.params[2],
				kw4 = req.params[3],
				author = req.params[4],
				publisher = req.params[5],
				place = req.params[6];
			res.send({
				data: getDataByKeyword(kw1, kw2, kw3, kw4, author, publisher, place)
			});
		});
		//for analysis
		server.get("/api/get/languages", function (req, res) {
			res.send({
				languages: getLanguages()
			});
		});
		
        server.use(express.static(WWW));
        server.listen(PORT);
    }

    initData();
    start();
}());
