Anleitung:
- Saxon (9HE) installieren, Sourcefile und XSL-File in den Ordner Saxon kopieren
- Über Kommandozeile in den Saxon-Ordner navigieren
- Saxon Commandline:
	java -cp saxon9he.jar net.sf.saxon.Transform -t -tree:tinyc -s:st1.xml -xsl:converter.xsl -o:out.xml

		-> -s: sourcefile
		-> -xsl: xsl-script
		-> -o: output xml file
		(-> -tree:tinyc = tiny condensed (braucht weniger Speicher))
- Auch wenn tiny condensed weniger Speicher braucht, musste ich meine Datei einmal splitten (st1.xml und st2.xml)


Intern:
	Probleme:
	- Ich weiß noch nicht wie wir es in den Griff bekommen mit unterschiedlich vielen tags (wird blöd bei der 		Überführung in csv oder mysql)
	- Wenn sachen gar nicht oder mehrmals vorkommen, wird noch kein leerer tag erzeugt sondern gar keiner (wenn 	sie keinmal oder einmal vorkommen gehts, da dann kein template)

	mögliche Lösung für beides:
	Ich könnte es schachteln.. also z.B. einen tag "Stichworte" der dann die ganzen tags "Stichwort" enthält -> würde aber wohl dann nicht in eine Tabelle gehen!? wär geil wenns als relationelle datenbank gehen würd :) evtl. kann das ja mysql sogar...
