class CustomSlider extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = ["min", "max", "step", "unit"];

    constructor() {
        super();
        this.internals = this.attachInternals();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: flex; flex-direction: column; gap: 0; font-family: system-ui, sans-serif; width: 100%; user-select: none; margin-top: 0.25rem; }
                .row { display: flex; align-items: center; gap: 0.25rem; }
                .limit { font-size: 0.8rem; color: var(--textm); font-weight: 500; min-width: 1.5rem; }
                .limit.min { text-align: right; } .limit.max { text-align: left; }
                input[type="range"] { -webkit-appearance: none; appearance: none; flex-grow: 1; height: 0.25rem; border-radius: 1rem; outline: none; cursor: pointer; background: var(--bg-3); }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; height: 0.75rem; width: 0.75rem; border-radius: 50%; background: var(--bg-3); border: 1px solid var(--accent); }
                input[type="range"]::-moz-range-thumb { height: 0.75rem; width: 0.75rem; border-radius: 50%; background: var(--bg-3); border: 1px solid var(--accent); }
                .output { text-align: center; font-size: 0.8rem; color: var(--textm); }
            </style>
            <div class="row">
                <span class="limit min"></span>
                <input type="range">
                <span class="limit max"></span>
            </div>
            <div class="output"><span class="num"></span><span class="unit"></span></div>
        `;
        this.input = this.shadowRoot.querySelector("input");
        this.minLabel = this.shadowRoot.querySelector(".min");
        this.maxLabel = this.shadowRoot.querySelector(".max");
        this.numDisplay = this.shadowRoot.querySelector(".num");
        this.unitDisplay = this.shadowRoot.querySelector(".unit");

        this.input.addEventListener("input", () => {
            this.#render();
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "unit") this.unitDisplay.textContent = newValue ?? "";
        else this.input[name] = newValue;          // min / max / step
        if (name === "min") this.minLabel.textContent = newValue;
        if (name === "max") this.maxLabel.textContent = newValue;
        this.#render();
    }

    get value() { return Number(this.input.value); }

    set value(newValue) {                          // does NOT dispatch change
        this.input.value = newValue;
        this.#render();
    }

    #render() {
        const min = Number(this.input.min);
        const max = Number(this.input.max);
        const percentage = ((this.value - min) / (max - min)) * 100;
        const color = this.getAttribute("color") || "var(--accent)";
        this.numDisplay.textContent = this.input.value;
        this.input.style.background =
            `linear-gradient(to right, ${color} ${percentage}%, var(--bg-3) ${percentage}%)`;
        this.internals.setFormValue(this.input.value);
    }
}
customElements.define("wn-slider", CustomSlider);


class CustomColorPicker extends HTMLElement {
    static formAssociated = true;

    #h = 220; #s = 100; #v = 100;
    #hex = "#3B82F6";

    constructor() {
        super();
        this.internals = this.attachInternals();
        this.attachShadow({ mode: "open" });

        const popoverId = `picker-popover-${Math.random().toString(36).slice(2, 11)}`;
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: inline-block; font-family: system-ui, -apple-system, sans-serif; }
            .trigger-btn { display: inline-flex; align-items: center; gap: 0.25rem; background: transparent; border: 1px solid var(--border-m); border-radius: 2px; cursor: pointer; color: var(--textm); user-select: none; padding: 0.25rem 0.5rem; transition: background 0.15s ease; }
            .trigger-btn:hover { background-color: var(--btn-highlight); }
            .swatch-preview { width: 1em; height: 1em; border-radius: 2px; border: 1px solid var(--border-m); }
            .hex-string { font-family: monospace; color: var(--textm); }
            .dropdown-panel { border: 1px solid var(--border-m); border-radius: 2px; padding: 12px; background: var(--bg-2); width: 220px; flex-direction: column; gap: 0.75rem; margin-top: 4px; user-select: none; position-anchor: --trigger; top: anchor(bottom); left: anchor(left); }
            .dropdown-panel:popover-open { display: flex; }
            .sat-area { position: relative; width: 100%; height: 150px; border-radius: 6px; cursor: crosshair; overflow: hidden; touch-action: none; }
            .sat-area::before, .sat-area::after { content: ''; position: absolute; inset: 0; }
            .sat-area::before { background: linear-gradient(to right, #fff, transparent); }
            .sat-area::after { background: linear-gradient(to top, #000, transparent); }
            .sat-pointer { position: absolute; width: 12px; height: 12px; border: 2px solid #fff; border-radius: 50%; transform: translate(-6px, -6px); pointer-events: none; z-index: 2; box-shadow: 0 0 2px rgba(0,0,0,0.5); }
            .hue-slider { position: relative; width: 100%; height: 12px; border-radius: 6px; cursor: pointer; touch-action: none; background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); }
            .hue-pointer { position: absolute; top: -2px; width: 8px; height: 16px; background: var(--textb); border: 1px solid var(--textm); border-radius: 2px; transform: translateX(-4px); pointer-events: none; }
        </style>
        <button type="button" class="trigger-btn" popovertarget="${popoverId}" style="anchor-name: --trigger">
            <div class="swatch-preview"></div>
            <span class="hex-string"></span>
        </button>
        <div id="${popoverId}" popover class="dropdown-panel" part="dropdown">
            <div class="sat-area"><div class="sat-pointer"></div></div>
            <div class="hue-slider"><div class="hue-pointer"></div></div>
        </div>`;

        const $ = sel => this.shadowRoot.querySelector(sel);
        this.swatch = $(".swatch-preview");
        this.hexLabel = $(".hex-string");
        this.satArea = $(".sat-area");
        this.satPointer = $(".sat-pointer");
        this.hueSlider = $(".hue-slider");
        this.huePointer = $(".hue-pointer");

        this.#drag(this.satArea, e => this.#moveSat(e));
        this.#drag(this.hueSlider, e => this.#moveHue(e));
        this.#render();
    }

    get value() { return this.#hex; }

    // programmatic set: updates the UI, does NOT fire "change"
    set value(hex) {
        if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return;
        let c = hex.slice(1);
        if (c.length === 3) c = [...c].map(ch => ch + ch).join("");
        const r = parseInt(c.slice(0, 2), 16) / 255;
        const g = parseInt(c.slice(2, 4), 16) / 255;
        const b = parseInt(c.slice(4, 6), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        this.#v = max * 100;
        this.#s = max === 0 ? 0 : (d / max) * 100;
        if (d === 0) this.#h = 0;
        else if (max === r) this.#h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        else if (max === g) this.#h = ((b - r) / d + 2) * 60;
        else this.#h = ((r - g) / d + 4) * 60;
        this.#hex = "#" + c.toUpperCase();
        this.#render();
    }

    #drag(el, move) {
        el.addEventListener("pointerdown", e => { el.setPointerCapture(e.pointerId); move(e); });
        el.addEventListener("pointermove", e => { if (el.hasPointerCapture(e.pointerId)) move(e); });
    }

    #moveSat(e) {
        const r = this.satArea.getBoundingClientRect();
        this.#s = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
        this.#v = Math.max(0, Math.min(100, 100 - ((e.clientY - r.top) / r.height) * 100));
        this.#commit();
    }

    #moveHue(e) {
        const r = this.hueSlider.getBoundingClientRect();
        this.#h = Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360));
        this.#commit();
    }

    // user-initiated: recompute hex, update UI, notify
    #commit() {
        this.#hex = this.#hsvToHex(this.#h, this.#s, this.#v);
        this.#render();
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }

    #render() {
        this.swatch.style.backgroundColor = this.#hex;
        this.hexLabel.textContent = this.#hex;
        this.satArea.style.backgroundColor = `hsl(${this.#h}, 100%, 50%)`;
        this.satPointer.style.left = `${this.#s}%`;
        this.satPointer.style.top = `${100 - this.#v}%`;
        this.huePointer.style.left = `${(this.#h / 360) * 100}%`;
        this.internals.setFormValue(this.#hex);
    }

    #hsvToHex(h, s, v) {
        s /= 100; v /= 100;
        const k = n => (n + h / 60) % 6;
        const f = n => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
        return "#" + [5, 3, 1].map(n => Math.round(255 * f(n)).toString(16).padStart(2, "0")).join("").toUpperCase();
    }
}
customElements.define("wn-color-picker", CustomColorPicker);

class CustomFileInput extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = ["accept"];

    #value = "";

    constructor() {
        super();
        this.internals = this.attachInternals();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {display: inline-flex; align-items: center; font-family: inherit; border: 1px solid var(--border-m); border-radius: 2px; height: 100%;}
                input {border-right: 1px solid var(--border-m); border-radius: 2px;}
                input::file-selector-button {background: none; border: none; border-right: 1px solid var(--border-m); color: var(--text); transition: background 0.15s ease; padding: 0.25rem; height: 100%;}
                input:hover::file-selector-button {background: var(--btn-highlight); cursor: pointer;}
                .status {display: none; padding: 0 0.5rem; color: var(--text); border-right: 1px solid var(--border-m);}
                :host([has-value]) input {display: none;}
                :host([has-value]) .status {display: inline;}
                button {background: none; border: none; min-height: 100%; width: 2em; color: var(--text); margin: 0;}
                button:hover {cursor: pointer; background: var(--btn-highlight);}
            </style>
            <input type="file">
            <span class="status">Image set</span>
            <button type="button" class="tt-b-m" data-tooltip="Clear">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
        `;

        this.input = this.shadowRoot.querySelector("input");
        this.input.accept = "*";

        this.input.addEventListener("change", () => this.#readFile());
        this.shadowRoot.querySelector("button").addEventListener("click", () => this.#commit(""));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "accept") this.input.accept = newValue || "*";
    }

    get value() {
        return this.#value;
    }

    // programmatic set: updates display, does NOT fire "change"
    set value(newValue) {
        this.#value = newValue || "";
        this.internals.setFormValue(this.#value);
        this.toggleAttribute("has-value", !!this.#value);
        if (!this.#value) this.input.value = "";
    }

    #readFile() {
        const file = this.input.files[0];
        if (!file) return this.#commit("");

        const reader = new FileReader();
        reader.onload = () => this.#commit(reader.result);   // data URL
        reader.readAsDataURL(file);
    }

    // user-initiated: store + notify
    #commit(newValue) {
        this.value = newValue;
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }
}

customElements.define("wn-file-picker", CustomFileInput);