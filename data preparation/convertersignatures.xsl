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
		<xsl:if test="marc:datafield[@tag='900']/marc:subfield[@code='d']">	
			<book>
			<!-- alternativ: id als variable und jeweils id und 1 signatur als zeile-->
				
				<id>
					<xsl:value-of select="marc:controlfield"/>
				</id>
				<xsl:apply-templates select="marc:datafield[@tag='900']/marc:subfield[@code='d']"/>
			
			</book>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="marc:datafield[@tag='900']/marc:subfield[@code='d']">
		<sig>
			<xsl:value-of select="."/>
		</sig>
	</xsl:template>
</xsl:stylesheet>