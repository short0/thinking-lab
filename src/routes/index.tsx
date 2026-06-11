import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PresetCard } from "@/components/preset-card";
import { SiteHeader } from "@/components/site-header";
import { PRESETS } from "@/data/presets";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thinking Lab — Practice fast and slow thinking" },
      {
        name: "description",
        content:
          "A calm sandbox for understanding System 1 vs System 2, spotting cognitive biases, and improving everyday judgment.",
      },
      { property: "og:title", content: "Thinking Lab — Practice fast and slow thinking" },
      {
        property: "og:description",
        content:
          "A calm sandbox for understanding System 1 vs System 2, spotting cognitive biases, and improving everyday judgment.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />

        <section id="presets" className="mx-auto max-w-5xl px-4 pb-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Presets</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a scenario to launch the Lab.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRESETS.map((p) => (
              <PresetCard key={p.id} preset={p} />
            ))}
          </div>
        </section>

        <HowItWorks />

        <section className="mx-auto max-w-3xl px-4 pb-24 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Or start from a blank scenario.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Bring your own decision. The Lab works the same way.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" variant="outline">
              <Link to="/lab">Open a blank Lab</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>Thinking Lab — a learning sandbox.</span>
          <Link to="/about" className="hover:text-foreground">
            About & biases
          </Link>
        </div>
      </footer>
    </div>
  );
}
