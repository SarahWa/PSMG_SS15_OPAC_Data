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
	
	/* constants */
	var BIB = ["Hochschule", "Zentralbibliothek", "nicht zugeordnet", "Handapparate und andere Standorte", "Lesesaal Wirtschaft", "Lesesaal Philosophicum 1", "Lesesaal Physik", "Lesesaal Philosophicum 2", "Lesesaal Mathematik", "Andere Bibliotheken", "Lesesaal Recht", "Lesesaal Biologie", "Lesesaal Medizin", "Lesesaal Chemie", "andere Kliniken", "Universitaetsklinikum", "Lesesaal Sport" ],
		MEDIUM = ["ebook", "book", "keine Angabe"],
		LANGUAGES = ["ger", "eng", "keine Angabe", "ita", "spa", "dut", "gre", "fre", "rus", "pol", "dan"],
		PUBLISHER = ["springer", "addison-wesley", "vieweg", "oldenbourg", "o'reilly", "hanser", "wiley", "apress", "teubner","galileo press", "dpunkt-verl.","microsoft press", "franzis", "rrzn", "prentice-hall", "mcgraw-hill"];

	
	function getNumberOfMatches(kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib) {
		var resultCounter = 0,
			counter = 0;
		for (var i = 0; i< data.length; i++) {
			if (keywordSearch(kw1, data[i])) {
				counter++;
			}
			if (keywordSearch(kw2, data[i])) {
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
			if (language == "keine Angabe" && data[i].language == "") {
				counter++
			}
			// !!! default needed !!!
			if ((minYear <= data[i].publishingyear && maxYear >= data[i].publishingyear) && data[i].publishingyear != ""){
				counter++;
			}
			if (data[i].publishingyear == "" && minYear == 1940 && maxYear == 2017) {
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
			if (medium == "keine Angabe" && data[i].ebook == "" && data[i].signatures == "") {
				counter++;
			}
			// one of the 4 above
			
			// !!! default needed !!!
			if ((minPages <= data[i].pages && maxPages >= data[i].pages)) {
				counter++;
			}
			
			if (data[i].pages == "" && minPages == 0 && maxPages == 9999) {
				counter++;
			}
			
			if (bib == "" || data[i].signatures.indexOf(bib)>=0) {
				counter++;
			}
			
			if (bib == "nicht zugeordnet" && data[i].signatures == "") {
				counter++;
			}
			
			if (counter >= 10) {
				resultCounter++;	// it's a match
			}
			counter = 0;
			
		}
		return resultCounter;
	}
	
	
	function getMatchesForRequest(request, kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib) {
		var resultArray = [];
		if (request == "Vergleich") {
			var result = {
				// evtl noch ändern
				name: "",
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib)
			}
			resultArray.push(result);
			return resultArray;
		}
		
		if (request == "Sprache") {
			for (var i = 0; i < LANGUAGES.length; i++) {	
			var result = {
				name: LANGUAGES[i],
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, LANGUAGES[i], minYear, maxYear, medium, minPages, maxPages, bib)
			}
			resultArray.push(result);
			}
		return resultArray;
		}
		
		if (request == "Erscheinungsjahr") {
			var maximumYear = 0,
				minimumYear = 0;
			for (var i = minYear; i < maxYear; i++) {	
				maximumYear = i;
				minimumYear = i;
				result = {
				name: ""+minimumYear,
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, language, minimumYear, maximumYear, medium, minPages, maxPages, bib)
			}
			resultArray.push(result);
			}
		return resultArray;
		}
		
		if (request == "Medium") {
			for (var i = 0; i < MEDIUM.length; i++) {	
			var result = {
				name: MEDIUM[i],
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, language, minYear, maxYear, MEDIUM[i], minPages, maxPages, bib)
			}
			resultArray.push(result);
			}
		return resultArray;
		}
		
		if (request == "Seitenzahl") {
			var step=50;
			for (var minPages = 1; minPages <= 1500; minPages += step) {	
				var maxPages = minPages + step;
				if (minPages == 1500) {
					maxPages = 3500;
				}
				result = {
				name: minPages+"-"+maxPages,
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib)
			}
			resultArray.push(result);
			}
		return resultArray;
		}
		
		if (request == "Bibliotheken") {
			for (var i = 0; i < BIB.length; i++) {	
				var result = {
				name: BIB[i],
				num: getNumberOfMatches(kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, BIB[i])
				}
				resultArray.push(result);
			}
			return resultArray;
		}
			if (request == "Verlage") {
				for (var i = 0; i < PUBLISHER.length; i++) {	
					var result = {
					name: PUBLISHER[i],
					num: getNumberOfMatches(kw1, kw2, author, PUBLISHER[i], place, language, minYear, maxYear, medium, minPages, maxPages, bib)
					}
					resultArray.push(result);
				}
				return resultArray;
			}
		
	}
	
	function keywordSearch(keyword, data) {
		if (keyword == "") {
			return true;
		}
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
		server.get("/api/get/*/*/*/*/*/*/*/*/*/*/*/*/*",
			function (req, res) {
			var request = req.params[0],
				kw1 = req.params[1],
				kw2 = req.params[2],
				author = req.params[3],
				publisher = req.params[4],
				place = req.params[5],
				language = req.params[6],
				minYear = req.params[7],	// default!
				maxYear = req.params[8],	// default!
				medium = req.params[9],
				minPages = req.params[10],	// default!
				maxPages = req.params[11],	// default!
				bib = req.params[12];
			res.send({
				req: request,
				kw1: kw1,
				kw2: kw2,
				author: author,
				publisher: publisher,
				place: place,
				language: language,
				year: minYear + " - " + maxYear,
				medium: medium,
				pages: minPages + " - " + maxPages,
				bib: bib,
				num: getMatchesForRequest(request, kw1, kw2, author, publisher, place, language, minYear, maxYear, medium, minPages, maxPages, bib)
			});
		});
		
        server.use(express.static(WWW));
        server.listen(PORT);
    }

    initData();
    start();
}());
