# Armin Web

Armin Web is the public-facing web application of the Armin Template ecosystem.

It is a separate Next.js application that consumes the Armin API and provides the public product discovery and presentation experience.

## Role in the Armin Ecosystem

Armin consists of three independent applications:

* **Armin API** — Laravel backend and source of truth for business rules, authorization, data, orders, payments, and subscriptions.
* **Armin Admin** — React-based administrative interface for management workflows.
* **Armin Web** — Next.js public-facing web application.

The Web application is responsible for public presentation and user experience. Authoritative business rules, authorization, pricing, payments, and access decisions remain in the API.

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* next-intl
* next-themes
* Lucide React
* Sonner
* Vazirmatn

## Requirements

* Node.js
* npm
* A running Armin API instance

## Environment

Create a local environment file:

```bash
cp .env.example .env.local
```

The default development configuration is:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

Set `NEXT_PUBLIC_API_BASE_URL` to the base URL of the Armin API used by the Web application.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Next.js development server will display the local URL in the terminal.

## Validation

Run the production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Start the production server:

```bash
npm run start
```

## Current Application Scope

The Web application provides the public-facing experience, including:

* Home page
* Public item catalog
* Item discovery
* Search
* Category filtering
* Sorting
* Item detail pages
* Responsive layouts
* Persian and English localization
* RTL and LTR presentation
* Dark-oriented visual design
* Public account and authentication flows

## Repository Structure

The application source code is located in:

```text
src/
```

The Web application is intentionally maintained as an independent frontend repository and does not depend on the implementation details of the Admin application.

## Relationship to the API

The Armin API is the authoritative backend.

The Web application is responsible for:

* Public routing
* Page presentation
* Catalog and discovery UX
* Search, filtering, and sorting interfaces
* Responsive public UX
* Localization
* SEO-oriented presentation

The Web application does not make authoritative decisions about:

* Authorization
* Pricing
* Payment status
* Subscription validity
* User entitlements
* Protected content access

Those decisions belong to the API.

## Armin Template

Armin Web is part of the reusable Armin Template ecosystem.

The central Armin Template documentation is maintained separately in the API repository. Product-specific work belongs to the product instance created from the Template.

For example:

```text
Armin Template
      ↓
Product Instance
      ↓
Armin Web
      ↓
Product-specific public experience
```

## Status

**Complete / Stable**

The current Web application represents the stable public-facing baseline of the Armin Template.
