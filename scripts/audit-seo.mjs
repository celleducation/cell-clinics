// Local: node scripts/audit-seo.mjs http://localhost:3012
// LIVE after deployment: node scripts/audit-seo.mjs https://cell-clinics.com
// curl reads initial response HTML only; no browser or JavaScript execution.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';

const base = process.argv[2] || 'http://localhost:3012';
const production = 'https://cell-clinics.com';
const slugs = {de: 'patienten', en: 'patients', es: 'pacientes'};
const languages = {'de-DE': 'de', en: 'en', 'es-ES': 'es', 'x-default': 'en'};
const decode = (value = '') => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)]));
function curl(path, headers = []) {
  const response = execFileSync('curl', ['--silent', '--show-error', '--max-time', '30', ...headers.flatMap(h => ['-H', h]), '-w', '\n%{http_code}', `${base}${path}`], {encoding: 'utf8', maxBuffer: 10 * 1024 * 1024});
  const split = response.lastIndexOf('\n');
  return {body: response.slice(0, split), status: Number(response.slice(split + 1))};
}
const sitemap = curl('/sitemap.xml');
assert.equal(sitemap.status, 200);
const entries = [...sitemap.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, xml]) => ({
  url: xml.match(/<loc>(.*?)<\/loc>/)?.[1],
  date: xml.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  alternates: [...xml.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => attributes(tag))
}));
// Import the existing typed data without adding a test dependency or duplicating clinic slugs.
const clinicSource = stripTypeScriptTypes(readFileSync(new URL('../content/clinics.ts', import.meta.url), 'utf8'));
const {clinics} = await import(`data:text/javascript;base64,${Buffer.from(clinicSource).toString('base64')}`);
const expectedPaths = Object.keys(slugs).flatMap(locale => [
  `/${locale}`, `/${locale}/${slugs[locale]}`, `/${locale}/network`,
  ...clinics.filter(c => c.profileAvailable).map(c => `/${locale}/network/${c.slug}`)
]);
assert.deepEqual(entries.map(e => new URL(e.url).pathname).sort(), expectedPaths.sort(), 'Sitemap must contain exactly the active indexable routes');
const errors = [];
for (const entry of entries) {
  const path = new URL(entry.url).pathname;
  try {
    const locale = path.split('/')[1];
    const home = path === `/${locale}`;
    const patient = path === `/${locale}/${slugs[locale]}`;
    const sibling = (language) => `${production}/${language}${patient ? `/${slugs[language]}` : path.slice(locale.length + 1)}`;
    assert.match(entry.date || '', /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Date.parse(entry.date) <= Date.now(), 'No future lastmod');
    assert.equal(entry.alternates.length, 4);
    for (const [hreflang, language] of Object.entries(languages)) assert.equal(entry.alternates.find(a => a.hreflang === hreflang)?.href, sibling(language));
    const {body: html, status} = curl(path);
    assert.equal(status, 200);
    assert.equal(attributes(html.match(/<html\b[^>]*>/)?.[0] || '').lang, locale);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
    assert.ok(head, 'Initial HTML head');
    const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1]);
    assert.ok(title.length > 0 && title.length <= 60, `Title length ${title.length}: ${title}`);
    assert.equal((title.match(/Cell Clinics/g) || []).length, 1, 'Brand exactly once');
    const tags = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
    const meta = key => tags.find(t => t.name === key || t.property === key)?.content;
    const description = meta('description') || '';
    assert.ok(description.length >= 140 && description.length <= 160, `Description length ${description.length}`);
    const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
    assert.equal(links.find(l => l.rel === 'canonical')?.href, entry.url);
    for (const [hreflang, language] of Object.entries(languages)) assert.equal(links.find(l => l.rel === 'alternate' && l.hreflang === hreflang)?.href, sibling(language));
    for (const key of ['og:title', 'og:description', 'og:url', 'og:site_name', 'og:locale', 'og:image', 'og:type', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(meta(key), `Missing ${key}`);
    assert.equal(meta('og:title'), title);
    assert.equal(meta('og:description'), description);
    assert.equal(meta('og:url'), entry.url);
    assert.equal(meta('twitter:card'), 'summary_large_image');
    assert.match(meta('robots'), /index, follow/);
    assert.doesNotMatch(meta('robots'), /noindex/);
    assert.match(meta('googlebot'), /max-image-preview:large/);
    assert.match(meta('robots'), /max-image-preview:large/);
    const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.doesNotMatch(markup, /<iframe\b[^>]*src="[^\"]*(?:youtube|google\.[^/]+\/maps)/i, 'No direct third-party video/maps embed');
    for (const [script] of html.matchAll(/<script\b[^>]*\bsrc="[^"]*"[^>]*>/g)) {
      const src = attributes(script).src;
      assert.ok(src.startsWith('/') && !src.startsWith('//'), `External script: ${src}`);
    }
    assert.doesNotMatch(head, /(?:fonts\.googleapis\.com|fonts\.gstatic\.com)/, 'Fonts must be self-hosted');
    assert.doesNotMatch(markup, /Medizinisch geprüft am|Medically reviewed on|Revisado médicamente el|tel:undefined|mailto:undefined/);
    assert.ok(markup.includes('href="https://cell-education.com/datenschutz"'));
    assert.ok(markup.includes('href="https://cell-education.com/impressum"'));
    if (patient) {
      const form = markup.match(/<form class="patient-form card"[\s\S]*?<\/form>/)?.[0];
      assert.ok(form, 'Patient contact form');
      assert.doesNotMatch(form, /<(?:textarea|select)\b/);
      assert.deepEqual([...form.matchAll(/<input\b[^>]*>/g)].map(([tag]) => attributes(tag).name).sort(), ['companyFax', 'consent', 'email', 'formToken', 'location', 'name']);
    }
    if (home || patient) {
      const form = markup.match(new RegExp(`<form class="${home ? 'partner' : 'patient'}-form card"[\\s\\S]*?<\\/form>`))?.[0];
      assert.ok(form, 'Contact/application form');
      assert.ok(form.includes('href="https://cell-education.com/datenschutz"'), 'Privacy link inside form');
      assert.doesNotMatch(form, /<textarea\b|name="(?:notes|symptoms|complaints|message)"/);
      const consent = [...form.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag).find(tag => attributes(tag).name === 'consent');
      assert.ok(consent && /type="checkbox"/.test(consent) && /\brequired(?:[ =>])/.test(consent));
      assert.doesNotMatch(consent, /\bchecked(?:[ =>])/);
    }
    const images = [...markup.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));
    for (const img of images) {
      assert.ok(Object.hasOwn(img, 'alt'), `Missing alt: ${img.src}`);
      if (!img.alt) assert.equal(img['aria-hidden'], 'true', `Decorative image must be hidden from assistive technology: ${img.src}`);
      assert.ok((img.width && img.height) || (img.sizes && img.style?.includes('position:absolute')), `Missing image dimensions/sizes: ${img.src}`);
    }
    for (const [heading] of markup.matchAll(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/g)) assert.doesNotMatch(heading, /<(?:button|input|select|textarea|a)\b|role="button"|tabindex="0"/i, 'Interactive heading');
    if (home || patient || path.includes('/network/')) {
      const hero = images.find(img => home || patient
        ? img.src?.includes(home ? 'clinical-portrait' : 'patient-cell-membrane')
        : img.class?.includes('alpstein-gallery-main'));
      assert.ok(hero);
      assert.notEqual(hero.loading, 'lazy', 'Hero must not be lazy');
      assert.equal(hero.fetchpriority, 'high', 'Explicit LCP fetch priority');
      assert.ok(links.some(l => l.rel === 'preload' && l.as === 'image'), 'Hero image preload');
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json));
    function checkSchema(value) {
      assert.ok(value !== null && value !== undefined && value !== '', 'No empty schema value');
      if (Array.isArray(value)) { assert.ok(value.length); value.forEach(checkSchema); }
      else if (typeof value === 'object') {
        assert.ok(Object.keys(value).length);
        assert.ok(!('lastReviewed' in value) && !('reviewedBy' in value), 'No fabricated individual review');
        Object.values(value).forEach(checkSchema);
      }
    }
    schemas.forEach(checkSchema);
    const ofType = type => schemas.find(s => [s['@type']].flat().includes(type));
    if (home) {
      assert.ok(ofType('Organization'));
      assert.equal(ofType('WebSite')?.inLanguage, locale);
    } else {
      const crumbs = ofType('BreadcrumbList')?.itemListElement;
      assert.ok(crumbs?.length >= 2, 'BreadcrumbList');
      assert.equal(crumbs.at(-1).item, entry.url);
      const nav = markup.match(/<nav class="breadcrumbs container"[\s\S]*?<\/nav>/)?.[0];
      assert.ok(nav, 'Visible breadcrumbs on every active subpage');
      assert.doesNotMatch(nav, /\shidden(?:[ =>])|display:none/);
      assert.ok(nav.includes('aria-current="page"'));
      const text = decode(nav.replace(/<[^>]+>/g, ''));
      for (const crumb of crumbs) assert.ok(text.includes(crumb.name), 'Visible/schema breadcrumb parity');
    }
    if (patient) {
      const catalog = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
      const faq = ofType('FAQPage');
      assert.equal(faq?.mainEntity?.length, 5, 'Exactly five approved FAQs');
      const section = markup.match(/<section class="section patient-faq"[\s\S]*?<\/section>/)?.[0];
      assert.ok(section, 'Visible FAQ section');
      const items = [...section.matchAll(/<details class="faq-item"[^>]*>([\s\S]*?)<\/details>/g)];
      assert.equal(items.length, 5);
      const plain = value => decode(value.replace(/<[^>]*>/g, ''));
      items.forEach(([, item], index) => {
        const question = plain(item.match(/<summary>([\s\S]*?)<span/)?.[1] || '');
        const answer = plain(item.match(/<p>([\s\S]*?)<\/p>/)?.[1] || '');
        assert.equal(question, catalog.patient.faq[`q${index + 1}`]);
        assert.equal(answer, catalog.patient.faq[`a${index + 1}`]);
        assert.equal(faq.mainEntity[index].name, question);
        assert.equal(faq.mainEntity[index].acceptedAnswer.text, answer);
      });
    } else assert.equal(ofType('FAQPage'), undefined);
    if (path.includes('/network/')) {
      const clinic = ofType('MedicalClinic') || ofType('MedicalBusiness');
      assert.ok(clinic?.address?.streetAddress);
      assert.equal(typeof clinic?.geo?.latitude, 'number');
      assert.equal(typeof clinic?.geo?.longitude, 'number');
      assert.equal(clinic?.memberOf?.['@id'], `${production}/#organization`);
    }
    console.log(`PASS ${path} | title ${title.length} | description ${description.length} | ${images.length} images`);
  } catch (error) { errors.push(`${path}: ${error.message}`); }
}
const live = new URL(base).hostname === 'cell-clinics.com';
const redirect = execFileSync('curl', ['-s', '-I', '--max-time', '20',
  ...(live ? [] : ['-H', 'Host: www.cell-clinics.com']),
  `${live ? 'https://www.cell-clinics.com' : base}/de/network/alpstein?source=seo`
], {encoding: 'utf8'});
assert.match(redirect, /^HTTP\/\S+ 301/m);
assert.match(redirect, /location: https:\/\/cell-clinics.com\/de\/network\/alpstein\?source=seo/i);
for (const path of ['/de/patients', '/es/patienten', '/de/network/not-a-clinic']) {
  const response = curl(path);
  assert.equal(response.status, 404, `${path} must 404`);
  assert.match(response.body, /name="robots" content="noindex"/, '404 must not be indexed');
}
for (const locale of Object.keys(slugs)) {
  for (const slug of ['nad-infusion', 'mitochondrientherapie', 'aminosaeuren-infusion', 'zelldiagnostik']) {
    const path = `/${locale}/therapien/${slug}`;
    assert.ok(!sitemap.body.includes(path), 'No unpublished therapy in sitemap');
    const response = curl(path);
    assert.equal(response.status, 404, 'No empty or unapproved therapy page');
    assert.match(response.body, /name="robots" content="noindex"/);
  }
}
const robots = curl('/robots.txt');
assert.equal(robots.status, 200);
assert.ok(robots.body.includes(`Sitemap: ${production}/sitemap.xml`));
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS ${live ? 'LIVE public HTTPS' : 'LOCAL only'}: all ${entries.length} sitemap URLs, redirect, robots and invalid-route checks. JSON-LD parsed; this does not substitute for Google's Rich Results Test or Lighthouse.`);
