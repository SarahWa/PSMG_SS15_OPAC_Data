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

    /* book data */
    var data;

    /* configuration */
    var PORT = 3333;
    var WWW = path.join(__dirname, "./www/");
    var DATA = path.join(__dirname, "./data/");
    var BOOKS = path.join(DATA, "opac_st.csv");

	
	function getNumberOfMatches(kw1, kw2, kw3, kw4, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib) {
		var resultCounter = 0,
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
			if (author == "" || data[i].author.indexOf(author)>=0) {
				counter++;
			}
			if (publisher == "" || data[i].publisher.indexOf(publisher)>=0) {
				counter++;
			}
			if (place == "" || data[i].publishingplace.indexOf(place)>=0) {
				counter++;
			}
			if (language == "" || data[i].language.indexOf(language)>=0){
				counter++;
			}
			// !!! default needed !!!
			if ((minYear <= data[i].publishingyear && maxYear >= data[i].publishingyear)){
				counter++;
			}
			if (data[i].publishingyear == "" && minYear == 0 && maxYear == 2016) {
				counter++;
			}
			
			// only one of the following can happen
			if (medium == "") {
				counter++;
			}
			if (medium == "ebook" && data[i].ebook != "") {
				counter++;
			}
			if (medium == "book" && data[i].signatures != "" ) {
				counter++;
			}
			// one of the 3 above
			
			// !!! default needed !!!
			if ((minPages <= data[i].pages && maxPages >= data[i].pages) || data[i].pages == "") {
				counter++;
			}
			
			if (bib == "" || data[i].signatures.indexOf(bib)>=0) {
				counter++;
			}
			
			if (counter >= 12) {	
				resultCounter++;			// it's a match
			}
			counter = 0;
			
		}
		return resultCounter;
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
			console.log("data loaded");
        });
        fileStream.pipe(csvConverter);
    }

    /**
     * starts serving a static web site from ./www
     * starts routing api requests from /api/get/
     */
    function start() {
        server.use(cors());
		
		server.get("/api/get/byKeyword/*/*/*/*/*/*/*/*/*/*/*/*/*/*", function (req, res) {
			var kw1 = req.params[0],
				kw2 = req.params[1],
				kw3 = req.params[2],
				kw4 = req.params[3],
				author = req.params[4],
				publisher = req.params[5],
				place = req.params[6],
				language = req.params[7],
				minYear = req.params[8],	// default!
				maxYear = req.params[9],	// default!
				medium = req.params[10],
				minPages = req.params[11],	// default!
				maxPages = req.params[12],	// default!
				bib = req.params[13];
			res.send({
				kw1: kw1,
				kw2: kw2,
				kw3: kw3,
				kw4: kw4,
				author: author,
				publisher: publisher,
				place: place,
				language: language,
				year: minYear + " - " + maxYear,
				medium: medium,
				pages: minPages + " - " + maxPages,
				bib: bib,
				num: getNumberOfMatches(kw1, kw2, kw3, kw4, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib)
			});
		});
		
        server.use(express.static(WWW));
        server.listen(PORT);
    }

    initData();
    start();
}());
