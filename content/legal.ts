export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  summary: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy & Cookie Policy",
  summary:
    "POP Impact Lab is committed to protecting your privacy. This policy explains how we collect and use personal data, and how we use cookies and similar technologies on this website. It applies to all visitors of popimpactlab.com and is written in compliance with the Swiss Federal Act on Data Protection (nFADP) and the Telecommunications Act (TCA).",
  sections: [
    {
      heading: "1. Privacy — Who we are",
      paragraphs: [
        "POP Impact Lab is a public engagement initiative based in Zürich, Switzerland. We organise science events that bring cutting-edge research into public spaces. For any questions about this policy or your personal data, you can contact us at: popimpactlab@gmail.com",
      ],
    },
    {
      heading: "What data we collect",
      paragraphs: [
        "We only collect personal data that is necessary for the purposes described in this policy. This may include:",
        "We do not collect sensitive personal data (e.g. health, political opinions, or financial information) unless explicitly required and consented to for a specific event.",
      ],
      bullets: [
        "Contact details: name and email address you provide voluntarily through contact forms, newsletter sign-ups or event registrations.",
        "Event registration data: responses to registration forms when you sign up for a POP event (e.g. dietary preferences or accessibility needs).",
        "Technical data: browser type, device information, IP address and pages visited, collected automatically when you use our website.",
        "Analytics data: anonymised information about how visitors interact with the website, used to improve its content and usability.",
      ],
    },
    {
      heading: "How we use your data",
      paragraphs: [
        "We use the information collected to:",
        "We do not sell, rent or share your personal data with third parties for commercial purposes.",
      ],
      bullets: [
        "respond to your messages or enquiries",
        "manage event registrations and send event-related communications",
        "send newsletters or updates if you have subscribed",
        "improve the website and understand how it is used",
        "comply with legal obligations",
      ],
    },
    {
      heading: "Legal basis for processing",
      paragraphs: [
        "Under the Swiss nFADP, we process your personal data on the following legal bases:",
      ],
      bullets: [
        "Consent: for newsletter subscriptions and non-essential cookies.",
        "Contractual necessity: to manage your event registration and fulfil our commitments to you.",
        "Legitimate interest: for basic website analytics and security, where your rights are not overridden.",
      ],
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We retain your personal data only for as long as necessary for the purposes described above, or as required by law. Newsletter subscriber data is kept until you unsubscribe. Event registration data is retained for up to 2 years after the event.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Under Swiss data protection law, you have the right to:",
        "To exercise any of these rights, please contact us at the email address above. We will respond within 30 days.",
      ],
      bullets: [
        "access the personal data we hold about you",
        "request correction of inaccurate data",
        "request deletion of your data",
        "withdraw consent at any time (e.g. unsubscribe from our newsletter)",
        "object to certain types of processing",
      ],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "Our website is built on Wix (wix.com), which may process technical data on our behalf. We may also use services such as email marketing tools. These third parties act as data processors and are bound by appropriate data protection agreements. We do not use advertising networks or share your data for targeted advertising purposes.",
      ],
    },
    {
      heading: "2. Cookies — What are cookies",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help websites recognise returning visitors, remember preferences and understand how the site is used. Similar technologies (such as pixels or local storage) may also be used for the same purposes.",
      ],
    },
    {
      heading: "What cookies we use",
      paragraphs: [
        "We use the following categories of cookies:",
        "We do not use advertising cookies, cross-site tracking cookies, or cookies that build detailed personal profiles.",
      ],
      bullets: [
        "Strictly necessary: essential for the website to function correctly (e.g. security, session management, load balancing). These do not require your consent.",
        "Analytics & performance: used to understand how visitors interact with the website (e.g. which pages are visited most). This data is anonymised or aggregated where possible. These are set by Wix's built-in analytics.",
      ],
    },
    {
      heading: "Your cookie choices",
      paragraphs: [
        "In line with Swiss cookie guidelines (FDPIC, updated October 2025), you have the right to opt out of non-essential cookies. You can manage your preferences in the following ways:",
        "Learn more about cookies at: www.allaboutcookies.org",
      ],
      bullets: [
        "Cookie banner: when you first visit the site, you will be shown a cookie notice with the option to accept or decline non-essential cookies.",
        "Browser settings: most browsers allow you to block or delete cookies through their settings. Note that disabling all cookies may affect how parts of the website function.",
      ],
    },
    {
      heading: "Updates to this policy",
      paragraphs: [
        "We may update this Privacy & Cookie Policy from time to time to reflect changes to the website, our practices, or applicable regulations. The date at the top of this page indicates when it was last revised. We encourage you to review it periodically.",
      ],
    },
  ],
};

export const termsConditions: LegalDocument = {
  title: "Terms & Conditions",
  summary:
    "This website is currently under development. The information provided is for general informational purposes only and may change as the project evolves.",
  sections: [
    {
      heading: "Website status",
      paragraphs: [
        "This website is currently under development.",
        "The information provided is for general informational purposes only and may change as the project evolves.",
      ],
    },
    {
      heading: "Ownership of content",
      paragraphs: [
        "All content, including text, images, and design elements, belongs to POP Impact Lab unless otherwise stated and may not be reproduced without permission.",
      ],
    },
    {
      heading: "Use of the website",
      paragraphs: [
        "By using this website, you agree that POP Impact Lab cannot be held responsible for any inaccuracies, omissions, or changes to the information provided.",
      ],
    },
    {
      heading: "Further information",
      paragraphs: [
        "Further legal information, including full terms and privacy policies, will be published as the platform develops.",
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  title: "Refund Policy",
  summary:
    "POP Impact Lab organises public science events in Zürich. This policy outlines the conditions under which refunds are available for ticketed events. Free events do not require registration cancellation unless otherwise stated.",
  sections: [
    {
      heading: "Free Events",
      paragraphs: [
        "Some POP Impact Lab events are free of charge. No payment is required, and therefore no refund applies. If you can no longer attend, we kindly ask that you cancel your registration so your spot can be offered to others on the waitlist.",
      ],
    },
    {
      heading: "Ticketed Events",
      paragraphs: [
        "For events that require a paid ticket, the following refund conditions apply:",
        "Refund requests must be submitted in writing to our contact email before the applicable deadline.",
      ],
      bullets: [
        "More than 7 days before the event: Full refund available upon request.",
        "Between 3 and 7 days before the event: 50% refund available upon request.",
        "Less than 3 days before the event: No refund available, except in exceptional circumstances (see Section \"Exceptional Circumstances\").",
      ],
    },
    {
      heading: "Event Cancellation or Rescheduling by POP Impact Lab",
      paragraphs: [
        "If POP Impact Lab cancels an event, all ticket holders will receive a full refund automatically.",
        "If an event is rescheduled, ticket holders will be notified and may choose to keep their ticket for the new date or request a full refund within 7 days of the rescheduling announcement.",
      ],
    },
    {
      heading: "Exceptional Circumstances",
      paragraphs: [
        "We understand that unexpected situations arise. If you are unable to attend due to illness, emergency, or other exceptional circumstances, please contact us as soon as possible. We will review requests on a case-by-case basis and do our best to find a fair solution.",
      ],
    },
    {
      heading: "How to Request a Refund",
      paragraphs: [
        "To request a refund, please contact us at: popimpactlab@gmail.com",
      ],
    },
  ],
};

export const imprint: LegalDocument = {
  title: "Imprint",
  summary: "POP Impact Lab\nZurich, Switzerland",
  sections: [
    {
      heading: "About POP Impact Lab",
      paragraphs: [
        "POP Impact Lab is an independent initiative connecting science, culture and society through events, conversations and creative formats.",
        "Contact: popimpactlab@gmail.com",
        "Responsible for website content: POP Impact Lab",
      ],
    },
    {
      heading: "Copyright",
      paragraphs: [
        "All content on this website, including text, images and design elements, is protected by copyright unless stated otherwise.",
        "If you believe any content on this website infringes your rights, please contact us and we will review the request.",
      ],
    },
  ],
};
