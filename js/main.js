var dialogs = document.querySelectorAll(".dialog-container");
function closeDialog(pointer) {
    pointer.classList.remove("dialog-open");
}

function openDialog(id) {
    document.getElementById("dialog-"+id).classList.add("dialog-open");
}

dialogs.forEach(dialog => {
    // x button
    dialog.querySelector(".dialog-close").addEventListener("click", () => { closeDialog(dialog); });
    // click outside dialog window
    dialog.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) { closeDialog(dialog); }
    });
    // esc key close
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") { closeDialog(dialog); }
    });
});


const nsearchinput = document.getElementById("navsearchinput");
const nsearchsect = document.getElementById("navsearch");
const nsearchbtn = document.getElementById("navsearchbtn");
function activateNavSearch() {
    nsearchsect.classList.add("shown");
    nsearchinput.focus();
}
function deactivateNavSearch() {
    nsearchinput.blur();
    nsearchsect.classList.remove("shown");
}
document.addEventListener("click", (event) => {
    if (!nsearchsect.contains(event.target) && !nsearchbtn.contains(event.target)) {
        deactivateNavSearch();
    }
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