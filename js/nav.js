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
    var moveto = currentVal + (mx - tmx);

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

document.querySelectorAll("nav>section:not(#navsearch) header").forEach((h) => {
    h.addEventListener("click", () => {
        h.parentElement.classList.toggle('expanded');
    });
});

// RENDERING
const listAll = document.getElementById("il-allnotes");
const listRecent = document.getElementById("il-recentitems");

var notesRef = [
    ["File Name", "i8wa7tgf", "Folder 1"],
    ["New File 2", "ap90q2n8", ""]
];
var notesRefLocked = [];
var recentNotes = ["ap90q2n8"];
var folders = ["Folder 1"];

function renderNav() {
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

        nav.appendChild(folder);
    });

    notesRef.forEach((n) => {
        var item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${n[0]}</span>
            <div class="spacer"></div>
        `;
        item.onclick = openNote(n[1]);

        if (n[2] != "") document.getElementById("il-"+n[2].replaceAll(' ', '')).appendChild(item);
        else nav.appendChild(item);
    });

    recentNotes.forEach((n) => {
        ref = notesRef.findIndex(x => x[1] === n);
        var item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <span>${notesRef[ref][0]}</span>
            <div class="spacer"></div>
        `;
        item.onclick = openNote(notesRef[ref][1]);

        listRecent.appendChild(item);
    });
}

renderNav();


// end rendering

function openNote(id) {
    
}