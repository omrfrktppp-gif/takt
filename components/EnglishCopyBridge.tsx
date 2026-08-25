"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isEnglishPath, stripLocalePrefix } from "@/lib/i18n";

type CopyMap = Record<string, string>;

type CopyIndex = {
  exact: CopyMap;
  folded: CopyMap;
};

type Manifest = {
  routes: Record<string, string>;
};

type CopyPayload = {
  title?: string;
  copy: CopyMap;
};

const TRANSLATABLE_ATTRIBUTES = [
  "aria-label",
  "placeholder",
  "title",
  "alt",
] as const;

function foldCopyKey(value: string): string {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function createCopyIndex(copy: CopyMap): CopyIndex {
  const folded: CopyMap = {};
  for (const [source, target] of Object.entries(copy)) {
    const key = foldCopyKey(source);
    folded[key] ??= target;
  }
  return { exact: copy, folded };
}

function translateValue(value: string, copy: CopyIndex): string {
  const trimmed = value.trim();
  const translated =
    copy.exact[trimmed] ??
    copy.folded[foldCopyKey(trimmed)] ??
    trimmed
      .replace(/^Başlangıç:/, "Start:")
      .replace(/^Başlangıç$/, "Start")
      .replace(/^(\d+)\. adım:/, "Step $1:")
      .replace(/^Adım (\d+) \/ (\d+)$/, "Step $1 / $2")
      .replace(/^PROJE TANIMI · BAŞLANGIÇ$/, "PROJECT BRIEF · START")
      .replace(/^PROJE TANIMI · (\d+)\/(\d+)$/, "PROJECT BRIEF · $1/$2")
      .replace(
        /^(\d+) adımdan (\d+)\. adım, yüzde (\d+) tamamlandı$/,
        "Step $2 of $1, $3 percent complete",
      );
  if (!translated || translated === trimmed) return value;
  return value.replace(trimmed, translated);
}

function localizeHref(anchor: HTMLAnchorElement) {
  if (anchor.closest("[data-locale-switcher]")) return;
  const href = anchor.getAttribute("href");
  if (
    !href ||
    !href.startsWith("/") ||
    href.startsWith("/en") ||
    href.startsWith("/api") ||
    href.startsWith("/_next") ||
    href.startsWith("/locales")
  ) {
    return;
  }
  anchor.setAttribute("href", href === "/" ? "/en" : `/en${href}`);
}

function translateSubtree(root: ParentNode, copy: CopyIndex) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, noscript, [data-no-translate]")) {
      continue;
    }
    textNodes.push(node);
  }

  for (const node of textNodes) {
    node.nodeValue = translateValue(node.nodeValue ?? "", copy);
  }

  const elements = root instanceof Element
    ? [root, ...root.querySelectorAll<HTMLElement>("*")]
    : [...root.querySelectorAll<HTMLElement>("*")];

  for (const element of elements) {
    if (element.children.length === 0 && element.textContent) {
      const translatedText = translateValue(element.textContent, copy);
      if (translatedText !== element.textContent) {
        element.textContent = translatedText;
      }
    }
    for (const attribute of TRANSLATABLE_ATTRIBUTES) {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, translateValue(value, copy));
    }
    if (element instanceof HTMLAnchorElement) localizeHref(element);
  }
}

export function EnglishCopyBridge() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isEnglishPath(pathname)) {
      document.documentElement.lang = "tr";
      return;
    }

    const controller = new AbortController();
    let observer: MutationObserver | undefined;

    async function activateEnglishCopy() {
      const route = stripLocalePrefix(pathname);
      const manifestResponse = await fetch("/locales/en/manifest.json", {
        signal: controller.signal,
      });
      if (!manifestResponse.ok) return;

      const manifest = (await manifestResponse.json()) as Manifest;
      const pageSource = manifest.routes[route];

      const [commonResponse, pageResponse] = await Promise.all([
        fetch("/locales/en/common.json", { signal: controller.signal }),
        pageSource
          ? fetch(pageSource, { signal: controller.signal })
          : Promise.resolve(undefined),
      ]);
      if (!commonResponse.ok || (pageResponse && !pageResponse.ok)) return;

      const common = (await commonResponse.json()) as CopyPayload;
      const page = pageResponse
        ? ((await pageResponse.json()) as CopyPayload)
        : { copy: {} };
      const copy = createCopyIndex({ ...common.copy, ...page.copy });

      document.documentElement.lang = "en";
      if (page.title) document.title = `${page.title} — Takt`;
      translateSubtree(document.body, copy);
      document.documentElement.dataset.localeReady = "en";

      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "characterData" && mutation.target instanceof Text) {
            const current = mutation.target.nodeValue ?? "";
            const translated = translateValue(current, copy);
            if (translated !== current) mutation.target.nodeValue = translated;
          }
          for (const node of mutation.addedNodes) {
            if (node instanceof Element) translateSubtree(node, copy);
            if (node instanceof Text) {
              node.nodeValue = translateValue(node.nodeValue ?? "", copy);
            }
          }
        }
      });
      observer.observe(document.body, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }

    activateEnglishCopy().catch(() => {
      document.documentElement.dataset.localeReady = "error";
    });

    return () => {
      controller.abort();
      observer?.disconnect();
      delete document.documentElement.dataset.localeReady;
    };
  }, [pathname]);

  return null;
}
