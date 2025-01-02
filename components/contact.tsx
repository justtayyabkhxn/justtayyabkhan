import Link from "next/link";

export const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-16">
      <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-bold">
        Contact
      </div>
      <h1 className="text-3xl font-bold sm:text-5xl">Get in Touch</h1>
      <p className="text-center text-muted-foreground max-w-[500px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Text me {" "}
        <Link target="_blank" href={"https://api.whatsapp.com/send?phone=918279961679&text=Hey%2C%20Tayyab"} className="text-blue-400">
          [Here]
        </Link>{" "}
        and I will respond with in no time.
      </p>
    </div>
  );
};
