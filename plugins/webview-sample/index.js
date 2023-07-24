// ======= Webview in a dialog =======

const openDialogBtn = document.getElementById("openDialogBtn");
openDialogBtn.onclick = showDialog;
function showDialog() {
    const dialog = document.getElementById("dialog");
    document.appendChild(dialog).showModal();
}

// print events
let dialogWebview = document.getElementById("dialogWebview");
dialogWebview.addEventListener("loadstart", (event) => {
    console.log("events onloadstart : ", event.url)
    document.getElementById("dialogLogs").value = "loadstart:" + event.url + "\n" + document.getElementById("dialogLogs").value;
});
dialogWebview.addEventListener("loadstop", (event) => {
    console.log("events onloadstop : ", event.url)
    document.getElementById("dialogLogs").value = "loadstop:" + event.url + "\n" + document.getElementById("dialogLogs").value;
});
dialogWebview.addEventListener("loaderror", (event) => {
    console.log("events onloaderror : ", event.url)
    document.getElementById("dialogLogs").value = "loaderror:" + event.url + "\n" + document.getElementById("dialogLogs").value;
});


// send instructions to webview content
const dialogCreateTriangleBtn = document.getElementById("dialogCreateTriangleBtn");
dialogCreateTriangleBtn.onclick = postMessageCreateTriangleInDialog;
function postMessageCreateTriangleInDialog() {
    dialogWebview.postMessage("createTriangle");
}

const dialogTransformTriangleBtn = document.getElementById("dialogTransformTriangleBtn");
dialogTransformTriangleBtn.onclick = postMessageRotateTriangleInDialog;
function postMessageRotateTriangleInDialog() {
    dialogWebview.postMessage("transformTriangle");
}

// ======= Webview in the plugin panel =======

const openPanelBtn = document.getElementById("openPanelBtn");
openPanelBtn.onclick = showWebViewInPanel;
function showWebViewInPanel() {
    const webviewInPanel = document.getElementById("webviewInPanel");
    webviewInPanel.style.display = "block";
}

// send instructions to webview content
let panelWebview = document.getElementById("panelWebview");
const panelCreateTriangleBtn = document.getElementById("panelCreateTriangleBtn");
panelCreateTriangleBtn.onclick = postMessageCreateTriangleInPanel;
function postMessageCreateTriangleInPanel() {
    panelWebview.postMessage("createTriangle");
}

const panelTransformTriangleBtn = document.getElementById("panelTransformTriangleBtn");
panelTransformTriangleBtn.onclick = postMessageRotateTriangleInPanel;
function postMessageRotateTriangleInPanel() {
    panelWebview.postMessage("transformTriangle");
}


// ======= receive message from webview content =======
window.addEventListener("message", (e) => {
    console.log(`Message from WebView(Origin:${e.origin}): ${e.data}`);
    if (e.data.key === "imageDetails") {
        document.getElementById("snapshot").src = e.data.value;
    } else if (e.data.key === "canvasDetails") {
        document.getElementById("logWebview").innerText = e.data.value;
    }
});
