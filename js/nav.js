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
    for (var id in notesRef) {
        const note = notesRef[id];
        if (note.name.toLowerCase().includes(nsearchinput.value.toLowerCase())) {
            numResults++;
            var result = document.createElement("div");
            result.classList.add("navsearchresult");
            result.innerHTML = `<span>${note.name}</span>`;
            result.onclick = () => openNote(note.id);
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

var notesRef = {};
var recentNotes = [];
var folders = {};

var openFolders = [];

function renderNav() {
    sectionsContainer.innerHTML = "";
    Object.values(folders).forEach((f) => {
        var folder = document.createElement("section");
        folder.innerHTML = `
            <header>
                <i class="ti ti-chevron-right expanded-indic"></i>
                <span>${f.name}</span>
                <b class="idreference" style="display: none !important;">${f.id}</b>
            </header>
            <div id="il-${f.id}" class="itemlist">
                <span class="no-notes">This folder is empty!</span>
            </div>
        `;
        folder.querySelector("header").addEventListener("click", () => {folder.classList.toggle('expanded');});

        sectionsContainer.appendChild(folder);
    });

    Object.values(notesRef).forEach((n) => {
        var item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${n.name}</span>
            <div class="spacer"></div>
            <b class="idreference" style="display: none !important;">${n.id}</b>
        `;
        item.onclick = () => openNote(n.id);

        if (n.location != "") document.getElementById("il-"+n.location).appendChild(item);
        else sectionsContainer.appendChild(item);
    });

    renderRecent();
}

function renderRecent() {
    document.getElementById("il-recentitems").innerHTML = "<span class='no-notes'>Recently opened notes will appear here.</span>";
    if (recentNotes.length > 0) {
        document.getElementById("il-recentitems").innerHTML = "";
        recentNotes.forEach((id) => {
            const ref = notesRef[id];
            if (ref) {
                var item = document.createElement("div");
                item.classList.add("item");
                item.innerHTML = `
                    <span>${ref.name}</span>
                    <div class="spacer"></div>
                `;
                item.onclick = () => openNote(ref.id);

                listRecent.appendChild(item);
            }
        });
    }
}

// end rendering
//////

var noteContents = {};

const textArea = document.getElementById("text-area");
var currentNote = null;

function openNote(id, isInitializing = false) {
    if (currentNote != id) {
        currentNote = id;
        textArea.innerHTML = noteContents[id] || "";
        textArea.focus();
    }
    localStorage.setItem("LAST_OPEN", id);
    if (!isInitializing) {
        recentNotes.reverse();
        if (recentNotes.includes(id)) {
            recentNotes.splice(recentNotes.indexOf(id), 1);
            recentNotes.push(id);
        } else {
            if (recentNotes.length > 2) {
                recentNotes.shift();
            }
            recentNotes.push(id);
        }
        recentNotes.reverse();

        localStorage.setItem("recent_notes", JSON.stringify(recentNotes));
        renderRecent();
    }
}

function createObject(type, name) {
    if (type == "folder") {
        const id = generateId(16);
        folders[id] = {"id": id, "name": name || id};
        localStorage.setItem("folders", JSON.stringify(folders));
    } else if (type == "note") {
        const id = generateId(16);
        // if blank name, set name as the id
        notesRef[id] = {"id": id, "name": name || id, "location": "", "locked": false};
        localStorage.setItem("notes_reference", JSON.stringify(notesRef));
        localStorage.setItem("note_"+id, "");
        noteContents[id] = localStorage.getItem("note_"+id);
    }
    closeDialog('newobject');
    renderNav();
}

function deleteNote(id) {
    closeDialog('deleteconfirmation');
    confirmBtn.onclick = null;

    if (!notesRef[id]) return;

    const index = recentNotes.indexOf(id);
    if (index !== -1) {
        recentNotes.splice(index, 1);
    }

    const noteName = notesRef[id].name;
    delete notesRef[id];
    localStorage.setItem("notes_reference", JSON.stringify(notesRef));
    localStorage.removeItem("note_"+id);
    renderNav();
    notification('success', `Successfully deleted "${noteName}".`);
}

function deleteFolder(id) {
    closeDialog('deleteconfirmation');
    confirmBtn.onclick = null;
    const folderName = folders[id].name;
    delete folders[id];
    localStorage.setItem("folders", JSON.stringify(folders));
    renderNav();
    notification('success', `Successfully deleted "${folderName}" and all its contents.`);
}

const confirmBtn = document.getElementById("deleteconfirmationBtn");
const confirmNameText = document.getElementById("deleteconfirmationName");
function deleteConfirmation(type, id) {
    if (type == 'note') {
        confirmBtn.onclick = () => deleteNote(id);
        confirmNameText.innerText = `"${notesRef[id].name}"`;
    } else if (type == 'folder') {
        confirmBtn.onclick = () => deleteFolder(id);
        confirmNameText.innerText = `"${folders[id].name}" and all its contents`;
    }
    openDialog('deleteconfirmation');
}


function cleanupRecentNotes() {
    const validRecentNotes = recentNotes.filter(id => id in notesRef);
    if (validRecentNotes.length !== recentNotes.length) {
        recentNotes = validRecentNotes;
        localStorage.setItem("recent_notes", JSON.stringify(recentNotes));
    }
}