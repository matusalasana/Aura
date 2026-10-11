import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/products" },
      { label: "Trending", to: "/products" },
      { label: "Categories", to: "/categories" },
      { label: "Stores", to: "/stores" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
      { label: "Licenses", to: "/licenses" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Aura
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The marketplace connecting local stores with people who love
              discovering something different.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:mt-12 sm:flex-row sm:pt-8 sm:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} Aura Marketplace. All rights reserved.
          </p>

          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-widest text-primary transition-opacity hover:opacity-80 sm:text-sm"
          >
            Designed for Aura
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;