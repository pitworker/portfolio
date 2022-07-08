function openNav() {
  document.getElementById("sideNav").style.width = screen.width > 576 ? "400px" : "100%";
  document.getElementById("sideNav").style.outlineStyle = screen.width > 576 ? "solid" : "none";
  if(screen.width > 576) {
    document.getElementById("sideNav").style.outlineColor = "#000000";
    document.getElementById("sideNav").style.outlineWidth = "3px";
  }
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  document.getElementById("sideNav").style.outline = "none";
  document.getElementById("main").style.marginLeft = "0";
}
