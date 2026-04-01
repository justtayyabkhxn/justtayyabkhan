import Link from "next/link";

export const Contact = () => {
  return (
    <div className="w-full max-w-2xl py-8">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Contact</h2>
      <p className="text-sm text-muted-foreground">
        Available for freelance work.{" "}
        <Link
          target="_blank"
          href="https://api.whatsapp.com/send?phone=918279961679&text=Hey%2C%20Tayyab"
          className="text-foreground hover:underline underline-offset-2"
        >
          Say hello ↗
        </Link>
      </p>
    </div>
  );
};
