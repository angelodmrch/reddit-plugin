# Reddit show 18+ fix

This Firefox extension automatically clicks the "show 18+ content" button on Reddit posts.

## Installation

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to this folder and select the `manifest.json` file

## Features

- Automatically clicks NSFW/18+ content blur overlays
- Works on both old and new Reddit designs
- Monitors for new posts dynamically loaded as you scroll
- Runs automatically on all Reddit pages

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that detects and clicks 18+ buttons
- `icon.png` - Extension icon (optional)

## Note

This is a temporary extension. To make it permanent, you would need to:
1. Create an icon.png file (48x48 pixels)
2. Package and sign the extension through Mozilla's Add-on Developer Hub
3. Or keep loading it temporarily each time you start Firefox

## Usage

Once installed, simply browse Reddit. The extension will automatically click any "show 18+ content" buttons that appear.
