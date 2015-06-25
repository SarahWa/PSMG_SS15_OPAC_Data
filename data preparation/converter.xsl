<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="2.0" 
	xmlns:marc="http://www.loc.gov/MARC21/slim"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:output method="xml" indent="yes" />
	
	<xsl:template match="/">
		<bib>
			<xsl:apply-templates select="marc:collection"/>
		</bib>
	</xsl:template>
	
	<xsl:template match="marc:record">
		<book>
			<language>
				<xsl:value-of select="marc:datafield[@tag='101']"/>
			</language>
			
			<title>
				<xsl:value-of select="marc:datafield[@tag='200']/marc:subfield[@code='a']"/>
			</title>
			
			<subtitle>
				<xsl:value-of select="marc:datafield[@tag='200']/marc:subfield[@code='e']"/>
			</subtitle>
			
			<author>
				<xsl:value-of select="marc:datafield[@tag='200']/marc:subfield[@code='g']"/>
			</author>
			
			<publishingplace>
				<xsl:value-of select="marc:datafield[@tag='210']/marc:subfield[@code='a']"/>
			</publishingplace>
			
			<publisher>
				<xsl:value-of select="marc:datafield[@tag='210']/marc:subfield[@code='c']"/>
			</publisher>
			
			<publishingyear>
				<xsl:value-of select="marc:datafield[@tag='210']/marc:subfield[@code='d']"/>
			</publishingyear>
			
			<pages>
				<xsl:value-of select="marc:datafield[@tag='215']/marc:subfield[@code='a']"/>
			</pages>
			
			<ebook>
				<xsl:value-of select="marc:datafield[@tag='200']/marc:subfield[@code='b']"/>
			</ebook>
			
			<tags>
				<xsl:apply-templates select="marc:datafield[@tag='610']/marc:subfield[@code='a']"/>
			</tags>
			
			<signatures>
				<xsl:apply-templates select="marc:datafield[@tag='900']/marc:subfield[@code='d']"/>
			</signatures>
		</book>
	</xsl:template>
	
	<xsl:template match="marc:datafield[@tag='610']/marc:subfield[@code='a']">
			<xsl:value-of select="."/>, </xsl:template>
	
	<xsl:template match="marc:datafield[@tag='900']/marc:subfield[@code='d']">
			<xsl:value-of select="."/>, </xsl:template>

</xsl:stylesheet>