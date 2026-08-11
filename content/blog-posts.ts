export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "addiction-and-recovery",
    number: "01",
    category: "Addiction & recovery",
    title: "Understanding the path from addiction to recovery",
    excerpt:
      "Placeholder introduction for a practical, compassionate article about addiction, treatment, relapse prevention, and recovery.",
    readTime: "6 min read",
    sections: [
      {
        heading: "A place to begin",
        paragraphs: [
          "Add the opening section of this article here. This space can introduce the topic in clear, reassuring language without judgment.",
          "Use a second paragraph to explain what readers may be experiencing and what they can expect to learn from the article.",
        ],
      },
      {
        heading: "What support can look like",
        paragraphs: [
          "Add practical information about assessment, rehabilitation, ongoing therapy, family involvement, or relapse prevention here.",
        ],
      },
    ],
  },
  {
    slug: "living-with-anxiety",
    number: "02",
    category: "Anxiety",
    title: "When anxiety starts shaping everyday life",
    excerpt:
      "Placeholder introduction for an accessible article about anxiety, common experiences, and when professional support may help.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Recognising the pattern",
        paragraphs: [
          "Add a clear explanation of how anxiety can show up in thoughts, emotions, physical sensations, and daily routines.",
          "This paragraph can offer reassurance and help readers feel understood without attempting to diagnose them.",
        ],
      },
      {
        heading: "Moving toward support",
        paragraphs: [
          "Add information about therapeutic support, coping strategies, and the value of seeking help at a manageable pace.",
        ],
      },
    ],
  },
  {
    slug: "understanding-depression",
    number: "03",
    category: "Depression",
    title: "Understanding depression beyond feeling low",
    excerpt:
      "Placeholder introduction for a thoughtful article about depression, its impact, and the different forms support can take.",
    readTime: "7 min read",
    sections: [
      {
        heading: "More than a difficult day",
        paragraphs: [
          "Add an accessible overview of depression and the ways it may affect energy, motivation, relationships, work, and self-perception.",
          "Use this space to acknowledge that each person experiences depression differently.",
        ],
      },
      {
        heading: "Finding a way forward",
        paragraphs: [
          "Add a balanced explanation of therapy, support networks, and small practical steps that may form part of treatment.",
        ],
      },
    ],
  },
  {
    slug: "ocd-and-intrusive-thoughts",
    number: "04",
    category: "OCD",
    title: "OCD, intrusive thoughts, and the cycle between them",
    excerpt:
      "Placeholder introduction for a clear article about OCD, intrusive thoughts, compulsions, and evidence-informed support.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Understanding the cycle",
        paragraphs: [
          "Add an approachable explanation of obsessions, compulsions, avoidance, and the distress that can accompany them.",
          "Use this paragraph to correct common misconceptions while keeping the language gentle and accessible.",
        ],
      },
      {
        heading: "How therapy may help",
        paragraphs: [
          "Add an overview of the therapeutic approach, what an initial conversation may involve, and how progress can be supported over time.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
