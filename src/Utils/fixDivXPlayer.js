import { hasBrowserVideoElementSupport } from "./support";

const DIVX_WEB_PLAYER_TIMEOUT = 500;

function hasDivXWebPlayerOn() {
    const divx = document.querySelector( `embed[type="video/divx"]` );
    return divx && divx.getAttribute( "mode" ) === "null";
  }

export function fixDivXPlayer( el, cb ) {
  if ( !hasBrowserVideoElementSupport ) {
    cb();
  }
  setTimeout(() => {
    if ( hasDivXWebPlayerOn() ) {
      el.innerHTML = "";
      cb();
    }
  }, DIVX_WEB_PLAYER_TIMEOUT );
}