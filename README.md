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

## Angular CLI Commands

### Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

You can also use other schematics like `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `enum`, and `module`.

### Running Unit Tests

To execute unit tests via [Karma](https://karma-runner.github.io), run:

```bash
npm test
```

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
