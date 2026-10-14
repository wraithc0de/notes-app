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
})