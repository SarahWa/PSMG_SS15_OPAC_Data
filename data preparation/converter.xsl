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
			
			<xsl:apply-templates select="marc:datafield[@tag='010']/marc:subfield[@code='a']"/> <!-- one or more ISBN -->
			
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
			<cdrom>
				<xsl:value-of select="marc:datafield[@tag='215']/marc:subfield[@code='e']"/>
			</cdrom>
			<series>
				<xsl:value-of select="marc:datafield[@tag='225']/marc:subfield[@code='a']"/>
			</series>
			<index>
				<xsl:value-of select="marc:datafield[@tag='300']/marc:subfield[@code='a']"/>
			</index>
			
			<xsl:apply-templates select="marc:datafield[@tag='610']/marc:subfield[@code='a']"/> <!-- one or more tags -->

			<xsl:apply-templates select="marc:datafield[@tag='856']/marc:subfield[@code='u']"/> <!-- one or more homepages with full text -->

			<signature>
				<xsl:value-of select="marc:datafield[@tag='900']/marc:subfield[@code='d']"/>
			</signature>

		</book>
	</xsl:template>

	<xsl:template match="marc:datafield[@tag='010']/marc:subfield[@code='a']">
		<isbn>
			<xsl:value-of select="."/>
		</isbn>
	</xsl:template>

	<xsl:template match="marc:datafield[@tag='610']/marc:subfield[@code='a']">
		<tag>
			<xsl:value-of select="."/>
		</tag>
	</xsl:template>

	<xsl:template match="marc:datafield[@tag='856']/marc:subfield[@code='u']">
		<fulltext>
			<xsl:value-of select="."/>
		</fulltext>
	</xsl:template>

</xsl:stylesheet>