"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type ContactChannel = "phone" | "email" | "whatsapp";

type ContactChannelLinkProps = {
  href: string;
  channel: ContactChannel;
  className?: string;
  children: ReactNode;
  rel?: string;
  target?: string;
};

export function ContactChannelLink({
  href,
  channel,
  className,
  children,
  rel,
  target,
}: ContactChannelLinkProps) {
  return (
    <a
      href={href}
      className={className}
      rel={rel}
      target={target}
      onClick={() => trackEvent("contact_click", { channel })}
    >
      {children}
    </a>
  );
}
