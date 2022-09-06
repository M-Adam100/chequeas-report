(async () => {

  const url = "https://api.chequeas.com/v4/reporte";

  const { token, currentText } = await chrome.storage.local.get(["token", "currentText"]);
  console.log(currentText);

  const loadHTML = async (html) => {
    document.getElementById("html").innerHTML = html;
  };

  if (document.querySelector("#sideBar")) {
    const response = await fetch(`${url}?token=${token}&cuit=${currentText}`);
    const html = await response.text();
    loadHTML(html);
  } else if (!document.querySelector("#sideBar")) {
    const sideBar = document.createElement("div");
    sideBar.innerHTML = `<div id="html" style="z-index: 10;padding: 10px;height: 100%;overflow: auto;">
  </div>`;
    sideBar.id = "sideBar";
    document.querySelector("body").style.paddingRight = "400px";

    sideBar.style.cssText = `
      position: fixed;
      right: 0px;
      top: 0px;
      z-index: 9999;
      width: 400px;
      height: 100%;
      background-color: whitesmoke;`;

    document.querySelector("body").append(sideBar);

    const response = await fetch(`${url}?token=${token}&cuit=${currentText}`);
    const html = await response.text();
    loadHTML(html);
  }
})();
