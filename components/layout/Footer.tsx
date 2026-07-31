import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop", label: "All Fragrances" },
  { href: "/shop?gender=Men", label: "Men" },
  { href: "/shop?gender=Women", label: "Women" },
  { href: "/shop?gender=Unisex", label: "Unisex" },
  { href: "/wishlist", label: "Wishlist" },
];

const BRAND_LINKS = ["Lattafa", "Hayati", "Afnan", "Ard Al Zaafaran"];

const INFO_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

// Evaluated once at build time so server and client always agree.
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-deep pb-28 pt-16 sm:pb-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex flex-col">
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-gold">
                &#1604;&#1610;&#1575;&#1604;&#1610;
                &#1575;&#1604;&#1593;&#1585;&#1576;
              </span>
              <span className="font-display text-[22px] text-warmwhite">
                Arabian Nights
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-muted">
              Authentic Arabic fragrances, brought to Armenia. Lattafa, Hayati,
              Afnan, Ard Al Zaafaran &mdash; genuine, premium, delivered.
            </p>
          </div>

          <FooterColumn title="Shop">
            {SHOP_LINKS.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="block py-1 text-[13px] text-muted transition-colors hover:text-warmwhite"
              >
                {l.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Brands">
            {BRAND_LINKS.map((b) => (
              <Link
                key={b}
                href={`/shop?brand=${encodeURIComponent(b)}`}
                className="block py-1 text-[13px] text-muted transition-colors hover:text-warmwhite"
              >
                {b}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Info">
            {INFO_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-1 text-[13px] text-muted transition-colors hover:text-warmwhite"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://instagram.com/arabian_nights_arm"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[13px] text-muted transition-colors hover:text-warmwhite"
            >
              Instagram
            </a>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-[11px] text-muted">
            &copy; {CURRENT_YEAR} Arabian Nights. All rights reserved. Armenia.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold">
        {title}
      </p>
      {children}
    </div>
  );
}
