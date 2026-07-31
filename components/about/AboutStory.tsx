import { AboutBottleShowcase } from "./AboutBottleShowcase";

const PARAGRAPHS = [
  <>
    <strong className="font-normal text-warmwhite">Arabian Nights</strong> was
    born from a simple conviction: the people of Armenia deserve access to the
    same extraordinary Arabic fragrances found in the finest boutiques of Dubai,
    Riyadh, and Beirut.
  </>,
  <>
    Arabic perfumery is not merely fragrance. It is ritual. Oud, rose, amber,
    saffron &mdash; these are ingredients with centuries of meaning behind them,
    used to mark celebrations, welcome guests, and express identity. When you
    wear an Arabic perfume, you carry that tradition.
  </>,
  <>
    <strong className="font-normal text-warmwhite">
      We carry only genuine products
    </strong>{" "}
    from the houses we trust most: Lattafa, Hayati, Afnan, and Ard Al Zaafaran.
    Every bottle is sealed, verified, and delivered to you exactly as it left
    the manufacturer.
  </>,
  <>
    Our team knows every fragrance in our collection personally. When
    you&apos;re not sure what you&apos;re looking for, we&apos;re here to help
    &mdash; over Instagram, by phone, or in person.
  </>,
];

export function AboutStory() {
  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-16">
      <div className="space-y-6">
        {PARAGRAPHS.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.85] text-muted">
            {p}
          </p>
        ))}
      </div>
      <AboutBottleShowcase />
    </div>
  );
}
