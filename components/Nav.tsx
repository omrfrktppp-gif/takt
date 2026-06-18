"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { navLinks } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-ink"
          aria-label="Takt ana sayfa"
        >
          <Cadence variant="mark" className="scale-75 origin-left" />
          <span>takt</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Ana navigasyon"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink underline-offset-4 hover:text-signal hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/iletisim">Görüşme planla</Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-line p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-white px-6 py-4 md:hidden"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button href="/iletisim" className="w-full">
                Görüşme planla
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
