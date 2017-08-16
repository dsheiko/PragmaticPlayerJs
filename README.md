PragmaticPlayerJs v. 0.2.4
=================

Easy-to-customize responsive player for embedded Youtube or HTML5 videos

* The project site: https://github.com/dsheiko/PragmaticPlayerJs
* The demo site: http://demo.dsheiko.com/pplayer/

This player has adapters for Youtube and HTML video APIs. So you can use it as customizable Youtube player or as HTML video player with fallback to Youtube player if the user browser doesn't support HTML5 video element.

The player is aware of the vandalic way DivX embeds its own web player when installed, and tries to fix it gratefully.

### How to use

Include player script and CSS on the page:

```
<link rel="stylesheet" type="text/css" href="../pplayer/assets/pplayer.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="../pplayer/assets/pplayer.js"></script>
```

Youtube player

    <div id="youtube-video"><!-- --></div>

    $("#youtube-video").pPlayer({
        youtubeVideoId: "YE7VzlLtp-4",
        autoplay: 0,
        origin: "http://yoursite.com"
    });

HTML video player

    <div id="html5-video">
        <video poster="./assets/poster.jpg" preload="true">
                <!-- MP4 for Safari, IE9, iPhone, iPad, Android, and Windows Phone 7 -->
            <source type="video/mp4" src="./assets/test.mp4" />
            <!-- Ogg/Vorbis for older Firefox and Opera versions -->
            <source type="video/ogg" src="./assets/test.ogv" />
        </video>
    </div>

    $("#html5-video").pPlayer({
        youtubeVideoId: "YE7VzlLtp-4" // Youtube fallback
    });

### Available Options

youtubeVideoId
    The YouTube video ID that identifies the video that the player will load.
autoplay
    Values: 0 or 1. Default is 0. Sets whether or not the initial video will autoplay when the player loads.
hd
    Values: 0 or 1. Default is 1. Setting to 1 enables HD playback by default.
origin
    As an extra security measure, you should include the origin parameter to the URL, specifying the URL scheme (http:// or https://) and full domain of your host page as the parameter value. While origin is optional, including it protects against malicious third-party JavaScript being injected into your page and hijacking control of your player.
adapter
    Used to specify video API adapter explicitly. Can be either VideoElement or Youtube
features
    List of enabled features. By default it is ["playpause", "progress", "quality", "timer", "mute", "fullscreen"]


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/PragmaticPlayerJs)](http://githalytics.com/dsheiko/PragmaticPlayerJs)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dsheiko/pragmaticplayerjs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

