// lowk js fooling quill n getting rid of error, ts a placeholder basically
const Inline = Quill.import("blots/inline");
class EmojiFormat extends Inline {
    static blotName = 'emoji';
    static tagName = 'span';
}
Quill.register(EmojiFormat, true);

// register icon
const Icons = Quill.import('ui/icons');
const DEFAULT_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 10l.01 0"/><path d="M15 10l.01 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>';
Icons['emoji'] = DEFAULT_ICON;

class EmojiModule {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;
        const toolbar = this.quill.getModule("toolbar");
        if (!toolbar) return;
        toolbar.handlers.emoji = (val) => {
            this.handleClick(val);
        };

        // apply icon
        let button = toolbar.container.querySelector(".ql-emoji");
        if (!button.innerHTML.trim() || options.icon) {
            button.innerHTML = options.icon || DEFAULT_ICON;
        }
    }

    handleClick(val) {
        console.log('emoji clicked', val);
    }
}

Quill.register('modules/emoji', EmojiModule);