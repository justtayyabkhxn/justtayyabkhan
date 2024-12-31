import { DATA } from "@/data/data";
import { Badge } from "./ui/badge";

export const Skills = () => {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:text-start space-y-1">
      <h1 className="font-bold text-2xl">Skills</h1>
      <div className="gap-1">
        {DATA.skills.map((skill, key) => (
          <Badge key={key} className="rounded-md my-1 mr-1">{skill}</Badge>
        ))}
      </div>
    </div>
  );
};
