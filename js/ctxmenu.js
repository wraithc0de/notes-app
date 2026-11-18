const ctxmenu = document.getElementById("ctxmenu");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.target === document.querySelector("#midsect>nav") || e.target === sectionsContainer || e.target === document.querySelector(".treespacer")) {
        ctxmenu.innerHTML = `
            <button onclick="openModal('newobject')"><i class="ti ti-plus"></i> ${t("ctx.manager.newObject")} <kbd></kbd></button>
            <button onclick="openSetting('appearance.theme')"><i class="ti ti-color-swatch"></i> ${t("ctx.manager.changeTheme")} <kbd></kbd></button>
            <hr>
            <button onclick="expandAllFolders()"><i class="ti ti-arrow-bar-down"></i> ${t("ctx.manager.expandAll")} <kbd>${ks("expandAllFolders")}</kbd></button>
            <button onclick="collapseAllFolders()"><i class="ti ti-arrow-bar-to-up"></i> ${t("ctx.manager.collapseAll")} <kbd>${ks("collapseAllFolders")}</kbd></button>
        `;
    } else if (e.target.closest(".item:not(#il-recentitems .item)")) {
        const idTarget = handleTargeting(e, 'note');
        ctxmenu.innerHTML = `
            <button onclick="renameObject('note', '${idTarget}')"><i class="ti ti-pencil"></i> ${t("ctx.note.rename")} <kbd>${ks("renameCurrentNote")}</kbd></button>
            <button class="danger" onclick="deleteConfirmation('note', '${idTarget}', event.shiftKey)"><i class="ti ti-trash"></i> ${t("ctx.note.delete")} <kbd></kbd></button>
        `;
    } else if (e.target.closest(".folder header")) {
        const idTarget = handleTargeting(e, 'folder');
        ctxmenu.innerHTML = `
            <button onclick="renameObject('folder', '${idTarget}')"><i class="ti ti-pencil"></i> ${t("ctx.folder.rename")} <kbd>F2</kbd></button>
            <button class="danger" onclick="deleteConfirmation('folder', '${idTarget}', event.shiftKey)"><i class="ti ti-trash"></i> ${t("ctx.folder.delete")} <kbd></kbd></button>
        `;
    } else if (e.target.closest("#formatting")) {
        ctxmenu.innerHTML = `
            <button><i class="ti ti-reorder"></i> ${t("ctx.toolbar.reorder")} <kbd></kbd></button>
        `;
    } else {
        return;
    }
    showCtx(e);
});

function showCtx(e) {
    ctxmenu.classList.add("shown");
    ctxmenu.style.top = e.clientY + "px";
    ctxmenu.style.left = e.clientX + "px";
}

document.addEventListener("click", (e) => {
    if (e.target != ctxmenu) {
        ctxmenu.classList.remove("shown");
    }
});


// figure out the id of the note or folder that was clicked on
function handleTargeting(e, type) {
    var elem = e.target.closest(type == 'note' ? '.item' : 'header');
    return elem.querySelector('.idreference').textContent;
}