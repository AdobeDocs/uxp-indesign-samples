# Introduction

This sample plugin demonstrates the usage of WebView in your UXP plugin. WebViews are particularly handy when certain web features, such as webGL, are not innately available in UXP.

The aim of this plugin is 
- To showcase WebView within a dialog and a panel.
- Use WebGL within Webview.
- Demo the communication between the plugin panel and remote WebView content via `postMessage`


## Documentation
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) - Common for all Host Applications.

### InDesign
The following docs will help you get additional context
- [Manifest Permission Module](https://developer.adobe.com/indesign/uxp/plugins/concepts/manifest/#webviewpermission)
- [HTMLWebView element](https://developer.adobe.com/indesign/uxp/reference/uxp-api/reference-js/Global%20Members/HTML%20Elements/HTMLWebViewElement/)

### Photoshop
- [Manifest Permission Module](https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/manifest-v5/#webviews)
- [HTMLWebView element](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Global%20Members/HTML%20Elements/HTMLWebViewElement/)

## Compatibility
UXP v6.4

### InDesign
Since InDesign v18.5

### Photoshop
Since Photoshop v24.1.0

## Getting Started

### WebView Demo Server
Currently, UXP WebView content can only be served from a web URL. UXP does not support loading local HTML content.
In this plugin, a local server will serve the web page.

Follow the steps to run the local server:
- Install `http server` by running the following command
    - Mac - `sudo npm install -g http-server`.
    - Windows - `npm install -g http-server`.
- Traverse to `{yourpluginrootdirectory}/Receiver` folder and run `http-server -p 7724`

### Load the plugin via UDT

1. Make sure your application is running and you can see it under `Connected apps`
2. Click on 'Add Plugin' button and select the `manifest.json` of this plugin.
3. Click on the `•••` menu next to the corresponding plugin row. Select `Load` to view the plugin inside your application.
Switch over to the host app, and the plugin's panel will be running.


## Deep dive

### manifest permission
To use WebViews in a plugin, the `webview` permission is necessary in [manifest.json](./manifest.json).
- webview.allow - Enables WebView access to the plugin.
- webview.domains - Domain of the web URL.
- webview.enableMessageBridge - Enables the content loaded within WebView to communicate with the plugin.

### uxpAllowInspector
In [index.html](./index.html), notice the `uxpAllowInspector` added to the WebView element inside the dialog. The purpose of this property is to enable debugging the contents of UXP WebView. Once set to `true`, you can right-click on the webview and select 'Inspect Element' to debug and view the `console.logs` from the webview content separately.</br>
<b>Example:</b></br>
```html
<webview width="100%" height="360px" src="https://www.adobe.com" uxpAllowInspector="true" ></webview>
```

### update webview page
If you are making changes to the WebView page (served from the http-server), make sure the http-server doesn't cache. Use `http-server -p 7724 -c-1` to restart the server and disable caching.