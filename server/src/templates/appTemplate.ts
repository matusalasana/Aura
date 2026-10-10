
export const appTemplate = () => {
  const timestamp = new Date().toISOString();
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#09090b" />
  <meta name="description" content="Aura Marketplace API status and service health." />
  <title>Aura Marketplace — API Status</title>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #09090b;
      color: #fafafa;
      font-family: Inter, system-ui, -apple-system, sans-serif;
    }

    main { width: 100%; max-width: 760px; }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 64px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
    }

    .logo {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #10b981;
      color: #022c22;
      font-size: 22px;
      font-weight: 900;
    }

    .brand-name {
      font-size: 19px;
      font-weight: 750;
      letter-spacing: -0.6px;
    }

    .brand-name span { color: #34d399; }

    .badge {
      border: 1px solid #14532d;
      background: #052e16;
      color: #86efac;
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 11px;
      white-space: nowrap;
    }

    .dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 7px;
      border-radius: 50%;
      background: #4ade80;
    }

    .eyebrow {
      color: #34d399;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    h1 {
      font-size: clamp(38px, 8vw, 66px);
      line-height: 1.05;
      letter-spacing: -3px;
      margin-bottom: 20px;
    }

    h1 span { color: #34d399; }

    .description {
      max-width: 540px;
      color: #a1a1aa;
      line-height: 1.8;
      font-size: 15px;
    }

    .panel {
      margin-top: 42px;
      padding: 24px;
      border: 1px solid #27272a;
      border-radius: 16px;
      background: #111113;
    }

    .panel-title {
      font-size: 11px;
      letter-spacing: 1.5px;
      color: #a1a1aa;
      margin-bottom: 20px;
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 15px 0;
      border-bottom: 1px solid #27272a;
      font-size: 13px;
    }

    .status-row:last-of-type { border-bottom: 0; }
    .label { color: #a1a1aa; }
    .value { font-weight: 600; text-align: right; }
    .green { color: #34d399; }

    code {
      color: #86efac;
      background: #052e16;
      padding: 5px 8px;
      border-radius: 6px;
      font-size: 12px;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 22px;
    }

    .stack span {
      padding: 8px 11px;
      border: 1px solid #27272a;
      border-radius: 8px;
      color: #d4d4d8;
      font-size: 11px;
    }

    footer {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-top: 30px;
      color: #71717a;
      font-size: 12px;
    }

    footer a {
      color: #34d399;
      text-decoration: none;
    }

    footer a:hover { color: #6ee7b7; }

    @media (max-width: 480px) {
      header { margin-bottom: 48px; }
      .brand-name { font-size: 17px; }
      .panel { padding: 18px; }
      footer { flex-direction: column; }
    }
  </style>
</head>

<body>
  <main>
    <header>
      <div class="brand">
        <div class="logo">A</div>
        <div class="brand-name">Aura <span>Marketplace</span></div>
      </div>

      <div class="badge">
        <span class="dot"></span>API ONLINE
      </div>
    </header>

    <section>
      <p class="eyebrow">Aura Systems / API Status</p>
      <h1>Commerce,<br /><span>connected.</span></h1>
      <p class="description">
        Welcome to the Aura Marketplace API. The backend service is running
        and ready to power stores, products, and marketplace experiences.
      </p>
    </section>

    <section class="panel">
      <p class="panel-title">SERVICE OVERVIEW</p>

      <div class="status-row">
        <span class="label">API status</span>
        <span class="value green">Operational</span>
      </div>

      <div class="status-row">
        <span class="label">Service</span>
        <span class="value">Aura Marketplace API</span>
      </div>

      <div class="status-row">
        <span class="label">API base path</span>
        <code>/api/v1</code>
      </div>

      <div class="status-row">
        <span class="label">Architecture</span>
        <span class="value">Multi-tenant commerce</span>
      </div>

      <div class="status-row">
        <span class="label">Response format</span>
        <span class="value">JSON / REST</span>
      </div>

      <div class="status-row">
        <span class="label">Server timestamp</span>
        <span class="value">${timestamp}</span>
      </div>

      <div class="stack">
        <span>Node.js</span>
        <span>Express</span>
        <span>TypeScript</span>
        <span>PostgreSQL</span>
        <span>Drizzle ORM</span>
        <span>Redis</span>
      </div>
    </section>

    <footer>
      <span>© ${year} Aura Marketplace</span>
      <a href="/api/v1">Explore API →</a>
    </footer>
  </main>
</body>
</html>
`;
};
