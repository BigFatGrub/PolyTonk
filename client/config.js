window.beta = false;
window.servers = [{
  wsLink: (window.top.location.protocol == "https:" ? "wss://" : "ws://") + window.top.location.host + "/server",
  name: " FFA",
}]
// Year, Month, Full Date
window.changelogDate = [Date.now()]; // SET CHANGELOG TO YOUR CURRENT DATE AFTER MAKING A CHANGE! TO GET YOUR DATE, PUT Date.now() ON YOUR CONSOLE
window.changelog = ["Welcome to PolyTonk V1.02", "Increased map size","Player of the week: Nintendo 64"];
