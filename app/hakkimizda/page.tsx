import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ContactRound } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { teamMembers } from "@/lib/team";

const seo = chapterSeo.hakkimizda;

export const metadata: Metadata = buildMetadata(seo);

export default function HakkimizdaPage() {
  const chapter = getChapter("hakkimizda");
  const panels = getChapterPanels("hakkimizda");
  if (!chapter) return null;

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: chapter.label, path: seo.path },
        ])}
      />
      <JsonLd
        data={teamMembers
          .filter((member) => member.id !== "omer-faruk-top")
          .map((member) => personSchema(member))}
      />

      <PageShell
        eyebrow={chapter.eyebrow}
        title={chapter.label}
        description={seo.description}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: chapter.label },
        ]}
      >
        <Section>
          <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-start lg:gap-14 lg:pb-16">
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal-text">
                Takt nasıl çalışır?
              </p>
              <h2 className="mt-3 max-w-md font-display text-h3 text-ink">
                İhtiyaca göre doğru uzmanlıklar aynı projede buluşur.
              </h2>
            </div>
            <div className="max-w-3xl space-y-5 text-body leading-[1.75] text-steel">
              {panels.map((panel) => (
                <p key={panel.id}>{panel.body}</p>
              ))}
            </div>
          </div>
        </Section>

        {teamMembers.length > 0 ? (
          <Section variant="white">
            <div className="space-y-8 lg:space-y-10">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  id={member.id}
                  aria-labelledby={`${member.id}-name`}
                  className="relative overflow-hidden rounded-sm border border-line bg-paper"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-24 size-64 rotate-45 border border-signal/20 bg-signal/5"
                  />
                  <div className="relative grid gap-9 p-6 md:p-9 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 lg:p-12">
                    <aside className="lg:sticky lg:top-28 lg:self-start">
                      <div className="mx-auto w-full max-w-56 lg:mx-0">
                        <div className="aspect-square rounded-full border-2 border-signal bg-surface-raised p-1.5 shadow-[0_0_0_8px_rgba(31,79,224,0.1),0_24px_70px_rgba(0,0,0,0.32)]">
                          <div className="relative size-full overflow-hidden rounded-full">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={`${member.name} portresi`}
                                fill
                                sizes="(max-width: 1023px) 224px, 256px"
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 text-center lg:text-left">
                        <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal-text">
                          {member.profileLabel}
                        </p>
                        <h2
                          id={`${member.id}-name`}
                          className="mt-3 font-display text-h3 text-ink"
                        >
                          {member.name}
                        </h2>
                        <p className="mt-2 font-mono text-small leading-relaxed text-steel">
                          {member.role}
                        </p>
                      </div>
                    </aside>

                    <div className="min-w-0">
                      <h3 className="max-w-3xl font-display text-h3 text-ink">
                        {member.headline}
                      </h3>

                      {member.experienceLead || member.experienceSummary ? (
                        <p className="mt-6 max-w-3xl text-body leading-[1.75] text-steel">
                          {member.experienceLead ? (
                            <strong className="font-semibold text-ink">
                              {member.experienceLead}
                            </strong>
                          ) : null}
                          {member.experienceLead && member.experienceSummary ? " " : null}
                          {member.experienceSummary}
                        </p>
                      ) : null}

                      <p className="mt-7 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
                        {member.areasLabel}
                      </p>
                      <ul
                        className="mt-3 flex flex-wrap gap-2"
                        aria-label={`${member.name} deneyim alanları`}
                      >
                        {member.sectors?.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-line bg-white px-3 py-1.5 font-mono text-eyebrow text-ink"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-10 inline-flex min-h-11 items-center gap-3 rounded-sm border border-signal bg-signal px-5 py-3 font-medium text-signal-ink transition-[background-color,box-shadow,transform] duration-200 ease-takt hover:bg-[var(--signal-strong)] hover:shadow-[0_14px_36px_rgba(31,79,224,0.28)] active:scale-[0.98]"
                        >
                          <ContactRound
                            className="size-5"
                            aria-hidden="true"
                            strokeWidth={1.8}
                          />
                          <span>{member.linkedinLabel}</span>
                          <ArrowUpRight
                            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                            strokeWidth={1.8}
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
      </PageShell>
    </SeoPageLayout>
  );
}
