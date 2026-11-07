var settingsReference;
function initSettings() {
    settingsReference = {
        searchable: {
            "appearance.theme.theme": {name: t("setting.appearance.theme.theme"), icon: "color-swatch", id: "appearance.theme.theme", terms: t("setting.appearance.theme.theme.searchTerms"), location: "appearance.theme"},
            "appearance.theme.system": {name: t("setting.appearance.theme.system"), icon: "brightness-half", id: "appearance.theme.system", terms: t("setting.appearance.theme.system.searchTerms"), location: "appearance.theme"},
            "appearance.theme.accent.mode": {name: t("setting.appearance.theme.accent.mode"), icon: "brush", id: "appearance.theme.accent.mode", terms: t("setting.appearance.theme.accent.mode.searchTerms"), location: "appearance.theme"},
            "appearance.theme.accent.custom": {name: t("setting.appearance.theme.accent.custom"), icon: "color-picker", id: "appearance.theme.accent.custom", terms: t("setting.appearance.theme.accent.custom.searchTerms"), location: "appearance.theme"},
            "appearance.layout.sidebar": {name: t("setting.appearance.layout.sidebar"), icon: "layout-sidebar", id: "appearance.layout.sidebar", terms: t("setting.appearance.layout.sidebar.searchTerms"), location: "appearance.layout"},
            "appearance.layout.toolbar": {name: t("setting.appearance.layout.toolbar"), icon: "layout-navbar", id: "appearance.layout.toolbar", terms: t("setting.appearance.layout.toolbar.searchTerms"), location: "appearance.layout"},
            "appearance.panels.radius": {name: t("setting.appearance.panels.radius"), icon: "border-radius", id: "appearance.panels.radius", terms: t("setting.appearance.panels.radius.searchTerms"), location: "appearance.panels"},
            "appearance.panels.opacity": {name: t("setting.appearance.panels.opacity"), icon: "opacity", id: "appearance.panels.opacity", terms: t("setting.appearance.panels.opacity.searchTerms"), location: "appearance.panels"},
            "appearance.background.enabled": {name: t("setting.appearance.background.enabled"), icon: "background", id: "appearance.background.enabled", terms: t("setting.appearance.background.enabled.searchTerms"), location: "appearance.background"},
            "appearance.background.image.source": {name: t("setting.appearance.background.image.source"), icon: "photo", id: "appearance.background.image.source", terms: t("setting.appearance.background.image.source.searchTerms"), location: "appearance.background"},
            "appearance.background.image.blur": {name: t("setting.appearance.background.image.blur"), icon: "blur", id: "appearance.background.image.blur", terms: t("setting.appearance.background.image.blur.searchTerms"), location: "appearance.background"},
            "appearance.background.image.dim": {name: t("setting.appearance.background.image.dim"), icon: "brightness-down", id: "appearance.background.image.dim", terms: t("setting.appearance.background.image.dim.searchTerms"), location: "appearance.background"},
            "appearance.background.image.opacity": {name: t("setting.appearance.background.image.opacity"), icon: "opacity", id: "appearance.background.image.opacity", terms: t("setting.appearance.background.image.opacity.searchTerms"), location: "appearance.background"},
            "appearance.background.image.fit": {name: t("setting.appearance.background.image.fit"), icon: "aspect-ratio", id: "appearance.background.image.fit", terms: t("setting.appearance.background.image.fit.searchTerms"), location: "appearance.background"},
            "appearance.typography.font": {name: t("setting.appearance.typography.font"), icon: "typography", id: "appearance.typography.font", terms: t("setting.appearance.typography.font.searchTerms"), location: "appearance.typography"},
            "appearance.typography.dyslexic": {name: t("setting.appearance.typography.dyslexic"), icon: "accessible", id: "appearance.typography.dyslexic", terms: t("setting.appearance.typography.dyslexic.searchTerms"), location: "appearance.typography"},

            "editor.behavior.wrap": {name: t("setting.editor.behavior.wrap"), icon: "text-wrap", id: "editor.behavior.wrap", terms: t("setting.editor.behavior.wrap.searchTerms"), location: "editor.behavior"},
            "editor.behavior.spellCheck": {name: t("setting.editor.behavior.spellCheck"), icon: "spell-check", id: "editor.behavior.spellCheck", terms: t("setting.editor.behavior.spellCheck.searchTerms"), location: "editor.behavior"},
            "editor.behavior.closePairs": {name: t("setting.editor.behavior.closePairs"), icon: "brackets", id: "editor.behavior.closePairs", terms: t("setting.editor.behavior.closePairs.searchTerms"), location: "editor.behavior"},
            "editor.smartTypography.shorthands": {name: t("setting.editor.smartTypography.shorthands"), icon: "replace", id: "editor.smartTypography.shorthands", terms: t("setting.editor.smartTypography.shorthands.searchTerms"), location: "editor.smartTypography"},

            "storage.storageMethod.preferredMethod": {name: t("setting.storage.storageMethod.preferredMethod"), icon: "database", id: "storage.storageMethod.preferredMethod", terms: t("setting.storage.storageMethod.preferredMethod.searchTerms"), location: "storage.storageMethod"},
            "storage.exporting.exportAs": {name: t("setting.storage.exporting.exportAs"), icon: "file-export", id: "storage.exporting.exportAs", terms: t("setting.storage.exporting.exportAs.searchTerms"), location: "storage.exporting"},

            "system.language.lang": {name: t("setting.system.language.lang"), icon: "language", id: "system.language.lang", terms: t("setting.system.language.lang.searchTerms"), location: "system.language"},
            "system.shortcuts": {name: t("setting.system.shortcuts"), icon: "keyboard", id: "system.shortcuts", terms: t("setting.system.shortcuts.searchTerms"), location: "system.shortcuts"},
            "system.behavior.notifications": {name: t("setting.system.behavior.notifications"), icon: "bell", id: "system.behavior.notifications", terms: t("setting.system.behavior.notifications.searchTerms"), location: "system.behavior"},
            "system.behavior.rememberOpenFolders": {name: t("setting.system.behavior.rememberOpenFolders"), icon: "folder-open", id: "system.behavior.rememberOpenFolders", terms: t("setting.system.behavior.rememberOpenFolders.searchTerms"), location: "system.behavior"},

            "security.lockedNotes.passHash": {name: t("setting.security.lockedNotes.passHash"), icon: "key", id: "security.lockedNotes.passHash", terms: t("setting.security.lockedNotes.passHash.searchTerms"), location: "security.lockedNotes"}
        }
    };

    //fillThemeDropdown();

    renderSettings();
    settingsPage('appearance');
}
const userSettings = {
    "appearance.theme.theme": "antique"
}

const settingsSchema = {
    pages: {
        appearance: {
            id: "appearance",
            name: "settings.page.appearance",
            icon: "palette",
            sections: {
                theme: {
                    name: "modal.settings.section.appearance.theme",
                    fields: {
                        theme: {
                            id: "appearance.theme.theme",
                            label: "Theme",
                            type: "dropdown",
                            options: generateThemeDropdownSchema(),
                            default: "dark",
                            conditions: [
                                {field: "appearance.theme.system", equals: false}
                            ]
                        },
                        system: {
                            id: "appearance.theme.system",
                            label: "System Theme",
                            type: "toggle",
                            default: false,
                            description: "Copies the theme set on the operating system level. Light/Dark only."
                        },
                        sep1: {
                            type: "separator",
                            text: "Accent"
                        },
                        accentMode: {
                            id: "appearance.theme.accentMode",
                            label: "Accent Mode",
                            type: "dropdown",
                            options: [
                                {value: "follow", content: "Follow theme"},
                                {value: "custom", content: "Custom"}
                            ],
                            default: "follow",
                        },
                        accentCustom: {
                            id: "appearance.theme.accentCustom",
                            label: "Custom Accent",
                            type: "color",
                            default: "#000000",
                            conditions: [
                                {field: "appearance.theme.accentMode", equals: "custom"}
                            ]
                        }
                    }
                },
                layout: {
                    name: "modal.settings.section.appearance.layout",
                    fields: {
                        sidebar: {
                            id: "appearance.layout.sidebar",
                            label: "Sidebar",
                            type: "dropdown",
                            options: [
                                {value: "left", content: "Left"},
                                {value: "right", content: "Right"}
                            ],
                            default: "left"
                        },
                        toolbar: {
                            id: "appearance.layout.toolbar",
                            label: "Toolbar",
                            type: "dropdown",
                            options: [
                                {value: "above", content: "Above"},
                                {value: "below", content: "Below"}
                            ],
                            default: "above"
                        }
                    }
                },
                panels: {
                    name: "modal.settings.section.appearance.panels",
                    fields: {
                        corners:{
                            id: "appearance.panels.corners",
                            label: "Corner Radius",
                            type: "slider",
                            range: [0, 8],
                            step: 1,
                            unit: "px",
                            default: 2
                        },
                        opacity: {
                            id: "appearance.panels.opacity",
                            label: "Background Opacity",
                            type: "slider",
                            range: [20, 100],
                            step: 1,
                            unit: "%",
                            default: 100
                        },
                        blur: {
                            id: "appearance.panels.blur",
                            label: "Backdrop Blur",
                            type: "slider",
                            range: [0, 10],
                            step: 0.5,
                            unit: "px",
                            default: 0
                        }
                    }
                },
                background: {
                    name: "modal.settings.section.appearance.background",
                    fields: {
                        image: {
                            id: "appearance.background.image",
                            label: "Image By Upload",
                            type: "file",
                            accept: "image/*",
                            default: "",
                            conditions: [
                                {field: "appearance.background.imageUrl", equals: ""}
                            ]
                        },
                        imageUrl: {
                            id: "appearance.background.imageUrl",
                            label: "Image From URL",
                            type: "text",
                            placeholder: "setting.appearance.background.imageUrl.placeholder",
                            default: "",
                            conditions: [
                                {field: "appearance.background.image", equals: ""}
                            ]
                        },
                        sep1: {
                            type: "separator",
                            text: false
                        },
                        blur: {
                            id: "appearance.background.blur",
                            label: "Blur",
                            type: "slider",
                            range: [0, 10],
                            step: 0.5,
                            unit: "px",
                            default: 0,
                            conditions: [
                                {any: [
                                    {field: "appearance.background.image", notEquals: ""},
                                    {field: "appearance.background.imageUrl", notEquals: ""}
                                ]}
                            ]
                        },
                        opacity: {
                            id: "appearance.background.opacity",
                            label: "Opacity",
                            type: "slider",
                            range: [1, 100],
                            step: 1,
                            unit: "%",
                            default: 100,
                            conditions: [
                                {any: [
                                    {field: "appearance.background.image", notEquals: ""},
                                    {field: "appearance.background.imageUrl", notEquals: ""}
                                ]}
                            ]
                        },
                        brightness: {
                            id: "appearance.background.brightness",
                            label: "Brightness",
                            type: "slider",
                            range: [-100, 100],
                            step: 1,
                            unit: "",
                            default: 0,
                            conditions: [
                                {any: [
                                    {field: "appearance.background.image", notEquals: ""},
                                    {field: "appearance.background.imageUrl", notEquals: ""}
                                ]}
                            ]
                        },
                        fitMode: {
                            id: "appearance.background.fitMode",
                            label: "Fit Mode",
                            type: "dropdown",
                            options: [
                                {value: "cover", content: "Cover"},
                                {value: "contain", content: "Contain"},
                                {value: "repeat", content: "Repeat"}
                            ],
                            default: "cover",
                            conditions: [
                                {any: [
                                    {field: "appearance.background.image", notEquals: ""},
                                    {field: "appearance.background.imageUrl", notEquals: ""}
                                ]}
                            ]
                        }
                    }
                },
                typography: {
                    name: "modal.settings.section.appearance.typography",
                    fields: {
                        font: {
                            id: "appearance.typography.font",
                            label: "Font",
                            type: "dropdown",
                            options: [
                                {value: "Commissioner", content: "Commissioner"},
                                {value: "Inter", content: "Inter"},
                                {value: "sans-serif", content: "Sans Serif"}
                            ],
                            default: "Commissioner",
                            conditions: [
                                {field: "appearance.typography.dyslexic", equals: false}
                            ]
                        },
                        dyslexic: {
                            id: "appearance.typography.dyslexic",
                            label: "Dyslexic Font",
                            type: "toggle",
                            default: false
                        }
                    }
                }
            }
        },
        editor: {
            id: "editor",
            name: "settings.page.editor",
            icon: "edit",
            sections: {
                behavior: {
                    name: "modal.settings.section.editor.behavior",
                    fields: {
                        wrap: {
                            id: "editor.behavior.wrap",
                            label: "Wrap Text",
                            type: "toggle",
                            default: true
                        },
                        spellCheck: {
                            id: "editor.behavior.spellCheck",
                            label: "System Spellcheck",
                            type: "toggle",
                            default: true
                        },
                        closePairs: {
                            id: "editor.behavior.closePairs",
                            label: "Close Pairs",
                            type: "toggle",
                            default: false,
                            description: "Automatically inserts a closing pair after typing symbols like brackets or quotation marks."
                        }
                    }
                },
                smartTypography: {
                    name: "modal.settings.section.editor.smartTypography",
                    headerButtons: [
                        {text: "Fill Exemplar", action: "fillSmartTypographyTemplate()"}
                    ],
                    fields: {
                        enabled: {
                            id: "editor.smartTypography.enabled",
                            label: "Enable Smart Typography",
                            type: "toggle",
                            default: false,
                            description: "Automatically converts specified combinations of characters into symbols not easily typeable with a traditional keyboard."
                        },
                        shorthands: {
                            id: "editor.smartTypography.shorthands",
                            type: "dualEditTable",
                            conditions: [
                                {value: "editor.smartTypography.enabled", equals: "true"}
                            ]
                        }
                    }
                }
            }
        },
        storage: {
            id: "storage",
            name: "settings.page.storage",
            icon: "archive",
            sections: {
                management: {
                    name: "modal.settings.section.storage.management",
                    fields: {
                        display: {
                            id: "storage.management.display",
                            type: "storageDisplay"
                        },
                        preferredMethod: {
                            id: "storage.management.preferredMethod",
                            label: "Preferred Storage Method",
                            type: "dropdown",
                            options: [
                                {value: "localStorage", content: "localStorage"}
                            ],
                            default: "localStorage",
                            description: "Some storage methods may require additional setup."
                        }
                    }
                },
                exporting: {
                    name: "modal.settings.section.storage.exporting",
                    fields: {
                        exportAs: {
                            id: "storage.exporting.exportAs",
                            label: "Default Note Export Format",
                            type: "dropdown",
                            options: [
                                {value: "pdf", content: "PDF"},
                                {value: "plaintext", content: "Plain Text"}
                            ],
                            default: "pdf"
                        }
                    }
                }
            }
        },
        system: {
            id: "system",
            name: "settings.page.system",
            icon: "settings-cog",
            sections: {
                language: {
                    name: "modal.settings.section.system.language",
                    fields: {
                        lang: {
                            id: "system.language.lang",
                            label: "App Language",
                            type: "dropdown",
                            options: [
                                {value: "en", content: "English"},
                                {value: "es", content: "Español"},
                                {value: "zh", content: "中文"},
                                {value: "lt", content: "Lietuvių"},
                                {value: "de", content: "Deutsch"}
                            ],
                            default: "en"
                        }
                    }
                },
                behavior: {
                    name: "modal.settings.section.system.behavior",
                    fields: {
                        notifications: {
                            id: "system.behavior.notifications",
                            label: "Display App Notifications",
                            type: "toggle",
                            default: true,
                            description: "Only applies to notifications contained within wNotes itself."
                        },
                        rememberOpenFolders: {
                            id: "system.behavior.rememberOpenFolders",
                            label: "Remember Open Folders",
                            type: "toggle",
                            default: true
                        }
                    }
                },
                shortcuts: {
                    name: "modal.settings.section.system.shortcuts",
                    fields: {
                        entries: {
                            id: "system.shortcuts.entries",
                            type: "singleEditTable"
                        }
                    }
                }
            }
        },
        security: {
            id: "security",
            name: "settings.page.security",
            icon: "lock",
            sections: {
                lockedNotes: {
                    name: "modal.settings.section.security.lockedNotes",
                    fields: {}
                }
            }
        }
    }
}

function check(cond) {
    if (Array.isArray(cond)) return cond.every(check);
    if (cond.all) return cond.all.every(check);
    if (cond.any) return cond.any.some(check);
    if (cond.not) return !check(cond.not);

    const val = getValue(cond.field);
    if ("equals" in cond) return val === cond.equals;
    if ("notEquals" in cond) return val !== cond.notEquals;
    return !!val; // bare { field } = truthy
}

// make a map with page.section.key structure so crawling the schema isn't necessary
const fieldIndex = new Map();
for (const [pKey, page] of Object.entries(settingsSchema.pages))
    for (const [sKey, section] of Object.entries(page.sections))
        for (const [key, f] of Object.entries(section.fields))
            fieldIndex.set(`${pKey}.${sKey}.${key}`, f);

// look in userSettings first, then get default
const getValue = path => path in userSettings
    ? userSettings[path]
    : fieldIndex.get(path)?.default;

const isEnabled = field => !field.conditions || check(field.conditions);

function refreshConditions() {
    document.querySelectorAll('[data-path]').forEach((wrapper) => {
        console.log(wrapper);
        const field = fieldIndex.get(wrapper.dataset.path);
        if (!field) return;
        const enabled = isEnabled(field);
        wrapper.inert = !enabled;
        wrapper.classList.toggle("disabled", !enabled);
    });
}

function onChange(path, value) {
    userSettings[path] = value;
    applications[path]?.();
    refreshConditions();
}

const sNavBtnsContainer = document.getElementById("settingsPageButtons");
const sPagesContainer = document.getElementById("settings-pages");
function renderSettings() {
    // render nav buttons * * * * * * * * * *
    Object.values(settingsSchema.pages).forEach((page) => {
        const button = document.createElement("button");
        button.id = "spb-"+page.id;
        button.onclick = () => settingsPage(page.id);
        button.innerHTML = `
            <i class="ti ti-${page.icon}"></i>
            <span>${t(page.name)}</span>
        `;
        sNavBtnsContainer.appendChild(button);
    });

    // build ui * * * * * * * * * *
    // yes it's looping through the same base "array" but this is more organized
    Object.values(settingsSchema.pages).forEach((page) => {
        // create page container
        const pageElem = document.createElement("div");
        pageElem.classList.add("settings-page");
        pageElem.id = "sp-"+page.id;
        sPagesContainer.appendChild(pageElem);
        
        Object.values(page.sections).forEach((section) => {
            // create section and add header
            const sectElem = document.createElement("section");
            pageElem.appendChild(sectElem);
            const sectHeader = document.createElement("h2");
            sectHeader.innerHTML = `<span data-i18n="${section.name}">${t(section.name)}</span>`;
            sectElem.appendChild(sectHeader);
            if (section.headerButtons) {
                section.headerButtons.forEach((btn) => {
                    const button = document.createElement("button");
                    button.innerHTML = btn.text;
                    button.setAttribute('onclick', btn.action);
                    sectHeader.appendChild(button);
                });
            }

            Object.values(section.fields).forEach((field) => {
                var optionContainer;
                if (field.label) {
                    optionContainer = document.createElement("label");
                    optionContainer.innerHTML = `
                        <span data-i18n="${field.label}">${field.label}</span>
                    `;
                    optionContainer.dataset.path = field.id;
                    optionContainer.appendChild(generateInput(field, onChange, optionContainer));
                } else if (field.type == "separator") {
                    optionContainer = document.createElement(field.text ? "h3" : "hr");
                    if (field.text) optionContainer.innerText = field.text;
                } else {
                    optionContainer = document.createElement("div");
                    optionContainer.dataset.path = field.id;
                    optionContainer.appendChild(generateInput(field, onChange, optionContainer));
                }
                if (field.description) {
                    optionContainer.insertAdjacentHTML('beforeend', `
                        <div class="flex-break"></div>
                        <span class="label-description">${field.description}</span>
                    `);
                };
                sectElem.appendChild(optionContainer);
            });
        });
    });
    refreshConditions();
}

const applications = {
    "appearance.theme.theme": () => setTheme(),
    "appearance.theme.system": () => systemTheme()
}

function generateInput(field, onChange, parent) {
    let elem;
    switch (field.type) {
        case "toggle":
            elem = document.createElement("input");
            elem.type = "checkbox";
            elem.setAttribute("role", "switch");
            elem.checked = getValue(field.id) === true;
            elem.onchange = () => {
                onChange(field.id, elem.checked);
            };
            break;
        case "dropdown":
            elem = document.createElement("select");
            elem.innerHTML = `<button><selectedcontent></selectedcontent></button>`;
            field.options.forEach((opt) => {
                const o = document.createElement("option");
                o.value = opt.value;
                o.innerHTML = opt.content;
                elem.appendChild(o);
            });
            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field.id, elem.value);
            break;
        case "slider":
            // setAttribute because custom elem can't just use elem.min etc :<
            elem = document.createElement("wn-slider");
            elem.setAttribute("min", field.range[0]);
            elem.setAttribute("max", field.range[1]);
            elem.setAttribute("step", field.step);
            elem.setAttribute("unit", field.unit);

            elem.setAttribute("value", getValue(field.id));
            elem.onchange = () => onChange(field.id, elem.getAttribute("value"));
            break;
        case "color":
            elem = document.createElement("wn-color-picker");

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field.id, elem.value);
            break;
        case "text":
            elem = document.createElement("div")
            elem.classList.add("cinput");
            elem.innerHTML = `<input type="text" placeholder="${field.placeholder ? t(field.placeholder) : ''}" data-i18n-placeholder="${field.placeholder ? field.placeholder : ''}">`;

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field.id, elem.value);
            break;
        case "file":
            elem = document.createElement("wn-file-picker");
            elem.setAttribute("accept", field.accept);

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field.id, elem.value);
            break;
        case "dualEditTable":
            elem = document.createElement("table");
            elem.innerHTML = `<tr><th>Shorthand</th><th>Result Character</th></tr><tr><td>-></td><td>--></td></tr>`;
            const newEntryRow = document.createElement("tr");
            newEntryRow.innerHTML = `<td colspan="2"><button class="new-row"><i class="ti ti-plus"></i> <span>New Entry</span></button></td>`;
            elem.appendChild(newEntryRow);
            break;
        case "singleEditTable":
            elem = document.createElement("b");
            elem.textContent = "[Single-Column Editing Table does not yet have functionality.]";
            break;
        case "storageDisplay":
            elem = document.createElement("b");
            elem.textContent = "[Settings Management Display does not yet have functionality.]";
            break;
        case "keysEntry":
            elem = document.createElement("kbd");
            elem.textContent = "[no funct.]";
            break;
        default:
            elem = document.createElement("b");
            elem.textContent = "[Element could not be rendered.]";
    }
    console.log(isEnabled(field), field.id);
    parent.classList.toggle("disabled", !isEnabled(field));
    if (!isEnabled(field)) parent.inert = true;
    return elem;
}



const spbtnscontainer = document.getElementById("settingsPageButtons");
const pagescontainer = document.getElementById("settings-pages");
// wow im so consistent with name formatting fr T-T
function settingsPage(name) {
    document.querySelectorAll("#settings-pages>div").forEach((p) => {p.classList.remove("page-current")}); // hide all pages and show the right one
    document.querySelector("#settings-pages>div#sp-"+name).classList.add("page-current");
    document.querySelectorAll("#settingsPageButtons>button").forEach((p) => {p.classList.remove("current")}); // remove highlight from all buttons and give it to the right one
    document.querySelector("#settingsPageButtons>button#spb-"+name).classList.add("current");
}

function openSetting(location) {
    const [page, header] = location.split(".");
    openDialog("settings");
    settingsPage(page);
    document.getElementById(`sph-${page}-${header}`).scrollIntoView();
}


function generateThemeDropdownSchema() {
    var optionsArray = [];
    parseThemes("/css/themes.css").then((data) => {
        Object.entries(data).forEach(([name, colors]) => {
            const themeOpt = {value: name, content: `<span data-i18n="theme.${name}">${t("theme."+name)}</span> <div style="background: conic-gradient(${colors['accent']} 0deg 90deg, ${colors['textb']} 90deg 180deg, ${colors['bg-3']} 180deg 270deg, ${colors['textm']} 270deg)"></div>`};
            optionsArray.push(themeOpt);
        });
    });
    return optionsArray;
}
/*
window.addEventListener("load", () => {
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
        storeS("theme", name);
        notification('success', t("notification.changedTheme", {name: name}), t("notificationSource.settings"), 4);
    }
}

themeDropdown.addEventListener("change", () => {
    changeTheme(themeDropdown.value.toLowerCase());
});

const systemThemeToggle = document.getElementById("systemThemeToggle");
systemThemeToggle.addEventListener("change", () => {
    if (systemThemeToggle.checked) {
        themeDropdown.disabled = true;
        notification('success', t("notification.systemTheme.on"), t("notificationSource.settings"));
    } else {
        themeDropdown.disabled = false;
        notification('success', t("notification.systemTheme.off"), t("notificationSource.settings"));
    }
    storeS("system_theme", systemThemeToggle.checked);
    handleTheme();
});

function handleTheme() {
    var theme;
    if (storeL("system_theme") || false) {
        systemThemeToggle.checked = true;
        themeDropdown.disabled = true;
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
        theme = storeL("theme", "dark");
       
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
    */