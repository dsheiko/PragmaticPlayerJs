/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractAdapter = function AbstractAdapter(settings, handlers) {
   _classCallCheck(this, AbstractAdapter);

   this.settings = settings;
   this.handlers = handlers;
   this.player = null;
   this.state = {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
   };
};

exports.default = AbstractAdapter;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasBrowserVideoElementSupport = exports.hasBrowserVideoElementSupport = function () {
  var inputElem = document.createElement("video");
  return inputElem.play !== undefined;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(11);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _fixDivXPlayer = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PPlayer = function () {
  function PPlayer() {
    _classCallCheck(this, PPlayer);
  }

  _createClass(PPlayer, [{
    key: "onDOMReady",
    value: function onDOMReady(cb) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        return cb();
      }
      document.addEventListener("DOMContentLoaded", cb);
    }
  }], [{
    key: "register",
    value: function register(el) {
      (0, _fixDivXPlayer.fixDivXPlayer)(el, function () {
        if (el.dataset.pplayerProcessed) {
          return;
        }
        var player = new _Player2.default({
          boundingBox: el,
          youtubeVideoId: el.getAttribute("youtubeVideoId"),
          autoplay: el.getAttribute("autoplay"),
          hd: el.getAttribute("hd"),
          origin: el.getAttribute("origin"),
          adapter: el.getAttribute("adapter"),
          features: el.getAttribute("features") ? el.getAttribute("features").replace(/\s/g, "").split(",") : undefined
        });

        player.renderUI();
        player.syncUI();
        player.instanceCounter++;
      });
    }
  }, {
    key: "registerAll",
    value: function registerAll() {
      Array.from(document.querySelectorAll("pplayer")).forEach(PPlayer.register);
    }
  }]);

  return PPlayer;
}();

var pplayer = new PPlayer();

pplayer.onDOMReady(pplayer.registerAll);

window.PPlayer = PPlayer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Youtube = __webpack_require__(5);

var _Youtube2 = _interopRequireDefault(_Youtube);

var _VideoElement = __webpack_require__(7);

var _VideoElement2 = _interopRequireDefault(_VideoElement);

var _AbstractPlayer2 = __webpack_require__(8);

var _AbstractPlayer3 = _interopRequireDefault(_AbstractPlayer2);

var _support = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEMPLATES = {
    playpause: "    <div class=\"button\">\n              <button class=\"pause\"><!-- --></button>\n              <button class=\"play\"><!-- --></button>\n           </div>",
    progress: "    <div><div class=\"progressBar\"><div><!-- --></div></div></div>",
    quality: "    <div class=\"quality\"></div>",
    timer: "    <div class=\"timer\">00:00 | 00:00</div>",
    mute: "    <div class=\"button\">\n               <button class=\"mute\"><!-- --></button>\n               <button class=\"unmute\"><!-- --></button>\n           </div>",
    fullscreen: "    <div class=\"button\">\n               <button class=\"enterFullscreen\"><!-- --></button>\n               <button class=\"leaveFullscreen\"><!-- --></button>\n           </div>"
},
    AdapterFactory = { Youtube: _Youtube2.default, VideoElement: _VideoElement2.default };

var PPlayer = function (_AbstractPlayer) {
    _inherits(PPlayer, _AbstractPlayer);

    function PPlayer(settings) {
        _classCallCheck(this, PPlayer);

        var _this = _possibleConstructorReturn(this, (PPlayer.__proto__ || Object.getPrototypeOf(PPlayer)).call(this, settings));

        _this.instanceCounter = 0;

        _this.settings = Object.assign({
            boundingBox: null,
            youtubeVideoId: undefined,
            autoplay: 1,
            hd: 1,
            origin: undefined,
            adapter: undefined, // "VideoElement" or "Youtube"
            features: ["playpause", "progress", settings.adapter === "Youtube" ? "quality" : null, "timer", "mute", "fullscreen"]
        }, settings);

        _this.adapter = null;
        _this.el = settings.boundingBox;
        _this.el.dataset.pplayerProcessed = true;
        _this.pauseBtn = null;
        _this.playBtn = null;
        _this.muteBtn = null;
        _this.unmuteBtn = null;
        _this.enterFullscreenBtn = null;
        _this.leaveFullscreenBtn = null;
        _this.timer = null;
        _this.progressBar = null;
        _this.progressBarCursor = null;
        _this.quality = null;
        _this.playingTrigger = false;
        return _this;
    }

    _createClass(PPlayer, [{
        key: "getPlayerHtml",
        value: function getPlayerHtml() {
            var html = this.settings.features.filter(function (feature) {
                return !!feature;
            }).reduce(function (html, feature) {
                return html + TEMPLATES[feature];
            });
            return "<div class=\"controls\">\n            <div>" + html + "</div>\n       </div>";
        }
    }, {
        key: "hasPlayerVideoElements",
        value: function hasPlayerVideoElements() {
            return this.el.querySelector("div.pp-video > video");
        }
    }, {
        key: "renderUI",
        value: function renderUI() {
            var apapterClass = void 0,
                videoElId = "pp-player" + _instanceCounter;

            this.playingTrigger = false;

            this.el.innerHTML = "<div class=\"pp-video\">" + html + "</div>" + this.getPlayerHtml();
            this.el.classList.add("ppVideoWrapper");
            this.el.querySelector("div.pp-video").setAttribute("id", videoElId);

            this.pauseBtn = this.findControl("button.pause");
            this.playBtn = this.findControl("button.play");
            this.muteBtn = this.findControl("button.mute");
            this.unmuteBtn = this.findControl("button.unmute");
            this.quality = this.findControl(".quality");
            this.enterFullscreenBtn = this.findControl("button.enterFullscreen");
            this.leaveFullscreenBtn = this.findControl("button.leaveFullscreen");

            this.timer = this.findControl(".timer");
            this.progressBar = this.findControl(".progressBar");
            this.progressBarCursor = this.findControl(".progressBar > div");

            if (this.settings.adapter) {
                apapterClass = this.settings.adapter;
            } else {
                apapterClass = this.hasPlayerVideoElements() ? "VideoElement" : "Youtube";
            }

            if (!_support.hasBrowserVideoElementSupport) {
                apapterClass = "Youtube";
            }

            if (apapterClass === "Youtube" && this.settings.youtubeVideoId === undefined) {
                throw new Error("Parameter youtubeVideoId is mondatory to play a youtube video");
            }

            this.adapter = new AdapterFactory[apapterClass](settings, {
                onReady: function onReady(e) {
                    this.startTimer();
                },
                onStateChange: function onStateChange(e) {
                    if (e.data === this.adapter.state.PLAYING) {
                        this.playBtn.classList.toggle("is-hidden", true);
                        this.pauseBtn.classList.toggle("is-hidden", false);
                        this.playingTrigger || this.onPlaying();
                        this.playingTrigger = true;
                    } else {
                        this.playBtn.classList.toggle("is-hidden", false);
                        this.pauseBtn.classList.toggle("is-hidden", true);
                    }
                }
            });

            return this;
        }
    }, {
        key: "syncUI",
        value: function syncUI() {
            this.pauseBtn.addEventListener("click", this.pauseVideo.bind(this), false);
            this.playBtn.addEventListener("click", this.playVideo.bind(this), false);
            this.muteBtn.addEventListener("click", this.muteVideo.bind(this), false);
            this.unmuteBtn.addEventListener("click", this.unmuteVideo.bind(this), false);
            this.progressBar.addEventListener("click", this.handleProgressBar.bind(this), false);
            this.enterFullscreenBtn.addEventListener("click", this.enterFullscreen.bind(this), false);
            this.leaveFullscreenBtn.addEventListener("click", this.leaveFullscreen.bind(this), false);

            document.addEventListener("mozfullscreenchange", this.handleFullscreenChange.bind(this), false);
            document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange.bind(this), false);
            document.addEventListener("fullscreenchange", this.handleFullscreenChange.bind(this), false);
        }
    }, {
        key: "onPlaying",
        value: function onPlaying() {
            var _this2 = this;

            if (this.adapter.getTarget === undefined) {
                return;
            }
            this.renderQualityOptions();
            // May happen http://stackoverflow.com/questions/1040346/how-to-stop-the-select-box-from-being-blocked-as-a-pop-up-bit-internet-explorer
            this.quality.addEventListener("change", function (e) {
                _this2.adapter.getTarget().setPlaybackQuality(e.target.value);
            }, false);
        }
    }, {
        key: "handleProgressBar",
        value: function handleProgressBar(e) {
            e.preventDefault();
            var offset = e.clientX - this.progressBar.offset().left;
            var percent = Math.floor(offset / (this.progressBar.width() / 100));
            var newCurTime = this.adapter.duration() / 100 * percent;
            this.updateProgressBarCursor(percent);
            this.adapter.currentTime(newCurTime);
        }
    }, {
        key: "updateTimer",
        value: function updateTimer(line) {
            this.timer.innerHTML = line;
        }
    }, {
        key: "updateProgressBarCursor",
        value: function updateProgressBarCursor(progressPercents) {
            this.progressBarCursor.style.width = progressPercents + "%";
        }
    }, {
        key: "startTimer",
        value: function startTimer() {
            var _timerFn,
                timerRef,
                timerOut = null,
                that = this,
                sprintf02d = function sprintf02d(val) {
                val.toString().length < 2 && (val = "0" + val); // 5 => "05"
                return val;
            };
            (function (delay) {
                timerRef = setTimeout(_timerFn = function timerFn() {
                    if (this.adapter.currentTime) {
                        var curTime = this.getTimeByFloat(this.adapter.currentTime()),
                            duration = this.getTimeByFloat(this.adapter.duration()),
                            progressPercents = Math.floor(this.adapter.currentTime() * 100 / this.adapter.duration()),
                            line;
                        if (duration.min) {
                            curTime.sec = sprintf02d(curTime.sec);
                            duration.sec = sprintf02d(duration.sec);
                        }
                        if (duration.hours) {
                            curTime.min = sprintf02d(curTime.min);
                            duration.min = sprintf02d(duration.min);
                        }
                        line = (duration.hours ? curTime.hours + ":" : "") + (duration.min ? curTime.min + ":" : "") + curTime.sec + " | " + (duration.hours ? duration.hours + ":" : "") + (duration.min ? duration.min + ":" : "") + duration.sec;

                        if (timerOut !== line && !isNaN(duration.sec)) {
                            this.updateTimer(line);
                            this.updateProgressBarCursor(progressPercents);
                        }
                        timerOut = line;
                    }
                    if (this.el.hasClass("ppVideoWrapper")) {
                        timerRef = setTimeout(_timerFn, delay);
                    }
                }, delay);
            })(500);
        }
    }]);

    return PPlayer;
}(_AbstractPlayer3.default);

exports.default = PPlayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YoutubeApiLoader = __webpack_require__(6);

var _YoutubeApiLoader2 = _interopRequireDefault(_YoutubeApiLoader);

var _AbstractAdapter2 = __webpack_require__(0);

var _AbstractAdapter3 = _interopRequireDefault(_AbstractAdapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var apiLoader = new _YoutubeApiLoader2.default();

var Youtube = function (_AbstractAdapter) {
  _inherits(Youtube, _AbstractAdapter);

  function Youtube(settings, handlers) {
    _classCallCheck(this, Youtube);

    var _this = _possibleConstructorReturn(this, (Youtube.__proto__ || Object.getPrototypeOf(Youtube)).call(this, settings, handlers));

    _this.renderUi = function (api) {

      try {
        var videoElId = _this.settings.boundingBox.find("div.pp-video").attr("id");
        _this.player = new api.Player(videoElId, {
          videoId: _this.settings.youtubeVideoId,
          playerVars: {
            controls: 0,
            autoplay: _this.settings.autoplay,
            hd: _this.settings.hd,
            wmode: "transparent",
            rel: 0,
            origin: _this.settings.origin
          },
          events: {
            'onReady': _this.handlers.onReady,
            'onStateChange': _this.handlers.onStateChange
          }
        });
      } catch (e) {
        window.console && console.log(e);
        _this.settings.boundingBox.html('<iframe src="http://www.youtube.com/embed/' + _this.settings.youtubeVideoId + '?rel=0&autoplay=' + _this.settings.autoplay + '&wmode=transparent&hd=1" ' + 'frameborder="0" allowfullscreen></iframe>');
      }
    };

    apiLoader.register();
    apiLoader.ready(_this.renderUi);
    return _this;
  }

  _createClass(Youtube, [{
    key: "getTarget",
    value: function getTarget() {
      return this.player;
    }
  }, {
    key: "play",
    value: function play() {
      this.player.playVideo();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.player.stopVideo();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.player.pauseVideo();
    }
  }, {
    key: "mute",
    value: function mute(flag) {
      this.player[flag ? "mute" : "unMute"]();
    }
  }, {
    key: "currentTime",
    value: function currentTime(curTime) {
      curTime !== undefined && this.player.seekTo(curTime, true);
      return this.player.getCurrentTime();
    }
  }, {
    key: "duration",
    value: function duration() {
      return this.player.getDuration();
    }
  }]);

  return Youtube;
}(_AbstractAdapter3.default);

exports.default = Youtube;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isLoadRequested = false;

var YoutubeApiLoader = function () {
  function YoutubeApiLoader() {
    _classCallCheck(this, YoutubeApiLoader);
  }

  _createClass(YoutubeApiLoader, [{
    key: "loadAsynchronously",
    value: function loadAsynchronously() {
      var tag = document.createElement("script"),
          firstScriptTag = document.getElementsByTagName("script")[0];

      YoutubeApiLoader.isRequested = true;
      tag.src = "//www.youtube.com/iframe_api";
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, {
    key: "register",
    value: function register() {
      if (this.isReady() || YoutubeApiLoader.isRequested) {
        return;
      }
      this.loadAsynchronously();
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return window.YT !== undefined && window.YT.Player !== undefined;
    }
  }, {
    key: "readyfunction",
    value: function readyfunction(callback) {
      var _this = this;

      var timerRef = void 0;
      var delay = 550,

      // Gets called until APi is ready
      timerFn = function timerFn() {
        if (_this.isReady()) {
          callback(window.YT);
        } else {
          timerRef = setTimeout(timerFn, delay);
        }
      };

      timerRef = setTimeout(timerFn, delay);
    }
  }]);

  return YoutubeApiLoader;
}();

YoutubeApiLoader.isRequested = false;
exports.default = YoutubeApiLoader;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractAdapter2 = __webpack_require__(0);

var _AbstractAdapter3 = _interopRequireDefault(_AbstractAdapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoElement = function (_AbstractAdapter) {
  _inherits(VideoElement, _AbstractAdapter);

  function VideoElement(settings, handlers) {
    _classCallCheck(this, VideoElement);

    var _this = _possibleConstructorReturn(this, (VideoElement.__proto__ || Object.getPrototypeOf(VideoElement)).call(this, settings, handlers));

    _this.player = settings.boundingBox.find("video").get(0);

    _this.player.onloadstart = function (e) {
      handlers.onReady(e);
      e.data = -1;
      handlers.onStateChange(e);
    };
    _this.player.onplay = function (e) {
      e.data = 1;
      handlers.onStateChange(e);
    };
    _this.player.onpause = function (e) {
      e.data = 2;
      handlers.onStateChange(e);
    };
    return _this;
  }

  _createClass(VideoElement, [{
    key: "play",
    value: function play() {
      this.player.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.player.stop();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: "mute",
    value: function mute(flag) {
      this.player.mue(flag);
    }
  }, {
    key: "currentTime",
    value: function currentTime(curTime) {
      if (curTime !== undefined) {
        this.player.currentTime = curTime;
      }
      return this.player.currentTime;
    }
  }, {
    key: "duration",
    value: function duration() {
      return this.player.duration;
    }
  }]);

  return VideoElement;
}(_AbstractAdapter3.default);

exports.default = VideoElement;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractView2 = __webpack_require__(9);

var _AbstractView3 = _interopRequireDefault(_AbstractView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPlayer = function (_AbstractView) {
  _inherits(AbstractPlayer, _AbstractView);

  function AbstractPlayer(settings) {
    _classCallCheck(this, AbstractPlayer);

    return _possibleConstructorReturn(this, (AbstractPlayer.__proto__ || Object.getPrototypeOf(AbstractPlayer)).call(this, settings));
  }

  _createClass(AbstractPlayer, [{
    key: "playVideo",
    value: function playVideo() {
      this.playBtn.classList.toggle("is-hidden", true);
      this.pauseBtn.classList.toggle("is-hidden", false);
      this.adapter.play();
    }
  }, {
    key: "stopVideo",
    value: function stopVideo() {
      this.adapter.stop();
    }
  }, {
    key: "pauseVideo",
    value: function pauseVideo() {
      this.playBtn.classList.toggle("is-hidden", false);
      this.pauseBtn.classList.toggle("is-hidden", true);
      this.adapter.pause();
    }
  }, {
    key: "muteVideo",
    value: function muteVideo() {
      this.unmuteBtn.classList.toggle("is-hidden", false);
      this.muteBtn.classList.toggle("is-hidden", true);
      this.adapter.mute(true);
    }
  }, {
    key: "unmuteVideo",
    value: function unmuteVideo() {
      this.unmuteBtn.classList.toggle("is-hidden", true);
      this.muteBtn.classList.toggle("is-hidden", false);
      this.adapter.mute(false);
    }
  }, {
    key: "handleFullscreenChange",
    value: function handleFullscreenChange() {
      if (document.fullScreenElement && document.fullScreenElement !== null || !document.mozFullScreen && !document.webkitIsFullScreen) {
        this.leaveFullscreen();
        return;
      }
      this.enterFullscreen();
    }
  }, {
    key: "enterFullscreen",
    value: function enterFullscreen() {
      document.body.classList.add("fullscreen");
      this.enterFullscreenBtn.classList.toggle("is-hidden", true);
      this.leaveFullscreenBtn.classList.toggle("is-hidden", false);
      if (this.el.requestFullScreen) {
        return this.el.requestFullScreen();
      }
      if (this.el.mozRequestFullScreen) {
        return this.el.mozRequestFullScreen();
      }
      if (this.el.webkitRequestFullScreen) {
        return this.el.webkitRequestFullScreen();
      }
    }
  }, {
    key: "leaveFullscreen",
    value: function leaveFullscreen() {
      document.body.classList.remove("fullscreen");
      this.enterFullscreenBtn.classList.toggle("is-hidden", false);
      this.leaveFullscreenBtn.classList.toggle("is-hidden", true);
      if (document.cancelFullScreen) {
        return document.cancelFullScreen();
      }
      if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
      }
      if (document.webkitCancelFullScreen) {
        return document.webkitCancelFullScreen();
      }
    }
  }]);

  return AbstractPlayer;
}(_AbstractView3.default);

exports.default = AbstractPlayer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractView = function () {
    function AbstractView() {
        _classCallCheck(this, AbstractView);
    }

    _createClass(AbstractView, [{
        key: "findControl",
        value: function findControl(sel) {
            return this.el.querySelector(".controls " + sel);
        }
    }, {
        key: "renderQualityOptions",
        value: function renderQualityOptions() {
            if (this.adapter.getTarget === undefined) {
                return;
            }
            var qLevelMap = {
                small: "240p",
                medium: "360p",
                large: "480p",
                hd720: "720p",
                hd1080: "1080p",
                highres: "highres"
            },
                options = this.adapter.getTarget().getAvailableQualityLevels(),
                level = this.adapter.getTarget().getPlaybackQuality(),
                optionsHTML = options.reduce(function (sum, val) {
                return sum + ("<option title=\"Change quality\" value=\"" + val + "\" " + (level === val ? "selected" : "") + ">\n              " + (qLevelMap[val] || val) + "\n            </option>");
            });

            this.quality.innerHTML = "<select name=\"qualityLevel\">" + optionsHTML + "</select>'";
        }
    }, {
        key: "getTimeByFloat",
        value: function getTimeByFloat(ctFloat) {
            var t = {
                hours: 0,
                min: 0,
                sec: 0
            },
                minFloat = ctFloat / 60,
                hourFloat = minFloat / 60;

            if (ctFloat) {
                t.sec = Math.floor(ctFloat); // if less than 60 sec
                t.min = Math.floor(minFloat); // if less than 60 min
                t.hours = Math.floor(hourFloat);
                if (t.hours) {
                    t.min = Math.floor(minFloat - t.hours * 60);
                }
                if (t.hours || t.min) {
                    t.sec = Math.floor(ctFloat - t.min * 60 - t.hours * 60 * 60);
                }
            }
            return t;
        }
    }]);

    return AbstractView;
}();

exports.default = AbstractView;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixDivXPlayer = fixDivXPlayer;

var _support = __webpack_require__(1);

var DIVX_WEB_PLAYER_TIMEOUT = 500;

function hasDivXWebPlayerOn() {
  var divx = document.querySelector("embed[type=\"video/divx\"]");
  return divx && divx.getAttribute("mode") === "null";
}

function fixDivXPlayer(el, cb) {
  if (!_support.hasBrowserVideoElementSupport) {
    cb();
  }
  setTimeout(function () {
    if (hasDivXWebPlayerOn()) {
      el.innerHTML = "";
      cb();
    }
  }, DIVX_WEB_PLAYER_TIMEOUT);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  __webpack_require__(1);
  module.exports = __webpack_require__(2);

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  //import Player from "./Player";
  //import { fixDivXPlayer } from "./Utils/fixDivXPlayer";
  //
  //class PPlayer {
  //
  //  static register( el ){
  //    fixDivXPlayer( el, () => {
  //      if ( el.dataset.pplayerProcessed ) {
  //        return;
  //      }
  //      const player = new Player({
  //          boundingBox: el,
  //          youtubeVideoId: el.getAttribute( "youtubeVideoId" ),
  //          autoplay: el.getAttribute( "autoplay" ),
  //          hd: el.getAttribute( "hd" ),
  //          origin: el.getAttribute( "origin" ),
  //          adapter: el.getAttribute( "adapter" ),
  //          features: el.getAttribute( "features" ) ? el.getAttribute( "features" )
  //            .replace( /\s/g, "" ).split( "," ) : undefined
  //        });
  //
  //      player.renderUI();
  //      player.syncUI();
  //      player.instanceCounter++;
  //    });
  //  }
  //
  //  static registerAll(){
  //    Array.from( document.querySelectorAll( "pplayer" ) )
  //    .forEach( PPlayer.register );
  //  }
  //
  //  onDOMReady( cb ) {
  //    if ( document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading" ) {
  //      return cb();
  //    }
  //    document.addEventListener( "DOMContentLoaded", cb );
  //  }
  //
  //}
  //
  //const pplayer = new PPlayer();
  //
  //pplayer.onDOMReady( pplayer.registerAll );
  //
  //window.PPlayer = PPlayer;

  var a = 1;

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  /******/
  (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/if (installedModules[moduleId]) {
        /******/return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/var module = installedModules[moduleId] = {
        /******/i: moduleId,
        /******/l: false,
        /******/exports: {}
        /******/ };
      /******/
      /******/ // Execute the module function
      /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
      /******/if (!__webpack_require__.o(exports, name)) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      }
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
      /******/var getter = module && module.__esModule ?
      /******/function getDefault() {
        return module['default'];
      } :
      /******/function getModuleExports() {
        return module;
      };
      /******/__webpack_require__.d(getter, 'a', getter);
      /******/return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 0);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, exports, __webpack_require__) {

    __webpack_require__(1);
    (function webpackMissingModule() {
      throw new Error("Cannot find module \"/home/sheiko/Sites/os/PragmaticPlayerJs\"");
    })();

    /***/
  },
  /* 1 */
  /***/function (module, exports) {

    //import Player from "./Player";
    //import { fixDivXPlayer } from "./Utils/fixDivXPlayer";
    //
    //class PPlayer {
    //
    //  static register( el ){
    //    fixDivXPlayer( el, () => {
    //      if ( el.dataset.pplayerProcessed ) {
    //        return;
    //      }
    //      const player = new Player({
    //          boundingBox: el,
    //          youtubeVideoId: el.getAttribute( "youtubeVideoId" ),
    //          autoplay: el.getAttribute( "autoplay" ),
    //          hd: el.getAttribute( "hd" ),
    //          origin: el.getAttribute( "origin" ),
    //          adapter: el.getAttribute( "adapter" ),
    //          features: el.getAttribute( "features" ) ? el.getAttribute( "features" )
    //            .replace( /\s/g, "" ).split( "," ) : undefined
    //        });
    //
    //      player.renderUI();
    //      player.syncUI();
    //      player.instanceCounter++;
    //    });
    //  }
    //
    //  static registerAll(){
    //    Array.from( document.querySelectorAll( "pplayer" ) )
    //    .forEach( PPlayer.register );
    //  }
    //
    //  onDOMReady( cb ) {
    //    if ( document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading" ) {
    //      return cb();
    //    }
    //    document.addEventListener( "DOMContentLoaded", cb );
    //  }
    //
    //}
    //
    //const pplayer = new PPlayer();
    //
    //pplayer.onDOMReady( pplayer.registerAll );
    //
    //window.PPlayer = PPlayer;
    var a = 1;

    /***/
  }]
  /******/);

  /***/
}]
/******/);

/***/ })
/******/ ]);