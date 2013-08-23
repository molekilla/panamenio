var heredoc = require('heredoc');
var Idaan = require('../lib/idaan');

// Using http://www.willpeavy.com/minifier/ to Minify
// Using heredoc found in NPM
// First start cleaning any personal data
// When specs is done, minify HTML
// heredoc is optional with minify
var html = heredoc(function() { /*
<body><table width="549" border="0" align="center"><tr><td width="99"> </td><td width="99"> </td><td width="337"> </td></tr><tr><td height="284" colspan="3" bgcolor="#FFFFFF"><table width="776" border="0" align="center"><tr><td width="257" height="21"></td></tr><tr><td></td></tr><tr><td><table width="878" border="0"><tr><td width="17"> </td><td width="647" rowspan="2"><table width="547" border="0"><tr><td width="114">Servicio al Cliente</td><td width="171">>Consulta de Saldo</td></tr><tr><td height="482" colspan="4" align="center"><table width="661" border="0" align="center"><tr><td width="655" bgcolor="#FFFFFF"><table width="563" border="0" align="center"><tr><td colspan="2"><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";></div></td><td width="73"><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";><a href="cliente.php"><strong>Regresar</strong></a></div></td></tr><tr><td colspan="2"><div align="left"><strong>Nic:</strong></span> 116</div></td></tr><tr><td width="479"><div align="left"><strong>Nombre:</span></strong> J Jay</div></td></tr><tr><td height="57" colspan="2"><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099"><div align="left"><strong>Saldo a la Fecha: 04/08/2013</strong></strong></div></div></td><td> </td></tr></table></td></tr><tr><td height="61" align="center" bgcolor="#FFFFFF"><table width="244" border="1" align="center"><tr bgcolor="#FFFFFF" "right" style="font-family: Verdana, Arial, Helvetica, sans-serif;font-size:11px;color: #FFFFFF"><th>Agua</th><th>B/ 7.92</th></tr><tr bgcolor="#FFFFFF" "right" style="font-family: Verdana, Arial, Helvetica, sans-serif;font-size:11px;color: #FFFFFF"><th width="116">Aseo</th><th width="112">B/ 8.75</th></tr></table></td></tr><tr><td bgcolor="#FFFFFF"><table width="432" border="0" align="center"><tr><td align="center"><strong>El Total de la deuda es de B/. 16.67</strong></td></tr><tr><td> </td></tr><tr><td width="426"><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099">El ultimo Pago fue de <strong>B/.12.73</strong> realizado el <strong>17/07/2013. </strong></div></td></tr><tr><td><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000000";><strong>Nota:</span></strong></div></td></tr><tr><td><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";><strong>-Los pagos ACTUALIZADO se visualizarán en la Página Web, al día siguiente.</strong></div></td></tr><tr><td><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";><strong>-La fecha de VENCIMIENTO DE SU CUENTA es el 26/08/2013.</strong></div></td></tr><tr><td><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";><strong>-Recuerde que una vez pasada su fecha de vencimiento, se reflejarán CARGOS POR MOROSIDAD en su próxima facturación.</strong></div></td></tr><tr><td><div align="left" style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;color:#000099";><strong>-Si sus datos están incorrectos, por favor acérquese a la Agencias del IDAAN más cercana para corregirlos, Gracias.</strong></div></td></tr></table></td></tr><tr><td bgcolor="#FFFFFF"></span></td></tr><tr><td height="24" bgcolor="#FFFFFF"> </td></tr></table></td></tr></table></td><td width="200"><img src="images/banners somos_ agua.jpg" width="200" height="314"/></td></tr><tr><td height="179"> </td><td><table width="200" border="0"><tr><td width="47"><img src="images/consulta.jpg" alt="" width="47" height="47"/></td><td width="11"> </td><td width="128"><a href="cliente.php"><em>Consulta de Saldo</em></a><a href="directorio_telefono.html"></a></td></tr><tr><td><img src="images/mail.jpg" alt="" width="47" height="47"/></td><td> </td><td><a href="http://mail.idaan.gob.pa" target="_new"><em>Correo Electrónico</em></a></td></tr><tr><td><img src="images/telefono.png" alt="" width="47" height="47"/></td><td> </td><td><a href="directorio_telefono.html"><em>Directorio Telefónico</em></a><a href="cliente.php"></a></td></tr><tr><td height="29"> </td><td> </td><td><a href="directorio_telefono.html"></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body>
*/});

describe("Idaan spec", function() {
  it("when html from an account id post, should return a model", function() {
    var idaanService = new Idaan("116");
    var matchWith = {
      agua : 7.92,
      basura : 8.75,
      total : 16.67,
      owner : 'J Jay',
      nic : '116',
      updatedAt : '04/08/2013',
      lastPaymentAt : '17/07/2013',
      lastPaymentAmount : 'B/.12.73',
      dateFormatISO : 'es-pa'
    };
    expect(idaanService.parse(html)).toEqual(matchWith);
  });
});