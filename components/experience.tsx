import { DATA } from "@/data/data";
import { HorizontalCard } from "./horizaontal-card";

export const Experience = () => {
  return (
    <div className="flex flex-col gap-y-3 max-w-2xl w-full">
      <h1 className="font-bold text-2xl">Professional Experience</h1>
      <div className="space-y-1">
      {DATA.experience.map((experience, key) => (
        <HorizontalCard
          key={key}
          logoUrl={experience.logoUrl}
          altText={experience.company}
          href={experience.href}
          location={experience.location}
          title={experience.company}
          subtitle={experience.role}
          period={`${experience.start} - ${experience.end}`}
        />
      ))}
      </div>
    </div>
  );
};
