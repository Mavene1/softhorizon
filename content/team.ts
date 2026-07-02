export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  fullBio?: string;
  photo: string;
  email?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills?: string[];
  featured: boolean;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "amina-hassan",
    name: "Amina Hassan",
    role: "Co-founder & CEO",
    department: "Leadership",
    bio: "Amina leads SoftHorizon's strategy and vision, bringing 12+ years of experience shipping software for regulated industries.",
    fullBio:
      "Amina co-founded SoftHorizon in 2020 after leading engineering teams at two fintech scale-ups. She sets the company's product and delivery strategy, and still reviews architecture decisions on the projects she cares most about — public-sector platforms and payments.",
    photo: "/images/team/amina-hassan.svg",
    email: "amina@softhorizon.com",
    social: { linkedin: "https://linkedin.com/in/amina-hassan" },
    skills: ["Product strategy", "Fintech", "Client delivery"],
    featured: true,
    order: 1,
  },
  {
    slug: "brian-otieno",
    name: "Brian Otieno",
    role: "Co-founder & CTO",
    department: "Leadership",
    bio: "Brian owns SoftHorizon's technical direction, from cloud architecture to the standards every engineer works to.",
    fullBio:
      "Brian has spent his career building distributed systems at scale, and co-founded SoftHorizon to bring that rigor to client work. He leads architecture reviews, sets the engineering hiring bar, and is the escalation point for any project's hardest technical problem.",
    photo: "/images/team/brian-otieno.svg",
    email: "brian@softhorizon.com",
    social: { linkedin: "https://linkedin.com/in/brian-otieno", github: "https://github.com/brianotieno" },
    skills: ["Cloud architecture", "DevOps", "System design"],
    featured: true,
    order: 2,
  },
  {
    slug: "wanjiru-kamau",
    name: "Wanjiru Kamau",
    role: "Lead Frontend Engineer",
    department: "Engineering",
    bio: "Wanjiru leads frontend architecture across client projects, with a focus on performance and accessibility.",
    fullBio:
      "Wanjiru has shipped production React and Next.js applications for logistics, government, and fintech clients. She sets frontend conventions across SoftHorizon's engagements and mentors the rest of the frontend team.",
    photo: "/images/team/wanjiru-kamau.svg",
    social: { linkedin: "https://linkedin.com/in/wanjiru-kamau", github: "https://github.com/wanjirukamau" },
    skills: ["React", "Next.js", "TypeScript", "Accessibility"],
    featured: true,
    order: 3,
  },
  {
    slug: "david-mwangi",
    name: "David Mwangi",
    role: "Lead Backend Engineer",
    department: "Engineering",
    bio: "David designs the APIs and data systems behind SoftHorizon's platforms, with a focus on reliability at scale.",
    fullBio:
      "David has built backend systems handling hundreds of thousands of transactions a day, and brings that experience to every client integration SoftHorizon takes on. He's especially focused on API design and observability.",
    photo: "/images/team/david-mwangi.svg",
    social: { linkedin: "https://linkedin.com/in/david-mwangi", github: "https://github.com/davidmwangi" },
    skills: ["Node.js", "PostgreSQL", "API design", "Cloud infrastructure"],
    featured: true,
    order: 4,
  },
  {
    slug: "faith-njeri",
    name: "Faith Njeri",
    role: "Lead Product Designer",
    department: "Design",
    bio: "Faith leads product design across client engagements, from early discovery workshops to final UI polish.",
    fullBio:
      "Faith has designed for government, fintech, and logistics clients, translating ambiguous problems into interfaces people can actually use. She runs SoftHorizon's design system and pairs closely with engineering on every build.",
    photo: "/images/team/faith-njeri.svg",
    social: { linkedin: "https://linkedin.com/in/faith-njeri" },
    skills: ["Product design", "Design systems", "User research"],
    featured: true,
    order: 5,
  },
  {
    slug: "samuel-kiptoo",
    name: "Samuel Kiptoo",
    role: "Head of Delivery",
    department: "Operations",
    bio: "Samuel keeps every SoftHorizon engagement on time and on scope, from kickoff through launch and support.",
    fullBio:
      "Samuel has run delivery for dozens of client engagements, balancing scope, timeline, and budget without letting quality slip. He's the first point of contact for clients once a project moves from sales into build.",
    photo: "/images/team/samuel-kiptoo.svg",
    email: "samuel@softhorizon.com",
    social: { linkedin: "https://linkedin.com/in/samuel-kiptoo" },
    skills: ["Delivery management", "Client relations", "Agile process"],
    featured: false,
    order: 6,
  },
];
