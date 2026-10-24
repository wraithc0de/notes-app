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
