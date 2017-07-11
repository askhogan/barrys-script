const axios = require('axios');
const cheerio = require('cheerio');

let cookieString = 'ZING1=EE970A3F%2DBECE%2D6E89%2D0F04893A5B385134; COOKIETEST=Accepts%20cookies; SITE=17; REMEMBERME=F3AD6FF9%2D9B5B%2DA2FA%2D6F80B82A5AF178DD'

let accountPage = '/reserve/index.cfm?action=Account.info';

const bookingsPage = '/reserve/index.cfm?action=Reserve.chooseClass&site=17&wk=1'


let instance = axios.create({
  baseURL: 'https://booking.barrysbootcamp.com',
  headers: {
    Cookie: cookieString

  }
})

function createBarryClass(obj) {
  var $ = cheerio(obj);

  var barry = {
    id: $.data('classid'),
    reserveUrl: $.children('a').attr('href')
  //   time: div.querySelector('.scheduleTime').innerText,
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

instance.get(bookingsPage).then(response => {
  let dateSelector = getCorrectDate();
  let $ = cheerio.load(response.data);
  let items = Array.from($('.reservelist div:first-child > .scheduleBlock'))
    .map(createBarryClass);
});