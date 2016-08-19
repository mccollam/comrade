// TODO: Make this settable from somewhere
const tformat = '24h';
const dformat = ''; // FIXME: update when formatDate does anything useful

var electron = require('electron');

var hwF1 = electron.remote.require('./main').hwF1;
hwF1.on('rise', function () {
// TODO - pass event to active applet
console.log("F1 for clock");
});

function startClock() {
    window.setInterval(showClock, 500);
}

function showClock() {
    var date = new Date();
    document.getElementById('clock').innerHTML = formatTime(date, tformat);
    document.getElementById('date').innerHTML = formatDate(date, dformat);
}

function formatTime(date, format) {
    h = date.getHours();
    if (h < 10)
        zh = "0" + h;
    else
        zh = h;
    m = date.getMinutes();
    if (m < 10)
        m = "0" + m;
    s = date.getSeconds();
    if (s < 10)
        s = "0" + s;
    switch(format) {
        case '24h':
            // 24 hour time only
            f = zh + ":" + m;
            break;
        case '24hs':
            // 24 hour time with seconds
            f = zh + ":" + m + ":" + s;
            break;
        case '12h':
            // 12 hour time only
            f = h + ":" + m;
            break;
        case '12hs':
            // 12 hour time with seconds
            f = h + ":" + m + ":" + s;
            break;
        default:
            f = date.toLocaleTimeString();
            break;
    }

    return f;
}

function formatDate(date, format) {
    // TODO: More date formats
    return date.toLocaleDateString();
}