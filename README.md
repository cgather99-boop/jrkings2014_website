# Team Fundraising Website

A small fundraising site (Home, Players, plus unlisted Finances and Extra Skaters report pages) that can be reused for any team. **All content lives in `data.json` and all colors live in `theme.css`.** You shouldn't need to touch any other file.

## Files
| File | What it is |
|---|---|
| `data.json` | Everything you edit: team name, goal, menu, players, donate links, social media |
| `theme.css` | Team colors (primary + accent). The only file to edit to re-color the site |
| `index.html` | Home page |
| `players.html` | Players page (roster) |
| `styles.css` | Layout and styling. Uses the colors from `theme.css`, so it has no team colors of its own |
| `app.js` | Reads `data.json` and builds every page, including the shared header, sidebar, and footer |
| `Images/` | `logo.png` (team logo, also the browser tab icon), `team_photo.png`, `zelle.png` (Zelle QR code) |
| `CNAME` | The custom web address for GitHub Pages (e.g. `jrkings2014aaa.org`) |
| `finances/index.html` | Team Finances page, at `/finances/`. Not in the menu: parents open it by typing the address. Made by **Export HTML** on the finances app's dashboard; don't edit it by hand |
| `extraskaters/index.html` | Extra Skaters page, at `/extraskaters/`. Not in the menu: parents open it by typing the address. Made by **Export HTML** on the finances app's Extra Skaters page; don't edit it by hand |

If you change `app.js`, `styles.css`, or `theme.css`, bump the `?v=` number where each page loads them (e.g. `app.js?v=3` → `app.js?v=4`) so browsers load the new version instead of an old saved copy.

## Make a site for another team
1. **Copy** the whole `Website` folder (or create a new GitHub repository from it). Don't change `app.js`, `styles.css`, or the `.html` pages.
2. **Colors:** open `theme.css` and set `--primary` and `--accent` to the team's two colors, plus their darker/lighter shades. Set `--on-primary` and `--on-accent` to the text color that reads well on top of each one (white on dark colors, a dark color on light ones).
3. **Images:** replace `Images/logo.png`, `Images/team_photo.png`, and `Images/zelle.png` with the new team's files, keeping the same names.
4. **Content:** edit `data.json`:
   - `team`: `name`, `shortName` (used in email greetings, e.g. "Hi Jr Kings,"), `tagline`, `contactEmail`, `taxNote`
   - `goal` (set `raised` back to `0`), `about`, `teamPhoto.alt`, `fundraisingAlert`, `players`, `donateLinks`, `social`
5. **Web address:** put the new domain in `CNAME`, or delete `CNAME` if the site has no custom domain.
6. **Preview** locally (see below), then publish.

## Updating content
Open `data.json` in any text editor (Notepad or VS Code) and replace every value that starts with `SAMPLE`.

- **Team:** `team.name` shows in the header and browser tab. `team.shortName` is the short name used to greet the team in pre-filled emails.
- **Sidebar menu:** the `nav` list sets the left sidebar links (`label`, `href`, and `icon`, which can be `home`, `users`, `calendar`, `shirt`, `chart`, `skate`, `heart`, or `link`). To add a new page, copy `players.html`, rename it, and add it to `nav`. `reportNav` is the sidebar menu of the two report pages instead (**Finances** and **Extra Skaters**); those pages also have no Donate Now button. Home and Players use `nav`. The **Finances** (`finances/`) and **Extra Skaters** (`extraskaters/`) report pages are deliberately left out of `nav`: they open only when someone types the address, and they ask search engines not to list them. Add an entry like `{ "label": "Finances", "href": "finances/", "icon": "chart" }` to show one in the menu.
- **Team photo:** `teamPhoto.src` sets the photo above the tournament writeup. `alt` describes it for screen readers, and `caption` is optional text shown under it. Delete the `teamPhoto` block to hide it.
- **Fundraising alert:** the highlighted box under the team photo. Set `fundraisingAlert.title` and `description`. For `image`, put the picture in `Images/` (e.g. `Images/tshirt.png`) and use that path, or leave it `""` to show a shirt icon. `imageAlt` describes the image for screen readers. `imageNote` (e.g. `"Merci!!!"`) is shown in script lettering under the image; use `""` to hide it. `linkUrl` is the web address the button opens (e.g. a Google Drive share link), and `linkText` is the button label. The button is hidden while `linkUrl` is `""`. Delete the whole `fundraisingAlert` block to hide the alert. `zelleSteps` is a list of numbered instructions shown first under **Pay with Zelle**, above the team Zelle QR code (the `qr` image of the Zelle entry in `donateLinks`); use `[]` to hide the Zelle option. Below it, under **Or pay with Venmo**, the alert also shows a **Choose your player** dropdown with a **Donate & add your name** button: it opens that player's Venmo (the player's `venmo`, or the team Venmo from `donateLinks` if that's `""`) in a new tab, and a pre-filled email to `team.contactEmail` where the donor writes how their name should appear on the shirt.
- **Tournament writeup (top of page):** edit `about.title`, the `about.paragraphs` list (one string per paragraph), `about.logo`, and `about.linkText` / `about.linkUrl`. Delete the whole `about` block to hide the section.
- **Progress bar:** update `goal.raised` whenever money comes in. Set `goal.target` and `goal.deadline` once.
- **Players:** add `{ "number": 12, "name": "...", "position": "Forward", "photo": "", "flyer": "", "venmo": "" }`. For `photo`, use a path like `Images/players/12.jpg`, or leave it `""` to show the jersey number. For `flyer`, put the player's flyer image in `Images/` and use its path (e.g. `Images/Flyer_Micah.jpeg`) to show a **View flyer** link on their card, or leave it `""` to hide the link. For `venmo`, paste the player's own Venmo link (used by the home page "Donate & add your name" button), or leave it `""` to use the team Venmo. Optional: `"thankYou": "..."` shows the player's thank-you message on their card, and `"supporters": ["Grandma & Grandpa", "The Smith Family"]` lists their supporters' names under it, headed **Got My Back**. Leave them as `""` / `[]` to show nothing.
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
