import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductById } from "@/lib/products";
import { formatAMD } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { FragrancePyramid } from "@/components/product/FragrancePyramid";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { RecentlyViewedTracker } from "./RecentlyViewedTracker";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} by ${product.brand}`,
    description: `${product.name} by ${product.brand} — ${product.type} fragrance, ${product.size}. ${formatAMD(product.price)}. Order now with fast delivery across Armenia.`,
    openGraph: {
      title: `${product.name} by ${product.brand} | Arabian Nights ARM`,
      description: `${product.type} fragrance — ${formatAMD(product.price)}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: `${product.type} fragrance, ${product.size}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "AMD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecentlyViewedTracker productId={product.id} />

      <div className="mx-auto max-w-[1280px] px-6 pt-5">
        <nav
          aria-label="Breadcrumb"
          className="flex gap-2 text-[11px] text-muted"
        >
          <Link href="/" className="text-gold hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="/shop" className="text-gold hover:underline">
            Shop
          </Link>{" "}
          /<span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-10">
        <ProductGallery product={product} />
        <div>
          <ProductPurchasePanel product={product} />
          <FragrancePyramid notes={product.notes} />
          <ProductSpecs product={product} />
        </div>
      </div>

      <SimilarProducts product={product} />
    </div>
  );
}
