const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config.json');
let cookieString = process.env.BARRYS_COOKIE_STRING;
let accountPage = '/reserve/index.cfm?action=Account.ingit adfo';
const bookingsPage = '/reserve/index.cfm?action=Reserve.chooseClass&site=17&wk=1';

module.exports =

  function bookBarrys() {

    let instance = axios.create({
      baseURL: 'https://booking.barrysbootcamp.com',
      headers: {
        Cookie: cookieString
      }
    })

    function createBarryClass(obj) {
      var $ = cheerio(obj);

      var isFull = /full/i;

      var barry = {
        id: $.data('classid'),
        reserveUrl: $.children('a').attr('href'),
        time: $.find('.scheduleTime').children().first().text(),
        isAvailable: !isFull.test(obj.attribs.class)

      }

      return barry;
    }


    function findDesiredSession(response) {
      let $ = cheerio.load(response.data);
      let items = Array.from($('.reservelist div:first-child > .scheduleBlock'))
        .map(createBarryClass)
        .filter(session => session.isAvailable);

      return items.find(c => c.time === config.desiredTime).reserveUrl;
    }

    instance
      .get(bookingsPage)
      .then(findDesiredSession)
      .then(instance.get)
      .then(response => cheerio.load(response.data)('#spotwrapper a').first().attr('href'))
      .then(instance.get)
      .then(console.log)
      .catch(console.log);
  }
