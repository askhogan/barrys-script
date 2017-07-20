const moment = require('moment');
const bookBarrys = require('./index.js');

let now = moment().format('MMMM Do YYYY, h:mm:ss a')
let timeUntilMidday = Math.abs(moment().diff(moment().hour(16).minute(50).second(0), 'milliseconds'));


setInterval(() => {
 bookBarrys();
  console.log('booked')
}, timeUntilMidday)