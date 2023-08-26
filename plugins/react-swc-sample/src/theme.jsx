import { app } from 'indesign';

export const theme = (() => {
    const brightnessLevel = app.generalPreferences.uiBrightnessPreference;

    if (brightnessLevel === 0) return 'darkest';
    if (brightnessLevel <= .5) return 'dark';
    if (brightnessLevel < 1) return 'light';
    return 'lightest';
})();