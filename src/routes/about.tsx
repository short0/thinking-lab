import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Thinking Lab" },
      {
        name: "description",
        content:
          "What System 1 and System 2 are, and the four biases Thinking Lab helps you practice spotting.",
      },
      { property: "og:title", content: "About Thinking Lab" },
      {
        property: "og:description",
        content: "System 1 vs System 2 in plain language, plus four common biases.",
      },
    ],
  }),
  component: AboutPage,
});

const BIASES = [
  {
    name: "Anchoring",
    body: "The first number you see drags every later estimate toward it, even when it's irrelevant.",
  },
  {
    name: "Availability",
    body: "Easily recalled examples feel more probable than they actually are.",
  },
  {
    name: "Framing",
    body: "The wording of a choice changes the decision, even when the outcomes are identical.",
  },
  {
    name: "Base-rate neglect",
    body: "We anchor on vivid details and ignore the underlying population rate.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About Thinking Lab
        </h1>
        <p className="mt-4 text-muted-foreground">
          A small sandbox inspired by Daniel Kahneman's{" "}
          <em>Thinking, Fast and Slow</em>. Practice noticing the gap between a
          gut reaction and a careful answer.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            System 1 vs System 2
          </h2>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">System 1</strong> is fast,
            automatic, and effortless. It's the snap judgment, the first
            instinct, the answer that arrives before you ask for it. It's right
            often enough that we trust it — and wrong often enough that it
            matters.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">System 2</strong> is slow,
            deliberate, and effortful. It checks the math, weighs the evidence,
            and considers alternatives. It's better at hard problems but it's
            lazy — most of the time, it just signs off on whatever System 1
            already decided.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Four biases to watch for
          </h2>
          <dl className="mt-4 space-y-4">
            {BIASES.map((b) => (
              <div key={b.name} className="rounded-lg border border-border p-4">
                <dt className="font-medium">{b.name}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{b.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10">
          <Link
            to="/lab"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Open the Lab →
          </Link>
        </div>
      </main>
    </div>
  );
}
