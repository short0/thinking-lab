import { Link } from "@tanstack/react-router";
import type { Preset } from "@/data/presets";

export function PresetCard({ preset }: { preset: Preset }) {
  return (
    <Link
      to="/lab"
      search={{ preset: preset.id }}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 text-left shadow-sm transition hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h3 className="text-base font-medium tracking-tight">{preset.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{preset.tagline}</p>
      <div className="mt-4 flex-1" />
      <span className="mt-4 inline-flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground">
        Launch preset →
      </span>
    </Link>
  );
}
