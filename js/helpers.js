function remToPx(rem) {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * rootFontSize;
}

function generateId(l = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var id = "";
  for (let i = 0; i < l; i++) {
    id += chars[Math.floor(Math.random()*chars.length)];
  }
  return id;
}

async function parseThemes(url) {
    const themes = {};
    try {
      const content = await fetch(url);
      const text = await content.text();

      var currentTheme = null;

      const lines = text.replaceAll('\r', '').split('\n');

      for (let line of lines) {
        line = line.trim().replace(' ', '');

        if (!line) continue;

        if (line.includes('.theme-')) {
          currentTheme = line.replace('.theme-', '').replace('{', '');
          themes[currentTheme] = {};
          continue;
        }

        if (line.includes('}')) {
          currentTheme = null;
          continue;
        }

        if (currentTheme && line.includes('--')) {
          const [key, value] = line.replace('--', '').replace(';', '').split(':');
          if (key && value) {
            themes[currentTheme][key] = value;
          }
        }
      }

    } catch (err) {
      console.log("Error parsing themes: ", err);
    }

    return themes;
}

function parseManager() {
    var returnObj = {
        notes: [], // root notes only tho
        folders: {}
    };
    returnObj.notes = Array.from(sectionsContainer.querySelectorAll(":scope > .item")).map((i) => {return i.querySelector(".idreference").innerText}) || [];
    const folders = sectionsContainer.querySelectorAll(":scope > .folder");
    folders.forEach((folder) => {
        const fNotes = Array.from(folder.querySelectorAll(".item")).map((i) => {return i.querySelector(".idreference").innerText}) || [];
        const id = folder.querySelector("header>.idreference").innerText;
        returnObj.folders[id] = fNotes;
    });
    return returnObj;
}

function insertKeyRelative(obj, sourceKey, targetKey, position) {
  const keys = Object.keys(obj);
  const sourceIndex = keys.indexOf(sourceKey);
  let targetIndex = keys.indexOf(targetKey);
  // safety check
  if (sourceIndex === -1 || targetIndex === -1) return obj;

  keys.splice(sourceIndex, 1);
  targetIndex = keys.indexOf(targetKey);

  const insertIndex = position == 'after' ? targetIndex + 1 : targetIndex;

  keys.splice(insertIndex, 0, sourceKey);

  const tempCopy = {...obj};
  for (const key in obj) {
    delete obj[key];
  }
  keys.forEach((key) => {
    obj[key] = tempCopy[key];
  });

  // for inline whatever just in case
  return obj;
}

function storeS(key, obj, method = 'localStorage') {
  if (method == 'localStorage') {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

function storeL(key, fallback, method = 'localStorage') {
  if (method == 'localStorage') {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return fallback;
    }
  }
}

function storeR(key, method = 'localStorage') {
  if (method == 'localStorage') {
    localStorage.removeItem(key);
  }
}
