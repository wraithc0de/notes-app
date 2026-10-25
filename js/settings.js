// for searching
const settings = [
    {"name": "Theme", "icon": "color-swatch", "aliases": ["colors", "themes", "dark mode", "light mode", "system theme"], "location": "appearance.theme"},
    {"name": "Layout", "icon": "layout", "aliases": ["organization", "order", "sidebar"], "location": "appearance.layout"}
];

const spbtnscontainer = document.getElementById("settingsPageButtons");
const pagescontainer = document.getElementById("settings-pages");
// wow im so consistent with name formatting fr T-T
function settingsPage(name) {
    document.querySelectorAll("#settings-pages>div").forEach((p) => {p.classList.remove("page-current")});
    document.querySelector("#settings-pages>div#sp-"+name).classList.add("page-current");
    document.querySelectorAll("#settingsPageButtons>button").forEach((p) => {p.classList.remove("current")});
    document.querySelector("#settingsPageButtons>button#spb-"+name).classList.add("current");
}

function openSetting(location) {
    const [page, header] = location.split(".");
    openDialog("settings");
    settingsPage(page);
    document.getElementById(`sp-${page.substring(0,2)}-${header}`).scrollIntoView();
}

window.addEventListener("load", () => {
    handleTheme(); 
});


const themeDropdown = document.getElementById("themeselect");

parseThemes("/css/themes.css").then((data) => {
    Object.entries(data).forEach(([name, colors]) => {
        const themeOpt = document.createElement("option");
        themeOpt.value = name;
        themeOpt.innerHTML = `
            ${name.charAt(0).toUpperCase() + name.slice(1)}
            <div style="background: conic-gradient(${colors['accent']} 0deg 90deg, ${colors['textb']} 90deg 180deg, ${colors['bg-3']} 180deg 270deg, ${colors['textm']} 270deg)"></div>
        `;
        themeDropdown.appendChild(themeOpt);
    });

    handleTheme();
});

function changeTheme(name, systemThemeCase = false) {
    for (const name of document.documentElement.classList) {
        if (name.includes("theme-")) {
            document.documentElement.classList.remove(name);
        }
    }
    document.documentElement.classList.add("theme-"+name);
    if (!systemThemeCase) {
        localStorage.setItem("theme", name);
        notification('success', `Successfully changed theme to ${name}!`, 'Settings', 4);
    }
}

themeDropdown.addEventListener("change", () => {
    changeTheme(themeDropdown.value.toLowerCase());
});

const systemThemeToggle = document.getElementById("systemThemeToggle");
systemThemeToggle.addEventListener("change", () => {
    if (systemThemeToggle.checked) {
        themeDropdown.disabled = true;
        notification('success', 'System theme toggled on.', 'Settings');
    } else {
        themeDropdown.disabled = false;
        notification('success', 'System theme toggled off.', 'Settings');
    }
    localStorage.setItem("system_theme", JSON.stringify(systemThemeToggle.checked));
    handleTheme();
});

function handleTheme() {
    var theme;
    if (JSON.parse(localStorage.getItem("system_theme")) || false) {
        systemThemeToggle.checked = true;
        themeDropdown.disabled = true;
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
        theme = localStorage.getItem("theme") || "dark";
       
    } themeDropdown.value = theme;
    changeTheme(theme, true);
}


function changeLayout(instruction) {
    if (instruction == "nr") {
        document.documentElement.classList.remove('lo-nl');
        document.documentElement.classList.add('lo-nr');
        document.querySelectorAll(".layoutoption")[0].classList.remove('selected');
        document.querySelectorAll(".layoutoption")[1].classList.add('selected');
    } else {
        document.documentElement.classList.remove('lo-nr');
        document.documentElement.classList.add('lo-nl');
        document.querySelectorAll(".layoutoption")[1].classList.remove('selected');
        document.querySelectorAll(".layoutoption")[0].classList.add('selected');
    }
}