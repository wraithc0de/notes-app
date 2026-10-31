const ctxmenu = document.getElementById("ctxmenu");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.target === document.querySelector("#midsect>nav")) {
        ctxmenu.innerHTML = `
            <button onclick="openDialog('newobject')"><i class="ti ti-plus"></i> New Object <span>Ctrl + N</span></button>
            <button onclick="openSetting('appearance.theme')"><i class="ti ti-color-swatch"></i> Change Theme <span></span></button>
            <hr>
            <button onclick="expandAllFolders()"><i class="ti ti-arrow-bar-down"></i> Expand all folders <span>Ctrl + Alt + E</span></button>
            <button onclick="collapseAllFolders()"><i class="ti ti-arrow-bar-to-up"></i> Collapse all folders <span>Ctrl + Alt + C</span></button>
        `;
    } else if (e.target.closest(".item:not(#il-recentitems .item)")) {
        const idTarget = handleTargeting(e, 'note');
        ctxmenu.innerHTML = `
            <button onclick="renameObject('note', '${idTarget}')"><i class="ti ti-pencil"></i> Rename <span>F2</span></button>
            <button onclick="moveNote(${idTarget})"><i class="ti ti-file-arrow-right"></i> Move <span></span></button>
            <button class="danger" onclick="deleteConfirmation('note', '${idTarget}')"><i class="ti ti-trash"></i> Delete <span></span></button>
        `;
    } else if (e.target.closest(".folder header")) {
        const idTarget = handleTargeting(e, 'folder');
        ctxmenu.innerHTML = `
            <button onclick="renameObject('folder', '${idTarget}')"><i class="ti ti-pencil"></i> Rename <span>F2</span></button>
            <button class="danger" onclick="deleteConfirmation('folder', '${idTarget}')"><i class="ti ti-trash"></i> Delete <span></span></button>
        `;
    } else if (e.target.closest("#formatting")) {
        ctxmenu.innerHTML = `
            <button><i class="ti ti-reorder"></i> Reorder <span></span></button>
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