// define non-default icons
const icons = Quill.import('ui/icons');
icons['print'] = '<i class="ti ti-printer"></i>';
icons['undo'] = '<i class="ti ti-arrow-back-up"></i>';
icons['redo'] = '<i class="ti ti-arrow-forward-up"></i>';
icons['bold'] = '<i class="ti ti-bold"></i>';
icons['italic'] = '<i class="ti ti-italic"></i>';
icons['underline'] = '<i class="ti ti-underline"></i>';
icons['strike'] = '<i class="ti ti-strikethrough"></i>';
icons['highlight'] = '<i class="ti ti-highlight"></i>';
icons['blockquote'] = '<i class="ti ti-blockquote"></i>';
icons['code-block'] = '<i class="ti ti-code"></i>';
icons['link'] = '<i class="ti ti-link"></i>';
icons['header']['1'] = '<i class="ti ti-h-1"></i>';
icons['header']['2'] = '<i class="ti ti-h-2"></i>';
icons['header']['3'] = '<i class="ti ti-h-3"></i>';
icons['list']['bullet'] = '<i class="ti ti-list"></i>';
icons['list']['ordered'] = '<i class="ti ti-list-numbers"></i>';
icons['list']['check'] = '<i class="ti ti-list-check"></i>';
icons['script']['sub'] = '<i class="ti ti-subscript"></i>';
icons['script']['super'] = '<i class="ti ti-superscript"></i>';
icons['indent']['-1'] = '<i class="ti ti-indent-decrease"></i>';
icons['indent']['+1'] = '<i class="ti ti-indent-increase"></i>';
icons['align'][''] = '<i class="ti ti-align-left"></i>';
icons['align']['center'] = '<i class="ti ti-align-center"></i>';
icons['align']['justify'] = '<i class="ti ti-align-justified"></i>';
icons['align']['right'] = '<i class="ti ti-align-right"></i>';
icons['clean'] = '<i class="ti ti-clear-formatting"></i>';

class SmartTypography {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.lastReplacement = null;
        this.rules = [];
        this.maxLookbehind = 1;

        if (getComputedStyle(this.quill.container).position === 'static') {
            this.quill.container.style.position = 'relative';
        }
        if (options.rules) {
            this.setRules(options.rules);
        }
        // backspace cancel replacement
        this.quill.root.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && this.lastReplacement) {
                const selection = this.quill.getSelection();
                const { index, original, replaced } = this.lastReplacement;
                if (selection && selection.index === index + replaced.length + 1) {
                    e.preventDefault();
                    this.quill.deleteText(index, replaced.length, 'silent');
                    this.quill.insertText(index, original, 'silent');
                    this.quill.setSelection(index + original.length + 1, 0, 'silent');
                    this.lastReplacement = null;
                    return;
                }
            }
            if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                this.lastReplacement = null;
            }
        });
        // check typed text against user rules when a space is typed
        this.quill.on('text-change', (delta, oldDelta, source) => {
            if (source !== 'user') return;
            let cursorIndex = 0;
            let insertedSpace = false;

            for (const op of delta.ops) {
                if (op.retain) {
                    cursorIndex += op.retain;
                } else if (typeof op.insert === 'string') {
                    cursorIndex += op.insert.length;
                    if (op.insert.endsWith(' ') || op.insert.endsWith('\u00A0')) {
                        insertedSpace = true;
                    }
                }
            }
            if (!insertedSpace || cursorIndex < 2) return;

            const textEndIndex = cursorIndex - 1;
            const lookbehind = Math.min(textEndIndex, this.maxLookbehind);
            const textBeforeSpace = this.quill.getText(textEndIndex - lookbehind, lookbehind);

            for (const rule of this.rules) {
                if (textBeforeSpace.endsWith(rule.find)) {
                    const replaceIndex = textEndIndex - rule.find.length;

                    this.quill.history.cutoff();
                    this.quill.deleteText(replaceIndex, rule.find.length, 'user');
                    this.quill.insertText(replaceIndex, rule.replace, 'user');
                    this.quill.setSelection(replaceIndex + rule.replace.length + 1, 0, 'silent');
                    this.flashText(replaceIndex, rule.replace.length);
                    this.lastReplacement = {
                        index: replaceIndex,
                        original: rule.find,
                        replaced: rule.replace
                    };
                    break;
                }
            }
        });
    }
    flashText(index, length) {
        const bounds = this.quill.getBounds(index, length);
        if (!bounds) return;
        const flash = document.createElement('div');
        Object.assign(flash.style, {
            position: 'absolute',
            left: `${bounds.left}px`,
            top: `${bounds.top}px`,
            width: `${bounds.width}px`,
            height: `${bounds.height}px`,
            backgroundColor: 'var(--accent)',
            borderRadius: 'var(--corners)',
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-out',
            opacity: '1',
            zIndex: '10'
        });
        this.quill.container.appendChild(flash);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                flash.style.opacity = '0';
            });
        });
        setTimeout(() => flash.remove(), 550);
    }
    setRules(rows) {
        this.rules = rows
            .filter((r) => r.find && r.replace)
            .sort((a, b) => b.find.length - a.find.length);

        const longestRule = this.rules.at(0);
        this.maxLookbehind = longestRule ? longestRule.find.length : 1;
    }
}

Quill.register('modules/smartTypography', SmartTypography);

var CLOSEPAIRS_ENABLED = false;

var quill;
function initQuill() {
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}',
        '"': '"',
        "'": "'",
        '`': '`',
        '<': '>',
        '¿': '?',
        '¡': '!',
        '«': '»',
        '“': '”',
        '‘': '’'
    }
    // auto-closing pairs stuff * * * * * * *
    var pairBindings = {};
    for (const [open, close] of Object.entries(pairs)) {
        pairBindings[open] = {
            key: open,
            shiftKey: null,
            handler(range, context) {
                if (CLOSEPAIRS_ENABLED == true) {
                    // wrapping selection in pair
                    if (range.length > 0) {
                        this.quill.insertText(range.index + range.length, close, 'user');
                        this.quill.insertText(range.index, open, 'user');
                        this.quill.setSelection(range.index + 1, range.length, 'silent');
                        return false;
                    }
                    // don't auto-close quotes inside words, e.g don't
                    if ((open === '"' || open === "'") && /\w$/.test(context.prefix)) return true;

                    quill.insertText(range.index, open + close, 'user');
                    quill.setSelection(range.index + 1, 0, 'silent');
                    return false;
                }
                return true;
            }
        }
        // skip over closing character if user types it
        if (open !== close) {
            pairBindings[close] = {
                key: close,
                shiftKey: null,
                handler(range, context) {
                    if (range.length == 0 && context.suffix.startsWith(close) && CLOSEPAIRS_ENABLED == true) {
                        quill.setSelection(range.index + 1, 0, 'silent');
                        return false;
                    }
                    return true;
                }
            }
        }
    }
    // main init
    quill = new Quill('#text-area', {
        theme: 'snow',
        placeholder: t("editor.empty.placeholder"),
        modules: {
            toolbar: {
                container: '#formatting',
                handlers: {
                    'highlight': function(val) {
                        const range = quill.getSelection();
                        if (range) {
                            const isHighlighted = quill.getFormat(range)['background'] === 'var(--text-highlight)';
                            this.quill.format('background', isHighlighted ? false : 'var(--text-highlight)');
                        }
                    },
                    'undo': function(val) {
                        quill.history.undo();
                    },
                    'redo': function(val) {
                        quill.history.redo();
                    },
                    'print': function(val) {
                        handleQuillPrint(this.quill);
                    }
                }
            },
            keyboard: {
                bindings: {
                    ...pairBindings,
                    deleteEmptyPair: {
                        key: 'Backspace',
                        handler(range) {
                            if (range.length === 0 && range.index > 0 && CLOSEPAIRS_ENABLED == true) {
                                const prevChar = quill.getText(range.index - 1, 1);
                                const nextChar = quill.getText(range.index, 1);

                                if (pairs[prevChar] && pairs[prevChar] == nextChar) {
                                    quill.deleteText(range.index - 1, 2, 'user');
                                    return false;
                                }
                            }
                            // allow normal backspace behavior
                            return true;
                        }
                    }
                }
            },
            smartTypography: {
                rules: getValue("editor.smartTypography.shorthands")
            }
        }
    });
}

function handleQuillPrint(quillInstance) {
  const quillHtml = quillInstance.root.innerHTML;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  doc.write(`<html><head><title>${t("editor.printing.title")}</title>`);
  // inject styles
  doc.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css">');
  doc.write(`
    <style>
      body { margin: 40px; font-family: system-ui, sans-serif; }
      .ql-editor { padding: 0; overflow: visible; height: auto; border: none;}
      .ql-container {border: none !important;}
      @page { margin: 1in; } /* Standard paper margins */
    </style>
  `);
  doc.write('</head><body>');
  doc.write('<div class="ql-container ql-snow"><div class="ql-editor">' + quillHtml + '</div></div>');
  doc.write('</body></html>');
  doc.close();

  iframe.contentWindow.focus();
  
  // delay to let stuff do its thing idk
  setTimeout(() => {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  }, 350);
}

function updateWordCounter() {
    // rmv trailing newline quill always adds
    const text = quill.getText().replace(/\n$/, "");
    const trimmed = text.trim();

    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).length : 0;

    document.getElementById("wordcounterWords").textContent = words;
    document.getElementById("wordcounterCharacters").textContent = characters;
    document.getElementById("wordcounterSentences").textContent = sentences;
    document.getElementById("wordcounterParagraphs").textContent = paragraphs;
}
