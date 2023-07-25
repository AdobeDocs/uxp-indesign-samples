const { entrypoints } = require("uxp");

entrypoints.setup({
 
  panels: {
    showPanel: {
      show({node} = {}) {}
    }
  }
});
