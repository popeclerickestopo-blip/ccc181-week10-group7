# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | 7 |
| Section | A |
| Repository URL | https://github.com/popeclerickestopo-blip/ccc181-week10-group7.git |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 | Pope Clerick T. Estopo | popeclerickestopo| `base.css`  | done |
| 2 | John Hendrex L Emperio | Tzoy-web	        | `nav.css`   | done |
| 3 | Kristoff Laurence A. Andam| kris2ff       | `form.css`  | done |

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> (Before adding the viewport meta tag, the page appeared zoomed out and the text and elements looked very small when viewed in mobile mode. This happened because the browser treated the page as if it had a wider desktop screen.

After adding the viewport meta tag, the page adjusted to the actual width of the mobile device. The text became easier to read, the layout fit the screen properly, and the elements were arranged according to our mobile-first CSS.)

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | |
| 1280 px | Content centered and stops at 1200px. | |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

> (The layout changed at the following breakpoints:

- **768px:** The navigation bar changed from a vertical layout to a horizontal layout. The login card also became narrower and centered.
- **1024px:** The brand panel and login form appeared side by side, and the footer changed into three columns.
- **1280px:** The content became centered with a maximum width of 1200px.

No major layout problems were observed during the tested screen widths. The page remained organized and responsive.)

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

> (Through this activity, our group learned how to create a responsive website using a mobile-first approach. We understood that it is important to design for smaller screens first before adjusting the layout for tablets and desktops using media queries.

We also learned how to use CSS Grid and Flexbox to organize page elements, apply responsive breakpoints, and make buttons and links easier to use on mobile devices. Lastly, we experienced how GitHub helps us collaborate by allowing each member to work on their assigned files and contribute to the same project.
