import React from 'react';
import ReactDOM from 'react-dom';

// Import styles
import {App} from "./components/app";
import './index.css';

// Import Spectrum Web Components, cf. https://developer.adobe.com/indesign/uxp/reference/uxp-api/reference-spectrum/swc/
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/button/sp-button.js';

console.debug('Template by Zuri Klaschka (https://github.com/pklaschka)');

ReactDOM.render(<App/>, document.querySelector('uxp-panel[panelid="panel-1"]'));