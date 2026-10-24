const ctxmenu = document.getElementById("ctxmenu");

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (e.target === document.querySelector("#midsect>nav")) {
        showCtx("navbase", e);
    } else if (e.target.closest(".item")) {
        showCtx("listitem", e);
    } else if (e.target.closest("nav section:not(#navsearch) header")) {
        showCtx("folder", e);
    }
});

function showCtx(sect, e) {
    ctxmenu.classList.add("shown");
    ctxmenu.style.top = e.clientY + "px";
    ctxmenu.style.left = e.clientX + "px";

    ctxmenu.querySelectorAll(".ctxsect").forEach((d) => {
        d.classList.remove("shown");
    });
    document.getElementById("ctx-"+sect).classList.add("shown");
}

document.addEventListener("click", (e) => {
    if (e.target != ctxmenu) {
        ctxmenu.classList.remove("shown");
    }
});