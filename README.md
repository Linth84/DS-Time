<div align="center">

<img src="./public/ds-favicon.png" alt="DS-Time logo" width="112" />

# DS-Time

### One time. Every timezone.

A clean, multilingual Discord timestamp generator for global communities.

Create timestamps that automatically display in each person's local time — no timezone math required.

[**Live Demo**](https://linth84.github.io/DS-Time/) · [Report a Bug](https://github.com/Linth84/DS-Time/issues) · [View Source](https://github.com/Linth84/DS-Time)

![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6-20232A?style=flat-square&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-8-20232A?style=flat-square&logo=vite&logoColor=646CFF)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-20232A?style=flat-square&logo=github&logoColor=white)

</div>

---

## What is DS-Time?

Coordinating people across different time zones shouldn't require doing timezone math.

**DS-Time** generates native Discord timestamps that automatically adapt to the local timezone of whoever reads them. Choose a date and time, select a format, copy the timestamp, and paste it directly into Discord.

```text
<t:1787590800:F>
```

Everyone sees that same moment in their own local time.

## Features

- Automatic local timezone detection
- Native Discord timestamp syntax
- Seven timestamp formats
- Live previews
- Relative time support
- Discord message builder
- Quick message templates
- One-click copy
- English, Spanish, French, German and Japanese
- Responsive interface
- No account required
- No personal data collected

## Timestamp formats

| Format | Syntax | Example |
| --- | :---: | --- |
| Short Time | `<t:TIMESTAMP:t>` | 9:30 PM |
| Long Time | `<t:TIMESTAMP:T>` | 9:30:00 PM |
| Short Date | `<t:TIMESTAMP:d>` | 08/24/2026 |
| Long Date | `<t:TIMESTAMP:D>` | August 24, 2026 |
| Date & Time | `<t:TIMESTAMP:f>` | August 24, 2026 9:30 PM |
| Full Date & Time | `<t:TIMESTAMP:F>` | Monday, August 24, 2026 9:30 PM |
| Relative Time | `<t:TIMESTAMP:R>` | in 2 hours |

## Message Builder

Build an entire Discord message and insert timestamps exactly where you need them:

```text
Raid starts at <t:1787590800:F> — starts <t:1787590800:R>
```

Paste it into Discord and every member sees the correct time for their timezone.

## Built for global communities

DS-Time is useful for gaming communities, raids and group activities, international Discord servers, online meetings, streams, community events, study groups and remote teams.

## Tech stack

- **React 19**
- **TypeScript 6**
- **Vite 8**
- **CSS**
- **GitHub Actions + GitHub Pages**

## Run locally

```bash
git clone https://github.com/Linth84/DS-Time.git
cd DS-Time
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Languages

**English · Español · Français · Deutsch · 日本語**

The interface detects the browser language automatically and also allows manual language selection.

## Privacy

DS-Time runs entirely in the browser. No account is required and no personal information is collected or stored by the application.

## Disclaimer

DS-Time is an independent project and is not affiliated with, endorsed by, or sponsored by Discord Inc. Discord is a trademark of Discord Inc.

---

<div align="center">

**DS-Time — One time. Every timezone.**

Made by [Linth84](https://github.com/Linth84)

</div>
