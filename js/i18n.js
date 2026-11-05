const LANG_DEFAULT = "en";

let messages = {};
let fallback = {};

async function loadLang(code) {
  const res = await fetch(`/lang/${code}.json`);
  if (!res.ok) throw new Error(`Missing lang file /lang/${code}.json`);
  return res.json();
}

function t(key, values = {}) {
    let message = messages[key] ?? fallback[key] ?? key;
    if (typeof message == 'string') {
        return message.replace(/{(\w+)}/g, (match, placeholder) => {
            return values[placeholder] ?? match;
        });
    } else {
        return message;
    }
}

const ATTRS = {
    placeholder: 'placeholder',
    'aria-label': 'aria-label',
    tooltip: 'data-tooltip'
};

function translateDOM(root = document) {
    root.querySelectorAll('[data-i18n').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    for (const [suffix, target] of Object.entries(ATTRS)) {
        root.querySelectorAll(`[data-i18n-${suffix}]`).forEach((el) => {
            el.setAttribute(target, t(el.getAttribute(`data-i18n-${suffix}`)));
        });
    }
}

async function setLocale(code, initing) {
    if (!Object.keys(fallback).length) fallback = await loadLang(LANG_DEFAULT);
    messages = code == LANG_DEFAULT ? fallback : await loadLang(code);

    if (!initing) translateDOM();

    document.documentElement.lang = code;
    document.dispatchEvent(new Event('localechange'));
}