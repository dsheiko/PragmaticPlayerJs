import AbstractAdapter from "./AbstractAdapter";

export default class VideoElement extends AbstractAdapter {

  constructor( settings, handlers ){
    super( settings, handlers );
    this.player = settings.boundingBox.find("video").get(0);
    
    this.player.onloadstart = ( e ) => {
      handlers.onReady( e );
      e.data = -1;
      handlers.onStateChange( e );
    };
    this.player.onplay = ( e ) => {
      e.data = 1;
      handlers.onStateChange( e );
    };
    this.player.onpause = ( e ) => {
      e.data = 2;
      handlers.onStateChange( e );
    };
  }

  play() {
    this.player.play();
  }
  stop() {
    this.player.stop();
  }
  pause() {
    this.player.pause();
  }
  mute( flag ) {
    this.player.mue( flag );
  }

  currentTime( curTime ) {
    if ( curTime !== undefined ) {
        this.player.currentTime = curTime;
    }
    return this.player.currentTime;
  }

  duration() {
    return this.player.duration;
  }
}

