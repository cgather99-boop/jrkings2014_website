# Jr Kings Fundraising Website

A small fundraising site (Home, Players, Schedule, Team Swag). **All content lives in `data.json`.** You shouldn't need to touch any other file.

## Files
| File | What it is |
|---|---|
| `data.json` | Everything you edit: goal, menu, events, players, donations, sponsors, donate links, social media |
| `index.html` | Home page |
| `players.html` | Players page (roster) |
| `schedule.html` | Full schedule page |
| `swag.html` | Team Swag page (merch you can order by email) |
| `styles.css` | Purple and gold styling (colors are at the top under `:root`) |
| `app.js` | Reads `data.json` and builds every page, including the shared header, sidebar, and footer |

If you change `app.js` or `styles.css`, bump the `?v=` number where each page loads them (e.g. `app.js?v=2` → `app.js?v=3`) so browsers load the new version instead of an old saved copy.
| `Images/` | Team logo; put sponsor logos in `Images/sponsors/` |

## Updating content
Open `data.json` in any text editor (Notepad or VS Code) and replace every value that starts with `SAMPLE`.

- **Sidebar menu:** the `nav` list sets the left sidebar links (`label`, `href`, and `icon`, which can be `home`, `users`, `calendar`, `shirt`, `heart`, or `link`). To add a new page, copy `players.html`, rename it, and add it to `nav`.
- **Team photo:** `teamPhoto.src` sets the photo above the tournament writeup. `alt` describes it for screen readers, and `caption` is optional text shown under it. Delete the `teamPhoto` block to hide it.
- **Tournament writeup (top of page):** edit `about.title`, the `about.paragraphs` list (one string per paragraph), `about.logo`, and `about.linkText` / `about.linkUrl`. Delete the whole `about` block to hide the section.
- **Progress bar:** update `goal.raised` whenever money comes in. Set `goal.target` and `goal.deadline` once.
- **Events:** add `{ "date": "YYYY-MM-DD", "time": "HH:MM", "title": "...", "location": "...", "link": "" }`. Home shows the next 5. The Schedule page lists every upcoming event by month, with past events under a collapsible "Past Events" section.
- **Players:** add `{ "number": 12, "name": "...", "position": "Forward", "photo": "" }`. For `photo`, use a path like `Images/players/12.jpg`, or leave it `""` to show the jersey number.
- **Team Swag:** add `{ "name": "...", "price": 25, "image": "", "description": "...", "sizes": ["Youth M", "Adult L"] }` to the `swag` list. For `image`, use a path like `Images/swag/tshirt.jpg`, or leave it `""` to show a shirt icon. Tapping **Order** opens the buyer's email app with a message to `team.contactEmail` that includes the item and chosen size. If their email app doesn't open (common on PCs that use Gmail or Outlook in a browser), **Gmail**, **Outlook.com**, and **Copy order** buttons appear under Order with the same pre-filled message. Use `"sizes": []` for one-size items.
- **Recent activity:** add donations with `name`, `amount`, `date`, and an optional `message`. Set `"anonymous": true` to hide a donor's name. The 8 newest are shown.
- **Sponsors:** shown under the sidebar menu on every page (at the bottom on phones). `tier` can be `Gold`, `Silver`, or `Bronze` (other names work too). For `logo`, use a path like `Images/sponsors/joes-pizza.png`, or leave it `""` to show initials. The **Become a sponsor** link opens a pre-filled sponsorship email to `team.contactEmail` (with Gmail / Outlook.com / Copy backups). To send people to a sign-up form instead, put its web address in `team.sponsorContact`.
- **Donate links:** set `url` to your real Venmo, PayPal, or GoFundMe page. If there's no link (e.g. Zelle), leave `url` as `""` and fill in `handle`, and visitors get a Copy button instead. Add `"qr": "Images/zelle.png"` to show a QR code under that option (optionally with `"qrCaption"` for custom text under it).
- **Social:** `platform` can be `instagram`, `facebook`, `tiktok`, `youtube`, or `x`. These show as icons in the top-right of the header and in the footer. Delete an entry to hide it.

JSON rules: keep the quotes and commas, and put no comma after the last item in a list. If the page shows "could not load", paste the file into https://jsonlint.com to find the typo.

## Preview on your computer
Double-clicking `index.html` won't load the data, because browsers block that for security. Instead, run this in the Website folder:

```
python -m http.server 8000
```
Then open http://localhost:8000. Alternatively, use the "Live Server" extension in VS Code.

## Publishing (free)
- **Netlify:** go to https://app.netlify.com/drop and drag the whole `Website` folder onto the page. To update later, drag the folder again.
- **GitHub Pages:** push this folder to a GitHub repository, then turn on Settings → Pages → "Deploy from branch".
