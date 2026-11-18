var modals = document.querySelectorAll(".modal-container");

function closeAllModals() {
    document.querySelectorAll(".modal-container").forEach(modal => {
        modal.classList.remove("modal-open");
    });
}

function openModal(id) {
    closeAllModals();
    document.getElementById("modal-"+id).classList.add("modal-open");
}

function closeModal(id) {
    document.getElementById("modal-"+id).classList.remove("modal-open");
}

function closeModalByPointer(pointer) {
    pointer.classList.remove("modal-open");
}

modals.forEach(modal => {
    // x button
    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) closeButton.addEventListener("click", () => { closeModalByPointer(modal); });
    // click outside modal window
    modal.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) { closeModalByPointer(modal); }
    });
    // esc key close
    modal.addEventListener("keydown", (event) => {
        if (event.key === "Escape") { closeModalByPointer(modal); }
    });
});
var NOTIFS_ENABLED = true;
function notification(type = '', content, from = t("notificationSource.default"), length = 3) {
    if (!NOTIFS_ENABLED) return;
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
            e.preventDefault();
            e.stopImmediatePropagation();
            i.parentElement.querySelector("button.submit").click();
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
    updateWordCounter();
}, 500);