import { faqItems } from "@/lib/site";

/**
 * Sorular gerçek başlık (h2) olarak render edilir: yanıt motorları ve AI
 * arama, alıntılanabilir pasajı başlık hiyerarşisinden çıkarıyor. Görsel
 * çıktı `dl/dt/dd` sürümüyle aynı — sınıflar birebir korundu.
 */
export function FaqList() {
  return (
    <div className="divide-y divide-line rounded border border-line bg-white">
      {faqItems.map((item) => (
        <div key={item.question} className="p-6">
          <h2 className="font-display text-h3 text-ink">{item.question}</h2>
          <p className="mt-3 text-body text-steel">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
