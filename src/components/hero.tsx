import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Inspired by Thinking, Fast and Slow
      </p>
      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Practice thinking, fast and slow.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
        See your gut answer, then your reflective one. Spot the bias in between.
        A calm sandbox for clearer decisions.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/lab">Open the Lab</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#presets">Try a preset</a>
        </Button>
      </div>
    </section>
  );
}
