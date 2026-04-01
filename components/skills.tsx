import { DATA } from "@/data/data";

export const Skills = () => {
  return (
    <div className="w-full max-w-2xl space-y-3">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Skills</h2>
      <div className="flex flex-wrap gap-1.5">
        {DATA.skills.map((skill, key) => (
          <span
            key={key}
            className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
