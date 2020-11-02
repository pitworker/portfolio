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

function populateContentPage(p) {

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
