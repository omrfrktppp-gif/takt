import { faqItems } from "@/lib/site";

export function FaqList() {
  return (
    <dl className="divide-y divide-line rounded border border-line bg-white">
      {faqItems.map((item) => (
        <div key={item.question} className="p-6">
          <dt className="font-display text-h3 text-ink">{item.question}</dt>
          <dd className="mt-3 text-body text-steel">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
