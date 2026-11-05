class CustomSlider extends HTMLElement {
    static formAssociated = true;
    constructor() {
        super();
        this.internals = this.attachInternals();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        const min = this.getAttribute('min') || '0';
        const max = this.getAttribute('max') || '100';
        const step = this.getAttribute('step') || '1';
        const value = this.getAttribute('value') || min;
        const unit = this.getAttribute('unit') || '';
        const color = this.getAttribute('color') || 'var(--accent)';
        this.name = this.getAttribute('name');

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: flex; flex-direction: column; gap: 0; font-family: system-ui, sans-serif; width: 100%; user-select: none; margin-top: 0.25rem; }
                .row { display: flex; align-items: center; gap: 0.25rem; }
                .limit { font-size: 0.8rem; color: var(--textm); font-weight: 500; min-width: 1.5rem; }
                .limit.min { text-align: right; } .limit.max { text-align: left; }
                input[type="range"] { -webkit-appearance: none; appearance: none; flex-grow: 1; height: 0.25rem; border-radius: 1rem; outline: none; cursor: pointer; background: var(--bg-3); }
                input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; height: 0.75rem; width: 0.75rem; border-radius: 50%; background: var(--bg-3); border: 1px solid ${color}; transition: transform 0.1s ease; }
                input[type="range"]::-moz-range-thumb { height: 1rem; width: 1rem; border-radius: 50%; background: #var(--bg-3); border: 1px solid ${color}; transition: transform 0.1s ease; }
                .output { text-align: center; font-size: 0.8rem; color: var(--textm); }
            </style>
            <div class="row">
                <span class="limit min">${min}</span>
                <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">
                <span class="limit max">${max}</span>
            </div>
            <div class="output"><span class="num">${value}</span>${unit}</div>
        `;
        this.input = this.shadowRoot.querySelector('input');
        this.numDisplay = this.shadowRoot.querySelector('.num');
        this.color = color;
        this.input.addEventListener('input', () => this.sync());
        this.sync();
    }

    sync() {
        const val = parseFloat(this.input.value);
        const min = parseFloat(this.input.min);
        const max = parseFloat(this.input.max);
        this.numDisplay.textContent = this.input.value;
        const percentage = ((val - min) / (max - min)) * 100;
        this.input.style.background = `linear-gradient(to right, ${this.color} 0%, ${this.color} ${percentage}%, var(--bg-3) ${percentage}%, var(--bg-3) 100%)`;
        this.internals.setFormValue(this.input.value);
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
}

customElements.define('wn-slider', CustomSlider);


class CustomColorPicker extends HTMLElement {
    static formAssociated = true;
    constructor() { super(); this.internals = this.attachInternals(); this.attachShadow({ mode: 'open' }); this.h = 220; this.s = 100; this.v = 100; this.isDraggingSat = false; this.isDraggingHue = false; }

    connectedCallback() {
        const initialHex = this.getAttribute('value') || '#3b82f6';
        this.name = this.getAttribute('name') || '';
        const popoverId = `picker-popover-${Math.random().toString(36).substr(2, 9)}`;

        this.shadowRoot.innerHTML = `
        <style>
            :host { display: inline-block; font-family: system-ui, -apple-system, sans-serif; }
            .trigger-btn { display: inline-flex; align-items: center; gap: 0.25rem; background: transparent; border: 1px solid var(--border-sep); border-radius: 2px; cursor: pointer; color: var(--textm); user-select: none; padding: 0.25rem 0.5rem; transition: background 0.15s ease; }
            .trigger-btn:hover { border-color: var(--border-m); background-color: var(--btn-highlight); }
            .swatch-preview { width: 1em; height: 1em; border-radius: 2px; border: 1px solid var(--border-sep); background-color: ${initialHex}; }
            .hex-string { font-family: monospace; color: var(--textm); }
            .dropdown-panel { border: 1px solid var(--border-sep); border-radius: 2px; padding: 12px; background: var(--bg-2); width: 220px; flex-direction: column; gap: 0.75rem; margin-top: 4px; user-select: none; position-anchor: --trigger; top: anchor(bottom); left: anchor(left); }
            .dropdown-panel:popover-open { display: flex; }
            .sat-area { position: relative; width: 100%; height: 150px; border-radius: 6px; cursor: crosshair; overflow: hidden; background-color: hsl(${this.h}, 100%, 50%); }
            .sat-area::before, .sat-area::after { content: ''; position: absolute; inset: 0; }
            .sat-area::before { background: linear-gradient(to right, #fff, transparent); }
            .sat-area::after { background: linear-gradient(to top, #000, transparent); }
            .sat-pointer { position: absolute; width: 12px; height: 12px; border: 2px solid #fff; border-radius: 50%; transform: translate(-6px, -6px); pointer-events: none; top: 0%; left: 100%; z-index: 2; box-shadow: 0 0 2px rgba(0,0,0,0.5); }
            .hue-slider { position: relative; width: 100%; height: 12px; border-radius: 6px; cursor: pointer; background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); }
            .hue-pointer { position: absolute; top: -2px; width: 8px; height: 16px; background: var(--textb); border: 1px solid var(--textm); border-radius: 2px; transform: translateX(-4px); pointer-events: none; }
        </style>
        <button type="button" class="trigger-btn" id="trigger" popovertarget="${popoverId}" style="anchor-name: --trigger">
            <div class="swatch-preview"></div>
            <span class="hex-string">${initialHex.toUpperCase()}</span>
        </button>
        <div id="${popoverId}" popover class="dropdown-panel" part="dropdown">
            <div class="sat-area"><div class="sat-pointer"></div></div>
            <div class="hue-slider"><div class="hue-pointer"></div></div>
        </div>
        `;

        this.swatchPreview = this.shadowRoot.querySelector('.swatch-preview');
        this.hexString = this.shadowRoot.querySelector('.hex-string');
        this.satArea = this.shadowRoot.querySelector('.sat-area');
        this.satPointer = this.shadowRoot.querySelector('.sat-pointer');
        this.hueSlider = this.shadowRoot.querySelector('.hue-slider');
        this.huePointer = this.shadowRoot.querySelector('.hue-pointer');

        this.parseInitialHex(initialHex);
        this.satArea.addEventListener('mousedown', (e) => { this.isDraggingSat = true; this.handleSatMove(e); });
        this.hueSlider.addEventListener('mousedown', (e) => { this.isDraggingHue = true; this.handleHueMove(e); });
        window.addEventListener('mousemove', (e) => { if (this.isDraggingSat) this.handleSatMove(e); if (this.isDraggingHue) this.handleHueMove(e); });
        window.addEventListener('mouseup', () => { this.isDraggingSat = false; this.isDraggingHue = false; });
    }

    handleSatMove(e) { const r = this.satArea.getBoundingClientRect(); this.s = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)); this.v = Math.max(0, Math.min(100, 100 - (((e.clientY - r.top) / r.height) * 100))); this.satPointer.style.left = `${this.s}%`; this.satPointer.style.top = `${100 - this.v}%`; this.updateColor(); }
    handleHueMove(e) { const r = this.hueSlider.getBoundingClientRect(); this.h = Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360)); this.huePointer.style.left = `${(this.h / 360) * 100}%`; this.satArea.style.backgroundColor = `hsl(${this.h}, 100%, 50%)`; this.updateColor(); }
    updateColor() { 
        const hex = this.hsvToHex(this.h, this.s, this.v); 
        this.swatchPreview.style.backgroundColor = hex; 
        this.hexString.textContent = hex; 
        this.internals.setFormValue(hex); 
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
    
    parseInitialHex(hex) {
        if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return;
        let c = hex.substring(1); if(c.length === 3) c = c.split('').map(s => s + s).join('');
        const r = parseInt(c.substr(0,2),16)/255, g = parseInt(c.substr(2,2),16)/255, b = parseInt(c.substr(4,2),16)/255;
        const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
        this.v = max * 100; this.s = max === 0 ? 0 : (d / max) * 100;
        if(d === 0) this.h = 0; else if(max === r) this.h = ((g - b) / d + (g < b ? 6 : 0)) * 60; else if(max === g) this.h = ((b - r) / d + 2) * 60; else this.h = ((r - g) / d + 4) * 60;
        this.satPointer.style.left = `${this.s}%`; this.satPointer.style.top = `${100 - this.v}%`; this.huePointer.style.left = `${(this.h / 360) * 100}%`; this.satArea.style.backgroundColor = `hsl(${this.h}, 100%, 50%)`;
    }

    hsvToHex(h,s,v) { s/=100; v/=100; const k = n => (n + h / 60) % 6, f = n => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1))); return `#${[5,3,1].map(n => Math.round(255 * f(n)).toString(16).padStart(2,'0')).join('')}`.toUpperCase(); }
    get value() { return this.hexString ? this.hexString.textContent : ''; }
}
customElements.define('wn-color-picker', CustomColorPicker);

class CustomFileInput extends HTMLElement {
    static formAssociated = true;
}
customElements.define('wn-file-picker', CustomFileInput);