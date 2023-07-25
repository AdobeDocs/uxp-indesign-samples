# Introduction

This plugin is a good place to get started when building a UXP plugin using React. It comes defined with all the dependencies that you'll need to get started. As this is a React project, you'll need to do some initial configuration before this will be usable in InDesign.

## Documentation

- [Framework prerequisites](https://developer.adobe.com/indesign/uxp/introduction/essentials/tech-stack/#frameworks)

## Compatibility
Since InDesign v18.5 and UXP v7.1.

## Getting started

### Pre-requisites

You need
1. [NodeJS](https://nodejs.org/en_) v17.0 or below to build the plugin
2. (Optional) [Yarn package manager](https://yarnpkg.com/getting-started/install)
3. UXP Developer Tool (UXP)

### Install dependencies

Open the terminal in the root of this project, and use `npm` to install the various dependencies needed:

```
npm install
```

<b>Optional</b></br>
If you prefer to use `yarn`, after you generate the `package-lock.json` file you can run the following line to import dependencies to a `yarn.lock` file: 

```
yarn import
```

### Build plugin

There are two ways to build this plugin. Choose the one that suits your working style the best:

1. Automatically build your plugin on every change (best suited for active development that requires rapid and iterative changes): </br>
In your terminal, run `yarn watch` (or `npm run watch`) from the root folder. 
2. Create a one-time build: </br>
In your terminal, run `yarn build` (or `npm run build`) from the root folder. 

Notice that a `dist` folder, with transpiled JS code, is created after this step.

### Load plugin in the application
Follow the steps below in UDT,
1. Make sure InDesign application is running and you can see it under 'Connected apps'
2. Add this plugin to UDT, by selecting 'react-starter' from the 'Create Plugin' dialog. Or use the `plugin/manifest.json` to 'Add plugin' to the workspace.
3. From the plugin's action menu •••
    - Configure the `/dist` folder by using `More` -> `Advanced`.
    - Select `Load` to view the plugin inside your application.
    - (Optional) Select `Watch` to reload the plugin automatically every time the code in `/dist` changes.

Note that, the plugin will be based on the last transpiled code within the `dist` folder. Manage and trigger the 'build' process by following the instructions from the previous section.

## Troubleshooting

If you see errors with `npm install`, reinstall the project dependencies by following these steps
- Delete `node_modules/*` from the root folder.
- Delete `package-lock.json` or `yarn.lock` file. 
- Staying in the root directory, run `npm install` again and this will regenerate your `package-lock.json` file.


After running `yarn import` if you end up with the error `Lockfile already exists, not importing.`, then it is likely due to an already existing `yarn.lock` in your project. In such a case, you can either delete the lock file to generate a new `yarn.lock` or continue with the Build Process steps.

