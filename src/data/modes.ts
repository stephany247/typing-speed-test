export const MODE_OPTIONS = [
  { label: "Timed (15s)", mdLabel: "15s", mode: "timed", duration: 15 },
  { label: "Timed (30s)", mdLabel: "30s", mode: "timed", duration: 30 },
  { label: "Timed (60s)", mdLabel: "60s", mode: "timed", duration: 60 },
  { label: "Timed (120s)", mdLabel: "120s", mode: "timed", duration: 120 },
  { label: "Passage", mdLabel: "Passage", mode: "passage" },
] as const;