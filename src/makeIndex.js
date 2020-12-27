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
    
    for (t in c.tags) {
      if (t == "year" && !tagList.year.includes(c.tags.year)) {
        tagList.year.push(c.tags.year.toString());
      } else if (t != "year" && c.tags[t] != null) {
        for (let j = 0; j < c.tags[t].length; j++) {
          tagList[t].push(c.tags[t][j]);
        }
      }
    }
  }
  
  for (t in tagList) {
    tagList[t].sort();
  }
  
  return tagList;
}

function parseTags(h) {
  let tags = [];
  let subH = h.substring(1);
  let i = subH.indexOf('+');
  while (i > 0) {
    tags.push(subH.substring(0,i).replace(/-/g, ' '));
    subH = subH.substring(i + 1);
    i = subH.indexOf('+');
  }
  tags.push(subH.replace(/-/g, ' '));

  tags.sort();
  
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

    for (j in allTags) {
      if (allTags[j].includes(t[i])) {
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

function clearPage() {
  let c = document.getElementById("content");
  if (c != null) {
    while (c.hasChildNodes()) {
      c.removeChild(c.lastChild);
    }
  }
}

function generateTags(t,n) {
  let r = document.createElement("DIV");
  r.className = "row";
  r.style["padding-top"] = "30px";
  r.style["padding-left"] = "15px";
  r.style["padding-right"] = "15px";
  r.style["padding-bottom"] = "30px";

  let c = document.createElement("DIV");
  c.id = "tags";

  let f = document.createElement("SPAN");
  f.id = "tagsMod";
  
  let fBtn = document.createElement("A");
  fBtn.href = "javascript:openTags()";
  fBtn.innerHTML = "&#8942; Filters ";

  f.appendChild(fBtn);
  c.appendChild(f);
  
  /*let fTitle = document.createElement("SPAN");
  fTitle.id = "tagsTitle";
  fTitle.innerText =  " Filters ";

  c.appendChild(fTitle);*/
  
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
        
        let lnk = document.createElement("A");
        lnk.href = "index.html#" + tag.con[j].replace(/ /g, '-');
        lnk.innerHTML = "&nbsp;" + tag.con[j] + "&nbsp;";
        
        catC.appendChild(lnk);
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

function populateIndexPage(t, allTags) {
  let c = document.getElementById("content");
  generateTags(labelTags(t,allTags),c);
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
