import { loadBlogPostsFromContent } from "@/lib/blog-loader";
import type { BlogPost, BlogTag } from "@/lib/blog-types";

export const englishBlogTags: BlogTag[] = [
  { id: "muhendislik-danismanligi", label: "Engineering Consulting", description: "Technical consulting and industrial engineering support" },
  { id: "proje-danismanligi", label: "Project Consulting", description: "Production optimization, facility management and process improvement" },
  { id: "teknik-ekip-yonetimi", label: "Engineering Team Management", description: "Engineering process management and workflow design" },
  { id: "tasarim-gelistirme", label: "Design & Development", description: "Custom machinery design, reverse engineering and engineering drawings" },
  { id: "analiz-hesaplama", label: "Analysis & Calculation", description: "FEA, simulation, engineering calculations and technical reporting" },
  { id: "uretim-danismanligi", label: "Manufacturing Consulting", description: "Contract manufacturing, production coordination and partner network" },
  { id: "kapasite-imalat", label: "Manufacturing Capabilities", description: "CNC, laser cutting, 3D printing, prototyping and mass production" },
  { id: "arge-urge", label: "R&D & Product Development", description: "From concept to product, product development and R&D project management" },
  { id: "ankara-sanayi", label: "Ankara & Industry", description: "Local engineering consulting and defense supplier ecosystem" },
  { id: "dfm-dfa", label: "DFM / DFA", description: "Design for manufacturing and assembly, cost optimization" },
  { id: "japon-muhendislik", label: "Japanese Engineering Principles", description: "Kaizen, muda, gemba, lean manufacturing and continuous improvement" },
  { id: "kalite-ilkeleri", label: "Quality Principles", description: "FMEA, Six Sigma, Taguchi and process capability" },
  { id: "muhendislik-trendleri", label: "Engineering Trends", description: "Digital twins, additive manufacturing and generative design" },
];

export const englishBlogPosts: BlogPost[] = loadBlogPostsFromContent("en");

export function getEnglishPublishedPosts(): BlogPost[] {
  return englishBlogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getEnglishPostBySlug(slug: string): BlogPost | undefined {
  return englishBlogPosts.find((post) => post.slug === slug && post.status === "published");
}

export function getAllEnglishPostSlugs(): string[] {
  return getEnglishPublishedPosts().map((post) => post.slug);
}

export function getEnglishTagById(id: string): BlogTag | undefined {
  return englishBlogTags.find((tag) => tag.id === id);
}

export function getEnglishPostsByTag(tagId: string): BlogPost[] {
  return getEnglishPublishedPosts().filter((post) => post.tags.includes(tagId));
}

export function getAllEnglishTagIds(): string[] {
  return englishBlogTags.map((tag) => tag.id);
}

export function resolveEnglishPostTags(post: BlogPost): BlogTag[] {
  return post.tags
    .map((id) => getEnglishTagById(id))
    .filter((tag): tag is BlogTag => Boolean(tag));
}
