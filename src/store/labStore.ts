import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRESETS, type Preset } from "@/data/presets";

export type Mode = "mocked" | "live";

export type LabState = {
  presetId: string | null;
  scenario: string;
  userFast: string;
  userSlow: string;
  revealedFast: boolean;
  revealedSlow: boolean;
  revealedBias: boolean;
  mode: Mode;
  notes: string;
  recent: string[]; // recent scenario strings
};

const INITIAL: LabState = {
  presetId: null,
  scenario: "",
  userFast: "",
  userSlow: "",
  revealedFast: false,
  revealedSlow: false,
  revealedBias: false,
  mode: "mocked",
  notes: "",
  recent: [],
};

type Store = {
  past: LabState[];
  present: LabState;
  future: LabState[];
  // actions
  apply: (next: Partial<LabState>) => void;
  selectPreset: (preset: Preset) => void;
  setScenario: (s: string) => void;
  setUserFast: (s: string) => void;
  setUserSlow: (s: string) => void;
  reveal: (k: "revealedFast" | "revealedSlow" | "revealedBias") => void;
  setMode: (m: Mode) => void;
  setNotes: (s: string) => void;
  clearSession: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
};

const HISTORY_LIMIT = 50;

function pushHistory(state: Store, next: LabState): Partial<Store> {
  const past = [...state.past, state.present].slice(-HISTORY_LIMIT);
  return { past, present: next, future: [] };
}

export const useLabStore = create<Store>()(
  persist(
    (set, get) => ({
      past: [],
      present: INITIAL,
      future: [],

      apply: (next) =>
        set((s) => pushHistory(s, { ...s.present, ...next })),

      selectPreset: (preset) =>
        set((s) => {
          const next: LabState = {
            ...s.present,
            presetId: preset.id,
            scenario: preset.scenario,
            userFast: "",
            userSlow: "",
            revealedFast: false,
            revealedSlow: false,
            revealedBias: false,
            recent: [
              preset.scenario,
              ...s.present.recent.filter((r) => r !== preset.scenario),
            ].slice(0, 8),
          };
          return pushHistory(s, next);
        }),

      setScenario: (scenario) =>
        set((s) => pushHistory(s, { ...s.present, scenario })),
      setUserFast: (userFast) =>
        set((s) => pushHistory(s, { ...s.present, userFast })),
      setUserSlow: (userSlow) =>
        set((s) => pushHistory(s, { ...s.present, userSlow })),
      reveal: (k) =>
        set((s) => pushHistory(s, { ...s.present, [k]: true })),
      setMode: (mode) =>
        set((s) => pushHistory(s, { ...s.present, mode })),
      setNotes: (notes) =>
        set((s) => pushHistory(s, { ...s.present, notes })),
      clearSession: () =>
        set((s) =>
          pushHistory(s, {
            ...INITIAL,
            mode: s.present.mode,
            recent: s.present.recent,
          }),
        ),

      undo: () =>
        set((s) => {
          if (s.past.length === 0) return s;
          const previous = s.past[s.past.length - 1];
          const past = s.past.slice(0, -1);
          return { past, present: previous, future: [s.present, ...s.future] };
        }),
      redo: () =>
        set((s) => {
          if (s.future.length === 0) return s;
          const next = s.future[0];
          const future = s.future.slice(1);
          return { past: [...s.past, s.present], present: next, future };
        }),
      canUndo: () => get().past.length > 0,
      canRedo: () => get().future.length > 0,
    }),
    {
      name: "thinking-lab-v1",
      partialize: (s) => ({ present: s.present }),
    },
  ),
);

// helper for components
export const usePreset = () => {
  const presetId = useLabStore((s) => s.present.presetId);
  return PRESETS.find((p) => p.id === presetId);
};
