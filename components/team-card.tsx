import Image from "next/image";

import {Eyebrow} from "@/components/eyebrow";
import type {TeamMember} from "@/content/team";
import {Link} from "@/i18n/navigation";

export function TeamCard({
  member,
  variant = "full",
}: {
  member: TeamMember;
  variant?: "full" | "compact";
}) {
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
