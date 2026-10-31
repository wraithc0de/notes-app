var dialogs = document.querySelectorAll(".dialog-container");

function openDialog(id) {
    document.getElementById("dialog-"+id).classList.add("dialog-open");
}

function closeDialog(id) {
    document.getElementById("dialog-"+id).classList.remove("dialog-open");
}

function closeDialogByPointer(pointer) {
    pointer.classList.remove("dialog-open");
}

dialogs.forEach(dialog => {
    // x button
    const closeButton = dialog.querySelector(".dialog-close");
    if (closeButton) closeButton.addEventListener("click", () => { closeDialogByPointer(dialog); });
    // click outside dialog window
    dialog.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) { closeDialogByPointer(dialog); }
    });
    // esc key close
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") { closeDialogByPointer(dialog); }
    });
});

function notification(type = '', content, from = 'wNotes', length = 3) {
    const notif = document.createElement("div");
    notif.classList.add("notification");
    notif.classList.add("n-"+type);
    notif.innerHTML = `
        <header>
            <span>${from}</span>
            <button onclick="removeNotif(this.parentElement.parentElement)"><i class="ti ti-x"></i></button>
        </header>
        <div>
            <span>${content}</span>
        </div>
    `;

    notif.style.setProperty('--ndecayt', length+'s');

    document.getElementById("notificationsContainer").appendChild(notif);
    requestAnimationFrame(() => {
        notif.classList.add('displayed');
    });
    setTimeout(() => {
        removeNotif(notif);
    }, length*1000);
}

function removeNotif(pointer) {
    pointer.classList.add('gettingRemoved');
    pointer.classList.remove('displayed');
    setTimeout(() => {
        pointer.remove();
    }, 1000);
}


document.querySelectorAll(".cinput:not(:has(button ~ button)) input").forEach(i => {
    i.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            i.querySelector("button").click();
        }
    });
});

//////
// loading and saving stuff

function cleanupLocalStorage() {
    const validRecentNotes = recentNotes.filter(id => id in notesRef);
    if (validRecentNotes.length !== recentNotes.length) {
        recentNotes = validRecentNotes;
        localStorage.setItem("recent_notes", JSON.stringify(recentNotes));
    }
    // clean up ghost notes
    const keys = Object.keys(localStorage).filter(key => key.includes("note_"));
    keys.forEach(key => {
        const tk = key.replace("note_", "");
        if (!notesRef[tk]) localStorage.removeItem(key);
    });
}

function getStorageItem(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return fallback;
    }
}

window.addEventListener("load", () => {
    notesRef = getStorageItem("notes_reference", {});
    folders = getStorageItem("folders", {});
    recentNotes = getStorageItem("recent_notes", []);

    Object.keys(notesRef).forEach((id) => {
        // ops thing is empty quill delta structure
        noteContents[id] = JSON.parse(localStorage.getItem("note_"+id)) || {ops:[]};
    });
    cleanupLocalStorage();
    renderNav();
    const gotLastOpen = localStorage.getItem("LAST_OPEN");
    if (gotLastOpen) {openNote(gotLastOpen, true);} 

    // show overlay if no note to display
    handleNoNoteOpen();
});

setInterval(() => {
    if (currentNote) {
        noteContents[currentNote] = quill.getContents();
        localStorage.setItem("note_"+currentNote, JSON.stringify(noteContents[currentNote]));
    }
}, 500);