import { PressSections } from "@/components/sections/press";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Press",
  description: "Company news, media kit, and press contact for SoftHorizon.",
  path: "/press",
});

export default function PressPage() {
  return <PressSections />;
}
