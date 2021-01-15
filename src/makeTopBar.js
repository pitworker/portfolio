const NAME = "Sebastian Carpenter.";
const NAME_LINES = ["Sebastian", "Carpenter."];
const NAV = [
  ["Work", "index.html"],
  ["About", "about.html"]
];
const DIVIDER = " | ";
const BREAK = 992;

function generateName() {
  let e = document.getElementById("name");
  if (window.innerWidth < BREAK) {
    let brokenName = "";
    for (let i = 0; i < NAME_LINES.length; i++) {
      brokenName = brokenName + NAME_LINES[i];
      if (i < NAME_LINES.length - 1) {
        brokenName = brokenName + "\n";
      }
    }
    e.innerText = brokenName;
  } else {
    e.innerText = NAME;
  }
}

function generateNav() {
  let e = document.getElementById("nav");
  for (let i = 0; i < NAV.length; i++) {
    let a = document.createElement("A");
    a.href = NAV[i][1];
    a.innerText = NAV[i][0];

    e.appendChild(a);

    if (window.innerWidth < BREAK && i < NAV.length - 1) {
      e.appendChild(document.createElement("BR"));
    } else if (i < NAV.length - 1) {
      e.appendChild(document.createTextNode(DIVIDER));
    }
  }
}

function topBarResize() {
  document.getElementById("nav").innerText = "";
  document.getElementById("name").innerText = "";
  generateNav();
  generateName();
}

generateName();
generateNav();
