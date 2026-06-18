import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Takt iletişim formu kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk-aydinlatma-metni" },
  robots: { index: true, follow: true },
};

export default function KvkkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "KVKK Aydınlatma Metni", path: "/kvkk-aydinlatma-metni" },
        ])}
      />

      <Section variant="white" className="pb-12 pt-20 md:pt-28">
        <Eyebrow>KVKK</Eyebrow>
        <h1 className="max-w-3xl font-display text-h1 text-ink">
          İletişim Formu Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
        </h1>
      </Section>

      <Section>
        <article className="prose-takt max-w-3xl space-y-10 text-body text-steel">
          <section>
            <h2 className="font-display text-h3 text-ink">
              1. Veri Sorumlusunun Kimliği
            </h2>
            <p className="mt-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)
              uyarınca, <strong className="text-ink">Takt (Ömer Faruk Top)</strong>{" "}
              (&ldquo;Veri Sorumlusu&rdquo;) olarak, web sitemiz (takt.tr) üzerinde
              yer alan iletişim formu aracılığıyla paylaştığınız kişisel
              verileriniz, aşağıda açıklanan kapsamda ve yasal şartlara uygun
              olarak işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-h3 text-ink">
              2. İşlenen Kişisel Verileriniz
            </h2>
            <p className="mt-4">
              İletişim formunu doldurmanız dolayısıyla aşağıdaki kişisel
              verileriniz işlenmektedir:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Kimlik Bilgileriniz:</strong> Adınız,
                Soyadınız.
              </li>
              <li>
                <strong className="text-ink">İletişim Bilgileriniz:</strong>{" "}
                E-posta adresiniz, Telefon numaranız.
              </li>
              <li>
                <strong className="text-ink">
                  Mesleki Deneyim / Müşteri İşlem Bilgileriniz:
                </strong>{" "}
                Firma adınız.
              </li>
              <li>
                <strong className="text-ink">Talep/Şikayet Bilgileriniz:</strong>{" "}
                İhtiyaç ve konuyu anlattığınız mesaj içeriğiniz.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-h3 text-ink">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p className="mt-4">Toplanan kişisel verileriniz;</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>İletişim faaliyetlerinin yürütülmesi,</li>
              <li>
                Mühendislik ve danışmanlık taleplerinizin veya sorularınızın
                alınarak tarafınıza geri dönüş sağlanması,
              </li>
              <li>Görüşme planlamalarının yapılması,</li>
              <li>
                İş süreçlerinin iyileştirilmesi ve müşteri ilişkileri yönetiminin
                sağlanması
              </li>
            </ul>
            <p className="mt-4">amaçlarıyla sınırlı olarak işlenmektedir.</p>
          </section>

          <section>
            <h2 className="font-display text-h3 text-ink">
              4. Kişisel Verilerin İşlenmesinin Hukuki Sebebi ve Toplama Yöntemi
            </h2>
            <p className="mt-4">
              Kişisel verileriniz, web sitemizdeki iletişim formunun
              doldurulması suretiyle tamamen otomatik yollarla elektronik ortamda
              toplanmaktadır. Bu veriler, KVKK Madde 5/2&apos;de belirtilen;
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <em>
                  &ldquo;Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya
                  ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel
                  verilerin işlenmesinin gerekli olması&rdquo;
                </em>{" "}
                ve
              </li>
              <li>
                <em>
                  &ldquo;İlgili kişinin temel hak ve özgürlüklerine zarar vermemek
                  kaydıyla, veri sorumlusunun meşru menfaatleri için veri
                  işlenmesinin zorunlu olması&rdquo;
                </em>
              </li>
            </ul>
            <p className="mt-4">
              hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-h3 text-ink">
              5. Kişisel Verilerin Aktarılması
            </h2>
            <p className="mt-4">
              İletişim formu aracılığıyla paylaştığınız veriler, yalnızca
              yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda
              işlenmektedir. Verileriniz, operasyonel iş süreçlerimizin ve
              e-posta altyapımızın yürütülmesi amacıyla kullanılan güvenli bulut
              tabanlı e-posta sağlayıcılarında (Google Workspace altyapısı)
              barındırılmaktadır. Kanunen yetkili kamu kurumları haricinde,
              verileriniz hiçbir üçüncü şahısla veya şirketle ticari amaçla
              paylaşılmamaktadır.
            </p>
          </section>

          <section>
            <h2 className="font-display text-h3 text-ink">
              6. KVKK Madde 11 Kapsamındaki Haklarınız
            </h2>
            <p className="mt-4">
              KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak;
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,
              </li>
              <li>
                İşlenme amacını ve bunların amacına uygun kullanılıp
                kullanılmadığını öğrenme,
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
                üçüncü kişileri bilme,
              </li>
              <li>
                Eksik veya yanlış işlenmiş olması hâlinde bunların
                düzeltilmesini isteme ve bu kapsamda yapılan işlemin
                aktarıldığı üçüncü kişilere bildirilmesini talep etme,
              </li>
              <li>
                İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde
                silinmesini veya yok edilmesini isteme,
              </li>
              <li>
                Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız
                hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.
              </li>
            </ul>
            <p className="mt-4">
              Söz konusu haklarınıza ilişkin taleplerinizi, kanunda belirtilen
              yöntemlerle veya doğrudan{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                {siteConfig.email}
              </a>{" "}
              e-posta adresi üzerinden yazılı olarak tarafımıza iletebilirsiniz.
              Talepleriniz, niteliğine göre en kısa sürede ve en geç otuz gün
              içinde sonuçlandırılacaktır.
            </p>
          </section>

          <p>
            <Link
              href="/iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              ← İletişim sayfasına dön
            </Link>
          </p>
        </article>
      </Section>
    </>
  );
}
