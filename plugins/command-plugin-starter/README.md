# Introduction
The plugin demonstrates the creation of a command-only plugin.
Select `Show Alert` to display an InDesign dialog.

## Compatibility
Since InDesign v18.5 and UXP v7.1.

## Documentation
Familiarize yourself with the following concepts to understand the plugins in more detail
- [Plugin entrypoints](https://developer.adobe.com/indesign/uxp/plugins/concepts/entry-points/)
- [Plugin Manifest](https://developer.adobe.com/indesign/uxp/plugins/concepts/manifest/)
## Get Started
- Launch UDT and InDesign.
- Ensure that the app is visible under `Connected Apps`
- Add the plugin into UDT by doing the following
    - Select `Add Plugin` button
    - Select the `manifest.json` of the plugin
- Click on the `•••` menu next to the corresponding plugin row. Select `Load` to view the plugin inside your application
- In InDesign go to Plugin's Panel and notice that there is a plugin by the name `Command Plugin` (same as the name mentioned in `manifest.json`)
- Click `Command Plugin` and then select `Show Alert`.
