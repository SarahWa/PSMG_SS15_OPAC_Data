<?xml version="1.0" encoding="UTF-8" ?>
<!-- nur eventuell zu verwenden!! -->
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
			<!--<xsl:if test="marc:datafield[@tag='610']/marc:subfield[@code='a']">	-->
				<id>
					<xsl:value-of select="marc:controlfield"/>
				</id>
				<tags>
					<xsl:apply-templates select="marc:datafield[@tag='610']/marc:subfield[@code='a']"/>
				</tags>
			<!--</xsl:if>-->
		</book>
	</xsl:template>
	
	<xsl:template match="marc:datafield[@tag='610']/marc:subfield[@code='a']">
			<xsl:value-of select="."/>&#160;
	</xsl:template>
</xsl:stylesheet>