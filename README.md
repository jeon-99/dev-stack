# Dev Stack

Dev Stack is a responsive React app for exploring development technologies and assembling a personal stack. Browse and search the catalog, filter by category, and add or remove tools from your stack.

## Features

- Responsive layout with desktop navigation and a mobile menu
- Technology catalog loaded from [`public/technologies.json`](./public/technologies.json)
- Search and category filters
- Stack panel with duplicate prevention, individual removal, and a remove-all action
- Toast notifications for stack changes
- Shared orange-to-pink-to-violet brand gradient

The selected stack is held in app state and resets when the page is reloaded.

## Requirements

- Node.js (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal (typically `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Technology stack

- React
- Vite
- React-Toastify
- Oxlint

Technology icons and Google Fonts are served from external CDNs and require an internet connection.

## Project structure

```text
public/
  technologies.json    Technology catalog
src/
  App.jsx               App UI and stack interactions
  App.css               Component and responsive styles
  index.css             Global styles and theme variables
  main.jsx              React entry point
```

## Credits

Developed by **Jeon**.
