// RESIZING
const nr = document.getElementById("navresize");

var tmx;
nr.addEventListener("mousedown", (e) => {
    tmx = e.clientX;
    window.addEventListener("pointermove", handleMove);
    nr.classList.add("inuse");
});

function handleMove(e) {
    var mx = e.clientX;

    var currentVal = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-w").trim().replace("px", ""));
    console.log(currentVal);
    document.documentElement.style.setProperty("--nav-w", (currentVal + (mx - tmx)) + "px");
    tmx = mx;
}

window.addEventListener("mouseup", () => {
    nr.classList.remove("inuse");
    window.removeEventListener("pointermove", handleMove);
});