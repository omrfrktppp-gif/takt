import { timingSafeEqual } from "node:crypto";

export function safeCompareSecret(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}
