Anleitung:
	- Saxon (9HE) installieren, Sourcefile und XSL-File in den Ordner Saxon kopieren
	- Über Kommandozeile in den Saxon-Ordner navigieren
	- Saxon Commandline:
		java -cp saxon9he.jar net.sf.saxon.Transform -t -tree:tinyc -s:st.xml -xsl:converter.xsl -o:out.xml

		-> -s: sourcefile
		-> -xsl: xsl-script
		-> -o: output xml file
		(-> -tree:tinyc = tiny condensed (braucht weniger Speicher))
	- Auch wenn tiny condensed weniger Speicher braucht, musste ich meine Datei einmal splitten (st1.xml und st2.xml, jeweils konvertieren und danach wieder zusammenfügen

