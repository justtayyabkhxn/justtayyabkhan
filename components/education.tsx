import { DATA } from "@/data/data";
import { HorizontalCard } from "./horizaontal-card";

export const Education = () => {
  return (
    <div className="flex flex-col gap-y-3 max-w-2xl w-full">
      <h1 className="font-bold text-2xl">Education</h1>
      <div className="space-y-1">
      {DATA.education.map((education, key) => (
        <HorizontalCard
          key={key}
          logoUrl={education.logoUrl}
          altText={education.school}
          href={education.href}
          location={education.location}
          title={education.school}
          subtitle={education.degree}
          period={`${education.start} - ${education.end}`}
        />
      ))}
      </div>
    </div>
  );
};
