const moment = require('moment');
const bookBarrys = require('./index.js');

let now = moment().format('MMMM Do YYYY, h:mm:ss a')
let timeUntilMidday = Math.abs(moment().diff(moment().hour(17).minute(07).second(0), 'milliseconds'));

setTimeout(() => {
 bookBarrys();
  console.log('booked')
}, timeUntilMidday)