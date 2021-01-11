let content;

let pageTitle;

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

function listAllTags() {
  let tagList = {
    year: [],
    course: [],
    people: [],
    company: [],
    skills: [],
    categories: []
  };
  
  for (let i = 0; i < content.content.length; i++) {
    let c = content.content[i];
    
    for (let t in c.tags) {
      if (t == "year" &&
          tagList.year.indexOf(c.tags.year.toString()) < 0) {
        tagList.year.push(c.tags.year.toString());
      } else if (t != "year" && c.tags[t] != null) {
        for (let j = 0; j < c.tags[t].length; j++) {
          if (tagList[t].indexOf(c.tags[t][j]) < 0) {
            tagList[t].push(c.tags[t][j]);
          }
        }
      }
    }
  }
  
  for (let t in tagList) {
    tagList[t].sort();
  }
  
  return tagList;
}

function parseTags(h) {
  let tags = [];

  if (h != "" && h != "#" && h != undefined) {
    let subH = h.substring(1);
    let i = subH.indexOf('+');
    while (i > 0) {
      tags.push(subH.substring(0,i).replace(/-/g, ' '));
      subH = subH.substring(i + 1);
      i = subH.indexOf('+');
    }
    tags.push(subH.replace(/-/g, ' '));
    
    tags.sort();
  }
  return tags;
}

function labelTags(t,allTags) {
  let labelT = {
    year: [],
    course: [],
    people: [],
    company: [],
    skills: [],
    categories: []
  }

  for (let i = 0; i < t.length; i++) {
    let foundTag = false;

    for (let j in allTags) {
      if (allTags[j].indexOf(t[i]) >= 0) {
        labelT[j].push(t[i]);
        foundTag = true;
        break;
      }
    }

    if (!foundTag) {
      console.log("INVALID TAG: " + t[i]);
    }
  }
  
  return labelT;
}

function writeHash(tags) {
  let hash = "#";
  let scroll = document.documentElement.scrollTop;
  for (let j = 0; j < tags.length; j++) {
    hash = hash + (j < 1 ? "" : "+") + tags[j].replace(/ /g, '-'); 
  }
  location.hash = hash;
  document.documentElement.scrollTop = scroll;
}

function removeTag(t) {
  let tags = parseTags(location.hash);

  let i = tags.indexOf(t);
  if (i >= 0) {
    tags.splice(i,1);
    writeHash(tags);
  }

  console.log("removeTag " + t);
}

function addTag(t) {
  let tags = parseTags(location.hash);

  let i = tags.indexOf(t);
  if (i < 0) {
    tags.push(t);
    writeHash(tags);
  }

  console.log("addTag " + t);
}

function getTaggedWork(t) {
  let work = [];
  for (let i = 0; i < content.content.length; i++) {
    let included = false;
    let w = {
      title: content.content[i].title,
      hash: content.content[i].hash,
      rank: content.content[i].rank,
      size: content.content[i].size,
      tags: content.content[i].tags
    };
    for (let tagSection in t) {
      if (t[tagSection].length == 0) {
        included = true;
      } else {
        let found = false;
        for (let i = 0; i < t[tagSection].length; i++) {
          console.log(w.tags[tagSection]);
          if (w.tags[tagSection] != null &&
              ((typeof w.tags[tagSection] == "number" &&
                w.tags[tagSection] == t[tagSection][i]) ||
               (typeof w.tags[tagSection] == "object" &&
                 w.tags[tagSection].indexOf(t[tagSection][i]) >= 0))) {
            included = true;
            found = true;
            break;
          }
        }
        if (!found) {
          included = false;
          break;
        }
      }
    }
    if (included) {
      work.push(w);
    }
  }
  return work;
}

function clearPage() {
  let c = document.getElementById("content");
  let m = document.getElementById("sideNav");
  if (c != null) {
    while (c.hasChildNodes()) {
      c.removeChild(c.lastChild);
    }
  }
  if (m != null) {
    while (m.hasChildNodes()) {
      m.removeChild(m.lastChild);
    }
  }
}

function generateTagList(tags,allTags,c) {
  let menu = document.getElementById("sideNav");

  let closeBtn = document.createElement("BUTTON");
  closeBtn.className = "closebtn";
  closeBtn.onclick = function() {closeTags();};
  closeBtn.innerHTML = "&#215;";

  menu.appendChild(closeBtn);
  
  let tagSections = {
    year: document.createElement("DIV"),
    course: document.createElement("DIV"),
    //people: document.createElement("DIV"),
    company: document.createElement("DIV"),
    skills: document.createElement("DIV"),
    categories: document.createElement("DIV")
  };

  for (let t in tagSections) {
    if (t != "people") {
      tagSections[t].id = "tagsMenuTitle";
      let title = document.createTextNode(
        (t == "categories") ? "Tags" :
          t.charAt(0).toUpperCase() + t.slice(1));
      
      tagSections[t].appendChild(title);
      
      for (let i = 0; i < allTags[t].length; i++) {
        let btn = document.createElement("BUTTON");
        btn.className = "tagButton";
        if (tags[t].indexOf(allTags[t][i]) >= 0) {
          btn.id = t + "Selected";
          btn.onclick = function() {removeTag(allTags[t][i]);};
          btn.innerHTML = "&nbsp;" + allTags[t][i] + "&nbsp;&#215;&nbsp;";
        } else {
          btn.id = t + "Unselected";
          btn.onclick = function() {addTag(allTags[t][i]);};
          btn.innerHTML = "&nbsp;" + allTags[t][i] + "&nbsp;";
        }
        tagSections[t].appendChild(document.createElement("BR"));
        tagSections[t].appendChild(btn);
      }
      
      menu.appendChild(tagSections[t]);
    }
  }
}

function generateTags(t,n) {
  let r = document.createElement("DIV");
  r.className = "row align-items-bottom";
  r.style["padding-top"] = "30px";
  r.style["padding-left"] = "15px";
  r.style["padding-right"] = "15px";
  r.style["padding-bottom"] = "30px";

  let c = document.createElement("DIV");
  c.id = "indexTags";

  let f = document.createElement("SPAN");
  f.id = "tagsMod";
  
  let fBtn = document.createElement("BUTTON");
  fBtn.id = "tagsButton";
  fBtn.onclick = function() {openTags();};
  fBtn.innerHTML = "&nbsp;&#8942; Filter&nbsp;";

  f.appendChild(fBtn);
  c.appendChild(f);
  c.appendChild(document.createTextNode(" "));
  
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

    if (tag.con != undefined && tag.con != null && tag.con.length > 0) {
      let cat = document.createElement("SPAN");
      cat.id = tag.cat + "Section";
      
      for (let j = 0; j < tag.con.length; j++) {
        let catC = document.createElement("SPAN");
        catC.id = tag.cat + "Tag";
        catC.innerHTML = "&nbsp;" + tag.con[j] + "&nbsp;";
        cat.appendChild(catC);
        
        if (j + 1 < tag.con.length) {
          cat.appendChild(document.createTextNode(" "));
        }
      }

      if (i + 1 < Object.keys(tags).length) {
        cat.appendChild(document.createTextNode(" "));
      }

      c.appendChild(cat);
    }
  }

  r.appendChild(c);

  n.appendChild(r);
}

function generateTiles(t,c) {
  let thumbs = getTaggedWork(t);
  thumbs.sort(function(a,b) {
    return b.rank == a.rank ? b.tags.year - a.tags.year : b.rank - a.rank;
  });

  let r = document.createElement("DIV");
  r.className = "row";
  for (let i = 0; i < thumbs.length; i++) {
    let tileCol = document.createElement("DIV");
    tileCol.className = "col-lg-3 col-md-4 col-sm-6 col-12 spacer";

    let tileContainer = document.createElement("DIV");
    tileContainer.className = "imgContainer";

    let tileLnk = document.createElement("A");
    tileLnk.href = "work.html#" + thumbs[i].hash;

    let tileImg = document.createElement("IMG");
    tileImg.src = "media/thumb/" + thumbs[i].hash + ".png";
    tileImg.alt = thumbs[i].title;
    tileImg.className = "imageLink img-fluid";

    let tileOverlay = document.createElement("DIV");
    tileOverlay.className = "imgOverlay";

    let tileTxt = document.createElement("DIV");
    tileTxt.className = "imgText";
    tileTxt.innerHTML = thumbs[i].title;

    tileOverlay.appendChild(tileTxt);
    tileLnk.appendChild(tileImg);
    tileLnk.appendChild(tileOverlay);
    tileContainer.appendChild(tileLnk);
    tileCol.appendChild(tileContainer);
    r.appendChild(tileCol);
  }
  c.appendChild(r);
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

function openTags() {
  document.getElementById("sideNav").style.width =
    screen.width > 600 ? "400px" : "100%";
  document.getElementById("sideNav").style.outlineStyle =
    screen.width > 600 ? "solid" : "none";
  if (screen.width > 600) {
    document.getElementById("sideNav").style.outlineColor = "#000000";
    document.getElementById("sideNav").style.outlineWidth = "3px";
  }
}

function closeTags() {
  document.getElementById("sideNav").style.width = "0";
  document.getElementById("sideNav").style.outline = "none";
  //document.getElementById("main").style.marginLeft = "0";
}

function populateIndexPage(t, allTags) {
  let c = document.getElementById("content");
  let labelT = labelTags(t,allTags);
  generateTagList(labelT,allTags,c);
  generateTags(labelT,c);
  generateTiles(labelT,c);
  generateCopyright(c);
}

function populate() {
  let hash = location.hash;
  let tags = parseTags(hash);
  let allTags = listAllTags();
  
  if (tags != null && tags != []) {
    clearPage();
    populateIndexPage(tags,allTags);
  }
}

function init() {
  loadJSON(function(response) {
    content = JSON.parse(response);
    populate();
  });
}

init();
