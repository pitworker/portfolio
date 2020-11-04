// LOAD THE PAGE CONTENT JSON
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "content.json", false);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
              callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function init() {
    let content;
    loadJSON(function(response) {
        pickupPath = JSON.parse(response);
    });
    return content;
}

const CONTENT = init();

let pageTitle;

function findHash(h) {
  if (h == "#home" || h == "") {
    return CONTENT.home;
  } else if (h == "#about") {
    return CONTENT.about;
  } else if (h == "#work") {
    return CONTENT.work;
  } else {
    for (let i = 0; i < CONTENT.content.length; i++) {
      let c = CONTENT.content[i];
      if ("#" + c.hash == h) return c;
    }
    return null;
  }
}

function clearPage() {
  let c = document.getElementById("content");
  while(c.hasChildNodes()) {
    c.removeChild(c.firstChild);
  }
}

function generateTitle(t) {
  let e = document.createElement("H1");
  e.innerText(t);

  let s = document.createElement("SPAN");
  s.style.color = "#ffc600";
  s.innerText("&#9646;");

  e.appendChild(s);
}

function generateTags(t) {
  let r = document.createElement("DIV");
  r.style["padding-left"] = "15px";
  r.style["padding-right"] = "15px";

  let p = document.createElement("P");
  //TODO: FINISH THIS METHOD
}

function generateContent(c) {
  for (let i = 0; i < c.length; i++) {
    if (c[i].type == "row") {
      generateRow(c[i].content);
    } else if (c[i].type == "column") {
      generateColumn(c[i].width, c[i].content);
    } else if (c[i].type == "carousel") {
      generateCarousel(c[i].content);
    } else if (c[i].type == "text") {
      generateText(c[i].content);
    } else if (c[i].type == "img") {
      generateImg(c[i].alt, c[i].url);
    } else if (c[i].type == "video") {
      generateVideo(c[i].url);
    } else {
      console.log("type " + c[i].type + " is unrecognized");
    }
  }
}

function generateRow(c) {
  let e = document.createElement("DIV");
  e.className = "row";
  e.appendChild(generateContent(c));
  return e;
}

function generateColumn(w,c) {
  let e = document.createElement("DIV");
  e.className = "col-md-" + w + " col-12";
  e.style["padding-bottom"] = "30px";
  e.appendChild(generateContent(c));
  return e;
}

function generateCarousel(c) {
  let e = document.createElement("DIV");
  e.className = "carousel slide";
  e.setAttribute("id", "carousel1");
  e.setAttribute("data-ride", "carousel");
  e.setAttribute("data-interval", "false");

  let inner = document.createElement("DIV");
  inner.className = "carousel-inner";

  for (let i = 0; i < c.length; i++) {
    let img = document.createElement("DIV");
    if (i == 0) img.className = "carousel-item active";
    else img.className = "carousel-item";

    let imgChild = document.createElement("IMG");
    imgChild.className = "img-fluid";
    imgChild.setAttribute("src", c[i].url);
    imgChild.setAttribute("alt", c[i].alt);

    img.appendChild(imgChild);
    inner.appendChild(img);
  }

  e.appendChild(inner);

  return e;
}

function generateText(c) {
  let e = document.createElement("P");
  e.innerText = c;
  return e;
}

function generateImg(a,u) {
  let e = document.createElement("IMG");
  e.className = "img-fluid";
  e.setAttribute("src", u);
  e.setAttribute("alt", a);
  return e;
}

function generateVideo(u) {
  let e = document.createElement("DIV");
  e.style.position = "relative";
  e.style.overflow = "hidden";
  e.style["padding-bottom"] = "56.25%";

  let i = document.createElement("IFRAME");
  i.style.position = "absolute";
  i.style.top = "0";
  i.style.left = "0";
  i.style.width = "100%";
  i.style.height = "100%";
  i.style.border = "0";
  i.setAttribute("src", u);
  i.setAttribute("frameborder", "0");
  i.setAttributeNode(document.createAttribute("allowfullscreen"));

  e.appendChild(i);
  return e;
}

function generateCopyright() {
  let e = document.createElement("DIV");
  e.className("row");
  e.appendChild(document.createElement("BR"));
  e.appendChild(document.createElement("BR"));
  e.appendChild(document.createElement("BR"));
  e.appendChild(document.createElement("BR"));
  e.appendChild(document.createElement("BR"));

  let p = document.createElement("P");
  p.className("text-center");
  p.innerText = "&copy;" + CONTENT.copyright;

  e.appendChild(p);
  return e;
}

function populateContentPage(p) {
  let c = document.getElementById("content");
  c.appendChild(generateTitle(p.title));
  c.appendChild(generateTags(p.tags));
  c.appendChild(generateContent(p.content));
  c.appendChild(generateCopyright());
}

function populate() {
  let hash = location.hash;
  let page = findHash(hash);

  if (page != null) {
    clearPage();
    if (page.hash == "home") {

    } else if (page.hash == "about") {

    } else if (page.hash == "work") {

    } else {
      populateContentPage(page);
    }
  }
}

populate();
