import Markdown from "react-markdown";

export const Aboutsection = () => {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:text-start space-y-1">
      <h1 className="text-2xl font-extrabold tracking-tight">About</h1>
      <Markdown className="text-base max-w-full text-pretty text-muted-foreground tracking-tight">
      I'm a creative full-stack web developer with expertise in React, Next.js, and Node.js, and a flair for building user-centric interfaces. Alongside coding scalable web apps, I also craft visually striking websites using platforms like Webflow and Shopify. I enjoy solving real-world problems, learning continuously, and delivering clean, high-performance digital solutions.
      </Markdown>
    </div>
  );
};
