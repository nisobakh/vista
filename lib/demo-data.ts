export type AnalysisData = {
  outlook: {
    week: string;
    expected_in: number;
    expected_out: number;
    summary: string;
    tight: boolean;
  }[];
  insights: {
    title: string;
    insight: string;
    suggested_action: string;
    accentColor: "success" | "warning" | "info";
  }[];
  non_obvious_observation: string;
};

export const DEMO_DATA: AnalysisData = {
  outlook: [
    {
      week: "Week 1",
      expected_in: 6200,
      expected_out: 4850,
      summary:
        "Catering for two office lunches boosts early-week cash flow and offsets fuel costs.",
      tight: false,
    },
    {
      week: "Week 2",
      expected_in: 5400,
      expected_out: 5725,
      summary:
        "A slower mid-month foot-traffic week plus a tortilla supplier payment creates a small shortfall.",
      tight: true,
    },
    {
      week: "Week 3",
      expected_in: 7100,
      expected_out: 4980,
      summary:
        "Festival weekend and recurring corporate order generate a healthy surplus.",
      tight: false,
    },
    {
      week: "Week 4",
      expected_in: 5600,
      expected_out: 5300,
      summary:
        "Stable daily sales cover payroll and prep restocking with a modest buffer.",
      tight: false,
    },
  ],
  insights: [
    {
      title: "Week 2 cash pinch",
      insight:
        "Maria's Tacos is likely to run about $325 short in Week 2 when supplier terms and lower weekday sales overlap.",
      suggested_action:
        "Shift the tortilla invoice by 7 days or run a Tuesday lunch combo promo to close the gap.",
      accentColor: "warning",
    },
    {
      title: "Catering is your margin engine",
      insight:
        "Catering days produce roughly 2.1x the net cash of regular street-service days.",
      suggested_action:
        "Reserve at least one recurring office catering slot each week before opening public service windows.",
      accentColor: "success",
    },
    {
      title: "Fuel costs are creeping up",
      insight:
        "Fuel spend has climbed for three straight weeks and now averages 11% of weekly operating outflows.",
      suggested_action:
        "Cluster stop locations by neighborhood on low-demand days to reduce total driving miles.",
      accentColor: "info",
    },
  ],
  non_obvious_observation:
    "Most of Maria's cash volatility comes from payment timing, not weak demand. Moving one major supplier payment out of Week 2 would smooth nearly the entire month.",
};
