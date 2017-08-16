import YoutubeApiLoader from "../YoutubeApiLoader";
import AbstractAdapter from "./AbstractAdapter";

const apiLoader = new YoutubeApiLoader();

export default class Youtube extends AbstractAdapter {

  constructor( settings, handlers ){
    super( settings, handlers );
    apiLoader.register();
    apiLoader.ready( this.renderUi );
  }

  renderUi = ( api ) => {

    try {
        var videoElId = this.settings.boundingBox.find("div.pp-video").attr("id");
        this.player = new api.Player(videoElId, {
            videoId: this.settings.youtubeVideoId,
            playerVars: {
                controls: 0,
                autoplay: this.settings.autoplay,
                hd: this.settings.hd,
                wmode: "transparent",
                rel: 0,
                origin: this.settings.origin
            },
            events: {
                'onReady': this.handlers.onReady,
                'onStateChange': this.handlers.onStateChange
            }
        });
    } catch( e ) {
        window.console && console.log( e );
        this.settings.boundingBox.html( '<iframe src="http://www.youtube.com/embed/'
            + this.settings.youtubeVideoId + '?rel=0&autoplay='
            + this.settings.autoplay + '&wmode=transparent&hd=1" '
            + 'frameborder="0" allowfullscreen></iframe>' );
    }
  }



  getTarget() {
    return this.player;
  }
  play() {
    this.player.playVideo();
  }
  stop() {
      this.player.stopVideo();
  }
  pause() {
    this.player.pauseVideo();
  }
  mute( flag ) {
      this.player[ flag ? "mute" : "unMute" ]();
  }
  currentTime( curTime ) {
    curTime !== undefined && this.player.seekTo( curTime, true );
    return this.player.getCurrentTime();
  }
  duration() {
    return this.player.getDuration();
  }
}