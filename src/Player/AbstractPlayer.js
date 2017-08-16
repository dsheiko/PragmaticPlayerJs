import AbstractView from "./AbstractView";

export default class AbstractPlayer extends AbstractView {

  constructor( settings ){
    super( settings );
  }

  playVideo() {
      this.playBtn.classList.toggle( "is-hidden", true );
      this.pauseBtn.classList.toggle( "is-hidden", false );
      this.adapter.play();
  }

  stopVideo() {
      this.adapter.stop();
  }

  pauseVideo() {
      this.playBtn.classList.toggle( "is-hidden", false );
      this.pauseBtn.classList.toggle( "is-hidden", true );
      this.adapter.pause();
  }

  muteVideo() {
      this.unmuteBtn.classList.toggle( "is-hidden", false );
      this.muteBtn.classList.toggle( "is-hidden", true );
      this.adapter.mute( true );
  }
  unmuteVideo() {
      this.unmuteBtn.classList.toggle( "is-hidden", true );
      this.muteBtn.classList.toggle( "is-hidden", false );
      this.adapter.mute( false );
  }

  handleFullscreenChange() {
    if ( ( document.fullScreenElement && document.fullScreenElement !== null ) ||
        ( !document.mozFullScreen && !document.webkitIsFullScreen ) ) {
      this.leaveFullscreen();
      return;
    }
    this.enterFullscreen();
  }

  enterFullscreen() {
    document.body.classList.add( "fullscreen" );
    this.enterFullscreenBtn.classList.toggle( "is-hidden", true );
    this.leaveFullscreenBtn.classList.toggle( "is-hidden", false );
    if ( this.el.requestFullScreen ) {
        return this.el.requestFullScreen();
    }
    if (this.el.mozRequestFullScreen) {
        return this.el.mozRequestFullScreen();
    }
    if (this.el.webkitRequestFullScreen) {
      return this.el.webkitRequestFullScreen();
    }
  }

  leaveFullscreen() {
    document.body.classList.remove( "fullscreen" );
    this.enterFullscreenBtn.classList.toggle( "is-hidden", false );
    this.leaveFullscreenBtn.classList.toggle( "is-hidden", true );
    if ( document.cancelFullScreen ) {
      return document.cancelFullScreen();
    }
    if ( document.mozCancelFullScreen ) {
      return document.mozCancelFullScreen();
    }
    if (document.webkitCancelFullScreen) {
      return document.webkitCancelFullScreen();
    }
  }

}