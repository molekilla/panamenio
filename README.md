## Panamenio
=========

Patrones, Diseños y Boilerplate Microservicio para servicios publicos de Panama, Republica de Panama.

Actualmente utilizado en producción en un fork privado, con las siguientes mejoras:

- Webhook compatible (aunque REST hooks es más escalable)
- Async (non-blocking) por medio de POST que retorna url a fetch (NoSQL como storage)
- Utiliza [menio](https://github.com/molekilla/menio) en vez de cheeriot
- Serverless FaaS compatible
### V 1.0

- Node 8
- Async await support

### Ejemplo

```javascript
const $ = require('cheerio');
const MenioScraper = require('./../../menioscraper');
const template = require('./loteria_template');
const r2 = require('r2');

const MAIN_URL = 'http://www.lnb.gob.pa/numerosjugados.php';
const MainQuery = function (month, year) {
  const y = year || (new Date).getFullYear();
  const m = month || (new Date).getMonth() + 1;
  return "tiposorteo=T&ano=" + y + "&meses=" + m + "&Consultar=consulta";
}

// Modelo debe heredar MenioScraper (o BYOScraper)
class LoteriaModel extends MenioScraper {
  constructor() {
    super();
  }

  parse(html) {
    const items = $.load(html)('table > tr');
    const numerosjugados = $($(items)[4]).find('tr');
    const numeros = numerosjugados.toArray();    
    const data = numeros.reverse().slice(0, 3).map((row) => {
      const cells = $(row).find('td');
      return this.cheeriot.render(cells, template);
    });
    return {
      sorteos: data
    };
  }

  // Utiliza r2  para async await
  async fetch(queryParams, options) {
    const url = [MAIN_URL, "?", MainQuery(queryParams.month || queryParams.mes, queryParams.year || queryParams.ano)].join("");
    // Query
    try {
      const html = await r2.get(url).text;
      options.success(html, this.parse(html));
    } catch (err) {
      options.error(err);
    }    
  }
}
module.exports = LoteriaModel;
```

#### REST API Docs
http://docs.panamenio.apiary.io/

### V 0.10
**Idaan**
/api/gob/idaan/numero_de_cuenta

```javascript
// Respuesta
    var response = {
      agua : 7.92,
      basura : 8.75,
      total : 16.67,
      owner : 'J Jay',
      nic : '116',
      updatedAt : '04/08/2013',
      lastPaymentAt : '17/07/2013',
      lastPaymentAmount : 12.73,
      dateFormatISO : 'es-pa'
    };
```
**Registro Publico**
/api/gob/registropublico/nombre_a_buscar

```javascript
// Respuesta
{
  "sociedades": [
    {
      "sociedad": "IMAGINAR, S.A.",
      "ficha": "445182",
      "estatus": "",
      "tomo": "0",
      "folio": "0",
      "links": {
        "ficha": {
          "href": "/item/445182"
        }
      }
    }
}
```


### Install
npm install
Necesitas remover nodemon manualmente e instalar global

### Desarrollo
grunt nodemon
Para debuggear, utiliza node-debugger
grunt jasmine_node o grunt  ejecuta los specs

### REST API Spec
### Servicios Publicos
#### /api/gob/servicio

Ejemplo
/api/gob/idaan/:numeroCuenta

### Servicios Comerciales
#### /api/com/servicio

Ejemplo
/api/com/metrobus/:codigo


### Patrones

**lib** contiene los modelos, cada modelo debe tener metodos **fetch** y **parse**

**spec** contiene los specs al modelo. Por lo general queremos probar la logica de **parse**.


Rogelio Morrell C. Benevolent Panamenio.
