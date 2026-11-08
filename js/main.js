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

function notification(type = '', content, from = t("notificationSource.default"), length = 3) {
    const notif = document.createElement("div");
    notif.classList.add("notification");
    notif.classList.add("n-"+type);
    notif.innerHTML = `
        <header>
            <span>${from}</span>
            <button onclick="removeNotif(this.parentElement.parentElement)" class="tt-l-m" data-tooltip="${t("notification.dismiss")}"><i class="ti ti-x"></i></button>
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
        if (!notesRef[tk]) storeR(key);
    });

    openFolders.forEach(f => {
        if (!folders[f]) {
            delete openFolders[f];
        }
        storeS("open_folders", openFolders);
    });
}

window.addEventListener("load", () => {
    boot();
});

async function boot() {
    alert("Some parts of the app are not polished yet because I ran out of time this week - only appearance section of settings works and some search results may not exist. Most of the language keys for the settings are also missing. Will be finished next week.");
    notesRef = storeL("notes_reference", {});
    folders = storeL("folders", {});
    recentNotes = storeL("recent_notes", []);
    openFolders = storeL("open_folders", []);

    Object.keys(notesRef).forEach((id) => {
        // ops thing is empty quill delta structure
        noteContents[id] = storeL("note_"+id, {ops:[]});
    });
    cleanupLocalStorage();

    await setLocale(getValue("system.language.lang"), true);
    initQuill();
    initSettings();

    const gotLastOpen = storeL("LAST_OPEN", false);
    if (gotLastOpen) {openNote(gotLastOpen, true);} 
    // make sure note is open before rendering so it highlights the open note's button ^-^
    renderNav();

    // show overlay if no note to display
    handleNoNoteOpen();
    translateDOM();
}

setInterval(() => {
    if (currentNote) {
        noteContents[currentNote] = quill.getContents();
        storeS("note_"+currentNote, noteContents[currentNote]);
    }
}, 500);