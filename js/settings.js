var settingsSearch;
const refreshSearchObj = () => settingsSearch = {
    "appearance.theme.theme": {name: t("setting.appearance.theme.theme"), icon: "color-swatch", id: "appearance.theme.theme", terms: t("setting.appearance.theme.theme.searchTerms"), location: "appearance.theme"},
    "appearance.theme.system": {name: t("setting.appearance.theme.system"), icon: "brightness-half", id: "appearance.theme.system", terms: t("setting.appearance.theme.system.searchTerms"), location: "appearance.theme"},
    "appearance.theme.accentMode": {name: t("setting.appearance.theme.accentMode"), icon: "brush", id: "appearance.theme.accentMode", terms: t("setting.appearance.theme.accentMode.searchTerms"), location: "appearance.theme"},
    "appearance.theme.accentCustom": {name: t("setting.appearance.theme.accentCustom"), icon: "color-picker", id: "appearance.theme.accentCustom", terms: t("setting.appearance.theme.accentCustom.searchTerms"), location: "appearance.theme"},
    "appearance.layout.sidebar": {name: t("setting.appearance.layout.sidebar"), icon: "layout-sidebar", id: "appearance.layout.sidebar", terms: t("setting.appearance.layout.sidebar.searchTerms"), location: "appearance.layout"},
    "appearance.layout.toolbar": {name: t("setting.appearance.layout.toolbar"), icon: "layout-navbar", id: "appearance.layout.toolbar", terms: t("setting.appearance.layout.toolbar.searchTerms"), location: "appearance.layout"},
    "appearance.panels.corners": {name: t("setting.appearance.panels.corners"), icon: "border-radius", id: "appearance.panels.corners", terms: t("setting.appearance.panels.corners.searchTerms"), location: "appearance.panels"},
    "appearance.panels.opacity": {name: t("setting.appearance.panels.opacity"), icon: "opacity", id: "appearance.panels.opacity", terms: t("setting.appearance.panels.opacity.searchTerms"), location: "appearance.panels"},
    "appearance.panels.blur": {name: t("setting.appearance.panels.blur"), icon: "blur", id: "appearance.panels.blur", terms: t("setting.appearance.panels.blur.searchTerms"), location: "appearance.panels"},
    "appearance.background.image": {name: t("setting.appearance.background.image"), icon: "photo", id: "appearance.background.image", terms: t("setting.appearance.background.image.searchTerms"), location: "appearance.background"},
    "appearance.background.imageUrl": {name: t("setting.appearance.background.imageUrl"), icon: "link", id: "appearance.background.imageUrl", terms: t("setting.appearance.background.imageUrl.searchTerms"), location: "appearance.background"},
    "appearance.background.blur": {name: t("setting.appearance.background.blur"), icon: "blur", id: "appearance.background.blur", terms: t("setting.appearance.background.blur.searchTerms"), location: "appearance.background"},
    "appearance.background.opacity": {name: t("setting.appearance.background.opacity"), icon: "opacity", id: "appearance.background.opacity", terms: t("setting.appearance.background.opacity.searchTerms"), location: "appearance.background"},
    "appearance.background.brightness": {name: t("setting.appearance.background.brightness"), icon: "brightness-down", id: "appearance.background.brightness", terms: t("setting.appearance.background.brightness.searchTerms"), location: "appearance.background"},
    "appearance.background.fitMode": {name: t("setting.appearance.background.fitMode"), icon: "aspect-ratio", id: "appearance.background.fitMode", terms: t("setting.appearance.background.fitMode.searchTerms"), location: "appearance.background"},
    "appearance.typography.font": {name: t("setting.appearance.typography.font"), icon: "typography", id: "appearance.typography.font", terms: t("setting.appearance.typography.font.searchTerms"), location: "appearance.typography"},
    "appearance.typography.dyslexic": {name: t("setting.appearance.typography.dyslexic"), icon: "accessible", id: "appearance.typography.dyslexic", terms: t("setting.appearance.typography.dyslexic.searchTerms"), location: "appearance.typography"},
    "appearance.tab.name": {name: t("setting.appearance.tab.name"), icon: "browser", id: "appearance.tab.name", terms: t("setting.appearance.tab.name.searchTerms"), location: "appearance.tab"},
    "appearance.tab.icon": {name: t("setting.appearance.tab.icon"), icon: "photo", id: "appearance.tab.icon", terms: t("setting.appearance.tab.icon.searchTerms"), location: "appearance.tab"},

    "editor.behavior.wrap": {name: t("setting.editor.behavior.wrap"), icon: "text-wrap", id: "editor.behavior.wrap", terms: t("setting.editor.behavior.wrap.searchTerms"), location: "editor.behavior"},
    "editor.behavior.checkedCrossout": {name: t("setting.editor.behavior.checkedCrossout"), icon: "list-check", id: "editor.behavior.checkedCrossout", terms: t("setting.editor.behavior.checkedCrossout.searchTerms"), location: "editor.behavior"},
    "editor.behavior.spellCheck": {name: t("setting.editor.behavior.spellCheck"), icon: "text-spellcheck", id: "editor.behavior.spellCheck", terms: t("setting.editor.behavior.spellCheck.searchTerms"), location: "editor.behavior"},
    "editor.behavior.closePairs": {name: t("setting.editor.behavior.closePairs"), icon: "brackets", id: "editor.behavior.closePairs", terms: t("setting.editor.behavior.closePairs.searchTerms"), location: "editor.behavior"},
    "editor.smartTypography.enabled": {name: t("setting.editor.smartTypography.enabled"), icon: "replace", id: "editor.smartTypography.enabled", terms: t("setting.editor.smartTypography.enabled.searchTerms"), location: "editor.smartTypography"},
    "editor.smartTypography.shorthands": {name: t("setting.editor.smartTypography.shorthands"), icon: "replace", id: "editor.smartTypography.shorthands", terms: t("setting.editor.smartTypography.shorthands.searchTerms"), location: "editor.smartTypography"},

    "storage.management.preferredMethod": {name: t("setting.storage.management.preferredMethod"), icon: "database", id: "storage.management.preferredMethod", terms: t("setting.storage.management.preferredMethod.searchTerms"), location: "storage.management"},
    "storage.exporting.exportAs": {name: t("setting.storage.exporting.exportAs"), icon: "file-export", id: "storage.exporting.exportAs", terms: t("setting.storage.exporting.exportAs.searchTerms"), location: "storage.exporting"},

    "system.language.lang": {name: t("setting.system.language.lang"), icon: "language", id: "system.language.lang", terms: t("setting.system.language.lang.searchTerms"), location: "system.language"},
    "system.behavior.notifications": {name: t("setting.system.behavior.notifications"), icon: "bell", id: "system.behavior.notifications", terms: t("setting.system.behavior.notifications.searchTerms"), location: "system.behavior"},
    "system.behavior.rememberOpenFolders": {name: t("setting.system.behavior.rememberOpenFolders"), icon: "folder-open", id: "system.behavior.rememberOpenFolders", terms: t("setting.system.behavior.rememberOpenFolders.searchTerms"), location: "system.behavior"},
    "system.behavior.newNoteAction": {name: t("setting.system.behavior.newNoteAction"), icon: "file-plus", id: "system.behavior.newNoteAction", terms: t("setting.system.behavior.newNoteAction.searchTerms"), location: "system.behavior"},
    "system.behavior.newNoteCustomPlaceholder": {name: t("setting.system.behavior.newNoteCustomPlaceholder"), icon: "text-recognition", id: "system.behavior.newNoteCustomContent", terms: t("setting.system.behavior.newNoteCustomPlaceholder.searchTerms"), location: "system.behavior"},
    "system.shortcuts.entries": {name: t("setting.system.shortcuts.entries"), icon: "keyboard", id: "system.shortcuts.entries", terms: t("setting.system.shortcuts.entries.searchTerms"), location: "system.shortcuts"},

    "danger.reset.settings": {name: t("setting.danger.reset.settings"), icon: "settings-x", id: "danger.reset.settings", terms: t("setting.danger.reset.settings.searchTerms"), location: "danger.reset"},
    "danger.reset.notes": {name: t("setting.danger.reset.notes"), icon: "file-shredder", id: "danger.reset.notes", terms: t("setting.danger.reset.notes.searchTerms"), location: "danger.reset"}
};

function initSettings() {
    refreshSearchObj();
    refreshShortcuts();
    renderSettings();
    settingsPage('editor');
}

const userSettings = storeL("settings", {});

const settingsSchema = {
    pages: {
        appearance: {
            id: "appearance",
            name: "settings.page.appearance",
            icon: "palette",
            sections: {
                theme: {
                    id: "theme",
                    name: "modal.settings.section.appearance.theme",
                    fields: {
                        theme: {
                            id: "appearance.theme.theme",
                            label: "setting.appearance.theme.theme",
                            type: "dropdown",
                            options: generateThemeDropdownSchema(),
                            default: "dark",
                            conditions: [
                                {field: "appearance.theme.system", equals: false}
                            ]
                        },
                        system: {
                            id: "appearance.theme.system",
                            label: "setting.appearance.theme.system",
                            type: "toggle",
                            default: false,
                            description: "setting.appearance.theme.system.description"
                        },
                        sep1: {
                            type: "separator",
                            text: "Accent"
                        },
                        accentMode: {
                            id: "appearance.theme.accentMode",
                            label: "setting.appearance.theme.accentMode",
                            type: "dropdown",
                            options: [
                                {value: "follow", content: "<span data-i18n='setting.appearance.theme.accentMode.option.follow'>Follow theme</span>"},
                                {value: "custom", content: "<span data-i18n='setting.appearance.theme.accentMode.option.custom'>Custom</span>"}
                            ],
                            default: "follow",
                        },
                        accentCustom: {
                            id: "appearance.theme.accentCustom",
                            label: "setting.appearance.theme.accentCustom",
                            type: "color",
                            default: "#000000",
                            conditions: [
                                {field: "appearance.theme.accentMode", equals: "custom"}
                            ]
                        }
                    }
                },
                layout: {
                    id: "layout",
                    name: "modal.settings.section.appearance.layout",
                    fields: {
                        sidebar: {
                            id: "appearance.layout.sidebar",
                            label: "setting.appearance.layout.sidebar",
                            type: "dropdown",
                            options: [
                                {value: "nl", content: "<span data-i18n='setting.appearance.layout.sidebar.option.nl'>Left</span>"},
                                {value: "nr", content: "<span data-i18n='setting.appearance.layout.sidebar.option.nr'>Right</span>"}
                            ],
                            default: "nl"
                        },
                        toolbar: {
                            id: "appearance.layout.toolbar",
                            label: "setting.appearance.layout.toolbar",
                            type: "dropdown",
                            options: [
                                {value: "ta", content: "<span data-i18n='setting.appearance.layout.toolbar.option.ta'>Above</span>"},
                                {value: "tb", content: "<span data-i18n='setting.appearance.layout.toolbar.option.tb'>Below</span>"}
                            ],
                            default: "ta"
                        }
                    }
                },
                panels: {
                    id: "panels",
                    name: "modal.settings.section.appearance.panels",
                    fields: {
                        corners:{
                            id: "appearance.panels.corners",
                            label: "setting.appearance.panels.corners",
                            type: "slider",
                            range: [0, 8],
                            step: 1,
                            unit: "px",
                            default: 2
                        },
                        opacity: {
                            id: "appearance.panels.opacity",
                            label: "setting.appearance.panels.opacity",
                            type: "slider",
                            range: [50, 100],
                            step: 1,
                            unit: "%",
                            default: 100
                        },
                        blur: {
                            id: "appearance.panels.blur",
                            label: "setting.appearance.panels.blur",
                            type: "slider",
                            range: [0, 10],
                            step: 0.5,
                            unit: "px",
                            default: 0
                        }
                    }
                },
                background: {
                    id: "background",
                    name: "modal.settings.section.appearance.background",
                    fields: {
                        image: {
                            id: "appearance.background.image",
                            label: "setting.appearance.background.image",
                            type: "file",
                            accept: "image/*",
                            default: "",
                            conditions: [
                                {field: "appearance.background.imageUrl", equals: ""}
                            ]
                        },
                        imageUrl: {
                            id: "appearance.background.imageUrl",
                            label: "setting.appearance.background.imageUrl",
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
                            label: "setting.appearance.background.blur",
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
                            label: "setting.appearance.background.opacity",
                            type: "slider",
                            range: [1, 65],
                            step: 1,
                            unit: "%",
                            default: 65,
                            conditions: [
                                {any: [
                                    {field: "appearance.background.image", notEquals: ""},
                                    {field: "appearance.background.imageUrl", notEquals: ""}
                                ]}
                            ]
                        },
                        brightness: {
                            id: "appearance.background.brightness",
                            label: "setting.appearance.background.brightness",
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
                            label: "setting.appearance.background.fitMode",
                            type: "dropdown",
                            options: [
                                {value: "cover", content: "<span data-i18n='setting.appearance.background.fitMode.option.cover'>Cover</span>"},
                                {value: "contain", content: "<span data-i18n='setting.appearance.background.fitMode.option.contain'>Contain</span>"},
                                {value: "auto", content: "<span data-i18n='setting.appearance.background.fitMode.option.repeat'>Repeat</span>"}
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
                    id: "typography",
                    name: "modal.settings.section.appearance.typography",
                    fields: {
                        font: {
                            id: "appearance.typography.font",
                            label: "setting.appearance.typography.font",
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
                            label: "setting.appearance.typography.dyslexic",
                            type: "toggle",
                            default: false
                        }
                    }
                },
                tab: {
                    id: "tab",
                    name: "modal.settings.section.appearance.tab",
                    fields: {
                        name: {
                            id: "appearance.tab.name",
                            label: "setting.appearance.tab.name",
                            type: "text",
                            placeholder: "setting.appearance.tab.name.placeholder",
                            default: "",
                            description: "setting.appearance.tab.name.description"
                        },
                        icon: {
                            id: "appearance.tab.icon",
                            label: "setting.appearance.tab.icon",
                            type: "file",
                            accept: "image/*",
                            default: ""
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
                    id: "behavior",
                    name: "modal.settings.section.editor.behavior",
                    fields: {
                        wrap: {
                            id: "editor.behavior.wrap",
                            label: "setting.editor.behavior.wrap",
                            type: "toggle",
                            default: true
                        },
                        checkedCrossout: {
                            id: "editor.behavior.checkedCrossout",
                            label: "setting.editor.behavior.checkedCrossout",
                            type: "toggle",
                            default: true
                        },
                        spellCheck: {
                            id: "editor.behavior.spellCheck",
                            label: "setting.editor.behavior.spellCheck",
                            type: "toggle",
                            default: true
                        },
                        closePairs: {
                            id: "editor.behavior.closePairs",
                            label: "setting.editor.behavior.closePairs",
                            type: "toggle",
                            default: false,
                            description: "setting.editor.behavior.closePairs.description"
                        }
                    }
                },
                smartTypography: {
                    id: "smartTypography",
                    name: "modal.settings.section.editor.smartTypography",
                    headerButtons: [
                        {text: "<span data-i18n='settingHeaderButton.fillSmartTypographyTemplate'>Fill Exemplar</span>", action: "fillSmartTypographyTemplate()"}
                    ],
                    fields: {
                        enabled: {
                            id: "editor.smartTypography.enabled",
                            label: "setting.editor.smartTypography.enabled",
                            type: "toggle",
                            default: false,
                            description: "setting.editor.smartTypography.enabled.description"
                        },
                        shorthands: {
                            id: "editor.smartTypography.shorthands",
                            type: "dualEditTable",
                            default: [
                                { find: '--', replace: '—' },
                                { find: '...', replace: '…' },
                                { find: '->', replace: '→' }
                            ],
                            conditions: [
                                {field: "editor.smartTypography.enabled", equals: true}
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
                    id: "management",
                    name: "modal.settings.section.storage.management",
                    fields: {
                        display: {
                            id: "storage.management.display",
                            type: "storageDisplay"
                        },
                        preferredMethod: {
                            id: "storage.management.preferredMethod",
                            label: "setting.storage.management.preferredMethod",
                            type: "dropdown",
                            options: [
                                {value: "localStorage", content: "localStorage"}
                            ],
                            default: "localStorage",
                            description: "setting.storage.management.preferredMethod.description"
                        }
                    }
                },
                exporting: {
                    id: "exporting",
                    name: "modal.settings.section.storage.exporting",
                    fields: {
                        exportAs: {
                            id: "storage.exporting.exportAs",
                            label: "setting.storage.exporting.exportAs",
                            type: "dropdown",
                            options: [
                                {value: "pdf", content: "<span data-i18n='setting.storage.exporting.exportAs.option.pdf'>PDF</span>"},
                                {value: "plaintext", content: "<span data-i18n='setting.storage.exporting.exportAs.option.plaintext'>Plain Text</span>"}
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
                    id: "language",
                    name: "modal.settings.section.system.language",
                    fields: {
                        lang: {
                            id: "system.language.lang",
                            label: "setting.system.language.lang",
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
                    id: "behavior",
                    name: "modal.settings.section.system.behavior",
                    fields: {
                        notifications: {
                            id: "system.behavior.notifications",
                            label: "setting.system.behavior.notifications",
                            type: "toggle",
                            default: true,
                            description: "setting.system.behavior.notifications.description"
                        },
                        rememberOpenFolders: {
                            id: "system.behavior.rememberOpenFolders",
                            label: "setting.system.behavior.rememberOpenFolders",
                            type: "toggle",
                            default: true
                        },
                        newNoteAction: {
                            id: "system.behavior.newNoteAction",
                            label: "setting.system.behavior.newNoteAction",
                            type: "dropdown",
                            options: [
                                {value: "focus", content: "<span data-i18n='setting.system.behavior.newNoteAction.option.focus'>Open Note</span>"},
                                {value: "ghost", content: "<span data-i18n='setting.system.behavior.newNoteAction.option.ghost'>Stay in Current</span>"}
                            ],
                            default: "focus"
                        },
                        newNoteCustomPlaceholder: {
                            id: "system.behavior.newNoteCustomPlaceholder",
                            label: "setting.system.behavior.newNoteCustomPlaceholder",
                            type: "text",
                            placeholder: "setting.system.behavior.newNoteCustomPlaceholder.placeholder",
                            default: "",
                            description: "setting.system.behavior.newNoteCustomPlaceholder.description"
                        }
                    }
                },
                shortcuts: {
                    id: "shortcuts",
                    name: "modal.settings.section.system.shortcuts",
                    fields: {
                        entries: {
                            id: "system.shortcuts.entries",
                            type: "singleEditTable",
                            sets: {
                                newNote: {
                                    id: "newNote",
                                    name: "shortcut.newNote",
                                    type: "keysEntry",
                                    keys: ["Ctrl", "Alt", "O"],
                                },
                                newFolder: {
                                    id: "newFolder",
                                    name: "shortcut.newFolder",
                                    type: "keysEntry",
                                    keys: ["Ctrl", "Alt", "P"]
                                },
                                renameCurrentNote: {
                                    id: "renameCurrentNote",
                                    name: "shortcut.renameCurrentNote",
                                    type: "keysEntry",
                                    keys: ["F2"]
                                }
                            }
                        }
                    }
                }
            }
        },/*
        security: {
            id: "security",
            name: "settings.page.security",
            icon: "lock",
            sections: {
                lockedNotes: {
                    id: "lockedNotes",
                    name: "modal.settings.section.security.lockedNotes",
                    fields: {}
                }
            }
        },*/
        danger: {
            id: "danger",
            name: "settings.page.danger",
            icon: "alert-triangle",
            danger: true,
            sections: {
                reset: {
                    id: "reset",
                    name: "modal.settings.section.danger.reset",
                    fields: {
                        settings: {
                            id: "danger.reset.settings",
                            label: "setting.danger.reset.settings",
                            type: "button",
                            content: "<span data-i18n='setting.danger.reset.settings.content'></span>",
                            danger: true
                        },
                        notes: {
                            id: "danger.reset.notes",
                            label: "setting.danger.reset.notes",
                            type: "button",
                            content: "<span data-i18n='setting.danger.reset.notes.content'></span>",
                            danger: true
                        }
                    }
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
const getValue = (path, strictOrigin) => (path in userSettings && strictOrigin !== true)
    ? userSettings[path]
    : fieldIndex.get(path)?.default;

const isEnabled = field => !field.conditions || check(field.conditions);

function refreshConditions() {
    document.querySelectorAll('[data-path]').forEach((wrapper) => {
        const field = fieldIndex.get(wrapper.dataset.path);
        if (!field) return;
        const enabled = isEnabled(field);
        wrapper.inert = !enabled;
        wrapper.classList.toggle("disabled", !enabled);
    });
}

function onChange(field, value) {
    userSettings[field.id] = value;
    if (userSettings[field.id] == fieldIndex.get(field.id)?.default) delete userSettings[field.id];
    if (isEnabled(field)) applications[field.id]?.(value);
    refreshConditions();
    storeS("settings", userSettings);
}

function applyInitialSetting(field) {
    if (isEnabled(field)) applications[field.id]?.(getValue(field.id), true);
    refreshConditions();
}

function renderNavButtons() {
    Object.values(settingsSchema.pages).forEach((page) => {
        const button = document.createElement("button");
        button.id = "spb-"+page.id;
        button.onclick = () => settingsPage(page.id);
        button.innerHTML = `
            <i class="ti ti-${page.icon}"></i>
            <span data-i18n="settings.page.${page.id}">${t(page.name)}</span>
        `;
        if (page.danger == true) button.classList.add("danger");
        sNavBtnsContainer.appendChild(button);
    });
}

const sNavBtnsContainer = document.getElementById("settingsPageButtons");
const sPagesContainer = document.getElementById("settings-pages");
function renderSettings() {
    renderNavButtons();

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
            sectHeader.id = `sph-${page.id}-${section.id}`;
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
                        <span data-i18n="${field.label}">${t(field.label)}</span>
                    `;
                    optionContainer.dataset.path = field.id;
                    optionContainer.appendChild(generateInput(field, onChange, optionContainer));
                    applyInitialSetting(field);
                } else if (field.type == "separator") {
                    optionContainer = document.createElement(field.text ? "h3" : "hr");
                    if (field.text) optionContainer.innerText = t(field.text);
                } else {
                    optionContainer = document.createElement("div");
                    optionContainer.dataset.path = field.id;
                    optionContainer.appendChild(generateInput(field, onChange, optionContainer));
                }
                if (field.description) {
                    optionContainer.insertAdjacentHTML('beforeend', `
                        <div class="flex-break"></div>
                        <span class="label-description" data-i18n="${field.description}">${t(field.description)}</span>
                    `);
                };
                if (field.danger == true) optionContainer.classList.add("danger");
                sectElem.appendChild(optionContainer);
            });
        });
    });
    refreshConditions();
}

function setTheme(theme) {
    for (const name of document.documentElement.classList) {
        if (name.includes("theme-")) document.documentElement.classList.remove(name);
    }
    document.documentElement.classList.add("theme-"+theme);
}

function fillSmartTypographyTemplate() {
    const table = document.querySelector("[data-path='editor.smartTypography.shorthands'] > table");
    console.log(table);
}
const applications = {
    "appearance.theme.theme": (theme, loading) => {
        setTheme(theme);
        if (!loading) notification('success', t("notification.changedTheme", {name: t("theme."+theme)}), t("notificationSource.settings"), 4);
    },
    "appearance.theme.system": (checked, loading) => {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (checked) {setTheme(theme)} else {setTheme(getValue("appearance.theme.theme"))};
        if (!loading) notification('success', t(("notification.systemTheme." + (checked ? "on":"off"))), t("notificationSource.settings"), 4);
    },
    "appearance.theme.accentMode": (val, loading) => {
        if (val == "custom") {
            document.documentElement.style.setProperty("--accent", getValue("appearance.theme.accentCustom"));
            document.documentElement.style.setProperty("--accentm", getValue("appearance.theme.accentCustom")+"66");
            document.documentElement.style.setProperty("--text-highlight", getValue("appearance.theme.accentCustom")+"88");
        } else {
            document.documentElement.style.setProperty("--accent", null);
            document.documentElement.style.setProperty("--accentm", null);
            document.documentElement.style.setProperty("--text-highlight", null);
        }
    },
    "appearance.theme.accentCustom": (val, loading) => {
        if (getValue("appearance.theme.accentMode") == "custom") {
            document.documentElement.style.setProperty("--accent", val);
            document.documentElement.style.setProperty("--accentm", val+"66");
            document.documentElement.style.setProperty("--text-highlight", val+"88");
        }
    },
    "appearance.layout.sidebar": (val, loading) => {
        document.documentElement.classList.remove("lo-nl", "lo-nr");
        document.documentElement.classList.add("lo-"+val);
    },
    "appearance.layout.toolbar": (val, loading) => {
        document.documentElement.classList.remove("lo-ta", "lo-tb");
        document.documentElement.classList.add("lo-"+val);
    },
    "appearance.panels.corners": (val, loading) => {
        document.documentElement.style.setProperty("--corners", val+"px");
    },
    "appearance.panels.opacity": (val, loading) => {
        document.documentElement.style.setProperty("--panel-opacity", val);
    },
    "appearance.panels.blur": (val, loading) => {
        document.documentElement.style.setProperty("--panel-blur", val+"px");
    },
    "appearance.background.image": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper", `url("${val}")`);
    },
    "appearance.background.imageUrl": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper", `url("${val}")`);
    },
    "appearance.background.blur": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper-blur", val+"px");
    },
    "appearance.background.opacity": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper-opacity", val/100);
    },
    "appearance.background.brightness": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper-brightness", (val+100)/100);
    },
    "appearance.background.fitMode": (val, loading) => {
        document.documentElement.style.setProperty("--wallpaper-fit", val);
        document.documentElement.style.setProperty("--wallpaper-repeat", val == "auto" ? "repeat" : "no-repeat");
    },
    "appearance.typography.font": (val, loading) => {
        document.documentElement.style.setProperty("--font", val);
    },
    "appearance.typography.dyslexic": (val, loading) => {
        document.documentElement.style.setProperty("--font", val == true ? "OpenDyslexic" : getValue("appearance.typography.font"));
    },
    "appearance.tab.name": (val, loading) => {
        if (val.trim() == "") {
            document.title = t("app.title.default");
            document.querySelector("title").setAttribute('i18n', 'app.title.default');
        } else {
            document.title = val;
            document.querySelector("title").removeAttribute('i18n');
        }
    },
    "appearance.tab.icon": (val, loading) => {
        document.querySelector('link[rel="icon"').href = val == "" ? t("app.icon.default") : val;
    },
    "editor.behavior.wrap": (val, loading) => {
        document.querySelector(".ql-editor").classList.toggle("nowrap", !val);
    },
    "editor.behavior.checkedCrossout": (val, loading) => {
        document.documentElement.style.setProperty("--checkedDecor", val == true ? "line-through" : "inherit");
    },
    "editor.behavior.spellCheck": (val, loading) => {
        document.querySelector(".ql-editor").spellcheck = val;
    },
    "editor.behavior.closePairs": (val, loading) => {
        CLOSEPAIRS_ENABLED = val;
    },
    "editor.smartTypography.enabled": (val, loading) => {

    },
    "editor.smartTypography.shorthands": (val, loading) => {

    },
    "storage.management.display": (val, loading) => {

    },
    "storage.management.preferredMethod": (val, loading) => {
        
    },
    "storage.exporting.exportAs": (val, loading) => {

    },
    "system.language.lang": (code, loading) => {
        setLocale(code);
        setTimeout(() => {
            if (!loading) notification('success', t("notification.languageChanged", {lang: t("language."+code)}), t("notificationSource.settings"));
        }, 100);
    },
    "system.behavior.notifications": (val, loading) => {
        NOTIFS_ENABLED = val;
    },
    "system.behavior.rememberOpenFolders": (val, loading) => {
        REMEMBER_FOLDERS = val;
    },
    "system.behavior.newNoteAction": (val, loading) => {
        NEWNOTE_ACTION = val;
    },
    "system.behavior.newNoteCustomPlaceholder": (val, loading) => {
        quill.root.dataset.placeholder = val != "" ? val : t("editor.empty.placeholder");
    },
    "system.shortcuts.entries": (val, loading) => {

    },
    "danger.reset.settings": (val, loading) => {
        if (!loading) console.log("Settings have been reset to default.")
    },
    "danger.reset.notes": (val, loading) => {
        if (!loading) console.log("User notes have been cleared.")
    }
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
                onChange(field, elem.checked);
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
            elem.onchange = () => onChange(field, elem.value);
            elem.value = getValue(field.id);
            break;
        case "slider":
            // setAttribute because custom elem can't just use elem.min etc :<
            elem = document.createElement("wn-slider");
            elem.setAttribute("min", field.range[0]);
            elem.setAttribute("max", field.range[1]);
            elem.setAttribute("step", field.step);
            elem.setAttribute("unit", field.unit);

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field, elem.value);
            break;
        case "color":
            elem = document.createElement("wn-color-picker");

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field, elem.value);
            break;
        case "text":
            elem = document.createElement("div")
            elem.classList.add("cinput");
            const input = document.createElement("input");
            input.type = "text";
            if (field.placeholder) {
                input.placeholder = t(field.placeholder);
                input.dataset.i18nPlaceholder = field.placeholder;
            }
            input.value = getValue(field.id);
            input.oninput = () => onChange(field, input.value);

            elem.appendChild(input);
            break;
        case "file":
            elem = document.createElement("wn-file-picker");
            elem.setAttribute("accept", field.accept);

            elem.value = getValue(field.id);
            elem.onchange = () => onChange(field, elem.value);
            break;
        case "button":
            elem = document.createElement("button");

            elem.innerHTML = field.content;
            elem.onclick = () => {applications[field.id]?.()};
            break;
        case "dualEditTable":
            elem = document.createElement("table");
            // js the header
            elem.innerHTML = `<tbody><tr><th data-i18n="settingInput.dualTable.header.shorthand">${t("settingInput.dualTable.header.shorthand")}</th><th data-i18n="settingInput.dualTable.header.result">${t("settingInput.dualTable.header.result")}</th></tr></tbody>`;
            const newEntryRow = document.createElement("tr");
            newEntryRow.innerHTML = `<td colspan="2"><button class="new-row"><i class="ti ti-plus"></i> <span data-i18n="settingInput.dualTable.button.newEntry">${t("settingInput.dualTable.button.newEntry")}</span></button></td>`;
            elem.querySelector('tbody').appendChild(newEntryRow);
            newEntryRow.querySelector('.new-row').addEventListener("click", () => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = "<td contenteditable='plaintext-only'></td><td contenteditable='plaintext-only'></td>";
                newEntryRow.before(newRow);
            });
            // prevent newlines in cells
            elem.addEventListener('keydown', (e) => {
                if (e.target.isContentEditable && e.key === 'Enter') e.preventDefault();
            });
            break;
        case "singleEditTable":
            elem = document.createElement("table");
            // heder
            elem.innerHTML = `<tbody><tr><th data-i18n="settingInput.singleTable.header.action">${t("settingInput.singleTable.header.action")}</th><th data-i18n="settingInput.singleTable.header.shortcut">${t("settingInput.singleTable.header.shortcut")}</th></tr></tbody>`;
            Object.values(field.sets).forEach((set) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <th scope="row" data-i18n="${set.name}">${t(set.name)}</th>
                    <td></td>
                `;
                elem.querySelector('tbody').appendChild(row);
                const keyInput = generateInput(set);
                row.querySelector("td").appendChild(keyInput);
            });
            break;
        case "storageDisplay":
            elem = document.createElement("div");
            elem.classList.add("storageDisplay");
            elem.innerHTML = `
                <div>
                    <header>
                        <h3>Storage Info</h3>
                    </header>
                    <p>
                        <span><span data-i18n="settings.storageDisplay.statusLabel">${t("settings.storageDisplay.statusLabel")}</span> &nbsp; ${generate("status")}</span>
                        <p class="info">
                            <span><b data-i18n="settings.storageDisplay.itemsCount.label"></b> <span id="itemsCountData">${t("settings.storageDisplay.itemsCount.data", {total: Object.entries(JSON.parse(localStorage.notes_reference || "{}")).length + Object.entries(JSON.parse(localStorage.folders || "{}")).length, notes: Object.entries(JSON.parse(localStorage.notes_reference || "{}")).length, folders: Object.entries(JSON.parse(localStorage.folders || "{}")).length})}</span></span><br>
                            <span><b data-i18n="settings.storageDisplay.lastModified.label"></b> <span>Unknown</span></span><br>
                            <span><b data-i18n="settings.storageDisplay.lastBackup.label"></b> <span>Unknown</span></span><br>
                            <br>
                            <span><b data-i18n="settings.storageDisplay.storageLocation.label">Storage Location:</b> <span>Local</span></span>
                        </p>
                        <div class="buttons">
                            <button disabled>Backup</button>
                            <button disabled>Restore</button>
                        </div>
                    </p>
                </div>
                <div>
                    <div class="piChart" style="background-image: conic-gradient(${generate('gradient')})"></div>
                    <ul>${generate("list")}</ul>
                </div>
            `;

            document.addEventListener("localechange", () => {
                document.getElementById("itemsCountData").innerText = t("settings.storageDisplay.itemsCount.data", {total: Object.entries(JSON.parse(localStorage.notes_reference || "{}")).length + Object.entries(JSON.parse(localStorage.folders || "{}")).length, notes: Object.entries(JSON.parse(localStorage.notes_reference || "{}")).length, folders: Object.entries(JSON.parse(localStorage.folders || "{}")).length});
            });

            function generate(section) {
                const max = 5242880;
                const entries = Object.entries(localStorage);
                const total = entries.flat().join("").length * 2; // 2 bytes / UTF-16 char
                const totalNotes = entries
                    .filter(([key]) => key.includes("note_"))
                    .flat()
                    .join("").length * 2;
                const totalSettings = (localStorage.settings ?? "").length * 2;
                const totalOther = Math.max(0, total - (totalSettings + totalNotes));

                const inflation = Math.pow(Math.min(1, total / max), 0.35);
                const percentUsed = ((total / max) * 100).toFixed(2);
                const totalDeg = inflation * 360;

                // 2. Prevent division by zero (NaN) when localStorage is completely empty
                const notesDeg = total > 0 ? (totalNotes / total) * totalDeg : 0;
                const settingsDeg = total > 0 ? notesDeg + (totalSettings / total) * totalDeg : 0;
                const otherDeg = total > 0 ? settingsDeg + (totalOther / total) * totalDeg : 0;

                const gradient = `
                    color-mix(in oklch, var(--accent) 100%, var(--textb)) 0deg ${notesDeg}deg, 
                    color-mix(in oklch, var(--accent) 65%, var(--textb)) ${notesDeg}deg ${settingsDeg}deg, 
                    color-mix(in oklch, var(--accent) 35%, var(--textb)) ${settingsDeg}deg ${otherDeg}deg,
                    var(--bg-3) ${totalDeg}deg 360deg`;
                if (section === "gradient") return gradient;

                const list = `
                    <span class="size">${formatBytes(total)} / ${formatBytes(max)} (${percentUsed}%)</span>
                    <li style="--bullet-color: color-mix(in oklch, var(--accent) 100%, var(--textb))"><span data-i18n="settings.storageDisplay.part.notes">${t("settings.storageDisplay.part.notes")}</span><span class="size">${formatBytes(totalNotes)}</span></li>
                    <li style="--bullet-color: color-mix(in oklch, var(--accent) 65%, var(--textb))"><span data-i18n="settings.storageDisplay.part.settings">${t("settings.storageDisplay.part.settings")}</span><span class="size">${formatBytes(totalSettings)}</span></li>
                    <li style="--bullet-color: color-mix(in oklch, var(--accent) 35%, var(--textb))"><span data-i18n="settings.storageDisplay.part.other">${t("settings.storageDisplay.part.other")}</span><span class="size">${formatBytes(totalOther)}</span></li>
                `;
                if (section === "list") return list;

                const thresholds = [95, 80];
                const numericPercent = (total / max) * 100;
                const statusColor = numericPercent > thresholds[0] ? "var(--danger)" : numericPercent > thresholds[1] ? "var(--warning)" : "var(--success)";
                const statusText = numericPercent > thresholds[0] ? "Almost Full" : numericPercent > thresholds[1] ? "Getting Low" : "Healthy";
                const status = `
                    <span style="color: ${statusColor};">● ${statusText}</span>
                `;
                if (section === "status") return status;
            }

            break;
        case "keysEntry":
            elem = document.createElement("button");
            elem.classList.add("keysEntry");
            elem.textContent = userSettings["system.shortcut."+field.id]?.join(" + ") || field.keys.join(" + ");
            let savedShortcut = null;
            elem.onclick = () => {
                if (elem.classList.contains("recording")) return;
                elem.classList.add("recording");
                elem.textContent = t("settingInput.keysEntry.prompt.active");
                elem.classList.add("recording");
                window.addEventListener("keydown", handleKey, true);
                window.addEventListener("keyup", handleKey, true);
                elem.addEventListener("blur", stopRecording);
            };
            function handleKey(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                const keys = [
                    e.ctrlKey && "Ctrl",
                    e.altKey && "Alt",
                    e.shiftKey && "Shift",
                    e.metaKey && "Meta"
                ].filter(Boolean);
                if (e.type == "keyup" || ["Control", "Shift", "Alt", "Meta"].includes(e.key)) {
                    elem.textContent = keys.length ? `${keys.join(" + ")} + ...` : t("settingInput.keysEntry.prompt.active");
                    return;
                }
                const mainKey = e.key === " " ? "Space" : e.key.length == 1 ? e.key.toUpperCase() : e.key;
                savedShortcut = (keys.length === 0 && mainKey == "Escape") ? null : [...keys, mainKey].join(" + ");
                stopRecording();
            }
            function stopRecording() {
                elem.classList.remove("recording");
                elem.textContent = savedShortcut || t("settingInput.keysEntry.prompt.inactive");
                window.removeEventListener("keydown", handleKey, true);
                window.removeEventListener("keyup", handleKey, true);
                elem.removeEventListener("blur", stopRecording);
                elem.blur();
                if (savedShortcut) {
                    if (savedShortcut === field.keys.join(" + ") || !savedShortcut) {
                        // Revert to default (or clear if default is empty)
                        delete userSettings["system.shortcut." + field.id];
                    } else {
                        userSettings["system.shortcut." + field.id] = savedShortcut.split(" + ");
                    }
                    storeS("settings", userSettings);
                    refreshShortcuts();
                }
            }
            break;
        default:
            elem = document.createElement("b");
            elem.textContent = "[Element could not be rendered.]";
    }
    if (parent) {
        parent.classList.toggle("disabled", !isEnabled(field));
        if (!isEnabled(field)) parent.inert = true;
    }
    return elem;
}

// KEYBOARD SHORTCUTS RHAHHH
const shortcutActions = {
    newNote: () => {
        closeAllDialogs();
        const id = createObject("note"); // createObject returns the id of what it created
        renameObject("note", id);
    },
    newFolder: () => {
        closeAllDialogs();
        const id = createObject("folder");
        renameObject("folder", id);
    },
    renameCurrentNote: () => {
        renameObject("note", currentNote);
    }
};

var SHORTCUTS = {};
function refreshShortcuts() {
    // load defaults from schema
    SHORTCUTS = {...settingsSchema.pages.system.sections.shortcuts.fields.entries.sets};
    const modifiedShortcuts = Object.fromEntries(Object.entries(userSettings).filter(([key]) => key.includes("system.shortcut.")));
    // replace defaults with user-custom if exist
    Object.entries(modifiedShortcuts).forEach((s) => {
        SHORTCUTS[s[0].replace("system.shortcut.", "")].keys = s[1];
    });
}

function checkShortcut(e) {
    var keys = [];
    if (e.ctrlKey) keys.push("Ctrl");
    if (e.shiftKey) keys.push("Shift");
    if (e.altKey) keys.push("Alt");
    if (e.metaKey) keys.push("Meta");
    // normalize
    keys.push(e.key == " " ? "Space" : e.key.length == 1 ? e.key.toUpperCase() : ["Control", "Shift", "Alt", "Meta"].includes(e.key) ? "" : e.key);
    // if the specific combination exists, execute
    Object.values(SHORTCUTS).forEach((s) => {
        if (keys.join("") == s.keys.join("")) shortcutActions[s.id]?.();
    });
}

window.addEventListener("keydown", checkShortcut);

// get shortcut keys as string, for inline displays like in context menu
function ks(id) {
    return SHORTCUTS[id].keys.join(" + ");
}

// NAVIGATION AND UTILITY idk
var currentSettingsPage;
// wow im so consistent with name formatting fr T-T
function settingsPage(name) {
    document.querySelectorAll("#settings-pages>div").forEach((p) => {p.classList.remove("page-current")}); // hide all pages and show the right one
    document.querySelector("#settings-pages>div#sp-"+name).classList.add("page-current");
    document.querySelectorAll("#settingsPageButtons>button").forEach((p) => {p.classList.remove("current")}); // remove highlight from all buttons and give it to the right one
    document.querySelector("#settingsPageButtons>button#spb-"+name).classList.add("current");
    currentSettingsPage = name;
}

function openSetting(location) {
    const [page, header] = location.split(".");
    openDialog("settings");
    settingsPage(page);
    const targetElement = document.getElementById(`sph-${page}-${header}`);

    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top
            - sPagesContainer.getBoundingClientRect().top
            + sPagesContainer.scrollTop;

        sPagesContainer.scrollTo({ top, behavior: "smooth" });
    }
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

// SEARCHING ***********************************************
const searchBar = document.getElementById("settingsSearchInput");

searchBar.addEventListener("focus", () => {
    renderSearch();
});

searchBar.addEventListener("blur", () => {
    searchBar.value = "";
    sNavBtnsContainer.innerHTML = "";
    renderNavButtons();
    document.querySelectorAll("#settingsPageButtons>button").forEach((p) => {p.classList.remove("current")}); // remove highlight from all buttons and give it to the right one
    document.querySelector("#settingsPageButtons>button#spb-"+currentSettingsPage).classList.add("current");
});

searchBar.addEventListener("keyup", (e) => {
    renderSearch();
});

function renderSearch() {
    const query = searchBar.value.trim().toLowerCase();
    sNavBtnsContainer.innerHTML = "";
    refreshSearchObj();
    const rendered = [];
    Object.values(settingsSearch).forEach((setting) => {
        setting.terms.forEach((term) => {
            if ((term.includes(query) || query == "") && !rendered.includes(setting.name)) {
                const button = document.createElement("button");
                button.onpointerdown = (e) => {
                    e.stopPropagation();
                    sNavBtnsContainer.innerHTML = "";
                    renderNavButtons();
                    openSetting(setting.location);
                };
                button.innerHTML = `
                    <i class="ti ti-${setting.icon}"></i>
                    <span>${setting.name}</span>
                `;
                sNavBtnsContainer.appendChild(button);
                rendered.push(setting.name);
            }
        });
    });
}