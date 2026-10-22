import Image from "next/image";
import {useLocale} from "next-intl";

import {Eyebrow} from "@/components/eyebrow";
import {InstagramIcon, LinkedInIcon} from "@/components/social-icons";
import {localized, type TeamMember} from "@/content/team";
import type {AppLocale} from "@/i18n/routing";
import {Link} from "@/i18n/navigation";

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
  // Bios, roles and titles are written in both languages in content/team.ts.
  const locale = useLocale() as AppLocale;
  const role = localized(member.role, locale);
  const org = localized(member.org, locale);
  const title = localized(member.title, locale);
  const bio = localized(member.bio, locale);
  const longBio = localized(member.longBio, locale);
  const focus = localized(member.focus, locale);

  if (variant === "detailed") {
    const displayName = member.fullName ?? member.name;

    return (
      <article className="flex flex-col items-center text-center">
        <div className="relative aspect-square w-52 max-w-full overflow-hidden rounded-full sm:w-60">
          <Image
            fill
            className="object-cover grayscale"
            src={member.roundImage ?? member.image.src}
            // Decorative: the member's name and role are rendered as adjacent
            // text, so a descriptive alt would be read out twice.
            alt=""
            sizes="(max-width:640px) 60vw, 240px"
          />
        </div>
        <h3 className="font-heading text-brand-fog mt-8 text-3xl leading-none tracking-tight uppercase sm:text-4xl">
          {displayName}
        </h3>
        {title ? (
          <p className="text-brand-fog mt-4 text-base font-bold">{title}</p>
        ) : null}
        <p className="text-brand-mist mx-auto mt-4 max-w-xs text-sm leading-6">
          {longBio ?? bio}
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
            // Decorative: name/role text sits directly below the portrait.
            alt=""
            sizes="(max-width:640px) 55vw, 224px"
          />
        </div>
        <h3 className="text-brand-fog mt-6 text-2xl font-bold">{member.name}</h3>
        <p className="text-brand-mist mt-2 text-base leading-6">{role}</p>
        {org ? (
          <p className="text-brand-mist text-base leading-6">{org}</p>
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
          // Decorative: name/role text sits directly below the portrait.
          alt=""
          sizes="(max-width:640px) 100vw, 33vw"
        />
      </div>
      <div className="mt-6 space-y-3">
        <div>
          <h3 className="text-brand-fog text-xl font-bold">{member.name}</h3>
          <Eyebrow className="mt-1 text-xs">
            {org ? `${role} · ${org}` : role}
          </Eyebrow>
        </div>
        <p className="text-brand-mist text-base leading-7">{bio}</p>
        <p className="text-brand-fog text-sm font-medium">{focus}</p>
      </div>
    </article>
  );
}
