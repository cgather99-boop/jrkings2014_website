# Team Fundraising Website

A small fundraising site (Home, Players, Schedule, Team Swag) that can be reused for any team. **All content lives in `data.json` and all colors live in `theme.css`.** You shouldn't need to touch any other file.

## Files
| File | What it is |
|---|---|
| `data.json` | Everything you edit: team name, goal, menu, events, players, swag, donations, sponsors, donate links, social media |
| `theme.css` | Team colors (primary + accent). The only file to edit to re-color the site |
| `index.html` | Home page |
| `players.html` | Players page (roster) |
| `schedule.html` | Full schedule page |
| `swag.html` | Team Swag page (merch you can order by email) |
| `styles.css` | Layout and styling. Uses the colors from `theme.css`, so it has no team colors of its own |
| `app.js` | Reads `data.json` and builds every page, including the shared header, sidebar, and footer |
| `Images/` | `logo.png` (team logo, also the browser tab icon), `team_photo.png`, `zelle.png` (Zelle QR code). Put sponsor logos in `Images/sponsors/` |
| `CNAME` | The custom web address for GitHub Pages (e.g. `jrkings2014aaa.org`) |

If you change `app.js`, `styles.css`, or `theme.css`, bump the `?v=` number where each page loads them (e.g. `app.js?v=3` → `app.js?v=4`) so browsers load the new version instead of an old saved copy.

## Make a site for another team
1. **Copy** the whole `Website` folder (or create a new GitHub repository from it). Don't change `app.js`, `styles.css`, or the `.html` pages.
2. **Colors:** open `theme.css` and set `--primary` and `--accent` to the team's two colors, plus their darker/lighter shades. Set `--on-primary` and `--on-accent` to the text color that reads well on top of each one (white on dark colors, a dark color on light ones).
3. **Images:** replace `Images/logo.png`, `Images/team_photo.png`, and `Images/zelle.png` with the new team's files, keeping the same names.
4. **Content:** edit `data.json`:
   - `team`: `name`, `shortName` (used in email greetings, e.g. "Hi Jr Kings,"), `tripName` (used in the sponsor email, e.g. "the Quebec International Pee-Wee Hockey Tournament"), `tagline`, `contactEmail`, `taxNote`
   - `goal` (set `raised` back to `0`), `about`, `teamPhoto.alt`, `events`, `players`, `swagIntro`, `swag`, `sponsors`, `donateLinks`, `social`
   - Empty out `donations` (`"donations": []`)
5. **Web address:** put the new domain in `CNAME`, or delete `CNAME` if the site has no custom domain.
6. **Preview** locally (see below), then publish.

## Updating content
Open `data.json` in any text editor (Notepad or VS Code) and replace every value that starts with `SAMPLE`.

- **Team:** `team.name` shows in the header and browser tab. `team.shortName` is the short name used to greet the team in pre-filled emails, and `team.tripName` is what sponsors are helping pay for.
- **Sidebar menu:** the `nav` list sets the left sidebar links (`label`, `href`, and `icon`, which can be `home`, `users`, `calendar`, `shirt`, `heart`, or `link`). To add a new page, copy `players.html`, rename it, and add it to `nav`.
- **Team photo:** `teamPhoto.src` sets the photo above the tournament writeup. `alt` describes it for screen readers, and `caption` is optional text shown under it. Delete the `teamPhoto` block to hide it.
- **Tournament writeup (top of page):** edit `about.title`, the `about.paragraphs` list (one string per paragraph), `about.logo`, and `about.linkText` / `about.linkUrl`. Delete the whole `about` block to hide the section.
- **Progress bar:** update `goal.raised` whenever money comes in. Set `goal.target` and `goal.deadline` once.
- **Events:** add `{ "date": "YYYY-MM-DD", "time": "HH:MM", "title": "...", "location": "...", "link": "" }`. Home shows the next 5. The Schedule page lists every upcoming event by month, with past events under a collapsible "Past Events" section.
- **Players:** add `{ "number": 12, "name": "...", "position": "Forward", "photo": "" }`. For `photo`, use a path like `Images/players/12.jpg`, or leave it `""` to show the jersey number.
- **Team Swag:** `swagIntro` is the text at the top of the page (use `""` to hide it). Add `{ "name": "...", "price": 25, "image": "", "description": "...", "sizes": ["Youth M", "Adult L"] }` to the `swag` list. For `image`, use a path like `Images/swag/tshirt.jpg`, or leave it `""` to show a shirt icon. Tapping **Order** opens the buyer's email app with a message to `team.contactEmail` that includes the item and chosen size. If their email app doesn't open (common on PCs that use Gmail or Outlook in a browser), **Gmail**, **Outlook.com**, and **Copy order** buttons appear under Order with the same pre-filled message. Use `"sizes": []` for one-size items.
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

If that address shows some other app or an error like "NameError at /", something else is already using port 8000. Use a different number, e.g. `python -m http.server 8080`, and open http://localhost:8080.

## Publishing (free)
- **Netlify:** go to https://app.netlify.com/drop and drag the whole `Website` folder onto the page. To update later, drag the folder again.
- **GitHub Pages:** push this folder to a GitHub repository, then turn on Settings → Pages → "Deploy from branch".
