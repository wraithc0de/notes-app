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
    if (!openFolders.includes("recent") && document.getElementById("recentnotessection").classList.contains('expanded')) {
        openFolders.push("recent");
    } else {
        const index = openFolders.indexOf("recent")
        if (index > -1) openFolders.splice(index, 1);
    }
    localStorage.setItem("open_folders", JSON.stringify(openFolders));
});

//////
// RENDERING
const listRecent = document.getElementById("il-recentitems");
const sectionsContainer = document.getElementById("navnoteslistarea");

var notesRef = {};
var recentNotes = [];
var folders = {};

var openFolders = JSON.parse(localStorage.getItem("open_folders")) || [];

function renderNav() {
    sectionsContainer.innerHTML = "";
    Object.values(folders).forEach((f) => {
        var folder = document.createElement("section");
        folder.draggable = true;
        folder.classList.add("node", "folder");
        folder.innerHTML = `
            <header>
                <i class="ti ti-chevron-right expanded-indic"></i>
                <span id="objectName-${f.id}" class="object-name">${f.name}</span>
                <b class="idreference" style="display: none !important;">${f.id}</b>
            </header>
            <div id="il-${f.id}" class="itemlist">
                <span class="no-notes" style="margin-left: 1rem;">This folder is empty!</span>
            </div>
        `;
        folder.querySelector("header").addEventListener("click", () => {
            folder.classList.toggle('expanded');
            if (!openFolders.includes(f.id) && folder.classList.contains('expanded')) {
                openFolders.push(f.id);
            } else {
                const index = openFolders.indexOf(f.id)
                if (index > -1) openFolders.splice(index, 1);
            }
            localStorage.setItem("open_folders", JSON.stringify(openFolders));
        });

        sectionsContainer.appendChild(folder);
    });

    Object.values(notesRef).forEach((n) => {
        var item = document.createElement("div");
        item.classList.add("node", "item");
        item.draggable = true;
        item.innerHTML = `
            <span id="objectName-${n.id}" class="object-name">${n.name}</span>
            <b class="idreference" style="display: none !important;">${n.id}</b>
        `;
        item.onclick = () => openNote(n.id);

        if (n.location != "") document.getElementById("il-"+n.location).appendChild(item);
        else sectionsContainer.appendChild(item);
    });
    if (!sectionsContainer.querySelector(".item") && !sectionsContainer.querySelector("section")) sectionsContainer.insertAdjacentHTML("beforeend", `<span class="no-notes">Nothing to display.</span>`);

    const spacer = document.createElement("div");
    spacer.classList.add("treespacer");

    sectionsContainer.appendChild(spacer);

    renderRecent();
    

    // open folders that were open before reload
    document.querySelectorAll("#navnoteslistarea > section").forEach((folder) => {
        const folderId = folder.querySelector(".idreference").innerText;
        if (openFolders.includes(folderId)) {
            folder.classList.add("expanded");
        }
    });
    if (openFolders.includes("recent")) {
        document.getElementById("recentnotessection").classList.add('expanded');
    }
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
                    <span class="object-name">${ref.name}</span>
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

var currentNote = null;

var historyCache = {};

function openNote(id, isInitializing = false) {
    if (!id) return;
    if (currentNote != id) {
        const history = quill.getModule('history');

        // save previous note's history before switching
        if (currentNote) {
            historyCache[currentNote] = {
                undo: [...history.stack.undo],
                redo: [...history.stack.redo]
            };
        }

        currentNote = id;
        handleNoNoteOpen();
        // 'silent' so quill doesn't think switching is a user action
        quill.setContents(noteContents[id], 'silent');
        quill.focus();

        // remove previous note's history stack from memory and set to the current one's
        history.clear();
        if (historyCache[id]) {
            history.stack.undo = historyCache[id].undo;
            history.stack.redo = historyCache[id].redo;
        }
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

    const rIndex = recentNotes.indexOf(id);
    if (rIndex !== -1) {
        recentNotes.splice(rIndex, 1);
        localStorage.setItem("recent_notes", recentNotes);
    }

    const noteName = notesRef[id].name;
    delete notesRef[id];
    localStorage.setItem("notes_reference", JSON.stringify(notesRef));
    localStorage.removeItem("note_"+id);
    if (currentNote == id) {
        currentNote = null;
        localStorage.setItem("LAST_OPEN", "");
        if (recentNotes[0]) {
            openNote(recentNotes[0]);
        } else {
            handleNoNoteOpen();
        }
    }
    renderNav();
    notification('success', `Successfully deleted "${noteName}".`);
}

function deleteFolder(id) {
    closeDialog('deleteconfirmation');
    confirmBtn.onclick = null;
    const folderName = folders[id].name;
    delete folders[id];
    localStorage.setItem("folders", JSON.stringify(folders));
    if (openFolders.includes(id)) openFolders.splice(openFolders.indexOf(id), 1);
    localStorage.setItem("open_folders", openFolders);
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


function expandAllFolders() {
    document.querySelectorAll("#navnoteslistarea > section").forEach((folder) => {
        folder.classList.add("expanded");
    });
}

function collapseAllFolders() {
    document.querySelectorAll("#navnoteslistarea > section").forEach((folder) => {
        folder.classList.remove("expanded");
    });
}

function handleNoNoteOpen() {
    if (!currentNote) {
        document.getElementById("workspace").classList.remove("noteopen");
    } else {
        document.getElementById("workspace").classList.add("noteopen");
    }
}


function renameObject(type, id) {
    const nameSpan = document.getElementById("objectName-"+id);
    const tempIfCancel = nameSpan.innerText;
    nameSpan.contentEditable = true;
    nameSpan.focus();
    nameSpan.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            nameSpan.contentEditable = false;
            nameSpan.innerText = tempIfCancel;
            document.removeEventListener("click", handleOutsideClick);
        } else if (e.key === "Enter") {
            e.preventDefault();
            nameSpan.contentEditable = false;
            if (type == 'note') {
                notesRef[id].name = nameSpan.innerText;
                localStorage.setItem("notes_reference", JSON.stringify(notesRef));
            } else if (type == 'folder') {
                folders[id].name = nameSpan.innerText;
                localStorage.setItem("folders", JSON.stringify(folders));
            }
            document.removeEventListener("click", handleOutsideClick);
            renderNav();
        }
    });
    // click outside text box, cancel. handleOutsideClick predefined so accessible by keypress listeners
    var handleOutsideClick;
    setTimeout(() => {
        handleOutsideClick = (e) => {
            if (!e.target.closest("#objectName-" + id)) {
                nameSpan.contentEditable = false;
                nameSpan.innerText = tempIfCancel;
                document.removeEventListener("click", handleOutsideClick);
            }
        };
        document.addEventListener("click", handleOutsideClick);
    }, 0);
}

//////
// ORDERING
var draggedElement = null;

function clearDragStyles() {
    sectionsContainer.classList.remove('drag-root-active');
    document.querySelectorAll('.node').forEach((node) => {
        node.classList.remove('drag-sort-above', 'drag-sort-below', 'drag-nest-inside');
    });
}

function restoreSpacerPosition() {
    sectionsContainer.appendChild(sectionsContainer.querySelector('.treespacer'));
}

sectionsContainer.addEventListener('dragstart', (e) => {
    draggedElement = e.target.closest('.node');
    if (!draggedElement) return;
    // leave time for browser to copy drag image before altering
    setTimeout(() => {draggedElement.classList.add('dragging')}, 0);
});

sectionsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const targetNode = e.target.closest('.node');
    if (!targetNode) {
        clearDragStyles();
        if (draggedElement.classList.contains('item')) {
            sectionsContainer.classList.add('drag-root-active');
        }
        return;
    }

    if (targetNode === draggedElement) return;

    clearDragStyles();

    const draggedType = draggedElement.classList.contains('item') ? 'item' : 'folder';
    const targetType = targetNode.classList.contains('item') ? 'item' : 'folder';

    const rect = targetNode.getBoundingClientRect();
    const relativeY = (e.clientY - rect.top) / rect.height; // 0 to 1, from top

    if (draggedType == 'folder' && targetType == 'item') return; // folders can't be put into items obviously
    if (draggedType == 'item' && targetType == 'folder') { // item dragged over probably header of folder
        targetNode.classList.add('drag-nest-inside');
    } else if (draggedType == 'item' && targetType == 'item') {
        if (relativeY < 0.5) {
            targetNode.classList.add('drag-sort-above');
        } else {
            targetNode.classList.add('drag-sort-below');
        }
    }
});

sectionsContainer.addEventListener('dragleave', (e) => {
    // only clear if cursor is leaving element affected
    if (e.target.classList.contains('node') || e.target == sectionsContainer) {
        clearDragStyles();
    }
});

sectionsContainer.addEventListener('dragend', () => {
    if (draggedElement) draggedElement.classList.remove('dragging');
    clearDragStyles();
    draggedElement = null;
});

sectionsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const targetNode = e.target.closest('.node');

    if (!targetNode && sectionsContainer.classList.contains('drag-root-active')) { // root container
        sectionsContainer.appendChild(draggedElement);
        restoreSpacerPosition();
        clearDragStyles();
        return;
    }

    if (!targetNode || targetNode == draggedElement) return; // null or self reference

    if (targetNode.classList.contains('drag-nest-inside')) {
        targetNode.querySelector('.itemlist').appendChild(draggedElement);
    } else
    if (targetNode.classList.contains('drag-sort-above')) {
        targetNode.parentNode.insertBefore(draggedElement, targetNode);
    } else
    if (targetNode.classList.contains('drag-sort-below')) {
        targetNode.parentNode.insertBefore(draggedElement, targetNode.nextSibling);
    }

    clearDragStyles();
});