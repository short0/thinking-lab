import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-foreground"
          />
          Thinking Lab
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/lab"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Lab
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
