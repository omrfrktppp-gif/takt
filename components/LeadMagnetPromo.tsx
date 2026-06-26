import Link from "next/link";
import { leadMagnet } from "@/lib/site";

export function LeadMagnetPromo() {
  return (
    <aside className="rounded border border-line bg-accent/5 p-6 md:p-8">
      <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
        Kaynak
      </p>
      <h2 className="mt-2 font-display text-h3 text-ink">{leadMagnet.label}</h2>
      <p className="mt-3 text-body text-steel">{leadMagnet.description}</p>
      <Link
        href={leadMagnet.href}
        className="mt-4 inline-block font-mono text-small text-signal underline-offset-4 hover:underline"
      >
        Formu indir →
      </Link>
    </aside>
  );
}
