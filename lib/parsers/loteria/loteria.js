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