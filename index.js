const axios = require('axios');
const cheerio = require('cheerio');

const config = require('./config.json');

let cookieString = process.env.BARRYS_COOKIE_STRING;

let accountPage = '/reserve/index.cfm?action=Account.ingit adfo';

const bookingsPage = '/reserve/index.cfm?action=Reserve.chooseClass&site=17&wk=1';


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
    // time: $.children('a').children('span.scheduleTime').f,
    time: $.find('.scheduleTime').children().first().text(),
    isAvailable: !isFull.test(obj.attribs.class)
    // time: div.querySelector('.scheduleTime').innerText,
  //   isAvailable: !div.classlist.contains('classfull')
  }

  return barry;
}

var DESIRED_BOOKING_TIME = '09:30';

function isGoodBookableTime(barry) {
  return barry.time === DESIRED_BOOKING_TIME;
}

function getCorrectDate() {
  let todaysDate = new Date();
  let correctMonth = todaysDate.getMonth() + 1;
  let month = getFormattedMonth(correctMonth);
  let correctYear = todaysDate.getFullYear();
  let correctDay = todaysDate.getDate() + 7;
  let dateOfBlock = `#day${correctYear}${month}${correctDay}`
  return dateOfBlock;

}

function getFormattedMonth(data) {
  let correctMonth;
  if (data < 10) {
    correctMonth = `0${data}`
  } else {
    correctMonth = data;
  }
  return correctMonth;

}

function findDesiredSession(response) {
  let dateSelector = getCorrectDate();
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