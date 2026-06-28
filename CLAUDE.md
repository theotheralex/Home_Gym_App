# The Toji Method — Project Context

## Files
- `index.html` — the entire app: inline CSS, inline JS, SW registration blob
- `sw.js` — service worker extracted from the blob; must stay byte-identical to the blob

## Architecture constraints
- Single-file, no build toolchain, no framework, no package.json
- All data in localStorage — no backend, no accounts
- Offline-first: app must function with zero network after first load

## Version discipline
Six version stamps must move together:
1. `APP_VERSION='vN'` const in the SW-guard block
2. Cache-cleanup key `n!=='toji-vN'`
3. SW blob template `const C='toji-vN'`
4. JS header comment `· vN`
5. Settings row `<span class="set-row-value">vN</span>`
6. Settings footer string `'The Toji Method · vN<br>'`

⚠️ Do NOT use a global `sed 's/vOLD/vNEW/g'`. Since v100 the file embeds base64
woff2 fonts whose data contains coincidental `vNN` substrings — a global sed
corrupts the fonts, and the old "exactly 6 hits" check now over-counts. Bump only
the six real stamps via their context patterns:
```bash
sed -i '' \
  -e 's/· vOLD/· vNEW/g' \
  -e 's/toji-vOLD/toji-vNEW/g' \
  -e "s/APP_VERSION='vOLD'/APP_VERSION='vNEW'/" \
  -e 's/set-row-value">vOLD</set-row-value">vNEW</' \
  index.html
```
`· vN` covers stamps 4 and 6; `toji-vN` covers 2 and 3 → six real replacements.
Verify: `grep -c "APP_VERSION='vNEW'"` is 1 and `grep -o toji-vNEW index.html` shows
the cache key changed. Then regenerate `sw.js` byte-identical to the blob:
```bash
python3 -c "import re; h=open('index.html').read(); b=re.search(r'const sw=\`([\s\S]*?)\`;navigator',h).group(1); open('sw.js','w',newline='').write(b)"
```

## Validation ritual (required before every ship)
```bash
node -c index.html                          # syntax
node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1])"
node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/const sw=\`([\s\S]*?)\`;/)[1])"
python3 -c "import re; h=open('index.html').read(); css=re.search(r'<style>([\s\S]*?)</style>',h).group(1); print(css.count('{'),css.count('}'))"
```

## Ship rules
- Visible UI change → mockup + approval first, then code
- Logic/data change → ship directly with explanation
- Never ship without running the validation ritual
