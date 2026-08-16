import type { Metadata } from "next";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Arabian Nights ARM — Instagram, phone, and our Yerevan store locations.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1280px] px-6 pt-10">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
          Get in Touch
        </p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-warmwhite">
          Contact Us
        </h1>
        <div className="mt-5 h-px w-12 bg-gold" />
      </div>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-14">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
