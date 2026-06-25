/** JSON-LD script tag içinde `</script>` kaçışı */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
