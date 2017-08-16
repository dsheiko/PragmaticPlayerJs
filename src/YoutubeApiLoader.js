var isLoadRequested = false;

export default class YoutubeApiLoader {
    static isRequested = false;

    loadAsynchronously() {
      const tag = document.createElement( "script" ),
            firstScriptTag = document.getElementsByTagName( "script" )[ 0 ];

      YoutubeApiLoader.isRequested = true;
      tag.src = "//www.youtube.com/iframe_api";
      firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
    }

    register() {
      if ( this.isReady() || YoutubeApiLoader.isRequested ){
        return;
      }
      this.loadAsynchronously();
    }

    isReady() {
      return window.YT !== undefined && window.YT.Player !== undefined;
    }

    readyfunction( callback ) {
        let timerRef;
        const delay = 550,
              // Gets called until APi is ready
              timerFn = () => {
                if ( this.isReady() ) {
                    callback( window.YT );
                } else {
                    timerRef = setTimeout( timerFn, delay );
                }
              };

        timerRef = setTimeout( timerFn, delay );
    }
  }