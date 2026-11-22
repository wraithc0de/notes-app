/**
 * Custom Quill Emoji Module
 *
 * UI & Emoji Icons from Tabler Icons (https://tabler.io/icons)
 * Copyright (c) 2020-2026 Paweł Kuna
 * Licensed under the MIT License (https://github.com/tabler/tabler-icons/blob/main/LICENSE)
 */

const Embed = Quill.import('blots/embed');

class EmojiFormat extends Embed {
    static blotName = 'emoji';
    static tagName = 'span';
    static className = 'ql-emoji';

    static create(value) {
        let node = super.create();
        node.dataset.emoji = value;
        node.textContent = value;
        node.setAttribute('contenteditable', 'false');
        return node;
    }

    static value(node) {
        return node.dataset.emoji || node.textContent.replace(/\uFEFF/g, '');
    }

    optimize(context) {
        super.optimize(context);
        this.domNode.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE && child.textContent.includes('\uFEFF')) {
                child.remove();
            }
        });
    }
}
Quill.register(EmojiFormat, true);

// register default icons
const Icons = Quill.import('ui/icons');
const iconDefaults = {
    toolbar: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 10l.01 0"/><path d="M15 10l.01 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>',
    smileys_emotion: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 10l.01 0"/><path d="M15 10l.01 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>',
    people_body: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-fall"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 21l1 -5l-1 -4l-3 -4h4l3 -3"/><path d="M6 16l-1 -4l3 -4"/><path d="M5 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M13.5 12h2.5l4 2"/></svg>',
    animals_nature: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-leaf"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21c.5 -4.5 2.5 -8 7 -10"/><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3l.014 0"/></svg>',
    food_drink: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-coffee"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1"/><path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"/><path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"/><path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5"/><path d="M16.746 16.726a3 3 0 1 0 .252 -5.555"/></svg>',
    travel_places: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plane-departure"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727"/><path d="M3 21h18"/></svg>',
    activities: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ball-american-football"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 9l-6 6"/><path d="M10 12l2 2"/><path d="M12 10l2 2"/><path d="M8 21a5 5 0 0 0 -5 -5"/><path d="M16 3c-7.18 0 -13 5.82 -13 13a5 5 0 0 0 5 5c7.18 0 13 -5.82 13 -13a5 5 0 0 0 -5 -5"/><path d="M16 3a5 5 0 0 0 5 5"/></svg>',
    objects: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"/><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"/><path d="M9.7 17l4.6 0"/></svg>',
    symbols: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/></svg>',
    flags: '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-flag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9"/><path d="M5 21v-7"/></svg>'
}
Icons['emoji'] = iconDefaults.toolbar;
const categoryMap = {
    0: {
        slug: "smileys_emotion",
        name: "Smileys & Emotion"
    },
    1: {
        slug: "people_body",
        name: "People & Body"
    },
    2: {
        slug: "components",
        name: "Components"
    },
    3: {
        slug: "animals_nature",
        name: "Animals & Nature"
    },
    4: {
        slug: "food_drink",
        name: "Food & Drink"
    },
    5: {
        slug: "travel_places",
        name: "Travel & Places"
    },
    6: {
        slug: "activities",
        name: "Activities"
    },
    7: {
        slug: "objects",
        name: "Objects"
    },
    8: {
        slug: "symbols",
        name: "Symbols"
    },
    9: {
        slug: "flags",
        name: "Flags"
    }
}

class EmojiModule {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;

        const toolbar = this.quill.getModule("toolbar");
        if (!toolbar) return;
        toolbar.handlers.emoji = (val) => {
            this.togglePicker(val);
        };

        // apply icon
        const button = toolbar.container.querySelector(".ql-emoji");
        if (!button.innerHTML.trim() || options?.icons?.toolbar) {
            button.innerHTML = options?.icons?.toolbar || iconDefaults.toolbar;
        }

        const picker = document.createElement("div");
        this.picker = picker;
        picker.classList.add("ql-emoji-picker");
        picker.style.setProperty("--ql-emoji-background", options?.styles?.background || "#ffffff");
        picker.style.setProperty("--ql-emoji-text-base", options?.styles?.text || "#000000");
        picker.style.setProperty("--ql-emoji-text-muted", options?.styles?.text_muted || "#444444");
        picker.style.setProperty("--ql-emoji-border", options?.styles?.border || "#cccccc");
        picker.style.setProperty("--ql-emoji-accent", options?.styles?.accent || "#3caadd");
        picker.style.setProperty("--ql-emoji-corners", options?.styles?.corners || "2px");
        picker.innerHTML = `
            <input class="ql-emoji-picker-search" placeholder="${options?.language?.search_placeholder || 'Search...'}">
            <nav class="ql-emoji-nav">
                <!-- js -->
                <span class="ql-emoji-nav-indicator"></span>
            </nav>
            <div class="ql-emoji-grid"></div>
            <div class="ql-emoji-preview">
                <span class="ql-emoji-preview-character">😀</span>
                <div>
                    <span class="ql-emoji-preview-name">grinning face</span>
                    <span class="ql-emoji-preview-code">:grinning_face:</span>
                </div>
            </div>
        `;
        document.body.appendChild(picker);
        this.nav = picker.querySelector(".ql-emoji-nav");
        this.grid = picker.querySelector(".ql-emoji-grid");
        this.indicator = picker.querySelector(".ql-emoji-nav-indicator");
        this.searchInput = picker.querySelector(".ql-emoji-picker-search");

        this.indicCurLeft = 0;
        this.indicCurWidth = 0;
        this.searchActive = false;
        this.searchReturnState = null;
        this.isManualScrolling = false;
        document.addEventListener("localechange", () => this.updateLocale());

        this.buildPickerContent().then(() => {
            picker.classList.add("rendering"); 
            this.switchPage("smileys_emotion", false); 
            this.updateLocale();
            picker.classList.remove("rendering");
            this.setupScrollObserver();
        });

        // escape picker on outside click
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".ql-emoji-picker") && !e.target.closest(".ql-emoji")) picker.classList.remove("shown");
        });

        const input = picker.querySelector(".ql-emoji-picker-search");
        input.addEventListener("input", (e) => {
            this.triggerSearch();
        });

    }

    togglePicker() {
        const buttonBox = document.querySelector(".ql-emoji").getBoundingClientRect();
        const gap = 4;
        this.picker.classList.toggle("shown");
        if (this.picker.classList.contains("shown")) {
            this.picker.style.top = buttonBox.bottom + window.scrollY + gap + "px";
            this.picker.style.left = buttonBox.left + window.scrollX + "px";
            // make sure it doesn't go off right edge of screen
            if (this.picker.getBoundingClientRect().right > document.documentElement.clientWidth) {
                this.picker.style.left = document.documentElement.clientWidth - this.picker.clientWidth + "px";
            }
        }
    }

    updateLocale() {
        const searchKey = "emojiPicker.search.placeholder";
        const translatedSearchPlaceholder = t(searchKey);
        this.searchInput.placeholder = translatedSearchPlaceholder === searchKey
            ? this.options?.language?.search_placeholder || "Search..."
            : translatedSearchPlaceholder;

        this.nav.querySelectorAll("button[data-category]").forEach((button) => {
            const slug = button.dataset.category;
            const labelKey = `emojiPicker.category.${slug}`;
            const translatedLabel = t(labelKey);
            const fallbackLabel = this.options?.language?.[slug]
                || Object.values(categoryMap).find((category) => category.slug === slug)?.name
                || slug;
            const label = translatedLabel === labelKey ? fallbackLabel : translatedLabel;
            button.dataset.qlEmojiTooltip = label;

            const header = this.grid.querySelector(`.ql-emoji-grid-category-header[data-category='${slug}']`);
            if (header) header.textContent = label;
        });
    }
    
    setupScrollObserver() {
        const sections = this.grid.querySelectorAll(".ql-emoji-category-section");
        const observerOptions = {
            root: this.grid,
            rootMargin: "-10px 0px -50% 0px",
            threshold: 0
        };
        const observer = new IntersectionObserver((entries) => {
            if (this.isManualScrolling || this.searchActive) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const slug = entry.target.dataset.category;
                    if (this.currentPage != slug) {
                        this.currentPage = slug;
                        this.nav.querySelectorAll("button").forEach((b) => {b.classList.remove('active')});
                        const targetNavBtn = this.nav.querySelector(`button[data-category='${slug}']`);
                        if (targetNavBtn && !this.searchActive) {
                            targetNavBtn.classList.add('active');
                            this.stretchTo(targetNavBtn);
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));
    }

    async getEmojiData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }

    stretchTo(target, duration = 300) {
        const wrapperRect = this.nav.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const targetLeft = targetRect.left - wrapperRect.left + this.nav.scrollLeft;
        const targetWidth = targetRect.width;
        const isMovingRight = targetLeft >= this.indicCurLeft;
        let stretchLeft, stretchWidth;
        if (isMovingRight) {
            stretchLeft = this.indicCurLeft;
            stretchWidth = (targetLeft + targetWidth) - this.indicCurLeft;
        } else {
            stretchLeft = targetLeft;
            stretchWidth = (this.indicCurLeft + this.indicCurWidth) - targetLeft;
        }

        const animation = this.indicator.animate(
            [
                {transform: `translateX(${this.indicCurLeft}px)`, width: `${this.indicCurWidth}px`},
                {transform: `translateX(${stretchLeft}px)`, width: `${stretchWidth}px`, offset: 0.5},
                {transform: `translateX(${targetLeft}px)`, width: `${targetWidth}px`}
            ],
            {duration: duration, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards"}
        );
        animation.onfinish = () => {
            this.indicator.style.transform = `translateX(${targetLeft}px)`;
            this.indicator.style.width = `${targetWidth}px`;
            animation.cancel();
        };
        this.indicCurLeft = targetLeft;
        this.indicCurWidth = targetWidth;
    }

    switchPage(slug, smoothScroll = true) {
        const wasSearching = this.searchActive;
        if (wasSearching) {
            this.searchInput.value = "";
            this.triggerSearch({restorePosition: false});
        }
        if (this.currentPage == slug && !wasSearching) return;
        const targetNavBtn = this.nav.querySelector(`button[data-category='${slug}']`);
        if (!targetNavBtn) return;
        this.currentPage = slug;
        this.nav.querySelectorAll("button").forEach((b) => {b.classList.remove('active')});
        targetNavBtn.classList.add('active');
        this.stretchTo(targetNavBtn);
        
        if (smoothScroll) {
            this.isManualScrolling = true;
            const header = this.grid.querySelector(`.ql-emoji-grid-category-header[data-category='${slug}']`);
            if (header) {
                this.grid.scrollTo({
                    top: header.getBoundingClientRect().top - this.grid.getBoundingClientRect().top + this.grid.scrollTop,
                    behavior: "smooth"
                });
                // Reset manual scroll flag after smooth scroll finishes
                clearTimeout(this.manualScrollTimer);
                this.manualScrollTimer = setTimeout(() => { this.isManualScrolling = false; }, 500);
            }
        }
    }

    async buildPickerContent() {
        const emojiData = this.getEmojiData("https://cdn.jsdelivr.net/npm/emojibase-data@18.0.0/en/compact.json").then((data) => {return data});
        const data = await emojiData;
        const renderedCategories = [];

        const previewChar = this.picker.querySelector(".ql-emoji-preview-character");
        const previewName = this.picker.querySelector(".ql-emoji-preview-name");
        const previewCode = this.picker.querySelector(".ql-emoji-preview-code");

        let currentSectionDiv = null;

        const self = this;
        data.forEach((emoji) => {
            const categoryId = emoji.group;
            if (categoryId == 2) return;
            const section = categoryMap[categoryId];
            if (!section) return;

            const emojiName = emoji.label || emoji.name || "";
            // generate slug instead of fecthing separate file to reduce size/memory
            const emojiSlug = emojiName
                .normalize("NFD") // splits accented characters (eg ô becomes o + ^)
                .replace(/[\u0300-\u036f]/g, "") // strips out said accent marks
                .replace("&", "and")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "_") // replace spaces and punctuation w underscores
                .replace(/^_+|_+$/g, ""); // trim trailing/leading underscores

            if (!renderedCategories.includes(categoryId)) {
                renderedCategories.push(categoryId);
                // create wrapper container for category section
                currentSectionDiv = document.createElement("div");
                currentSectionDiv.classList.add("ql-emoji-category-section");
                currentSectionDiv.dataset.category = section.slug;
                this.grid.appendChild(currentSectionDiv);

                const navButton = document.createElement("button");
                navButton.dataset.qlEmojiTooltip = this.options?.language?.[section.slug] || section.name;
                navButton.dataset.category = section.slug;
                navButton.innerHTML = this.options?.icons?.[section.slug] || iconDefaults[section.slug];
                navButton.onclick = () => this.switchPage(section.slug);
                this.nav.appendChild(navButton);

                const header = document.createElement("span");
                header.classList.add("ql-emoji-grid-category-header");
                header.textContent = this.options?.language?.[section.slug] || section.name;
                header.dataset.category = section.slug;
                currentSectionDiv.appendChild(header);
            }

            const emojiGridElement = document.createElement("button");
            emojiGridElement.innerHTML = emoji.unicode || emoji.emoji;
            emojiGridElement.dataset.slug = emojiSlug;
            emojiGridElement.dataset.name = emojiName;
            emojiGridElement.dataset.category = section.slug;
            // check if emoji has skin variants
            if (emoji.skins && emoji.skins.length > 0) {
                emojiGridElement.classList.add("ql-emoji-has-skins");
                let pressTimer = null;
                let isLongPressActive = false;

                emojiGridElement.addEventListener("pointerdown", (e) => {
                    // only trigger on primary click
                    if (e.button !== 0 && e.pointerType === "mouse") return;
                    isLongPressActive = false;
                    pressTimer = setTimeout(() => {
                        isLongPressActive = true;
                        this.showDragSkinTonePopup(emoji, emojiGridElement, this.picker, this.quill, e);
                    }, 450);
                });
                emojiGridElement.addEventListener("pointermove", () => {
                    // if user moves mouse before 450ms, cancel the long press
                    if (pressTimer && !isLongPressActive) {
                        clearTimeout(pressTimer);
                        pressTimer = null;
                    }
                });
                emojiGridElement.addEventListener("pointerup", (e) => {
                    if (pressTimer) {
                        clearTimeout(pressTimer);
                        pressTimer = null;
                    }
                    // if it wasnt a long press, treat it as a normal click
                    if (!isLongPressActive) {
                        self.insertEmoji(emoji.unicode || emoji.emoji);
                    }
                });
                emojiGridElement.addEventListener("pointercancel", () => {
                    if (pressTimer) {
                        clearTimeout(pressTimer);
                        pressTimer = null;
                    }
                });
            } else {
                // normal emoji click
                emojiGridElement.onclick = () => {
                    self.insertEmoji(emoji.unicode || emoji.emoji);
                };
            }
            emojiGridElement.onclick = () => {
                self.insertEmoji(emoji.unicode || emoji.emoji);
            };
            emojiGridElement.addEventListener("mouseover", () => {
                previewChar.textContent = emoji.unicode || emoji.emoji;
                previewName.textContent = emojiName.replace("family ", "family: ");
                previewCode.textContent = `:${emojiSlug}:`;
            });
            // append inside respective cotnainer
            currentSectionDiv.appendChild(emojiGridElement);
        });
    }

    triggerSearch({restorePosition = true} = {}) {
        const query = this.searchInput.value.trim();
        const wasSearching = this.searchActive;
        if (query && !wasSearching) {
            this.searchReturnState = {
                scrollTop: this.grid.scrollTop,
                page: this.currentPage
            };
        }
        this.searchActive = Boolean(query);
        const buttons = this.grid.querySelectorAll("button");
        const headers = this.grid.querySelectorAll(".ql-emoji-grid-category-header");
        // for hiding empty category headers
        let hasResults = [];
        buttons.forEach((button) => {
            if (button.dataset.name.includes(query) || button.dataset.slug.includes(query)) {
                button.style.display = "block";
                if (!hasResults.includes(button.dataset.category)) hasResults.push(button.dataset.category);
            } else {
                button.style.display = "none";
            }
        });
        headers.forEach((header) => {
            header.style.display = !query || hasResults.includes(header.dataset.category) ? "block" : "none";
        });

        if (this.searchActive) {
            this.indicator.style.width = "100%";
            this.indicator.style.transform = "translateX(0px)";
        } else if (wasSearching) {
            const returnState = this.searchReturnState;
            this.searchReturnState = null;
            if (returnState && restorePosition) {
                this.grid.scrollTop = returnState.scrollTop;
                this.currentPage = returnState.page;
                this.nav.querySelectorAll("button").forEach((button) => {
                    button.classList.toggle("active", button.dataset.category === returnState.page);
                });
                const targetNavBtn = this.nav.querySelector(`button[data-category='${returnState.page}']`);
                if (targetNavBtn) this.stretchTo(targetNavBtn);
            }
        }
    }
    
    showDragSkinTonePopup(baseEmoji, targetElement) {
        // remove any existing popups
        if (this.picker.querySelector(".ql-emoji-skin-popup")) existingPopup.remove();
        const popup = document.createElement("div");
        popup.classList.add("ql-emoji-skin-popup");

        const variants = [baseEmoji, ...baseEmoji.skins];
        const variantButtons = [];
        variants.forEach((variant) => {
            const btn = document.createElement("button");
            btn.innerHTML = variant.unicode || variant.emoji;
            btn.dataset.emoji = variant.unicode || variant.emoji;
            popup.appendChild(btn);
            variantButtons.push(btn);
        });
        
        this.picker.appendChild(popup);

        // position the popup centered right above the pressed emoji
        const rect = targetElement.getBoundingClientRect();
        const pickerRect = this.picker.getBoundingClientRect();
        
        popup.style.position = "absolute";
        popup.style.top = `${rect.top - pickerRect.top - popup.offsetHeight}px`;
        popup.style.left = `${rect.left - pickerRect.left - popup.offsetWidth/2 + targetElement.offsetWidth/2}px`;


        // check which variant button the pointer is currently over
        const handleMove = (e) => {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            variantButtons.forEach((btn) => {
                if (btn === target || btn.contains(target)) {
                    btn.classList.add("active-drag");
                } else {
                    btn.classList.remove("active-drag");
                }
            });
        };

        // finalize selection on release
        const handleUp = (e) => {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const selectedBtn = variantButtons.find((btn) => btn === target || btn.contains(target));

            if (selectedBtn) {
                this.insertEmoji(selectedBtn.dataset.emoji);
            }

            popup.remove();
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
    }

    insertEmoji(char) {
        console.log("Inserting emoji:", char);
        const range = this.quill.getSelection(true);
        const index = range ? range.index : this.quill.getLength();
        this.quill.insertEmbed(index, 'emoji', char, 'user');
        this.quill.setSelection(index + 1, 'user');
    }
}

Quill.register('modules/emoji', EmojiModule);