import Player from "./Player";
import { fixDivXPlayer } from "./Utils/fixDivXPlayer";

class PPlayer {

  static register( el ){
    fixDivXPlayer( el, () => {
      if ( el.dataset.pplayerProcessed ) {
        return;
      }
      const player = new Player({
          boundingBox: el,
          youtubeVideoId: el.getAttribute( "youtubeVideoId" ),
          autoplay: el.getAttribute( "autoplay" ),
          hd: el.getAttribute( "hd" ),
          origin: el.getAttribute( "origin" ),
          adapter: el.getAttribute( "adapter" ),
          features: el.getAttribute( "features" ) ? el.getAttribute( "features" )
            .replace( /\s/g, "" ).split( "," ) : undefined
        });

      player.renderUI();
      player.syncUI();
      player.instanceCounter++;
    });
  }

  static registerAll(){
    Array.from( document.querySelectorAll( "pplayer" ) )
    .forEach( PPlayer.register );
  }

  onDOMReady( cb ) {
    if ( document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading" ) {
      return cb();
    }
    document.addEventListener( "DOMContentLoaded", cb );
  }

}

const pplayer = new PPlayer();

pplayer.onDOMReady( pplayer.registerAll );

window.PPlayer = PPlayer;
