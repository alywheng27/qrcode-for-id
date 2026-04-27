# QR Code for ID

A Next.js app that loads personnel from Microsoft SQL Server and generates downloadable QR codes with each person’s name and office. The UI uses a terminal-inspired dark theme (monospace typography, green accents, glow effects).

## Features

### Data and API

- **Employee directory from SQL Server** — Personnel are loaded from your database via `GET /api/employee`.
- **Joined office names** — The API returns `EmployeeID`, `NameOfEmployee`, and `Office` by joining the `Employees` and `Office` tables (`Employees.OfficeID` → `Office.OfficeID`).

### Personnel list (sidebar)

- **Live search** — Filter people by **employee name** or **office** (case-insensitive substring match).
- **Debounced search** — Typing is debounced (500 ms) so filtering stays smooth while you type.
- **Scrollable list** — Long directories stay usable inside a scrollable panel.
- **Selection state** — The active person is highlighted (left accent border and background); others show hover feedback.
- **Empty search results** — Shows a clear “no results found” message when nothing matches.

### QR code panel

- **Select-to-generate** — Choose a person from the list to render their QR code on a canvas.
- **Encoded payload** — The QR contains two lines of text: `Name: …` and `Office: …` for the selected employee.
- **High error correction** — Codes use error correction level **H** for better durability when printed or scanned in poor conditions.
- **Fixed visual size** — QR is drawn at **256×256** pixels with a small quiet zone (**margin: 2** modules), black modules on white.
- **Loading state** — While the canvas is being generated, the QR area avoids showing a half-drawn frame.
- **Download PNG** — Save the QR as a **PNG**; the file name uses the employee’s name (spaces → underscores) plus `_QR.png`.
- **Download JPEG** — Same behavior for **JPG** export.
- **Empty state** — If nobody is selected, the main area prompts you to pick someone from the list.

### Layout and UX

- **Responsive shell** — On small screens, the title appears above the list; on **md+**, a fixed-width sidebar holds branding + personnel, and the QR area fills the rest of the viewport.
- **Terminal styling** — Custom “terminal” buttons and inputs, glow text/borders, and monospace cues consistent with a CLI aesthetic.

## Requirements

- **Node.js** (compatible with Next.js 16)
- **Microsoft SQL Server** reachable from the app, with `Employees` and `Office` tables as used by the API query

## Environment variables

Create a `.env.local` (or configure your host) with:

| Variable | Description |
|----------|-------------|
| `MSSQL_USER` | SQL login user |
| `MSSQL_PASSWORD` | SQL login password |
| `MSSQL_SERVER` | Hostname or IP of the SQL Server instance |
| `MSSQL_DATABASE` | Database name containing `Employees` and `Office` |

The connection uses `encrypt: false` and `trustServerCertificate: true` (suited for typical local/trusted-network setups). Adjust in `lib/db.ts` if your environment requires stricter TLS.

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Biome check |
| `npm run format` | Biome format (write) |

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4, shadcn/tailwind primitives
- [mssql](https://www.npmjs.com/package/mssql) for SQL Server access
- [qrcode](https://www.npmjs.com/package/qrcode) for canvas-based QR generation
- [Lucide React](https://lucide.dev) for icons
- [Biome](https://biomejs.dev) for linting and formatting

## Deploy

You can deploy on [Vercel](https://vercel.com) or any Node host that can reach your SQL Server. Ensure all `MSSQL_*` variables are set in the deployment environment and that the database allows connections from that network.
