# Minimal React InDesign Plugin Boilerplate with Spectrum Web Components

By: [Zuri Klaschka](https://github.com/pklaschka)

This is a minimal, bare-bones boilerplate for creating UXP plugins with React.

It focuses on providing a minimal setup that allows you to get started with React and UXP as quickly as possible.

Note that conveniences such as automatic reloading using UDT are not included in this boilerplate. If you want to use
them, you'll have to set them up yourself.

## Usage

1. Clone this repository
2. Run `npm install` in the cloned directory
3. Run `npm run build` to build the plugin
4. Add the `dist/manifest.json` file to the UXP Developer Tool

   ⚠️ **Don't** use the `plugin/manifest.json` file, as this is only used for development
5. Load the plugin in the UXP Developer Tool
6. Enjoy!

### Making changes

1. Make changes to the code
2. Run `npm run build` to build the plugin
3. Reload the plugin in the UXP Developer Tool
4. Enjoy!

### Automatic rebuilds

1. Run `npm run start` to automatically rebuild the plugin when changes are made
2. Make changes to the code
3. Reload the plugin in the UXP Developer Tool (you can also "Watch" the plugin in the UXP Developer Tool to
   automatically reload it when changes are made)
4. Enjoy!
