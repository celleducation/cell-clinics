// Read-only inventory. Print Markdown for SEO-TODO.md; never change public copy.
import {readFileSync} from 'node:fs';
const expressions = /ärzt|arzt|physician|doctor|médic|medical|medizinisch|heilprakt|naturopath|naturista|qualified practitioners|qualifizierten Behandler|profesionales cualificados|expert.guid|specialist|fachlich|especialist|dirección profesional|professional leadership/i;
const rows = [];
function stringsWithLocations(source) {
  const tokens = [...source.matchAll(/"(?:\\.|[^"\\])*"|[{}\[\]:,]|-?\d+(?:\.\d+)?|true|false|null/g)];
  let index = 0;
  const leaves = [];
  function visit(path) {
    const token = tokens[index++];
    if (token[0] === '{') {
      while (tokens[index][0] !== '}') {
        const key = JSON.parse(tokens[index++][0]);
        if (tokens[index++][0] !== ':') throw new Error('Invalid JSON');
        visit([...path, key]);
        if (tokens[index][0] === ',') index++;
      }
      index++;
    } else if (token[0] === '[') {
      let item = 0;
      while (tokens[index][0] !== ']') {
        visit([...path, String(item++)]);
        if (tokens[index][0] === ',') index++;
      }
      index++;
    } else if (token[0].startsWith('"')) {
      leaves.push({key: path.join('.'), text: JSON.parse(token[0]), line: source.slice(0, token.index).split('\n').length});
    }
  }
  visit([]);
  return leaves;
}
for (const locale of ['de', 'en', 'es']) {
  const file = `messages/${locale}.json`;
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  for (const item of stringsWithLocations(source)) {
    if (expressions.test(item.text)) rows.push({...item, locale, file});
  }
}
const table = entries => [
  '| Datei:Zeile | Schlüssel | Unveränderter Wortlaut |',
  '| --- | --- | --- |',
  ...entries.map(r => `| \`${r.file}:${r.line}\` | \`${r.key}\` | ${r.text.replaceAll('|', '\\|').replaceAll('\n', '<br>')} |`)
].join('\n');
const groups = [
  ['Übergreifende Aussagen und Kontext (DE/EN/ES)', rows.filter(r => !r.key.startsWith('clinicProfiles.'))],
  ['Einzelne freigeschaltete Praxisprofile (DE/EN/ES)', rows.filter(r => r.key.startsWith('clinicProfiles.') && !r.key.startsWith('clinicProfiles.monikaBrueck.'))],
  ['Nicht freigeschaltetes Profil – nur Katalogbestand', rows.filter(r => r.key.startsWith('clinicProfiles.monikaBrueck.'))]
];
console.log('<!-- professional-language-inventory:start -->');
console.log('## Fundstellen Berufsbezeichnungen – vollständiger Katalog-Suchlauf\n');
console.log('Stand nach Wiederherstellung des freigegebenen FAQ am 18.09.2026. Zeilen beziehen sich auf diesen Branch-Stand. ' +
  'Bewusst breite Erfassung: ärztliche Führung/Begleitung, medizinische Leitung, Arzt-/Heilpraktikerbezeichnungen sowie medizinischer Kontext. ' +
  'Ein Treffer ist keine Feststellung einer Falschaussage. Schulungen, allgemeine medizinische Standards, ' +
  'fachärztliche Qualifikationen und die tatsächliche medizinische Plattformleitung sind gesondert von pauschaler Praxisführung zu beurteilen. ' +
  'Auch aktuell ungenutzte Katalogschlüssel sind enthalten; keine dieser Aussagen wurde für diese Bestandsaufnahme geändert.\n');
for (const [title, entries] of groups) {
  console.log(`### ${title}\n`);
  for (const locale of ['de', 'en', 'es']) {
    console.log(`#### ${locale.toUpperCase()}\n`);
    console.log(table(entries.filter(r => r.locale === locale)) + '\n');
  }
}
console.log('### Ergänzende, nicht lokalisierte Datenquellen (gemeinsam für DE/EN/ES)\n');
console.log('`content/clinics.ts` enthält Verzeichnisdaten einschließlich nicht freigeschalteter Profile; ' +
  '`content/site.ts` enthält englische Modul-Beschreibungen (Katalogbestand, nicht automatisch sichtbarer Text). ' +
  'Diese Kontexttreffer sind separat von pauschalen Aussagen zu beurteilen.\n');
console.log('| Datei:Zeile | Unveränderter Quelltext |\n| --- | --- |');
for (const file of ['content/clinics.ts', 'content/site.ts']) {
  readFileSync(new URL(`../${file}`, import.meta.url), 'utf8').split('\n').forEach((line, index) => {
    if (expressions.test(line)) console.log(`| \`${file}:${index + 1}\` | ${line.trim().replaceAll('|', '\\|')} |`);
  });
}
console.log('\n<!-- professional-language-inventory:end -->');
