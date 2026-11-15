# jogart

## Site architecture

The site uses the Next.js App Router with shared navigation, theme controls, and footer in `app/site-chrome.tsx`.

- `/` is the home page.
- `/services` lists the environmental and business advisory offerings.
- `/consulting` is the dedicated consulting landing page for JOGAT Consulting.
- `/services/[slug]` serves a statically generated detail page for each service. Route metadata and source section IDs are maintained in `app/site-content.ts`.
- `/about` and `/contact` are separate organisational pages.

Existing service copy and imagery remain in `app/site-content-source.html` and are selected into their respective routes by element ID. Add a service by adding a content section or panel there and a matching entry in `SERVICE_PAGES`. Service inquiry links carry their selected practice and service to `/contact`.