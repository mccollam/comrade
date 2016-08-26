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

  function startBuzz() {
    ivOscillator = setInterval(function() {
      oscillator = !oscillator;
      pin.value(oscillator);
    }, oscSpeed);
  };

  function stopBuzz() {
    clearInterval(ivOscillator);
    clearInterval(ivBuzz);
    pin.value(false);
  };

  clearInterval(ivBuzz);
  ivBuzz = setInterval(function() {
    buzzing = !buzzing;
    if (buzzing) {
      stopBuzz();
    }
    else {
      startBuzz();
    }
  }, delay);
}
