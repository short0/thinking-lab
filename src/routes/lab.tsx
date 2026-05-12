import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Undo2, Redo2, RotateCcw, Sparkles, Zap, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PRESETS, getPreset } from "@/data/presets";
import { useLabStore, usePreset } from "@/store/labStore";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  preset: z.string().optional(),
});

export const Route = createFileRoute("/lab")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Lab — Thinking Lab" },
      {
        name: "description",
        content:
          "Run scenarios through fast and slow thinking. Capture both answers, reveal the bias, see the debiased takeaway.",
      },
      { property: "og:title", content: "Thinking Lab — Lab" },
      {
        property: "og:description",
        content: "Capture a fast and a slow answer. Spot the bias. Improve.",
      },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const present = useLabStore((s) => s.present);
  const selectPreset = useLabStore((s) => s.selectPreset);
  const setScenario = useLabStore((s) => s.setScenario);
  const setUserFast = useLabStore((s) => s.setUserFast);
  const setUserSlow = useLabStore((s) => s.setUserSlow);
  const reveal = useLabStore((s) => s.reveal);
  const setMode = useLabStore((s) => s.setMode);
  const clearSession = useLabStore((s) => s.clearSession);
  const undo = useLabStore((s) => s.undo);
  const redo = useLabStore((s) => s.redo);
  const past = useLabStore((s) => s.past);
  const future = useLabStore((s) => s.future);

  const preset = usePreset();

  // load preset from URL search param once
  useEffect(() => {
    if (search.preset && search.preset !== present.presetId) {
      const p = getPreset(search.preset);
      if (p) selectPreset(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.preset]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* sticky toolbar */}
      <div className="sticky top-14 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <ModeBadge mode={present.mode} />
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={undo}
              disabled={past.length === 0}
              aria-label="Undo"
            >
              <Undo2 /> <span className="hidden sm:inline">Undo</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={redo}
              disabled={future.length === 0}
              aria-label="Redo"
            >
              <Redo2 /> <span className="hidden sm:inline">Redo</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                clearSession();
                navigate({ to: "/" });
              }}
              aria-label="Reset to home"
            >
              <RotateCcw /> <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        {/* Left panel */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Panel title="Presets">
            <ul className="space-y-1">
              {PRESETS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => selectPreset(p)}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition",
                      present.presetId === p.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/60",
                    )}
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Scenario">
            <Textarea
              value={present.scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Describe a decision you're weighing…"
              className="min-h-[110px] resize-none text-sm"
            />
          </Panel>

          <Panel title="Mode">
            <div className="grid grid-cols-2 gap-2">
              <ModeButton
                active={present.mode === "mocked"}
                onClick={() => setMode("mocked")}
              >
                <Sparkles className="h-4 w-4" /> Mocked
              </ModeButton>
              <ModeButton
                active={present.mode === "live"}
                onClick={() => setMode("live")}
              >
                <Zap className="h-4 w-4" /> Live
              </ModeButton>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {present.mode === "mocked"
                ? "Curated answers. Works offline."
                : "Live mode is an advanced preview. Mocked content is shown as a fallback."}
            </p>
          </Panel>
        </aside>

        {/* Center */}
        <section className="space-y-6">
          {/* Scenario card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <Label>Scenario</Label>
            <p className="mt-2 text-base leading-relaxed">
              {present.scenario || (
                <span className="text-muted-foreground">
                  Pick a preset or write your own scenario on the left.
                </span>
              )}
            </p>
          </div>

          {/* Step 1: fast */}
          <AnswerStep
            label="Your fast answer"
            hint="One line. Don't think — write the gut reaction."
            value={present.userFast}
            onChange={setUserFast}
            revealed={present.revealedFast}
            revealedContent={preset?.fastAnswer}
            onReveal={() => reveal("revealedFast")}
            revealLabel="Reveal mocked fast answer"
            disabled={!preset}
          />

          {/* Step 2: slow */}
          <AnswerStep
            label="Your slow answer"
            hint="Now slow down. What changes when you think it through?"
            value={present.userSlow}
            onChange={setUserSlow}
            revealed={present.revealedSlow}
            revealedContent={preset?.slowAnswer}
            onReveal={() => reveal("revealedSlow")}
            revealLabel="Reveal mocked slow answer"
            disabled={!preset}
          />

          {/* Step 3: bias */}
          {preset && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <Label>Bias</Label>
              {present.revealedBias ? (
                <div className="mt-2 space-y-2">
                  <div className="text-base font-medium tracking-tight">
                    {preset.bias}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {preset.biasExplanation}
                  </p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => reveal("revealedBias")}
                >
                  Reveal the bias
                </Button>
              )}
            </div>
          )}

          {/* Compare */}
          {preset && present.revealedFast && present.revealedSlow && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <Label>Fast vs slow</Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/60 p-3">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Fast
                  </div>
                  <p className="mt-2 text-sm">{preset.fastAnswer}</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Slow
                  </div>
                  <p className="mt-2 text-sm">{preset.slowAnswer}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right */}
        <aside className="space-y-6">
          <Panel title="Takeaway">
            {preset ? (
              <p className="text-sm leading-relaxed">{preset.takeaway}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Pick a preset to see the debiased takeaway.
              </p>
            )}
          </Panel>

          {preset && (
            <Panel title="Debiasing checklist">
              <ul className="space-y-2 text-sm">
                {preset.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {preset && (
            <Panel title="Quick prompts">
              <ul className="space-y-1.5 text-sm">
                {preset.quickActions.map((a, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setScenario(`${present.scenario}\n\n${a}`)}
                      className="w-full rounded-md border border-border/60 px-3 py-2 text-left text-xs text-muted-foreground transition hover:border-border hover:text-foreground"
                    >
                      {a}
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {preset && present.revealedBias && (
            <Panel title="What changed">
              <p className="text-sm text-muted-foreground">
                <BookOpen className="mr-1 inline h-3.5 w-3.5" />
                Slow thinking added context that fast thinking skipped: base
                rates, comparable history, or a structured rubric. The bias{" "}
                <strong className="text-foreground">{preset.bias}</strong> made
                the gap feel invisible.
              </p>
            </Panel>
          )}
        </aside>
      </main>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <Label>{title}</Label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </div>
  );
}

function ModeBadge({ mode }: { mode: "mocked" | "live" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        mode === "mocked"
          ? "border-border bg-secondary text-secondary-foreground"
          : "border-foreground/20 bg-foreground text-background",
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          mode === "mocked" ? "bg-foreground/40" : "bg-background",
        )}
      />
      {mode === "mocked" ? "Mocked mode" : "Live mode"}
    </span>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm transition",
        active
          ? "border-foreground/20 bg-foreground text-background"
          : "border-border bg-background hover:bg-accent",
      )}
    >
      {children}
    </button>
  );
}

function AnswerStep({
  label,
  hint,
  value,
  onChange,
  revealed,
  revealedContent,
  onReveal,
  revealLabel,
  disabled,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  revealed: boolean;
  revealedContent?: string;
  onReveal: () => void;
  revealLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <Label>{label}</Label>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer…"
        className="mt-3 min-h-[80px] resize-none text-sm"
      />
      <div className="mt-3">
        {revealed && revealedContent ? (
          <div className="rounded-lg border border-border/60 bg-secondary/40 p-3">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Reference answer
            </div>
            <p className="mt-2 text-sm">{revealedContent}</p>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onReveal}
            disabled={disabled}
          >
            {revealLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
