"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

type LazyGoogleMapProps = {
  src: string;
  title: string;
  className?: string;
};

export function LazyGoogleMap({ src, title, className = "" }: LazyGoogleMapProps) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className={`flex w-full flex-col items-center justify-center gap-3 border-0 bg-paper px-6 py-10 text-center transition-colors hover:bg-accent/5 ${className}`}
      >
        <MapPin className="text-signal" size={28} strokeWidth={1.5} aria-hidden="true" />
        <span className="font-medium text-ink">Haritayı göster</span>
        <span className="text-small text-steel">
          Google Haritalar yalnızca tıkladığınızda yüklenir.
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
      allowFullScreen
    />
  );
}
