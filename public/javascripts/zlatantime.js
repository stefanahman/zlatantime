window.setTimeout("updateTime()", 0);// start immediately
window.setInterval("updateTime()", 1000);// update every second
function updateTime() {
  $zlatantime('#zclock').refresh(new Date().toTimeString().substring(0, 8));
}

(function (window, undefined) {
  var constants = {
    'minute_in_seconds': 60,
    'hour_in_minutes': 60,
    'hour_in_seconds': 3600,
    'match_in_minutes': 90,
    'match_in_seconds': 5400
  }
  var $zlatantime = function (selector) {
    if ( window === this ) {
        return new $zlatantime(selector);
    }
    var result = document.querySelectorAll(selector);
    if ( result.length > 0 ) {
      for (var i = 0; i < result.length; i++) {
        this[i] = result[i];
      }
      this.length = result.length;
    }
    return this;
  };
  $zlatantime.fn = $zlatantime.prototype = {
    getZMatchFromSeconds: function(seconds) {
      return parseInt(seconds/constants.match_in_seconds);
    },
    getZMinuteFromSecondsWithMatch: function(match, seconds) {
      return parseInt((seconds - (match * constants.match_in_seconds)) / constants.minute_in_seconds);
    },
    getZMinuteFromSeconds: function(seconds) {
      return parseInt((seconds - (this.getZMatchFromSeconds(seconds) * constants.match_in_seconds)) / constants.minute_in_seconds);
    },
    toZTime: function(time) {
      var res = time.split(":");
      var totalTimeInSeconds = parseInt(res[0]) * constants.hour_in_seconds;
      totalTimeInSeconds += parseInt(res[1]) * constants.minute_in_seconds;
      var second = parseInt(res[2]);
      var zmatch = this.getZMatchFromSeconds(totalTimeInSeconds);
      var zminute = this.getZMinuteFromSecondsWithMatch(zmatch, totalTimeInSeconds);
      if (zminute === 0 && second === 0) {
        this.playSound('sounds/whistle_start');
      } else if (zminute === 45 && second === 0) {
        this.playSound('sounds/whistle_half');
      }
      return this.toString(zmatch, zminute, second);
    },
    toString: function(matchOrHour, minute, second) {
      var time = ""
      if (matchOrHour < 10)
        time += '0';
      time += matchOrHour;
      time += ':';
      if (minute < 10)
        time += '0';
      time += minute;
      if (second != 0) {
        time += ':';
        if (second < 10)
          time += '0';
        time += second;
      } else {
        time += ':00';
      }
      return time;
    },
    playSound: function() {
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /></audio>").appendTo('body');
    },
    refresh: function(time) {
      for (var i = 0; i < this.length; i++)
        $(this[i]).text(this.toZTime(time));
    }
  };
  window.$zlatantime = $zlatantime;
})(window);
