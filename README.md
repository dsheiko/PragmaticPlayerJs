# PragmaticPlayerJs

**v. 2.0.0** - Now with a vanilla JavaScript edition!

An easy-to-customize responsive video player for YouTube and HTML5 videos with zero dependencies (vanilla version) or jQuery (legacy version).

- **Project**: https://github.com/dsheiko/PragmaticPlayerJs
- **Demo**: http://demo.dsheiko.com/pplayer/

## Features

- **Dual versions**: jQuery plugin (legacy) or vanilla JavaScript (modern)
- **Dual video support**: YouTube and HTML5 video adapters with automatic fallback
- **Responsive design**: Maintains 16:9 aspect ratio on all screen sizes
- **Rich controls**: Play/pause, progress bar, volume, fullscreen, quality selector
- **Advanced features** (vanilla version):
  - Keyboard shortcuts (Space, M, F, arrow keys for seeking and volume)
  - Volume slider with granular control
  - Playback rate selector (0.5x to 2x)
  - Custom event system
  - Accessibility features (ARIA labels)
  - No dependencies

---

## Vanilla JavaScript Version (Recommended)

The modern, dependency-free version. Use this for new projects.

### Installation

```html
<link rel="stylesheet" type="text/css" href="pplayer/assets/pplayer.css" />
<script src="pplayer/js/pplayer.js"></script>
```

### YouTube Player

```html
<div id="youtube-video"><!-- --></div>

<script>
const player = new PragmaticPlayer(document.getElementById('youtube-video'), {
    youtubeVideoId: 'YE7VzlLtp-4',
    autoplay: false,
    origin: 'http://yoursite.com'
});
</script>
```

### HTML5 Video Player

```html
<div id="html5-video">
    <video poster="./poster.jpg" preload="metadata">
        <source type="video/mp4" src="./video.mp4" />
        <source type="video/ogg" src="./video.ogv" />
    </video>
</div>

<script>
const player = new PragmaticPlayer(document.getElementById('html5-video'), {
    features: ['playpause', 'progress', 'timer', 'mute', 'volume', 'fullscreen']
});
</script>
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space** | Play / Pause |
| **M** | Toggle Mute |
| **F** | Fullscreen |
| **←** | Seek -5 seconds |
| **→** | Seek +5 seconds |
| **↑** | Volume +10% |
| **↓** | Volume -10% |

### Configuration Options

```javascript
{
    youtubeVideoId: undefined,      // YouTube video ID (required for YouTube)
    autoplay: false,                 // Auto-start playback
    hd: true,                        // Enable HD for YouTube
    origin: undefined,               // Your site origin for YouTube security
    adapter: undefined,              // Force adapter: "Youtube" or "VideoElement"
    features: [                      // Enabled features
        'playpause',
        'progress',
        'timer',
        'mute',
        'volume',
        'fullscreen'
    ],
    enableKeyboard: true             // Enable keyboard shortcuts
}
```

Available features: `playpause`, `progress`, `quality`, `timer`, `mute`, `fullscreen`, `volume`, `playbackRate`

### Events API

```javascript
// Listen to player events
player.on('ready', () => console.log('Ready'));
player.on('play', () => console.log('Playing'));
player.on('pause', () => console.log('Paused'));
player.on('timeupdate', (data) => {
    console.log('Time:', data.current, '/', data.duration);
});

// Remove event listener
player.off('play', handler);
```

### Public Methods

```javascript
// Playback control
player.playVideo();
player.pauseVideo();
player.togglePlayPause();

// Mute control
player.muteVideo();
player.unmuteVideo();
player.toggleMute();

// Fullscreen
player.enterFullscreen();
player.leaveFullscreen();
player.toggleFullscreen();

// State
const state = player.getState();
// { isPlaying, currentTime, duration, isFullscreen }

// Get adapter for advanced control
const adapter = player.getAdapter();
adapter.currentTime(45); // Seek to 45 seconds
adapter.duration();      // Get duration

// Cleanup
player.destroy();
```

---

## jQuery Version (Legacy)

The original jQuery-based version. Use this if you already have jQuery in your project or prefer the older API.

### Installation

```html
<link rel="stylesheet" type="text/css" href="pplayer/assets/pplayer.css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="pplayer/js/jquery.pplayer.js"></script>
```

### YouTube Player

```javascript
$("#youtube-video").pPlayer({
    youtubeVideoId: "YE7VzlLtp-4",
    autoplay: 0,
    origin: "http://yoursite.com"
});
```

### HTML5 Video Player

```html
<div id="html5-video">
    <video poster="./assets/poster.jpg" preload="true">
        <source type="video/mp4" src="./assets/test.mp4" />
        <source type="video/ogg" src="./assets/test.ogv" />
    </video>
</div>

<script>
$("#html5-video").pPlayer({
    youtubeVideoId: "YE7VzlLtp-4"  // YouTube fallback
});
</script>
```

### jQuery Configuration Options

- **youtubeVideoId**: The YouTube video ID
- **autoplay**: 0 or 1 (default: 0)
- **hd**: 0 or 1 (default: 1)
- **origin**: Your site origin URL for YouTube security
- **adapter**: Force specific adapter ("VideoElement" or "Youtube")
- **features**: Array of enabled features (default: `["playpause", "progress", "quality", "timer", "mute", "fullscreen"]`)

---

## Migration from jQuery to Vanilla

If you're using the jQuery version and want to upgrade:

**Before (jQuery)**:
```javascript
$("#player").pPlayer({
    youtubeVideoId: "abc123"
});
```

**After (Vanilla)**:
```javascript
const player = new PragmaticPlayer(
    document.getElementById('player'),
    { youtubeVideoId: "abc123" }
);
```

---

## Improvements in Vanilla Version

1. **Zero dependencies** - No jQuery required
2. **Better keyboard support** - Full keyboard shortcut system
3. **Volume control** - Granular volume slider
4. **Playback rates** - Support for 0.5x to 2x playback speeds
5. **Modern API** - Event-based system instead of callbacks
6. **Better accessibility** - ARIA labels and roles
7. **Improved fullscreen** - Better handling across browsers
8. **Smaller bundle** - ~8KB minified vs ~12KB with jQuery
9. **Better mobile** - Touch-friendly controls and improved responsiveness

---

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions
- Opera: Latest versions
- IE: YouTube adapter only (HTML5 video not supported)

---

## License

MIT License - See LICENSE file in repository