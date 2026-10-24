const dropdown = document.getElementById("themeselect");

parseThemes("/css/themes.css").then((data) => {
    Object.entries(data).forEach(([name, colors]) => {
        const themeOpt = document.createElement("option");
        themeOpt.innerHTML = `
            ${name.charAt(0).toUpperCase() + name.slice(1)}
            <div style="background: conic-gradient(${colors['accent']} 0deg 90deg, ${colors['textb']} 90deg 180deg, ${colors['bg-3']} 180deg 270deg, ${colors['textm']} 270deg)"></div>
        `;
        dropdown.appendChild(themeOpt);
    });
});

function changeTheme(name) {
    for (const name of document.documentElement.classList) {
        if (name.includes("theme-")) {
            document.documentElement.classList.remove(name);
        }
    }
    document.documentElement.classList.add("theme-"+name);
}

dropdown.addEventListener("change", () => {
    changeTheme(dropdown.value.toLowerCase());
});


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