# Mouxadimatoul Xidma BO

Angular back-office application for managing Moukhadimatoul Xidma operations: reservations, delegations, residences, rooms, events, users, roles, responsables, accueillants, and dashboard statistics.

## Tech Stack

- Angular 15
- Angular Material
- Tailwind CSS
- Transloco for translations
- Karma/Jasmine for unit tests

## Requirements

- Node.js 18 recommended
- npm
- Running API at `http://localhost:8081/api/v1`

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

The local API URL is configured in `src/environments/environment.ts`:

```ts
apiUrl: 'http://localhost:8081/api/v1'
```

## Available Scripts

```bash
npm start       # Start the development server
npm run build   # Build production assets into dist/mkhidma
npm test        # Run unit tests with Karma/Jasmine
npm run lint    # Run Angular ESLint
```

## Project Structure

```text
src/app/modules      Feature pages and routed modules
src/app/core         Models, API services, icons, and shared core setup
src/app/layout       Application layouts and shell components
src/assets           Images, fonts, styles, and translations
src/environments     Local and production API configuration
```

## Docker

```bash
docker build -t mouxadimatoul-xidma-bo .
docker run --rm -p 8080:80 mouxadimatoul-xidma-bo
```

## Development Notes

- Keep feature files grouped as `*.component.ts`, `*.component.html`, `*.component.scss`, and `*.component.spec.ts`.
- Update tests when changing services, forms, route behavior, or user-facing component logic.

## Contributing

- Start new work from the latest `main`.
- Use focused branch names such as `feature/reservation-list`, `fix/login-error`, or `chore/update-readme`.
- Keep commits small and use clear messages, for example `feat: add reservation filters`, `fix: handle API errors`, or `docs: update setup steps`.
- Open pull requests with a short summary, test notes, and screenshots for visible UI changes.
