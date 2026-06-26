/** Başlangıç ihtiyaç formu — indirme ve yükleme sabitleri */
export const baslangicFormuAsset = {
  /** Statik PDF (public/) */
  downloadPath: "/kaynaklar/takt-baslangic-ihtiyac-formu.pdf",
  downloadFilename: "takt-baslangic-ihtiyac-formu.pdf",
  /** Yalnızca PDF; Vercel body limiti için üst sınır */
  maxBytes: 12 * 1024 * 1024,
  acceptMime: "application/pdf" as const,
} as const;

export function isPdfBuffer(buffer: Buffer): boolean {
  return buffer.length >= 5 && buffer.subarray(0, 5).toString("utf8") === "%PDF-";
}
