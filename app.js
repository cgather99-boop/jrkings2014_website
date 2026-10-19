// Team fundraiser: builds the shared header/sidebar/footer and renders each page from data.json.
// Volunteers should only need to edit data.json (content) and theme.css (colors).
// Nothing in this file is team-specific, so it can be copied unchanged to another team's site.


const DEFAULT_NAV = [
  { label: 'Home', href: 'index.html', icon: 'home' },
  { label: 'Players', href: 'players.html', icon: 'users' },
];

// Inline SVG icons (24x24 viewBox) so no external icon library is needed.
const ICONS = {
  instagram: { rule: 'evenodd', d: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z' },
  facebook: { d: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V9c0-.6.4-1 1-1z' },
  tiktok: { d: 'M16.6 2h-3.4v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.4 6.4 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6z' },
  youtube: { rule: 'evenodd', d: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z' },
  x: { d: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z' },
  venmo: { d: 'M19.5 3c.7 1.1 1 2.3 1 3.8 0 4.7-4 10.8-7.3 15.2H5.7L2.7 4.4l6.6-.6 1.6 12.8c1.5-2.4 3.3-6.2 3.3-8.8 0-1.4-.2-2.4-.6-3.2L19.5 3z' },
  paypal: { rule: 'evenodd', d: 'M7 21H3.5L6.3 3h7.2c3.6 0 5.8 1.9 5.3 5.3-.6 3.9-3.3 5.9-7 5.9H9.4L8.3 21H7zm3-9.8h1.7c1.8 0 3-.8 3.3-2.7.2-1.5-.7-2.3-2.3-2.3h-1.7L10 11.2z' },
  zelle: { d: 'M6 4h12v3l-8 10h8v3H6v-3l8-10H6V4z' },
  heart: { d: 'M12 21s-7.5-4.6-9.6-9.2C.9 8.5 2.9 4.5 6.6 4.5c2.2 0 3.6 1.2 5.4 3.2 1.8-2 3.2-3.2 5.4-3.2 3.7 0 5.7 4 4.2 7.3C19.5 16.4 12 21 12 21z' },
  home: { d: 'M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z' },
  users: { d: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.3 3.1-6 7-6s7 2.7 7 6v1H2v-1zm15.3-5.9c2.7.3 4.7 2.3 4.7 4.9v2h-4v-1c0-2.3-.2-4.3-.7-5.9z' },
  calendar: { rule: 'evenodd', d: 'M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zM5 9v11h14V9H5z' },
  shirt: { d: 'M8.5 3 3 5.5 1.5 10.5l3.5 1.3L6 10.5V21h12V10.5l1 1.3 3.5-1.3L21 5.5 15.5 3a3.5 3.5 0 0 1-7 0z' },
  chart: { d: 'M3 3h2v16h16v2H3V3zm4 9h3v6H7v-6zm5-5h3v11h-3V7zm5 3h3v8h-3v-8z' },
  skate: { d: 'M6 2h5v7.5l5.6 2.2a4 4 0 0 1 2.4 3.7V17H5V3a1 1 0 0 1 1-1zM3 19h17v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1z' },
  link: { d: 'M10.6 13.4a1 1 0 0 1 0-1.4l3-3a1 1 0 1 1 1.4 1.4l-3 3a1 1 0 0 1-1.4 0zM8.5 20a4.5 4.5 0 0 1-3.2-7.7l2.5-2.5 1.4 1.4-2.5 2.5a2.5 2.5 0 0 0 3.5 3.5l2.5-2.5 1.4 1.4-2.5 2.5A4.5 4.5 0 0 1 8.5 20zm7.7-5.8-1.4-1.4 2.5-2.5a2.5 2.5 0 0 0-3.5-3.5l-2.5 2.5-1.4-1.4 2.5-2.5a4.5 4.5 0 0 1 6.4 6.4l-2.6 2.4z' },
};
ICONS.twitter = ICONS.x;

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const $ = (id) => document.getElementById(id);

// ---------- helpers ----------

// Parse "YYYY-MM-DD" as a local date (new Date("2026-10-11") would be UTC and can shift a day).
function parseDate(str) {
  const [y, m, d] = String(str).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

// Only allow web and email links from data.json.
function safeUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url, location.href);
    return ['http:', 'https:', 'mailto:'].includes(u.protocol) ? u.href : '';
  } catch {
    return '';
  }
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function externalLink(url, className, text) {
  const a = el('a', className, text);
  a.href = url;
  if (!url.startsWith('mailto:')) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  return a;
}

function icon(name) {
  const def = ICONS[String(name).toLowerCase()] || ICONS.heart;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', def.d);
  if (def.rule) path.setAttribute('fill-rule', def.rule);
  svg.appendChild(path);
  return svg;
}

function initials(name) {
  return String(name).replace(/^SAMPLE\s*-\s*/i, '').split(/\s+/).filter(Boolean)
    .slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';
}

function empty(container, message) {
  container.appendChild(el(container.tagName === 'UL' ? 'li' : 'p', 'empty', message));
}

// True when a menu link points at the page being viewed. Links are resolved against the page's base URL,
// so this also works for pages in a subfolder (e.g. finances/, whose <base href="../"> is the site root).
// "folder/" and "folder/index.html" count as the same page.
function isCurrentPage(href) {
  const path = (p) => p.replace(/\/index\.html$/, '/');
  try {
    return path(new URL(href.split('#')[0], document.baseURI).pathname) === path(location.pathname);
  } catch {
    return false;
  }
}

// ---------- shared shell (header, sidebar, footer) ----------
// These templates are static markup only; all data is inserted afterwards with textContent.

const HEADER_HTML = `
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img id="team-logo" class="logo" src="Images/logo.png" alt="Team logo">
      <div>
        <p id="team-name" class="team-name"></p>
        <p id="team-tagline" class="tagline"></p>
      </div>
    </a>
    <div class="progress-block">
      <div class="progress-stats">
        <span><strong id="raised">$0</strong> raised of <span id="target">$0</span></span>
        <span class="progress-meta"><strong id="percent">0%</strong> · <span id="days-left"></span></span>
      </div>
      <div id="progress" class="progress-track" role="progressbar" aria-label="Fundraising progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div id="progress-fill" class="progress-fill"></div>
      </div>
      <p id="goal-purpose" class="goal-purpose"></p>
    </div>
    <div id="header-social" class="header-social" aria-label="Follow the team"></div>
  </div>`;

const SIDEBAR_HTML = `
  <ul id="nav-list" class="nav-list"></ul>
  <a class="btn btn-accent sidebar-donate" href="index.html#donate">Donate Now</a>`;

const FOOTER_HTML = `
  <img id="footer-logo" class="footer-logo" src="Images/logo.png" alt="">
  <p>Questions? Email <a id="contact-email" href="#"></a></p>
  <p id="tax-note" class="tax-note"></p>
  <div id="footer-social" class="footer-social"></div>`;

function buildShell() {
  $('site-header').innerHTML = HEADER_HTML;
  $('sidebar').innerHTML = SIDEBAR_HTML;
  // <body data-no-donate>: no Donate Now button in this page's sidebar (the report pages).
  if ('noDonate' in document.body.dataset) document.querySelector('.sidebar-donate')?.remove();
  $('site-footer').innerHTML = FOOTER_HTML;

  // Keep --header-h in sync so the sticky sidebar and anchor scrolling sit below the header.
  const header = $('site-header');
  const setHeight = () => document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  setHeight();
  new ResizeObserver(setHeight).observe(header);
}

function renderNav(nav) {
  const list = $('nav-list');
  const items = Array.isArray(nav) && nav.length ? nav : DEFAULT_NAV;
  list.replaceChildren();

  for (const item of items) {
    const href = item.href || '#';
    const a = el('a', 'nav-link');
    a.href = href;
    a.append(icon(item.icon || 'link'), el('span', '', item.label));
    if (isCurrentPage(href)) a.setAttribute('aria-current', 'page');
    const li = el('li');
    li.appendChild(a);
    list.appendChild(li);
  }
}

function renderHeader(team = {}) {
  if (team.name) {
    $('team-name').textContent = team.name;
    $('team-logo').alt = `${team.name} logo`;
    const page = document.title.split('·')[0].trim();
    document.title = document.body.dataset.page === 'home' ? `${team.name} Fundraiser` : `${page} · ${team.name}`;
  }
  if (team.logo) {
    $('team-logo').src = team.logo;
    $('footer-logo').src = team.logo;
  }
  $('team-tagline').textContent = team.tagline || '';

  const email = team.contactEmail || '';
  const emailLink = $('contact-email');
  emailLink.textContent = email;
  emailLink.href = email ? `mailto:${email}` : '#';
  emailLink.parentElement.hidden = !email;
  $('tax-note').textContent = team.taxNote || '';
}

function renderProgress(goal = {}) {
  const target = Number(goal.target) || 0;
  const raised = Number(goal.raised) || 0;
  const pct = target > 0 ? Math.round((raised / target) * 100) : 0;
  const fillPct = Math.min(pct, 100);

  $('raised').textContent = money.format(raised);
  $('target').textContent = money.format(target);
  $('percent').textContent = `${pct}%`;
  $('goal-purpose').textContent = goal.purpose || '';

  const bar = $('progress');
  bar.setAttribute('aria-valuenow', String(fillPct));
  bar.setAttribute('aria-valuetext', `${money.format(raised)} of ${money.format(target)} raised`);

  if (goal.deadline) {
    const left = daysBetween(today(), parseDate(goal.deadline));
    $('days-left').textContent =
      left > 1 ? `${left} days left` : left === 1 ? '1 day left' : left === 0 ? 'Last day!' : 'Campaign achieved';
  }

  // Animate from 0 on the next frame.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $('progress-fill').style.width = `${fillPct}%`;
  }));
}

function renderSocial(social = []) {
  const valid = social.filter((s) => safeUrl(s.url));
  for (const s of valid) {
    const url = safeUrl(s.url);
    const label = `${s.platform}${s.handle ? `: ${s.handle}` : ''}`;
    for (const container of [$('header-social'), $('footer-social')]) {
      const a = externalLink(url, '');
      a.setAttribute('aria-label', label);
      a.title = label;
      a.appendChild(icon(s.platform));
      container.appendChild(a);
    }
  }
}

// ---------- home page ----------

function renderTeamPhoto(photo) {
  const figure = $('team-photo');
  if (!figure || !photo?.src) return;
  const img = $('team-photo-img');
  img.src = photo.src;
  img.alt = photo.alt || 'Team photo';
  if (photo.caption) {
    const caption = $('team-photo-caption');
    caption.textContent = photo.caption;
    caption.hidden = false;
  }
  figure.hidden = false;
}

// Text with **bold** parts (e.g. "write **your player's name + your name**"); built with text nodes, never HTML.
function richText(str) {
  const frag = document.createDocumentFragment();
  String(str).split(/\*\*(.+?)\*\*/).forEach((part, i) => {
    if (part) frag.appendChild(i % 2 ? el('strong', 'alert-em', part) : document.createTextNode(part));
  });
  return frag;
}

// "Got My Back" box: banner, shirt image, headline, numbered steps, payment QR codes, tournament facts.
function renderFundraisingAlert(alert) {
  const section = $('fundraising-alert');
  if (!section || !alert || !alert.title) return;

  if (alert.banner) {
    const banner = $('alert-banner');
    banner.src = alert.banner;
    banner.alt = alert.bannerAlt || '';
    banner.hidden = false;
  }
  $('alert-title').textContent = alert.title;
  if (alert.description) {
    $('alert-text').textContent = alert.description;
    $('alert-text').hidden = false;
  }

  const media = $('alert-media');
  if (alert.image) {
    const img = el('img');
    img.src = alert.image;
    img.alt = alert.imageAlt || '';
    media.appendChild(img);
  } else {
    media.classList.add('alert-placeholder');
    media.appendChild(icon('shirt'));
  }
  if (alert.imageNote) {
    $('alert-note').textContent = alert.imageNote;
    $('alert-note').hidden = false;
  }

  const steps = (alert.steps || []).filter(Boolean);
  if (steps.length) {
    const box = $('alert-steps');
    box.appendChild(el('h3', 'alert-subhead', alert.stepsTitle || 'How it works'));
    const list = el('ol', 'alert-steps');
    for (const s of steps) {
      const li = el('li');
      li.appendChild(richText(s));
      list.appendChild(li);
    }
    box.appendChild(list);
    box.hidden = false;
  }

  // QR code cards. A card with a url is also a link (on a phone, tap it instead of scanning).
  const codes = (alert.payCodes || []).filter((c) => c.qr);
  if (codes.length) {
    const pay = $('alert-pay');
    const grid = el('div', 'pay-grid');
    for (const c of codes) {
      const url = safeUrl(c.url);
      const card = url ? externalLink(url, 'pay-card') : el('div', 'pay-card');
      const img = el('img', 'pay-qr');
      img.src = c.qr;
      img.alt = `${c.label} QR code${c.handle ? ` for ${c.handle}` : ''}`;
      card.append(img, el('span', `pay-brand pay-${String(c.label).toLowerCase()}`, c.label));
      if (c.handle) card.appendChild(el('span', 'pay-handle', String(c.handle).replace(/(.)@/, '$1​@')));
      if (url) card.appendChild(el('span', 'pay-tap', 'Tap to open'));
      grid.appendChild(card);
    }
    pay.appendChild(grid);
    if (alert.payNote) pay.appendChild(el('p', 'pay-note', alert.payNote));
    pay.hidden = false;
  }

  const info = (alert.info || []).filter(Boolean);
  if (info.length) {
    const box = $('alert-info');
    if (alert.infoTitle) box.appendChild(el('h3', 'alert-subhead', alert.infoTitle));
    for (const p of info) box.appendChild(el('p', '', p));
    box.hidden = false;
  }

  const url = safeUrl(alert.linkUrl);
  if (url) {
    const link = $('alert-link');
    link.href = url;
    link.textContent = alert.linkText || 'Learn more';
    link.hidden = false;
  }
  section.hidden = false;
}

function renderAbout(about) {
  const section = $('about');
  const paragraphs = about?.paragraphs || [];
  if (!section || !about || (!about.title && !paragraphs.length)) return;

  $('about-title').textContent = about.title || '';
  const text = $('about-text');
  for (const p of paragraphs) text.appendChild(el('p', '', p));

  if (about.logo) {
    const logo = $('about-logo');
    logo.src = about.logo;
    logo.alt = about.logoAlt || about.title || '';
    logo.hidden = false;
  }

  const url = safeUrl(about.linkUrl);
  if (url) {
    const link = $('about-link');
    link.href = url;
    link.textContent = about.linkText || 'Learn more';
    link.hidden = false;
  }

  section.hidden = false;
}

function renderDonate(links = []) {
  const container = $('donate-links');
  if (!container) return;
  if (!links.length) return empty(container, 'Donation options coming soon.');

  for (const d of links) {
    const row = el('div', 'donate-row');
    const url = safeUrl(d.url);
    // No link but a QR code (e.g. Zelle): the button shows/hides the QR instead.
    const qrToggle = !url && d.qr;
    let main;
    if (url) main = externalLink(url, 'btn btn-primary');
    else if (qrToggle) {
      main = el('button', 'btn btn-primary');
      main.type = 'button';
    } else main = el('div', 'donate-static');
    main.append(icon(d.icon || d.label), el('span', '', d.label));
    const hint = qrToggle ? el('span', 'handle', 'Show QR code') : null;
    if (d.handle) main.appendChild(el('span', 'handle', d.handle));
    else if (hint) main.appendChild(hint);
    row.appendChild(main);
    container.appendChild(row);

    if (d.qr) {
      const figure = el('figure', 'donate-qr');
      const img = el('img');
      img.src = d.qr;
      img.alt = `${d.label} QR code`;
      figure.append(img, el('figcaption', '', d.qrCaption || `Scan with your banking app to donate with ${d.label}`));
      container.appendChild(figure);

      if (qrToggle) {
        figure.id = `donate-qr-${d.label.toLowerCase().replace(/\W+/g, '-')}`;
        figure.hidden = true;
        main.setAttribute('aria-controls', figure.id);
        main.setAttribute('aria-expanded', 'false');
        main.addEventListener('click', () => {
          figure.hidden = !figure.hidden;
          main.setAttribute('aria-expanded', String(!figure.hidden));
          if (hint && !d.handle) hint.textContent = figure.hidden ? 'Show QR code' : 'Hide QR code';
        });
      }
    }
  }
}

// ---------- players page ----------

function renderPlayers(players = []) {
  const grid = $('players');
  if (!grid) return;
  if (!players.length) return empty(grid, 'Roster coming soon.');

  // Alphabetical by first name (the name as written, e.g. "Bastian (Bash) Daigle" sorts under B).
  const sorted = [...players].sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'en', { sensitivity: 'base' }));
  for (const p of sorted) {
    const card = el('article', 'player');
    if (p.photo) {
      const img = el('img', 'player-photo');
      img.src = p.photo;
      img.alt = p.name || '';
      card.appendChild(img);
    } else {
      card.appendChild(el('div', 'player-number', p.number != null ? `#${p.number}` : initials(p.name)));
    }
    card.appendChild(el('p', 'player-name', p.name));
    const meta = el('p', 'player-meta');
    if (p.number != null) meta.appendChild(el('strong', '', `#${p.number}`));
    if (p.number != null && p.position) meta.append(' · ');
    if (p.position) meta.append(p.position);
    card.appendChild(meta);

    const flyer = safeUrl(p.flyer);
    if (flyer) {
      const link = el('a', 'player-flyer', 'View flyer →');
      link.href = flyer;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `View ${p.name || 'player'}'s fundraising flyer`);
      card.appendChild(link);
    }

    if (p.thankYou) card.appendChild(el('p', 'player-thanks', `“${p.thankYou}”`));
    const supporters = Array.isArray(p.supporters) ? p.supporters.filter(Boolean) : [];
    if (supporters.length) {
      const box = el('div', 'player-supporters');
      box.appendChild(el('p', 'player-supporters-title', `Got My Back (${supporters.length})`));
      const list = el('ul', 'supporter-list');
      for (const name of supporters) list.appendChild(el('li', '', name));
      box.appendChild(list);
      card.appendChild(box);
    }

    grid.appendChild(card);
  }
}

// ---------- boot ----------

async function init() {
  buildShell();
  try {
    const res = await fetch('data.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // <body data-nav="reportNav"> gives this page its own menu instead of data.nav (the unlisted report pages).
    const ownNav = data[document.body.dataset.nav];
    renderNav(Array.isArray(ownNav) && ownNav.length ? ownNav : data.nav);
    renderHeader(data.team);
    renderProgress(data.goal);
    renderSocial(data.social);

    renderTeamPhoto(data.teamPhoto);
    renderFundraisingAlert(data.fundraisingAlert);
    renderAbout(data.about);
    renderDonate(data.donateLinks);

    renderPlayers(data.players);
  } catch (err) {
    console.error(err);
    renderNav(DEFAULT_NAV);
    const box = $('error');
    box.textContent = location.protocol === 'file:'
      ? 'This page needs to be served from a web server to load its data. See README.md ("Preview on your computer").'
      : 'Sorry, we could not load the fundraiser details right now. Please try again later. (data.json may have a typo.)';
    box.hidden = false;
  }
}

init();
