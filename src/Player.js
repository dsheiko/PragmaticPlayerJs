import Youtube from "./ApiAdapter/Youtube";
import VideoElement from "./ApiAdapter/VideoElement";
import AbstractPlayer from "./Player/AbstractPlayer";
import { hasBrowserVideoElementSupport } from "./Utils/support";


const TEMPLATES = {
  playpause:
      `    <div class="button">
              <button class="pause"><!-- --></button>
              <button class="play"><!-- --></button>
           </div>`,
  progress:
      `    <div><div class="progressBar"><div><!-- --></div></div></div>`,
  quality:
      `    <div class="quality"></div>`,
  timer:
      `    <div class="timer">00:00 | 00:00</div>`,
  mute:
      `    <div class="button">
               <button class="mute"><!-- --></button>
               <button class="unmute"><!-- --></button>
           </div>`,
  fullscreen:
      `    <div class="button">
               <button class="enterFullscreen"><!-- --></button>
               <button class="leaveFullscreen"><!-- --></button>
           </div>`
 },
 AdapterFactory = { Youtube, VideoElement };

export default class PPlayer extends AbstractPlayer {
  constructor( settings ){
    super( settings );
     this.settings = Object.assign({
        boundingBox: null,
        youtubeVideoId: undefined,
        autoplay: 1,
        hd: 1,
        origin: undefined,
        adapter: undefined, // "VideoElement" or "Youtube"
        features: [
            "playpause",
            "progress",
            settings.adapter === "Youtube" ? "quality" : null,
            "timer",
            "mute",
            "fullscreen" ]
    }, settings );

    this.adapter = null;
    this.el = settings.boundingBox;
    this.el.dataset.pplayerProcessed = true;
    this.pauseBtn = null;
    this.playBtn = null;
    this.muteBtn = null;
    this.unmuteBtn = null;
    this.enterFullscreenBtn = null;
    this.leaveFullscreenBtn = null;
    this.timer = null;
    this.progressBar = null;
    this.progressBarCursor = null;
    this.quality = null;
    this.playingTrigger = false;

    this.el.playVideo = this.playVideo.bind( this );
    this.el.stopVideo = this.stopVideo.bind( this );
    this.el.pauseVideo = this.pauseVideo.bind( this );
    // and so on....
  }


  getPlayerHtml() {
      const html = this.settings.features
        .filter( feature => !!feature )
        .reduce( ( html, feature ) => html + TEMPLATES[ feature ] );
      return `<div class="controls">
            <div>${html}</div>
       </div>`;
  }

  hasPlayerVideoElements() {
      return this.el.querySelector( "div.pp-video > video" );
  }

  instanceCounter = 0;

  renderUI() {
      let apapterClass,
          videoElId = "pp-player" + _instanceCounter;

      this.playingTrigger = false;

      this.el.innerHTML = `<div class="pp-video">${html}</div>${this.getPlayerHtml()}`;
      this.el.classList.add( "ppVideoWrapper" );
      this.el.querySelector( "div.pp-video" ).setAttribute( "id", videoElId );

      this.pauseBtn = this.findControl( "button.pause" );
      this.playBtn = this.findControl( "button.play" );
      this.muteBtn = this.findControl( "button.mute" );
      this.unmuteBtn = this.findControl( "button.unmute" );
      this.quality = this.findControl( ".quality" );
      this.enterFullscreenBtn = this.findControl( "button.enterFullscreen" );
      this.leaveFullscreenBtn = this.findControl( "button.leaveFullscreen" );

      this.timer = this.findControl( ".timer" );
      this.progressBar = this.findControl( ".progressBar" );
      this.progressBarCursor = this.findControl( ".progressBar > div" );

      if ( this.settings.adapter ) {
        apapterClass = this.settings.adapter;
      } else {
        apapterClass = this.hasPlayerVideoElements() ? "VideoElement" : "Youtube";
      }

      if ( !hasBrowserVideoElementSupport ) {
          apapterClass = "Youtube";
      }

      if ( apapterClass === "Youtube" && this.settings.youtubeVideoId === undefined ) {
          throw new
           Error( "Parameter youtubeVideoId is mondatory to play a youtube video" );
      }

      this.adapter = new AdapterFactory[ apapterClass ]( settings, {
           onReady( e ) {
               this.startTimer();
           },
           onStateChange( e ) {
              if ( e.data === this.adapter.state.PLAYING ) {
                this.playBtn.classList.toggle( "is-hidden", true );
                this.pauseBtn.classList.toggle( "is-hidden", false );
                this.playingTrigger || this.onPlaying();
                this.playingTrigger = true;
              } else {
                this.playBtn.classList.toggle( "is-hidden", false );
                this.pauseBtn.classList.toggle( "is-hidden", true );
              }
          }
       });

      return this;
  }

  syncUI() {
      this.pauseBtn.addEventListener( "click", this.pauseVideo.bind( this ), false );
      this.playBtn.addEventListener( "click", this.playVideo.bind( this ), false );
      this.muteBtn.addEventListener( "click", this.muteVideo.bind( this ), false );
      this.unmuteBtn.addEventListener( "click", this.unmuteVideo.bind( this ), false );
      this.progressBar.addEventListener( "click", this.handleProgressBar.bind( this ), false );
      this.enterFullscreenBtn.addEventListener( "click", this.enterFullscreen.bind( this ), false );
      this.leaveFullscreenBtn.addEventListener( "click", this.leaveFullscreen.bind( this ), false );

      document.addEventListener( "mozfullscreenchange", this.handleFullscreenChange.bind( this ), false );
      document.addEventListener( "webkitfullscreenchange", this.handleFullscreenChange.bind( this ), false );
      document.addEventListener( "fullscreenchange", this.handleFullscreenChange.bind( this ), false );
  }

  onPlaying() {
      if ( this.adapter.getTarget === undefined ) {
          return;
      }
      this.renderQualityOptions();
      // May happen http://stackoverflow.com/questions/1040346/how-to-stop-the-select-box-from-being-blocked-as-a-pop-up-bit-internet-explorer
      this.quality.addEventListener( "change", ( e ) => {
          this.adapter.getTarget().setPlaybackQuality( e.target.value );
      }, false );
  }



  handleProgressBar( e ) {
    e.preventDefault();
    const offset = e.clientX - this.progressBar.offset().left;
    const percent = Math.floor(offset / (this.progressBar.width() / 100));
    const newCurTime = this.adapter.duration() / 100 * percent;
    this.updateProgressBarCursor( percent );
    this.adapter.currentTime( newCurTime );
  }

  updateTimer( line ) {
    this.timer.innerHTML = line;
  }

  updateProgressBarCursor( progressPercents ) {
    this.progressBarCursor.style.width = `${progressPercents}%`;
  }

  startTimer () {
       var timerFn, timerRef, timerOut = null, that = this,
           sprintf02d = function( val ) {
               val.toString().length < 2 && ( val = "0" + val ); // 5 => "05"
               return val;
           };
       (function(delay){
           timerRef = setTimeout( timerFn = function(){
               if ( this.adapter.currentTime ) {
                   var curTime = this.getTimeByFloat( this.adapter.currentTime() ),
                       duration = this.getTimeByFloat( this.adapter.duration() ),
                       progressPercents = Math.floor( (
                           this.adapter.currentTime() * 100) / this.adapter.duration() ),
                       line;
                   if ( duration.min ) {
                           curTime.sec = sprintf02d( curTime.sec );
                           duration.sec = sprintf02d( duration.sec );
                   }
                   if ( duration.hours ) {
                           curTime.min = sprintf02d( curTime.min );
                           duration.min = sprintf02d( duration.min );
                   }
                   line = ( duration.hours ? curTime.hours + ":" : "" )
                       + ( duration.min ? curTime.min + ":" : "" )
                       + curTime.sec
                       + " | "
                       + ( duration.hours ? duration.hours + ":" : "" )
                       + ( duration.min ? duration.min + ":" : "" )
                       + duration.sec;

                   if ( timerOut !== line && !isNaN(duration.sec) ) {
                       this.updateTimer( line );
                       this.updateProgressBarCursor( progressPercents );
                   }
                   timerOut = line;
               }
               if (this.el.hasClass( "ppVideoWrapper" )) {
                   timerRef = setTimeout( timerFn, delay );
               }
           }, delay );
       })( 500 );
  }


}
