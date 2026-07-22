import Hero from "@/components/sections/Hero";
import CheckSection from "@/components/sections/CheckSection";
import OnePartner from "@/components/sections/OnePartner";
import UnderOneRoof from "@/components/sections/UnderOneRoof";
import Proof from "@/components/sections/Proof";
import Credentials from "@/components/sections/Credentials";
import Constraints from "@/components/sections/Constraints";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Homepage — the belief path, in the Tresmares architecture.
 *
 * 01 Hero (ink, pinned, scrubbed convergence)
 * 02 Readiness Check (pulled high — the showpiece on-ramp)
 * 03 One partner + the metrics grid
 * 04 Under one roof (pinned; the line gathers) + four fact-cards
 * 05 OGS proof (pinned; scrubbed anchors) — the one photography slot
 * 06 Credentials — cleared to work with government
 * 07 The constraints we understand
 * 08 Final CTA + what happens next
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CheckSection />
      <OnePartner />
      <UnderOneRoof />
      <Proof />
      <Credentials />
      <Constraints />
      <FinalCta />
    </>
  );
}
