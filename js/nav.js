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