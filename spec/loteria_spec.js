var heredoc = require('heredoc');
var LoteriaModel = require('../lib/parsers/loteria/loteria');

var html = heredoc(function() {
 /*
 <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns="http://www.w3.org/TR/REC-html40">
 <title>Loteria Nacional de Beneficencia</title>
 <link href="css/loteria.css" rel="stylesheet" type="text/css" />
 <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
 </head>

 <body>
 <table width="895" align="center" bgcolor="#FFFFFF">
 	
 	<form action="numerosjugados.php">
 	<tr>
 		<td>
 		
 <table width="760" height="427" border="0" align="center" cellpadding="0" cellspacing="0">
   <!--DWLayoutTable-->
  
   <tr>
     <td height="91" align="center" valign="middle">
 		<table width="585" height="67" border="2">
 			<tr>
 				<td colspan="7" bgcolor="#663300" align="center">
 					<table width="100%" border="0" cellpadding="0" cellspacing="0">
 						<tr>
 							<td width="8%" height="29" background="imagenes/esq_izq_trans.gif"></td>
 							<td width="80%" background="imagenes/centro_trans.gif">
 								 <p class="MsoTitle" align="center">
 									<span lang="ES">
 										<font size="3" color="#FFFFFF">
 											<strong>CONSULTA</strong>
 										</font>
 									</span>
 							  </p>	  
 							</td>
 							<td width="8%" height="29" background="imagenes/esq_der_trans.gif"></td>
 						</tr>
 					</table>	
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<font face="Verdana, Arial, Helvetica, sans-serif" size="1">
 						Tipo de Sorteo
 					</font>
 				</td>
 				<td>
 					<select name="tiposorteo" size="1" style="color: #800000; font-size: 10 px; font-weight: bold; border-style: outset; border-width: medium">
 						<option value="T">Todos</option>
 						<option value="D">Dominical</option>
 						<option value="I">Intermedio</option>
 						<option value="Z">Zodiaco</option>
 						<option value="E">Extraordinaria</option>
 					</select>
 				</td>
 				<td>
 					<font face="Verdana, Arial, Helvetica, sans-serif" size="1">
 						A&ntilde;o
 					</font>
 				</td>
 				<td>
 				<select name="ano" size="1" style="color: #800000; font-size: 10 px; font-weight: bold">
 					<option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>				  </select>
 				</td>
 				<td>
 					<font face="Verdana, Arial, Helvetica, sans-serif" size="1">
 						Mes
 					</font>
 				</td>
 								<td>
 					<? $mes = date("m");?>
 					<select name="meses" size="1" style="color: #800000; font-size: 10 px; font-weight: bold; border-style: outset; border-width: medium">
 						<option value="09">Septiembre</option>
 						<option value=" "> </option>
 						<option value="01">Enero</option>
 						<option value="02">Febrero</option>
 						<option value="03">Marzo</option>
 						<option value="04">Abril</option>
 						<option value="05">Mayo</option>
 						<option value="06">Junio</option>
 						<option value="07">Julio</option>
 						<option value="08">Agosto</option>
 						<option value="09">Septiembre</option>
 						<option value="10">Octubre</option>
 						<option value="11">Noviembre</option>
 						<option value="12">Diciembre</option>
 					</select>
 				</td>
 				<td>
 					<input name="Consultar" type="submit" value="consulta">
 				</td>
 			</tr>
 	  </table>	</td>
   </tr>
   
   <tr>
   	<td colspan="7">
 	  <table BORDER="1" CELLSPACING="2" BORDERCOLOR="#008000" CELLPADDING="4" WIDTH="714">
 		<tr>
 			<td colspan="13" bgcolor="#ffffff" align="center">
 					<table width="100%" border="0" cellpadding="0" cellspacing="0">
 						<tr>
 							<td width="8%" height="29" background="imagenes/esq_izq_azul.gif"></td>
 							<td width="86%" background="imagenes/centro_azul.gif">
 				  <p class="MsoTitle" align="center">
 									<span lang="ES">
 										<font size="3" color="#FFFFFF">
 											<strong>
 											Septiembre											</strong>
 										</font>
 									</span>
 							  </p>	  
 							</td>
 						  <td width="6%" height="29" background="imagenes/esq_der_azul.gif"></td>
 					  </tr>
 					</table>	
 			</td>
 		</tr>
 	  	<tr>
 			<td width="86" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Tipo de sorteo</font></strong></div></td>
 			<td width="66" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Fecha</font></strong></div></td>
 			<td width="68" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Primer Premio</font></strong></div></td>
 			<td width="48" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Letras</font></strong></div></td>
 			<td width="39" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Serie</font></strong></div></td>
 			<td width="38" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Folio</font></strong></div></td>
 			<!-- Si es gordito -->
 							<td width="62" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Rep. Folio</font></strong></div></td>
 					
 			<td width="107" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Segundo Premio</font></strong></div></td>
 							<td width="39" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Serie</font></strong></div></td>
 				<td width="38" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Folio</font></strong></div></td>
 			
 			<td width="88" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Tercer Premio</font></strong></div></td>
 						<td width="39" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Serie</font></strong></div></td>
 			<td width="38" bgcolor="#FFFFFF" background="imagenes/img_fondo_verde.gif"><div align="center" class="style1"><strong><font size="3" color="#FFFFFF">Folio</font></strong></div></td>
 					</tr>
 		 				<tr bgcolor="#EAEAEA">
 										<td align="center"><span class="style1"><font size="2"><strong>Dominical</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>01-09-2013</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>0677</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>DDBC</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>4</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>13</strong></font></span></td>
 					<!-- Si es gordito -->
 											<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 										<td align="center"><span class="style1"><font size="2"><strong>7260</strong></font></span></td>
 												<td align="center"><span class="style1"><font size="2"><strong>8783</strong></font></span></td>
 							<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 										<td align="center"><span class="style1"><font size="2"><strong>8783</strong></font></span></td>
 												<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 							<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 					
 				</tr>
 							<tr bgcolor="#FFFFFF">
 										<td align="center"><span class="style1"><font size="2"><strong>Intermedio</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>04-09-2013</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>1580</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>DBCB</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>13</strong></font></span></td>
 					<td align="center"><span class="style1"><font size="2"><strong>7</strong></font></span></td>
 					<!-- Si es gordito -->
 											<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 										<td align="center"><span class="style1"><font size="2"><strong>0879</strong></font></span></td>
 												<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 							<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 										<td align="center"><span class="style1"><font size="2"><strong>5778</strong></font></span></td>
 												<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 							<td align="center"><span class="style1"><font size="2"><strong></strong></font></span></td>
 					
 				</tr>
 				  </table>	
 	</form>
  </td>
  </tr>
 </table>
 */
});

describe("Loteria spec", function() {
  it("when html is requested, should return a model", function() {
    var loteria = new LoteriaModel();
    var matchWith = {
      tipo : 'Dominical',
      fecha : '01-09-2013',
      primero : {
      	numero: '0677',
      	serie: '4',
      	folio: '13',
      	verificacion: '',
      	letras: 'DDBC'
      },
      segundo : {
      	numero: '7260'
      },
      tercero : {
      	numero: '8783'
      },
      dateFormatISO : 'es-pa'
    };
    expect(loteria.parse(html).sorteos[0]).toEqual(matchWith);
  });
});