export type Preset = {
  id: string;
  title: string;
  tagline: string;
  scenario: string;
  fastAnswer: string;
  slowAnswer: string;
  bias: string;
  biasExplanation: string;
  takeaway: string;
  checklist: string[];
  quickActions: string[];
};

export const PRESETS: Preset[] = [
  {
    id: "hiring",
    title: "Hiring decision",
    tagline: "A confident candidate after a strong first impression.",
    scenario:
      "You interviewed a candidate for a senior role. They were articulate, confident, and went to a prestigious school. The interview ran 25 minutes. Two reference checks are pending. Do you make an offer today?",
    fastAnswer:
      "Yes — they're clearly impressive. Move fast before a competitor grabs them. Send the offer.",
    slowAnswer:
      "Hold. A 25-minute interview and an unverified resume are weak evidence. Compare against the structured scorecard, complete references, and at least one work sample before committing salary and equity.",
    bias: "Halo effect & anchoring",
    biasExplanation:
      "One vivid trait (confidence, school name) colors judgment of unrelated traits. The first strong impression also anchors the decision, making later doubts feel like nitpicks.",
    takeaway:
      "Use the same structured rubric for every candidate. Score each dimension independently before forming an overall view.",
    checklist: [
      "Score each rubric dimension separately, then sum.",
      "Require a work sample or paid trial for senior roles.",
      "Get two reference checks before extending an offer.",
      "Have a second interviewer score independently.",
    ],
    quickActions: [
      "What if the candidate is referred by the CEO?",
      "How would a structured scorecard change this?",
      "Show me what halo effect looks like in practice.",
    ],
  },
  {
    id: "stock",
    title: "Stock pick",
    tagline: "A name you've been hearing everywhere.",
    scenario:
      "A tech stock has been in the headlines all week — strong earnings, viral product launch. Your group chat is buying. Should you put 10% of your savings in?",
    fastAnswer:
      "Yes — the momentum is real and everyone's making money. Buy now before it runs.",
    slowAnswer:
      "Probably not at 10%. Recent salience isn't an edge. By the time a stock is in your group chat, the news is already in the price. Size positions by your overall plan, not by recency.",
    bias: "Availability heuristic & recency bias",
    biasExplanation:
      "Easily recalled examples feel more probable and more profitable than they are. Recent vivid wins crowd out the base rate of stock picks that disappoint.",
    takeaway:
      "Decide position sizes in advance based on a written plan, not on what's loud this week.",
    checklist: [
      "Write your allocation rules before you look at any ticker.",
      "Ask: would I still buy this if it weren't in the news?",
      "Check the base rate — how often do hot stocks beat the index over 3 years?",
      "Cap any single position at a pre-committed % of net worth.",
    ],
    quickActions: [
      "What's the base rate for hot stocks?",
      "How do I write an allocation plan?",
      "Compare this to indexing.",
    ],
  },
  {
    id: "deadline",
    title: "Project deadline estimate",
    tagline: "How long will this really take?",
    scenario:
      "Your team is scoping a new feature. Everyone agrees it's straightforward. The lead engineer says 'two weeks, easy.' Do you commit to that date with the customer?",
    fastAnswer:
      "Sure — the team is confident. Commit to two weeks and start delivery.",
    slowAnswer:
      "No. Look at the last five comparable projects. The team's typical overrun is ~60%. Quote a realistic range (3–5 weeks) and communicate the uncertainty rather than a false-precision date.",
    bias: "Planning fallacy",
    biasExplanation:
      "People imagine the best-case path and ignore the base rate of similar past projects (the 'outside view'). Single-point estimates feel decisive but are routinely wrong.",
    takeaway:
      "Estimate from history, not from imagination. Quote ranges, not points.",
    checklist: [
      "List the last 3–5 comparable projects and their actual duration.",
      "Multiply the inside-view estimate by your historical overrun ratio.",
      "Communicate a range to stakeholders, not a single date.",
      "Identify the top 2 risks and what would trigger a re-estimate.",
    ],
    quickActions: [
      "Show me a reference-class forecast.",
      "How do I quote a range without losing credibility?",
      "What's our historical overrun ratio?",
    ],
  },
  {
    id: "baserate",
    title: "Probability puzzle",
    tagline: "A classic base-rate test.",
    scenario:
      "A medical test is 95% accurate. The disease affects 1 in 1,000 people. A random person tests positive. What's the chance they actually have the disease?",
    fastAnswer: "About 95% — the test is 95% accurate.",
    slowAnswer:
      "Around 2%. Out of 1,000 people: 1 truly sick (likely positive) and ~50 healthy false positives. So 1 of ~51 positives is actually sick — roughly 2%, not 95%.",
    bias: "Base-rate neglect & representativeness",
    biasExplanation:
      "We anchor on the vivid number (95% accuracy) and ignore the underlying base rate (1 in 1,000). The result feels representative of the test, not the population.",
    takeaway:
      "Always ask: what's the base rate? Then use natural frequencies, not percentages, to reason about it.",
    checklist: [
      "State the base rate before reading the test result.",
      "Reframe percentages as counts (out of 1,000 people…).",
      "Separate sensitivity, specificity, and prevalence.",
      "Confirm with a second independent test before acting.",
    ],
    quickActions: [
      "Walk me through the math step by step.",
      "What if the disease affects 1 in 100?",
      "Why do natural frequencies help?",
    ],
  },
];

export const getPreset = (id: string | null | undefined): Preset | undefined =>
  PRESETS.find((p) => p.id === id);
