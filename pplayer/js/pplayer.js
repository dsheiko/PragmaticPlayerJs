/**
 * PragmaticPlayer.Js - Vanilla JavaScript Edition
 *
 * @version 1.0.0
 * @license MIT
 * @author Dmitry Sheiko (refactored to vanilla JS)
 * @description Dependency-free responsive video player with YouTube and HTML5 video support
 */

(function (global) {
  'use strict';

  // YouTube API Manager
  const YoutubeApi = (() => {
    let isLoadRequested = false;

    return {
      loadAsynchronously() {
        if (isLoadRequested) return;
        isLoadRequested = true;

        const tag = document.createElement('script');
        tag.src = '//www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      },

      isReady() {
        return global.YT !== undefined && global.YT.Player !== undefined;
      },

      ready(callback) {
        const checkReady = () => {
          if (this.isReady()) {
            callback(global.YT);
          } else {
            setTimeout(checkReady, 550);
          }
        };
        checkReady();
      }
    };
  })();

  // Adapters for different video sources
  const ApiAdapter = {
    Youtube(settings, handlers) {
      let _player = null;

      const _renderUI = (api) => {
        try {
          const videoElId = settings.boundingBox.querySelector('div.pp-video').id;
          _player = new api.Player(videoElId, {
            videoId: settings.youtubeVideoId,
            playerVars: {
              controls: 0,
              autoplay: settings.autoplay ? 1 : 0,
              hd: settings.hd ? 1 : 0,
              wmode: 'transparent',
              rel: 0,
              origin: settings.origin
            },
            events: {
              onReady: handlers.onReady,
              onStateChange: handlers.onStateChange
            }
          });
        } catch (e) {
          console.error('YouTube player error:', e);
          // Fallback to iframe
          settings.boundingBox.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${settings.youtubeVideoId}?rel=0&autoplay=${settings.autoplay ? 1 : 0}&wmode=transparent&hd=${settings.hd ? 1 : 0}"
                    frameborder="0" allowfullscreen></iframe>
          `;
        }
      };

      YoutubeApi.loadAsynchronously();
      YoutubeApi.ready(_renderUI);

      return {
        state: {
          UNSTARTED: -1,
          ENDED: 0,
          PLAYING: 1,
          PAUSED: 2,
          BUFFERING: 3,
          CUED: 5
        },
        getTarget() {
          return _player;
        },
        play() {
          _player?.playVideo();
        },
        stop() {
          _player?.stopVideo();
        },
        pause() {
          _player?.pauseVideo();
        },
        mute(flag) {
          _player?.[flag ? 'mute' : 'unMute']();
        },
        currentTime(curTime) {
          if (curTime !== undefined && _player) {
            _player.seekTo(curTime, true);
          }
          return _player?.getCurrentTime?.() ?? 0;
        },
        duration() {
          return _player?.getDuration?.() ?? 0;
        }
      };
    },

    VideoElement(settings, handlers) {
      const _player = settings.boundingBox.querySelector('video');

      if (_player) {
        _player.addEventListener('loadstart', (e) => {
          handlers.onReady(e);
          e.data = -1;
          handlers.onStateChange(e);
        });

        _player.addEventListener('play', (e) => {
          e.data = 1;
          handlers.onStateChange(e);
        });

        _player.addEventListener('pause', (e) => {
          e.data = 2;
          handlers.onStateChange(e);
        });

        _player.addEventListener('ended', (e) => {
          e.data = 0;
          handlers.onStateChange(e);
        });
      }

      return {
        state: {
          UNSTARTED: -1,
          ENDED: 0,
          PLAYING: 1,
          PAUSED: 2,
          BUFFERING: 3,
          CUED: 5
        },
        getTarget() {
          return _player;
        },
        play() {
          _player?.play();
        },
        stop() {
          _player?.pause();
        },
        pause() {
          _player?.pause();
        },
        mute(flag) {
          if (_player) _player.muted = flag;
        },
        currentTime(curTime) {
          if (curTime !== undefined && _player) {
            _player.currentTime = curTime;
          }
          return _player?.currentTime ?? 0;
        },
        duration() {
          return _player?.duration ?? 0;
        }
      };
    }
  };

  class PragmaticPlayer {
    static instanceCounter = 0;

    static get Templates() {
      return {
        playpause: `<div class="button">
          <button class="pause" aria-label="Pause" title="Pause (Space)"><!-- --></button>
          <button class="play" aria-label="Play" title="Play (Space)"><!-- --></button>
        </div>`,
        progress: `<div class="progressContainer"><div class="progressBar"><div class="progressCursor"><!-- --></div></div></div>`,
        quality: `<div class="quality"></div>`,
        timer: `<div class="timer" aria-live="polite">00:00 | 00:00</div>`,
        mute: `<div class="button">
          <button class="mute" aria-label="Mute" title="Mute (M)"><!-- --></button>
          <button class="unmute" aria-label="Unmute" title="Unmute (M)"><!-- --></button>
        </div>`,
        fullscreen: `<div class="button">
          <button class="enterFullscreen" aria-label="Enter Fullscreen" title="Fullscreen (F)"><!-- --></button>
          <button class="leaveFullscreen" aria-label="Leave Fullscreen" title="Exit Fullscreen (Esc)"><!-- --></button>
        </div>`,
        playbackRate: `<div class="playbackRate">
          <select aria-label="Playback Speed">
            <option value="0.5">0.5x</option>
            <option value="1" selected>1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>`,
        volume: `<div class="volumeControl">
          <input type="range" class="volumeSlider" min="0" max="100" value="100" aria-label="Volume">
        </div>`
      };
    }

    constructor(element, options = {}) {
      this.element = element;
      this.instanceId = `pp-player-${PragmaticPlayer.instanceCounter++}`;
      this.adapter = null;
      this.timerRef = null;
      this.playingTrigger = false;
      this.eventHandlers = new Map();

      // Merge settings
      this.settings = {
        youtubeVideoId: undefined,
        autoplay: false,
        hd: true,
        origin: undefined,
        adapter: undefined,
        features: ['playpause', 'progress', 'timer', 'mute', 'fullscreen', 'volume'],
        enableKeyboard: true,
        ...options
      };

      // Quality selector only for YouTube
      if (!this.settings.features.includes('quality') && this.isYoutubeMode()) {
        this.settings.features.push('quality');
      }

      this.cacheElements();
      this.init();
    }

    isYoutubeMode() {
      return !this.element.querySelector('video') || !!this.settings.youtubeVideoId;
    }

    hasVideoElementSupport() {
      const video = document.createElement('video');
      return video.play !== undefined;
    }

    cacheElements() {
      this.ui = {
        pauseBtn: null,
        playBtn: null,
        muteBtn: null,
        unmuteBtn: null,
        enterFullscreenBtn: null,
        leaveFullscreenBtn: null,
        timer: null,
        progressBar: null,
        progressCursor: null,
        quality: null,
        volumeSlider: null
      };
    }

    renderUI() {
      let html = '';
      this.settings.features.forEach(feature => {
        if (feature && PragmaticPlayer.Templates[feature]) {
          html += PragmaticPlayer.Templates[feature];
        }
      });

      const controls = `<div class="controls"><div>${html}</div></div>`;
      const videoHtml = this.element.innerHTML;

      this.element.innerHTML = `<div class="pp-video" id="${this.instanceId}">${videoHtml}</div>${controls}`;
      this.element.classList.add('ppVideoWrapper');
      this.element.setAttribute('role', 'region');
      this.element.setAttribute('aria-label', 'Video player');

      // Cache DOM elements
      this.ui.pauseBtn = this.element.querySelector('button.pause');
      this.ui.playBtn = this.element.querySelector('button.play');
      this.ui.muteBtn = this.element.querySelector('button.mute');
      this.ui.unmuteBtn = this.element.querySelector('button.unmute');
      this.ui.quality = this.element.querySelector('.quality');
      this.ui.enterFullscreenBtn = this.element.querySelector('button.enterFullscreen');
      this.ui.leaveFullscreenBtn = this.element.querySelector('button.leaveFullscreen');
      this.ui.timer = this.element.querySelector('.timer');
      this.ui.progressBar = this.element.querySelector('.progressBar');
      this.ui.progressCursor = this.element.querySelector('.progressCursor');
      this.ui.volumeSlider = this.element.querySelector('.volumeSlider');

      return this;
    }

    syncUI() {
      // Play/Pause
      this.ui.pauseBtn?.addEventListener('click', () => this.pauseVideo());
      this.ui.playBtn?.addEventListener('click', () => this.playVideo());

      // Mute/Unmute
      this.ui.muteBtn?.addEventListener('click', () => this.muteVideo());
      this.ui.unmuteBtn?.addEventListener('click', () => this.unmuteVideo());

      // Progress bar
      this.ui.progressBar?.addEventListener('click', (e) => this.handleProgressBar(e));

      // Fullscreen
      this.ui.enterFullscreenBtn?.addEventListener('click', () => this.enterFullscreen());
      this.ui.leaveFullscreenBtn?.addEventListener('click', () => this.leaveFullscreen());

      // Volume slider
      this.ui.volumeSlider?.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        const videoEl = this.element.querySelector('video');
        if (videoEl) videoEl.volume = volume;
      });

      // Fullscreen change events
      document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
      document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
      document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());

      // Keyboard shortcuts
      if (this.settings.enableKeyboard) {
        this.element.addEventListener('keydown', (e) => this.handleKeyboard(e));
      }

      return this;
    }

    handleKeyboard(e) {
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.adapter.currentTime() > 0 && this.adapter.currentTime() < this.adapter.duration()
            ? this.togglePlayPause()
            : this.playVideo();
          break;
        case 'KeyM':
          this.toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'ArrowRight':
          this.adapter.currentTime(this.adapter.currentTime() + 5);
          break;
        case 'ArrowLeft':
          this.adapter.currentTime(Math.max(0, this.adapter.currentTime() - 5));
          break;
        case 'ArrowUp':
          e.preventDefault();
          const videoEl = this.element.querySelector('video');
          if (videoEl) {
            videoEl.volume = Math.min(1, videoEl.volume + 0.1);
            this.ui.volumeSlider && (this.ui.volumeSlider.value = videoEl.volume * 100);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          const video = this.element.querySelector('video');
          if (video) {
            video.volume = Math.max(0, video.volume - 0.1);
            this.ui.volumeSlider && (this.ui.volumeSlider.value = video.volume * 100);
          }
          break;
      }
    }

    init() {
      // Determine adapter
      const useYoutube = this.isYoutubeMode() && this.settings.youtubeVideoId;
      const hasVideoSupport = this.hasVideoElementSupport();

      let adapterClass = this.settings.adapter || (this.isYoutubeMode() ? 'Youtube' : 'VideoElement');

      if (!hasVideoSupport) {
        adapterClass = 'Youtube';
      }

      if (adapterClass === 'Youtube' && !this.settings.youtubeVideoId) {
        throw new Error('youtubeVideoId is required for YouTube adapter');
      }

      this.renderUI().syncUI();

      this.adapter = ApiAdapter[adapterClass](this.settings, {
        onReady: () => {
          this.startTimer();
          this.emit('ready');
        },
        onStateChange: (e) => {
          if (e.data === this.adapter.state.PLAYING) {
            this.ui.playBtn?.classList.add('hidden');
            this.ui.pauseBtn?.classList.remove('hidden');
            if (!this.playingTrigger) {
              this.onPlaying();
              this.playingTrigger = true;
            }
            this.emit('play');
          } else {
            this.ui.playBtn?.classList.remove('hidden');
            this.ui.pauseBtn?.classList.add('hidden');
            this.emit('pause');
          }
        }
      });
    }

    onPlaying() {
      if (this.adapter.getTarget === undefined) return;
      this.renderQualityOptions();
    }

    renderQualityOptions() {
      if (this.adapter.getTarget === undefined) return;

      const select = this.ui.quality?.querySelector('select');
      if (!select) return;

      const target = this.adapter.getTarget();
      if (!target) return;

      select.addEventListener('change', () => {
        target.setPlaybackQuality?.(select.value);
      });
    }

    getTimeByFloat(ctFloat) {
      const t = { hours: 0, min: 0, sec: 0 };

      if (ctFloat) {
        const minFloat = ctFloat / 60;
        const hourFloat = minFloat / 60;

        t.sec = Math.floor(ctFloat);
        t.min = Math.floor(minFloat);
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

    formatTime(t) {
      const pad = (val) => String(val).padStart(2, '0');
      let result = '';

      if (t.hours) result += pad(t.hours) + ':';
      if (t.hours || t.min) result += pad(t.min) + ':';
      result += pad(t.sec);

      return result;
    }

    playVideo() {
      this.ui.playBtn?.classList.add('hidden');
      this.ui.pauseBtn?.classList.remove('hidden');
      this.adapter.play();
    }

    pauseVideo() {
      this.ui.playBtn?.classList.remove('hidden');
      this.ui.pauseBtn?.classList.add('hidden');
      this.adapter.pause();
    }

    togglePlayPause() {
      const curTime = this.adapter.currentTime();
      if (curTime > 0 && curTime < this.adapter.duration()) {
        this.ui.pauseBtn?.classList.contains('hidden') ? this.playVideo() : this.pauseVideo();
      } else {
        this.playVideo();
      }
    }

    muteVideo() {
      this.ui.unmuteBtn?.classList.remove('hidden');
      this.ui.muteBtn?.classList.add('hidden');
      this.adapter.mute(true);
    }

    unmuteVideo() {
      this.ui.unmuteBtn?.classList.add('hidden');
      this.ui.muteBtn?.classList.remove('hidden');
      this.adapter.mute(false);
    }

    toggleMute() {
      this.ui.muteBtn?.classList.contains('hidden') ? this.unmuteVideo() : this.muteVideo();
    }

    enterFullscreen() {
      document.body.classList.add('fullscreen');
      this.ui.enterFullscreenBtn?.classList.add('hidden');
      this.ui.leaveFullscreenBtn?.classList.remove('hidden');

      const elem = this.element;
      const requestFullscreen = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen;
      requestFullscreen?.call(elem);
    }

    leaveFullscreen() {
      document.body.classList.remove('fullscreen');
      this.ui.enterFullscreenBtn?.classList.remove('hidden');
      this.ui.leaveFullscreenBtn?.classList.add('hidden');

      const cancelFullscreen = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
      cancelFullscreen?.call(document);
    }

    toggleFullscreen() {
      const isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      isFullscreen ? this.leaveFullscreen() : this.enterFullscreen();
    }

    handleFullscreenChange() {
      const isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (!isFullscreen) {
        this.leaveFullscreen();
      }
    }

    handleProgressBar(e) {
      const rect = this.ui.progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width * 100;
      const newTime = (this.adapter.duration() / 100) * percent;
      this.adapter.currentTime(newTime);
      this.updateProgressBarCursor(percent);
    }

    updateTimer(line) {
      if (this.ui.timer) this.ui.timer.textContent = line;
    }

    updateProgressBarCursor(progressPercents) {
      if (this.ui.progressCursor) {
        this.ui.progressCursor.style.width = progressPercents + '%';
      }
    }

    startTimer() {
      const tick = () => {
        if (!this.element.classList.contains('ppVideoWrapper')) {
          return;
        }

        const curTime = this.getTimeByFloat(this.adapter.currentTime());
        const duration = this.getTimeByFloat(this.adapter.duration());
        const progressPercents = (this.adapter.currentTime() / this.adapter.duration()) * 100;

        if (!isNaN(duration.sec)) {
          const line = this.formatTime(curTime) + ' | ' + this.formatTime(duration);
          this.updateTimer(line);
          this.updateProgressBarCursor(progressPercents);
          this.emit('timeupdate', { current: this.adapter.currentTime(), duration: this.adapter.duration() });
        }

        this.timerRef = setTimeout(tick, 500);
      };

      this.timerRef = setTimeout(tick, 500);
    }

    // Event system
    on(event, callback) {
      if (!this.eventHandlers.has(event)) {
        this.eventHandlers.set(event, []);
      }
      this.eventHandlers.get(event).push(callback);
      return this;
    }

    off(event, callback) {
      if (!this.eventHandlers.has(event)) return this;
      const handlers = this.eventHandlers.get(event);
      const index = handlers.indexOf(callback);
      if (index > -1) handlers.splice(index, 1);
      return this;
    }

    emit(event, data) {
      if (!this.eventHandlers.has(event)) return this;
      this.eventHandlers.get(event).forEach(callback => callback(data));
      return this;
    }

    destroy() {
      clearTimeout(this.timerRef);
      this.eventHandlers.clear();
      // Remove all event listeners
      this.element.innerHTML = '';
      this.element.classList.remove('ppVideoWrapper');
    }

    // Public API
    getAdapter() {
      return this.adapter;
    }

    getState() {
      return {
        isPlaying: this.adapter.currentTime?.() > 0,
        currentTime: this.adapter.currentTime?.() ?? 0,
        duration: this.adapter.duration?.() ?? 0,
        isFullscreen: !!( document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement),
      };
    }
  }

  // Global API
  global.PragmaticPlayer = PragmaticPlayer;

  // Helper function for DOM-based initialization
  global.initPragmaticPlayer = (selector, options) => {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : [selector];
    
    const players = [];
    elements.forEach(el => {
      players.push(new PragmaticPlayer(el, options));
    });

    return players.length === 1 ? players[0] : players;
  };

})(window);
