const nav = document.querySelector("#midsect>nav");

// RESIZING
const MIN_PANEL_W = 10;
const nr = document.getElementById("navresize");

var tmx;
nr.addEventListener("mousedown", (e) => {
    tmx = e.clientX;
    window.addEventListener("pointermove", handleMove);
    nr.classList.add("inuse");
});

function handleMove(e) {
    var currentVal = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-w").trim().replace("px", ""));
    var mx = e.clientX;

    console.log(currentVal);

    // for layout opts, could be more compact but is like this for simplicity
    if (document.documentElement.classList.contains("lo-nr")) {
        var moveto = currentVal - (mx - tmx);
    } else {
        var moveto = currentVal + (mx - tmx);
    }

    if (moveto < remToPx(MIN_PANEL_W)) {moveto = remToPx(MIN_PANEL_W)}
    if (moveto > document.getElementById("midsect").clientWidth - remToPx(MIN_PANEL_W)) {moveto = document.getElementById("midsect").clientWidth - remToPx(MIN_PANEL_W)}

    tmx = mx;

    document.documentElement.style.setProperty("--nav-w", moveto + "px");
}

window.addEventListener("mouseup", () => {
    nr.classList.remove("inuse");
    window.removeEventListener("pointermove", handleMove);
});
// end resizing

// SEARCHING
const nsearchinput = document.getElementById("navsearchinput");
const nsearchsect = document.getElementById("navsearch");
const nresults = document.getElementById("navsearchresults");
const nsearchbtn = document.getElementById("navsearchbtn");

function activateNavSearch() {
    nresults.innerHTML = "<span>Enter a search query.</span>";
    nsearchsect.classList.add("shown");
    nsearchinput.focus();
}

function deactivateNavSearch() {
    nsearchinput.value = "";
    nsearchinput.blur();
    nsearchsect.classList.remove("shown");
}

document.addEventListener("click", (event) => {
    if (!nsearchsect.contains(event.target) && !nsearchbtn.contains(event.target)) {
        deactivateNavSearch();
    }
});

nsearchinput.addEventListener("input", () => {
    nresults.innerHTML = "";
    var numResults = 0;
    for (var note of notesRef) {
        if (note[0].toLowerCase().includes(nsearchinput.value.toLowerCase())) {
            numResults++;
            var result = document.createElement("div");
            result.classList.add("navsearchresult");
            result.innerHTML = `<span>${note[0]}</span>`;
            nresults.appendChild(result);
        }
    }
    if (numResults < 1) {
        nresults.innerHTML = "<span>No results.</span>";
    }
    if (nsearchinput.value.trim() == "") {
        nresults.innerHTML = "<span>Enter a search query.</span>";
    }
});

// end searching

// special little snowflake
document.querySelector("#recentnotessection header").addEventListener("click", () => {
    document.getElementById("recentnotessection").classList.toggle('expanded');
});

//////
// RENDERING
const listRecent = document.getElementById("il-recentitems");
const sectionsContainer = document.getElementById("navnoteslistarea");

var notesRef = [];
var notesRefLocked = [];
var recentNotes = [];
var folders = ["Folder 1"];

function renderNav() {
    sectionsContainer.innerHTML = "";
    folders.forEach((f) => {
        var folder = document.createElement("section");
        folder.innerHTML = `
            <header>
                <i class="ti ti-chevron-right expanded-indic"></i>
                <span>${f}</span>
            </header>
            <div id="il-${f.replaceAll(' ', '')}" class="itemlist">
                <span class="no-notes">This folder is empty!</span>
            </div>
        `;
        folder.querySelector("header").addEventListener("click", () => {folder.classList.toggle('expanded');});

        sectionsContainer.appendChild(folder);
    });

    notesRef.forEach((n) => {
        var item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${n[0]}</span>
            <div class="spacer"></div>
            <b class="itemidreference" style="display: none !important;">${n[1]}</b>
        `;
        item.onclick = () => openNote(n[1]);

        if (n[2] != "") document.getElementById("il-"+n[2].replaceAll(' ', '')).appendChild(item);
        else sectionsContainer.appendChild(item);
    });

    document.getElementById("il-recentitems").innerHTML = "";
    recentNotes.forEach((n) => {
        ref = notesRef.findIndex(x => x[1] === n);
        var item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${notesRef[ref][0]}</span>
            <div class="spacer"></div>
        `;
        item.onclick = () => openNote(notesRef[ref][1]);

        listRecent.appendChild(item);
    });
}

// end rendering
//////

var noteContents = {};

const textArea = document.getElementById("text-area");
var currentNote = null;

function openNote(id) {console.log(id);
    if (currentNote != id) {
        currentNote = id;
        textArea.innerHTML = noteContents[id];
        textArea.focus();
    }
    localStorage.setItem("LAST_OPEN", id);
    
}

function createObject(type, name) {
    if (type == "folder") {
        folders.push(name);
        localStorage.setItem("folders", JSON.stringify(folders));
    } else if (type == "note") {
        const id = generateId(8);
        // if blank name, set name as the id
        notesRef.push([name.trim()!=""?name:id, id, ""]);
        localStorage.setItem("notes_reference", JSON.stringify(notesRef));
    }

    renderNav();
}

//////
// loading and saving shi, move to another file thats name more appropriately later
window.addEventListener("load", () => {
    notesRef = JSON.parse(localStorage.getItem("notes_reference")) || [];
    folders = JSON.parse(localStorage.getItem("folders")) || [];

    notesRef.forEach((i) => {
        noteContents[i[1]] = localStorage.getItem("note_"+i[1]) || "";
    });

    renderNav();
    openNote(localStorage.getItem("LAST_OPEN"));
});




setInterval(() => {
    if (currentNote) {
        noteContents[currentNote] = textArea.innerHTML;
        localStorage.setItem("note_"+currentNote, noteContents[currentNote]);
    }
}, 500);