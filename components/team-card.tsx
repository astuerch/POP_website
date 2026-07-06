import Image from "next/image";

import {Eyebrow} from "@/components/eyebrow";
import type {TeamMember} from "@/content/team";
import {Link} from "@/i18n/navigation";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.84-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="text-brand-fog hover:bg-brand-lila hover:text-brand-ink flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 transition"
    >
      {children}
    </a>
  );
}

export function TeamCard({
  member,
  variant = "full",
}: {
  member: TeamMember;
  variant?: "full" | "compact" | "detailed";
}) {
  if (variant === "detailed") {
    const displayName = member.fullName ?? member.name;

    return (
      <article className="flex flex-col items-center text-center">
        <div className="relative aspect-square w-52 max-w-full overflow-hidden rounded-full sm:w-60">
          <Image
            fill
            className="object-cover grayscale"
            src={member.roundImage ?? member.image.src}
            alt={member.image.alt}
            sizes="(max-width:640px) 60vw, 240px"
          />
        </div>
        <h3 className="font-heading text-brand-fog mt-8 text-3xl leading-none tracking-tight uppercase sm:text-4xl">
          {displayName}
        </h3>
        {member.title ? (
          <p className="text-brand-fog mt-4 text-base font-bold">{member.title}</p>
        ) : null}
        <p className="text-brand-mist mx-auto mt-4 max-w-xs text-sm leading-6">
          {member.longBio ?? member.bio}
        </p>
        {member.linkedin || member.instagram ? (
          <div className="mt-6 flex items-center gap-3">
            {member.linkedin ? (
              <SocialLink href={member.linkedin} label={`${displayName} on LinkedIn`}>
                <LinkedInIcon />
              </SocialLink>
            ) : null}
            {member.instagram ? (
              <SocialLink href={member.instagram} label={`${displayName} on Instagram`}>
                <InstagramIcon />
              </SocialLink>
            ) : null}
          </div>
        ) : null}
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <Link href="/about" className="group flex flex-col items-center text-center">
        <div className="group-hover:ring-brand-lila/60 relative aspect-square w-48 max-w-full overflow-hidden rounded-full ring-2 ring-transparent transition duration-300 sm:w-56">
          <Image
            fill
            className="object-cover grayscale transition duration-300 group-hover:grayscale-0"
            src={member.roundImage ?? member.image.src}
            alt={member.image.alt}
            sizes="(max-width:640px) 55vw, 224px"
          />
        </div>
        <h3 className="text-brand-fog mt-6 text-2xl font-bold">{member.name}</h3>
        <p className="text-brand-mist mt-2 text-base leading-6">{member.role}</p>
        {member.org ? (
          <p className="text-brand-mist text-base leading-6">{member.org}</p>
        ) : null}
      </Link>
    );
  }

  return (
    <article className="bg-brand-surface flex h-full flex-col rounded-3xl border border-white/10 p-6">
      <div className="bg-brand-lila-dark/40 relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          fill
          className="object-cover"
          src={member.image.src}
          alt={member.image.alt}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div>
          <h3 className="text-brand-fog text-xl font-bold">{member.name}</h3>
          <Eyebrow className="mt-1 text-xs">
            {member.org ? `${member.role} · ${member.org}` : member.role}
          </Eyebrow>
        </div>
        <p className="text-brand-mist text-base leading-7">{member.bio}</p>
        <p className="text-brand-fog text-sm font-medium">{member.focus}</p>
      </div>
    </article>
  );
}
