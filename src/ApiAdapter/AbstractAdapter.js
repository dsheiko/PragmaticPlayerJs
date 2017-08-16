export default class AbstractAdapter {

   constructor( settings, handlers ){
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
   }
}