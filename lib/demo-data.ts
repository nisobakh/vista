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

export const DEMO_DATA_CATERING: AnalysisData = {
  outlook: [
    {
      week: "Week 1",
      expected_in: 4200,
      expected_out: 5100,
      summary:
        "A large wedding deposit came in but food costs for two upcoming jobs hit simultaneously, creating a short-term squeeze.",
      tight: true,
    },
    {
      week: "Week 2",
      expected_in: 8500,
      expected_out: 4800,
      summary:
        "Wedding and corporate lunch payouts land this week, generating strong positive cash flow.",
      tight: false,
    },
    {
      week: "Week 3",
      expected_in: 3200,
      expected_out: 3900,
      summary:
        "A quieter booking week with only one small event. Kitchen rental and supply restocking create a modest shortfall.",
      tight: true,
    },
    {
      week: "Week 4",
      expected_in: 6800,
      expected_out: 4200,
      summary:
        "Two confirmed corporate events and a private birthday dinner make this the strongest week of the month.",
      tight: false,
    },
  ],
  insights: [
    {
      title: "Deposit timing is your cash flow",
      insight:
        "Carlos collects 50% deposits upfront but spends on food costs before the final payment arrives. This creates a predictable Week 1 squeeze before every large event.",
      suggested_action:
        "Move deposit collection to 60% upfront and require final payment 48 hours before the event instead of day-of.",
      accentColor: "warning",
    },
    {
      title: "Corporate clients are your most reliable revenue",
      insight:
        "Corporate lunch bookings pay faster, require less customization, and have a higher rebooking rate than private events.",
      suggested_action:
        "Prioritize filling corporate lunch slots before opening weekend availability. Consider a monthly retainer option for repeat clients.",
      accentColor: "success",
    },
    {
      title: "Quiet weeks are costing more than they look",
      insight:
        "Kitchen rental and insurance run every week regardless of bookings. In Week 3, fixed costs consumed 82% of revenue.",
      suggested_action:
        "Use slow weeks to pre-prep and freeze components for upcoming events rather than leaving the kitchen idle.",
      accentColor: "info",
    },
  ],
  non_obvious_observation:
    "Carlos has never had a client cancel, but his cash flow looks like a business in trouble twice a month. The problem isn't demand — it's that income and expenses land in the wrong order. Fixing payment timing would eliminate most of his financial stress without adding a single new booking.",
};