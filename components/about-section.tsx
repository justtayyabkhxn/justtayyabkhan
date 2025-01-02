import Markdown from "react-markdown";

export const Aboutsection = () => {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:text-start space-y-1">
      <h1 className="text-2xl font-bold">About</h1>
      <Markdown className="text-base max-w-full text-pretty text-muted-foreground">
      I am a passionate full-stack developer with expertise in React, Next.js, and Node.js, with a knack for creating seamless and user-friendly interfaces. I enjoy tackling challenges, learning new skills, and delivering efficient solutions through clean and optimized code.
      </Markdown>
    </div>
  );
};
