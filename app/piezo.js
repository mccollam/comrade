var ivBuzz;        // Interval timer for buzzer
var inUse = false; // Prevent multiple simultaneous accesses

var startBuzzer = function(pin, delay=500, freq=500) {
    // Wrapper to buzzPiezo()
    // Here because it may eventually do a bit more with things like
    // tunes/tones, etc.
    if (inUse)
        return false;

    oscSpeed = 1000/freq;
    buzzPiezo(pin, delay, oscSpeed);
    inUse = true;
}

var stopBuzzer = function(pin) {
    clearInterval(ivBuzz);
    pin.value(false);
    inUse = false;
}

exports.startBuzzer = startBuzzer;
exports.stopBuzzer = stopBuzzer;

function buzzPiezo(pin, delay=500, oscSpeed=2) {
  var oscillator = false;
  var buzzing = false;
  var ivOscillator;

  console.log('In buzzPiezo()');

  function startBuzz() {
    console.log('Starting buzz');
    ivOscillator = setInterval(function() {
      oscillator = !oscillator;
      pin.value(oscillator);
    }, oscSpeed);
  };

  function stopBuzz() {
    console.log('Stopping buzz');
    clearInterval(ivOscillator);
    pin.value(false);
  };

  console.log('Clearing any existing intervals...');
  clearInterval(ivBuzz);
  ivBuzz = setInterval(function() {
    buzzing = !buzzing;
    if (buzzing) {
      console.log('Calling stopBuzz()');
      stopBuzz();
    }
    else {
      console.log('Calling startBuzz()');
      startBuzz();
    }
  }, delay);
}
