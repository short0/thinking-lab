const STEPS = [
  { n: "01", title: "Answer fast", body: "Capture your gut response in one line." },
  { n: "02", title: "Reflect slowly", body: "Slow down. Write the careful answer." },
  { n: "03", title: "Reveal the bias", body: "See the heuristic shaping the gap." },
  { n: "04", title: "Improve judgment", body: "Walk away with a debiasing checklist." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Four steps. Less than a minute per scenario.
        </p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="text-xs font-medium text-muted-foreground">{s.n}</div>
            <div className="mt-2 text-base font-medium tracking-tight">
              {s.title}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
