let content;

// LOAD THE PAGE CONTENT JSON
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "src/content.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
  console.log("loadingJSON");
}

function findHash(h) {
  if (h == "#home" || h == "") {
    return content.home;
  } else if (h == "#about") {
    return content.about;
  } else if (h == "#work") {
    return content.work;
  } else {
    for (let i = 0; i < content.content.length; i++) {
      let c = content.content[i];
      if ("#" + c.hash == h) return c;
    }
    return null;
  }
}

function clearPage() {
  let c = document.getElementById("content");
  if (c != null) {
    while (c.hasChildNodes()) {
      c.removeChild(c.lastChild);
    }
  }
}

function generateTitle(t,n) {
  let e = document.createElement("H1");
  e.innerHTML = t;

  let s = document.createElement("SPAN");
  s.style.color = "#ffc600";
  s.innerHTML = "&#9646;";

  e.appendChild(s);

  document.getElementById("content").appendChild(e);

  n.appendChild(e);
}

function generateTags(t,n) {
  let r = document.createElement("DIV");
  r.className = "row";
  r.style["padding-left"] = "15px";
  r.style["padding-right"] = "15px";
  r.style["padding-bottom"] = "30px";

  let c = document.createElement("DIV");
  c.id = "tags";

  let tags = {
    year: {
      cat: "Year",
      con: t.year
    },
    course: {
      cat: "Course",
      con: t.course
    },
    company: {
      cat: "Company",
      con: t.company
    },
    people: {
      cat: "People",
      con: t.people
    },
    skills: {
      cat: "Skills",
      con: t.skills
    },
    categories: {
      cat: "Tags",
      con: t.categories
    }
  }

  for (let i = 0; i < Object.keys(tags).length; i++) {
    let tag = tags[Object.keys(tags)[i]];

    if (tag.con != undefined && tag.con != null) {
      let cat = document.createElement("SPAN");
      cat.id = tag.cat + "Section";
      
      let catT = document.createElement("SPAN");
      catT.id = "tagTitle";
      catT.innerHTML = tag.cat + ": ";

      cat.appendChild(catT);

      if (typeof tag.con == "object") {
        for (let j = 0; j < tag.con.length; j++) {
          let catC = document.createElement("SPAN");
          catC.id = tag.cat + "Tag";

          let lnk = document.createElement("A");
          lnk.href = "index.html#" + tag.con[j].replace(/ /g, '-');
          lnk.innerHTML = "&nbsp;" + tag.con[j] + "&nbsp;";
          
          catC.appendChild(lnk);
          cat.appendChild(catC);

          if (j + 1 < tag.con.length) {
            cat.appendChild(document.createTextNode(" "));
          }
        }
      } else {
        let catC = document.createElement("SPAN");
        catC.id = tag.cat + "Tag";
        let lnk = document.createElement("A");
        lnk.href = "index.html#" +
          (typeof tag.con == "string" ? tag.con : tag.con.toString()).replace(/ /g, '-');
        lnk.innerHTML = "&nbsp;" + tag.con + "&nbsp;";
        
        catC.appendChild(lnk);
        cat.appendChild(catC);
      }

      if (i + 1 < Object.keys(tags).length) {
        cat.appendChild(document.createTextNode("  "));
      }

      c.appendChild(cat);
    }
  }

  r.appendChild(c)

  n.appendChild(r);;
}

function generateContent(c,n) {
  for (let i = 0; i < c.length; i++) {
    if (c[i].type == "row") {
      generateRow(c[i].content, n);
    } else if (c[i].type == "column") {
      generateColumn(c[i].width, c[i].content, n);
    } else if (c[i].type == "carousel") {
      generateCarousel(c[i].content, n);
    } else if (c[i].type == "text") {
      generateText(c[i].content, n);
    } else if (c[i].type == "html") {
      generateHTML(c[i].content, n);
    }else if (c[i].type == "img") {
      generateImg(c[i].alt, c[i].url, n);
    } else if (c[i].type == "video") {
      generateVideo(c[i].url, n);
    } else {
      console.log("type " + c[i].type + " is unrecognized");
    }
  }
}

function generateRow(c,n) {
  let e = document.createElement("DIV");
  e.className = "row";
  generateContent(c,e);
  n.appendChild(e);
}

function generateColumn(w,c,n) {
  let e = document.createElement("DIV");
  e.className = "col-md-" + w + " col-12";
  e.style["padding-bottom"] = "30px";
  generateContent(c,e);
  n.appendChild(e);
}

function generateCarousel(c,n) {
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
    imgChild.setAttribute("src",
			  "media/" + location.hash.substring(1) + "/" +
			  c[i].url);
    imgChild.setAttribute("alt", c[i].alt);

    img.appendChild(imgChild);
    inner.appendChild(img);
  }

  e.appendChild(inner);

  n.appendChild(e);
}

function generateText(c,n) {
  let e = document.createElement("P");
  e.innerText = c;
  n.appendChild(e);
}

function generateHTML(c,n) {
  let e = document.createElement("P");
  e.innerHTML = c;
  n.appendChild(e);
}

function generateImg(a,u,n) {
  let e = document.createElement("IMG");
  e.className = "img-fluid";
  e.setAttribute("src", "media/" + location.hash.substring(1) + "/" + u);
  e.setAttribute("alt", a);
  n.appendChild(e);
}

function generateVideo(u,n) {
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
  n.appendChild(e);
}

function generateCopyright(n) {
  let e = document.createElement("DIV");
  e.className = "row";

  let c = document.createElement("DIV");
  c.className = "col-12";
  c.style["padding-bottom"] = "30px";
  c.style["padding-top"] = "60px";

  let p = document.createElement("P");
  p.className = "text-center";
  p.innerHTML = "&copy;" + content.copyright;  
  
  c.appendChild(p);
  e.appendChild(c);
  n.appendChild(e);
}

function populateContentPage(p) {
  let c = document.getElementById("content");
  generateTitle(p.title,c);
  generateTags(p.tags,c);
  generateContent(p.content, c);
  generateCopyright(c);
}

function populate() {
  let hash = location.hash;
  let page = findHash(hash);

  if (page != null) {
    clearPage();
    populateContentPage(page);
  }
}

function init() {
  loadJSON(function(response) {
    content = JSON.parse(response);
    populate();
  });
}

init();
