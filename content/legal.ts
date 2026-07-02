export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const legalDocuments: {
  privacy: LegalDocument;
  terms: LegalDocument;
  security: LegalDocument;
} = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2026-06-01",
    intro:
      "This policy explains what information SoftHorizon Ltd (\"SoftHorizon\", \"we\", \"us\") collects when you use our website or engage us for work, and how we use it.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "When you fill out our contact, careers, or partner forms, we collect the information you submit directly — name, email address, company, and the contents of your message.",
          "We also collect standard analytics data (pages visited, device type, approximate location) via privacy-first analytics tooling. We do not sell this data to third parties.",
        ],
      },
      {
        heading: "How we use information",
        body: [
          "We use the information you submit to respond to your inquiry, evaluate a job or partner application, or deliver a service you've requested.",
          "Analytics data is used in aggregate to understand how visitors use the site and to improve it — we do not use it to identify individuals.",
        ],
      },
      {
        heading: "Cookies & analytics",
        body: [
          "We use a small number of cookies and similar technologies for essential site functionality (such as remembering your theme preference) and privacy-first analytics.",
          "You can disable cookies in your browser settings; core site functionality will still work, though preferences like dark mode may not persist.",
        ],
      },
      {
        heading: "Data sharing",
        body: [
          "We do not sell personal information. We share information only with service providers who help us operate the site and respond to inquiries (for example, our email delivery provider), and only to the extent necessary for them to perform that function.",
        ],
      },
      {
        heading: "Data retention",
        body: [
          "We retain form submissions for as long as necessary to respond to your inquiry or maintain a business relationship, and delete them on request.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can request access to, correction of, or deletion of any personal information we hold about you by emailing us at the address below.",
        ],
      },
      {
        heading: "Contact us",
        body: ["Questions about this policy can be sent to hello@softhorizon.com."],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "2026-06-01",
    intro:
      "These terms govern your use of the SoftHorizon website and, where applicable, our provision of services under a separate signed statement of work.",
    sections: [
      {
        heading: "Acceptance of terms",
        body: [
          "By using this website, you agree to these terms. If you don't agree, please don't use the site.",
        ],
      },
      {
        heading: "Use of the site",
        body: [
          "This site and its content are provided for informational purposes. You may not copy, resell, or misrepresent our content as your own, or use the site in a way that could disable, overburden, or impair it.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this site — including copy, design, and code — is the property of SoftHorizon Ltd unless otherwise noted, and may not be reproduced without permission.",
        ],
      },
      {
        heading: "Client engagements",
        body: [
          "Any actual engagement for services (scope, pricing, deliverables, timelines) is governed by a separate, signed statement of work — not by these website terms.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "This website and its content are provided \"as is\" without warranties of any kind. SoftHorizon is not liable for any damages arising from your use of the site.",
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of Kenya."],
      },
      {
        heading: "Changes to these terms",
        body: [
          "We may update these terms from time to time. The \"last updated\" date at the top of this page reflects the most recent revision.",
        ],
      },
    ],
  },
  security: {
    title: "Security & Compliance",
    lastUpdated: "2026-06-01",
    intro:
      "We take the security of client data and our own systems seriously, both in how we operate this website and in how we build software for clients.",
    sections: [
      {
        heading: "Our approach",
        body: [
          "Security is considered from the start of every engagement, not bolted on at the end — from infrastructure design through to code review and deployment.",
        ],
      },
      {
        heading: "Infrastructure & hosting",
        body: [
          "This website is hosted on infrastructure with built-in DDoS protection, automatic TLS, and a global CDN. Client projects are typically deployed on major cloud providers (AWS, GCP, or Vercel) following each provider's security best practices.",
        ],
      },
      {
        heading: "Data encryption",
        body: [
          "Data is encrypted in transit (TLS) across all sites and applications we build. Encryption at rest is applied to sensitive data stores on client projects.",
        ],
      },
      {
        heading: "Access controls",
        body: [
          "Access to client systems and credentials is limited to engineers actively working on that engagement, and revoked promptly when an engagement ends or a team member departs.",
        ],
      },
      {
        heading: "Vulnerability disclosure",
        body: [
          "If you've found a security issue with this website, please email security@softhorizon.com with details. We aim to acknowledge reports within two business days.",
        ],
      },
      {
        heading: "Compliance",
        body: [
          "For client engagements with specific compliance requirements (data residency, sector-specific regulation, etc.), we scope those requirements during discovery and build to meet them.",
        ],
      },
    ],
  },
};
