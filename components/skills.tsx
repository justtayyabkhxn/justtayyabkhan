import { DATA } from "@/data/data";
import { Badge } from "./ui/badge";
import {
  Code,
  TerminalSquare,
  Atom,
  FileCode,
  Server,
  Database,
  Box,
  Braces,
  Cog,
  GitBranch,
  Github,
  Send,
  Globe,
  Package2,
} from "lucide-react";

// Map skill names to icons
const skillIcons: Record<string, JSX.Element> = {
  "React": <Atom className="h-4 w-4 mr-1 text-orange-300" />,
  "Next.js": <TerminalSquare className="h-4 w-4 mr-1 text-orange-300" />,
  "Typescript": <FileCode className="h-4 w-4 mr-1 text-orange-300" />,
  "Node.js": <Server className="h-4 w-4 mr-1 text-orange-300" />,
  "Express": <Globe className="h-4 w-4 mr-1 text-orange-300" />,
  "MongoDb": <Database className="h-4 w-4 mr-1 text-orange-300" />,
  "Postgress": <Database className="h-4 w-4 mr-1 text-orange-300" />,
  "Docker": <Package2 className="h-4 w-4 mr-1 text-orange-300" />,
  "C++": <Cog className="h-4 w-4 mr-1 text-orange-300" />,
  "Java": <Braces className="h-4 w-4 mr-1 text-orange-300" />,
  "Python": <FileCode className="h-4 w-4 mr-1 text-orange-300" />,
  "Git": <GitBranch className="h-4 w-4 mr-1 text-orange-300" />,
  "Github": <Github className="h-4 w-4 mr-1 text-orange-300" />,
  "Prisma": <Code className="h-4 w-4 mr-1 text-orange-300" />,
  "Postman": <Send className="h-4 w-4 mr-1 text-orange-300" />,
  "websockets": <Globe className="h-4 w-4 mr-1 text-orange-300" />,
  "Shopify": <Box className="h-4 w-4 mr-1 text-orange-300" />,
  "Webflow": <Globe className="h-4 w-4 mr-1 text-orange-300" />,
  "WordPress": <Server className="h-4 w-4 mr-1 text-orange-300" />,
};


export const Skills = () => {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:text-start space-y-4">
      <h1 className="font-bold text-2xl text-gray-800 dark:text-white">Skills</h1>
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {DATA.skills.map((skill, key) => (
          <Badge
            key={key}
            className="rounded-md px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 flex items-center"
          >
            {skillIcons[skill] || <Code className="h-4 w-4 mr-1 text-orange-300" />}
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};
