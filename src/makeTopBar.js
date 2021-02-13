const NAME = "Sebastian Carpenter";
const NAME_LINES = ["Sebastian", "Carpenter"];
const NAME_SHORT = "SBC";
const NAV = [
  ["Work", "index.html"],
  ["About", "about.html"],
  ["Resume", "docs/resume.pdf"]
];
const DIVIDER = " | ";
const BREAK = 992;
const OBREAK = 15;

let lastOffset = document.getElementById("nav").getBoundingClientRect().top;

function generateName() {
  let e = document.getElementById("name");
  if (lastOffset <= OBREAK && window.innerWidth < BREAK) {
    e.className = "col-1 justify-content-between text-left";
    e.innerText = NAME_SHORT;
  } else if (window.innerWidth < BREAK) {
    let brokenName = "\n";
    for (let i = 0; i < NAME_LINES.length; i++) {
      brokenName = brokenName + NAME_LINES[i];
      if (i < NAME_LINES.length - 1) {
        brokenName = brokenName + "\n";
      }
    }
    e.className = "col-6 justify-content-between text-left";
    e.innerText = brokenName;
  } else {
    e.className = "col-6 justify-content-between text-left";
    e.innerText = NAME;
  }
}

function generateNav() {
  let e = document.getElementById("nav");

  if (lastOffset <= OBREAK && window.innerWidth < BREAK) {
    e.className = "col-11 justify-content-between text-right";
  } else {
    e.className = "col-6 justify-content-between text-right";
  }

  for (let i = 0; i < NAV.length; i++) {
    let a = document.createElement("A");
    if (NAV[i][0] == "Resume") a.target = "_blank";
    a.href = NAV[i][1];
    a.innerText = NAV[i][0];

    e.appendChild(a);

    if (window.innerWidth < BREAK &&
        i < NAV.length - 1 &&
        lastOffset > OBREAK) {
      e.appendChild(document.createElement("BR"));
    } else if (i < NAV.length - 1) {
      e.appendChild(document.createTextNode(DIVIDER));
    }
  }
}

function topBarResize() {
  lastOffset = document.getElementById("nav").getBoundingClientRect().top;
  document.getElementById("nav").innerText = "";
  document.getElementById("name").innerText = "";
  generateNav();
  generateName();
}

window.onscroll = function() {
  let offset = document.getElementById("nav").getBoundingClientRect().top;

  if ((offset > OBREAK && lastOffset <= OBREAK) ||
      (offset <= OBREAK && lastOffset > OBREAK)) {
    topBarResize();
  }
};

generateName();
generateNav();
