// define non-default icons
const icons = Quill.import('ui/icons');
icons['bold'] = '<i class="ti ti-bold"></i>';
icons['italic'] = '<i class="ti ti-italic"></i>';
icons['underline'] = '<i class="ti ti-underline"></i>';
icons['strike'] = '<i class="ti ti-strikethrough"></i>';
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

const quill = new Quill('#text-area', {
    theme: 'snow',
    placeholder: 'Start writing...',
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
        }
    }
});

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

  doc.write('<html><head><title>Print Document</title>');
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