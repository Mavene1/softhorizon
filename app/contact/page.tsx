import { ContactSections } from "@/components/sections/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Tell us about your project — we'll get back to you within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactSections />;
}
