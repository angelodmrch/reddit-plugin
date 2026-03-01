# Reddit Plugin

This Firefox extension runs on Reddit pages and applies two automatic feed cleanups:

1. Unblurs NSFW posts by clicking Reddit's "show 18+ content" overlay.
2. Removes game posts that use the `game` attribute on `shreddit-post`.

## Installation

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to this folder and select the `manifest.json` file

## Features

- **NSFW auto-unblur**
	- Detects Reddit NSFW blur containers (`shreddit-blurred-container[reason="nsfw"]`)
	- Clicks the reveal target automatically when found
	- Includes fallback click logic for slightly different DOM structures

- **Game post auto-remove**
	- Detects posts with `shreddit-post[game]`
	- Removes the surrounding `<article>` from the feed (or removes the post node if needed)
	- Useful for hiding Devvit/game content cards from the timeline

- **Works on dynamic feeds**
	- Uses `MutationObserver` to process newly loaded posts as you scroll
	- Runs a periodic safety check to catch delayed renders

- **Automatic on Reddit**
	- Runs on `reddit.com` and `*.reddit.com` pages via content script

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script for NSFW auto-unblur + game post removal
- `icon.png` - Extension icon (optional)

## Note

This is a temporary extension. To make it permanent, you would need to:
1. Create an icon.png file (48x48 pixels)
2. Package and sign the extension through Mozilla's Add-on Developer Hub
3. Or keep loading it temporarily each time you start Firefox

## Usage

Once installed, browse Reddit normally.

- NSFW overlays are auto-clicked when detected.
- Posts marked with `shreddit-post[game]` are removed from the feed.
- New posts loaded later are processed automatically as well.
