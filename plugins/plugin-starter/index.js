const { entrypoints } = require("uxp");
const { app } = require("indesign");

entrypoints.setup({
  commands: {
    showAlert: () => showAlert()
  },
  panels: {
    showPanel: {
      show({node} = {}) {}
    }
  }
});

showAlert = () => {
    const dialog = app.dialogs.add();
    const col = dialog.dialogColumns.add();
    const colText = col.staticTexts.add();
    colText.staticLabel = "Congratulations! You just executed your first command.";

    dialog.canCancel = false;
    dialog.show();
    dialog.destroy();
    return;
}