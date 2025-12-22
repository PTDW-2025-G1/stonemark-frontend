# Stonemark Frontend

This project is an Angular workspace with multiple applications. It was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Applications

This workspace includes the following applications:

- **app**: The main application.
- **auth**: The authentication application.
- **profile**: The user profile application.
- **staff**: The staff application.

## Development

### Running a Single Application

To run a single application in development mode, use the following commands:

- **Main App:** `npm run start:app` (runs on `http://localhost:4200`)
- **Auth App:** `npm run start:auth` (runs on `http://localhost:4201`)
- **Profile App:** `npm run start:profile` (runs on `http://localhost:4202`)
- **Staff App:** `npm run start:staff` (runs on `http://localhost:4220`)

### Running All Applications

To run all applications concurrently in development mode, use the following command:

```bash
npm run start:all
```

### Generating API Models

To generate the TypeScript models from the backend API documentation, ensure the backend is running at `http://localhost:8080` and run:

```bash
npm run api:gen-models
```

This will update the models in `projects/shared/src/lib/api`.

## Production

### Building for Production

To build all applications for production, run the following command. This will build the applications sequentially to avoid memory issues.

```bash
npm run build:all
```

The build artifacts will be stored in the `dist/` directory, with each application in its own subdirectory (e.g., `dist/app`, `dist/auth`).

### Running in a Production-Like Environment

To simulate a production environment locally, you can use the `start:prod:all` script. This script will first build all the applications and then serve each one on its designated port.

**1. Local Domain Setup**

To access the applications using their production subdomains (e.g., `auth.stonemark.pt`), you'll need to point these domains to your local machine. This is necessary for the applications to communicate with each other correctly.

A good way to achieve this is by using a tool like [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel/) to expose your local servers to the internet with the correct domains.

**2. Run the Production Server Script**

Once your local domains are pointing to the correct ports, run the following command:

```bash
npm run start:prod:all
```

This will serve each application on its designated port. You can then access them in your browser using their production URLs (e.g., `http://auth.stonemark.pt`, `http://account.stonemark.pt`).

If you have already built the applications and want to start the servers without rebuilding, you can use:

```bash
npm run start:prod:all:no-build
```

## Angular CLI Commands

### Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

You can also use other schematics like `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `enum`, and `module`.

## Testing

This project includes two testing layers:

### Unit Tests (Vitest)

Unit tests ensure isolated business logic works correctly (services, pipes, forms, helpers, component DOM).

Run once:
```bash
npm run test
```

Run in watch mode:
```bash
npm run test:watch
```

Open the Vitest UI (recommended for debugging):
```bash
npm run test:ui
```

Location of Unit Tests

Tests live next to their components/services:
```pgsql
component-name.spec.ts
service-name.spec.ts
```

What Is Tested?

- Services (e.g., contact.service with mocked API responses)
- Component logic (e.g., form validation)
- DOM rendering and template behavior (Angular TestBed)
- Pipes and helpers

### E2E Tests (Cypress)

End-to-end tests simulate real user behavior in the browser and validate the full flow of the application.

Running Cypress

- Open interactive mode (GUI):
```bash
npx cypress open
```

Run in headless mode:
```bash
npx cypress run
```

Location of E2E Tests

All tests are under:
```pgsql
cypress/e2e
```

What Is Tested?

- Page rendering and structure
- Form validation and inline errors
- Subject select component behavior
- API request mocking (intercept)
- Success and error submission flows
- Prefill behavior for authenticated users
- Responsive design (mobile/tablet/desktop viewports)

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
