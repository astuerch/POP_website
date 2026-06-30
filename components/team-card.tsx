import Image from "next/image";

import type { TeamMember } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="border-brand-ink/10 shadow-card flex h-full flex-col rounded-[1.75rem] border bg-white p-6">
      <div className="bg-brand-sand relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        <Image
          fill
          className="object-cover"
          src={member.image.src}
          alt={member.image.alt}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div>
          <h3 className="text-brand-ink text-2xl font-semibold">
            {member.name}
          </h3>
          <p className="text-brand-coral mt-1 text-sm font-medium tracking-[0.24em] uppercase">
            {member.role}
          </p>
        </div>
        <p className="text-brand-slate text-base leading-7">{member.bio}</p>
        <p className="text-brand-ink text-sm font-medium">{member.focus}</p>
      </div>
    </article>
  );
}
