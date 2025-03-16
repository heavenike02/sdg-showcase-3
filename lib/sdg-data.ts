// SDG Target interface
export interface SdgTarget {
  id: string;
  name: string;
  url: string;
}

// SDG Goal interface
export interface SdgGoal {
  id: number;
  name: string;
  color: string;
  url: string;
  targets: SdgTarget[];
}

// SDG data with official colors, descriptions and targets (subsections)
export const sdgGoals: SdgGoal[] = [
  {
    id: 1,
    name: "No Poverty",
    color: "#E5243B",
    url: "https://sdgs.un.org/goals/goal1",
    targets: [
      { id: "1.1", name: "Eradicate extreme poverty", url: "https://sdgs.un.org/goals/goal1#targets" },
      { id: "1.2", name: "Reduce poverty by at least 50%", url: "https://sdgs.un.org/goals/goal1#targets" },
      { id: "1.3", name: "Implement social protection systems", url: "https://sdgs.un.org/goals/goal1#targets" },
      { id: "1.4", name: "Equal rights to ownership, basic services", url: "https://sdgs.un.org/goals/goal1#targets" },
      { id: "1.5", name: "Build resilience to environmental threats", url: "https://sdgs.un.org/goals/goal1#targets" },
    ],
  },
  {
    id: 2,
    name: "Zero Hunger",
    color: "#DDA63A",
    url: "https://sdgs.un.org/goals/goal2",
    targets: [
      { id: "2.1", name: "Universal access to safe food", url: "https://sdgs.un.org/goals/goal2#targets" },
      { id: "2.2", name: "End all forms of malnutrition", url: "https://sdgs.un.org/goals/goal2#targets" },
      { id: "2.3", name: "Double agricultural productivity", url: "https://sdgs.un.org/goals/goal2#targets" },
      { id: "2.4", name: "Sustainable food production", url: "https://sdgs.un.org/goals/goal2#targets" },
      { id: "2.5", name: "Maintain genetic diversity in food", url: "https://sdgs.un.org/goals/goal2#targets" },
    ],
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    color: "#4C9F38",
    url: "https://sdgs.un.org/goals/goal3",
    targets: [
      { id: "3.1", name: "Reduce maternal mortality", url: "https://sdgs.un.org/goals/goal3#targets" },
      {
        id: "3.2",
        name: "End preventable deaths under 5 years of age",
        url: "https://sdgs.un.org/goals/goal3#targets",
      },
      { id: "3.3", name: "Fight communicable diseases", url: "https://sdgs.un.org/goals/goal3#targets" },
      {
        id: "3.4",
        name: "Reduce mortality from non-communicable diseases",
        url: "https://sdgs.un.org/goals/goal3#targets",
      },
      { id: "3.5", name: "Prevent and treat substance abuse", url: "https://sdgs.un.org/goals/goal3#targets" },
    ],
  },
  {
    id: 4,
    name: "Quality Education",
    color: "#C5192D",
    url: "https://sdgs.un.org/goals/goal4",
    targets: [
      { id: "4.1", name: "Free primary and secondary education", url: "https://sdgs.un.org/goals/goal4#targets" },
      {
        id: "4.2",
        name: "Equal access to quality pre-primary education",
        url: "https://sdgs.un.org/goals/goal4#targets",
      },
      {
        id: "4.3",
        name: "Equal access to affordable technical education",
        url: "https://sdgs.un.org/goals/goal4#targets",
      },
      {
        id: "4.4",
        name: "Increase the number of people with relevant skills",
        url: "https://sdgs.un.org/goals/goal4#targets",
      },
      { id: "4.5", name: "Eliminate all discrimination in education", url: "https://sdgs.un.org/goals/goal4#targets" },
    ],
  },
  {
    id: 5,
    name: "Gender Equality",
    color: "#FF3A21",
    url: "https://sdgs.un.org/goals/goal5",
    targets: [
      { id: "5.1", name: "End discrimination against women", url: "https://sdgs.un.org/goals/goal5#targets" },
      { id: "5.2", name: "End all violence against women", url: "https://sdgs.un.org/goals/goal5#targets" },
      {
        id: "5.3",
        name: "Eliminate forced marriages and genital mutilation",
        url: "https://sdgs.un.org/goals/goal5#targets",
      },
      {
        id: "5.4",
        name: "Value unpaid care and promote shared responsibility",
        url: "https://sdgs.un.org/goals/goal5#targets",
      },
      {
        id: "5.5",
        name: "Ensure full participation in leadership and decision-making",
        url: "https://sdgs.un.org/goals/goal5#targets",
      },
    ],
  },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    color: "#26BDE2",
    url: "https://sdgs.un.org/goals/goal6",
    targets: [
      { id: "6.1", name: "Safe and affordable drinking water", url: "https://sdgs.un.org/goals/goal6#targets" },
      {
        id: "6.2",
        name: "End open defecation and provide access to sanitation",
        url: "https://sdgs.un.org/goals/goal6#targets",
      },
      {
        id: "6.3",
        name: "Improve water quality, wastewater treatment",
        url: "https://sdgs.un.org/goals/goal6#targets",
      },
      { id: "6.4", name: "Increase water-use efficiency", url: "https://sdgs.un.org/goals/goal6#targets" },
      {
        id: "6.5",
        name: "Implement integrated water resources management",
        url: "https://sdgs.un.org/goals/goal6#targets",
      },
    ],
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    color: "#FCC30B",
    url: "https://sdgs.un.org/goals/goal7",
    targets: [
      { id: "7.1", name: "Universal access to modern energy", url: "https://sdgs.un.org/goals/goal7#targets" },
      {
        id: "7.2",
        name: "Increase global percentage of renewable energy",
        url: "https://sdgs.un.org/goals/goal7#targets",
      },
      {
        id: "7.3",
        name: "Double the improvement in energy efficiency",
        url: "https://sdgs.un.org/goals/goal7#targets",
      },
      {
        id: "7.A",
        name: "Promote access to research, technology and investments",
        url: "https://sdgs.un.org/goals/goal7#targets",
      },
      {
        id: "7.B",
        name: "Expand and upgrade energy services for developing countries",
        url: "https://sdgs.un.org/goals/goal7#targets",
      },
    ],
  },
  {
    id: 8,
    name: "Decent Work and Economic Growth",
    color: "#A21942",
    url: "https://sdgs.un.org/goals/goal8",
    targets: [
      { id: "8.1", name: "Sustainable economic growth", url: "https://sdgs.un.org/goals/goal8#targets" },
      {
        id: "8.2",
        name: "Diversify, innovate and upgrade for economic productivity",
        url: "https://sdgs.un.org/goals/goal8#targets",
      },
      { id: "8.3", name: "Promote policies to support job creation", url: "https://sdgs.un.org/goals/goal8#targets" },
      {
        id: "8.4",
        name: "Improve resource efficiency in consumption and production",
        url: "https://sdgs.un.org/goals/goal8#targets",
      },
      {
        id: "8.5",
        name: "Full employment and decent work with equal pay",
        url: "https://sdgs.un.org/goals/goal8#targets",
      },
    ],
  },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    url: "https://sdgs.un.org/goals/goal9",
    targets: [
      {
        id: "9.1",
        name: "Develop sustainable, resilient infrastructure",
        url: "https://sdgs.un.org/goals/goal9#targets",
      },
      {
        id: "9.2",
        name: "Promote inclusive and sustainable industrialization",
        url: "https://sdgs.un.org/goals/goal9#targets",
      },
      {
        id: "9.3",
        name: "Increase access to financial services and markets",
        url: "https://sdgs.un.org/goals/goal9#targets",
      },
      { id: "9.4", name: "Upgrade all industries for sustainability", url: "https://sdgs.un.org/goals/goal9#targets" },
      {
        id: "9.5",
        name: "Enhance research and upgrade industrial technologies",
        url: "https://sdgs.un.org/goals/goal9#targets",
      },
    ],
  },
  {
    id: 10,
    name: "Reduced Inequalities",
    color: "#DD1367",
    url: "https://sdgs.un.org/goals/goal10",
    targets: [
      { id: "10.1", name: "Reduce income inequalities", url: "https://sdgs.un.org/goals/goal10#targets" },
      {
        id: "10.2",
        name: "Promote universal social, economic and political inclusion",
        url: "https://sdgs.un.org/goals/goal10#targets",
      },
      {
        id: "10.3",
        name: "Ensure equal opportunities and end discrimination",
        url: "https://sdgs.un.org/goals/goal10#targets",
      },
      {
        id: "10.4",
        name: "Adopt fiscal and social policies that promote equality",
        url: "https://sdgs.un.org/goals/goal10#targets",
      },
      {
        id: "10.5",
        name: "Improve regulation of global financial markets",
        url: "https://sdgs.un.org/goals/goal10#targets",
      },
    ],
  },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    color: "#FD9D24",
    url: "https://sdgs.un.org/goals/goal11",
    targets: [
      { id: "11.1", name: "Safe and affordable housing", url: "https://sdgs.un.org/goals/goal11#targets" },
      {
        id: "11.2",
        name: "Affordable and sustainable transport systems",
        url: "https://sdgs.un.org/goals/goal11#targets",
      },
      { id: "11.3", name: "Inclusive and sustainable urbanization", url: "https://sdgs.un.org/goals/goal11#targets" },
      {
        id: "11.4",
        name: "Protect the world's cultural and natural heritage",
        url: "https://sdgs.un.org/goals/goal11#targets",
      },
      {
        id: "11.5",
        name: "Reduce the adverse effects of natural disasters",
        url: "https://sdgs.un.org/goals/goal11#targets",
      },
    ],
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    color: "#BF8B2E",
    url: "https://sdgs.un.org/goals/goal12",
    targets: [
      {
        id: "12.1",
        name: "Implement the 10-Year Framework on Sustainable Consumption and Production",
        url: "https://sdgs.un.org/goals/goal12#targets",
      },
      {
        id: "12.2",
        name: "Sustainable management and use of natural resources",
        url: "https://sdgs.un.org/goals/goal12#targets",
      },
      { id: "12.3", name: "Halve global per capita food waste", url: "https://sdgs.un.org/goals/goal12#targets" },
      {
        id: "12.4",
        name: "Responsible management of chemicals and waste",
        url: "https://sdgs.un.org/goals/goal12#targets",
      },
      { id: "12.5", name: "Substantially reduce waste generation", url: "https://sdgs.un.org/goals/goal12#targets" },
    ],
  },
  {
    id: 13,
    name: "Climate Action",
    color: "#3F7E44",
    url: "https://sdgs.un.org/goals/goal13",
    targets: [
      {
        id: "13.1",
        name: "Strengthen resilience to climate-related hazards",
        url: "https://sdgs.un.org/goals/goal13#targets",
      },
      {
        id: "13.2",
        name: "Integrate climate change measures into policies",
        url: "https://sdgs.un.org/goals/goal13#targets",
      },
      { id: "13.3", name: "Build knowledge on climate change", url: "https://sdgs.un.org/goals/goal13#targets" },
      {
        id: "13.A",
        name: "Implement the UN Framework Convention on Climate Change",
        url: "https://sdgs.un.org/goals/goal13#targets",
      },
      {
        id: "13.B",
        name: "Promote mechanisms to raise capacity for climate planning",
        url: "https://sdgs.un.org/goals/goal13#targets",
      },
    ],
  },
  {
    id: 14,
    name: "Life Below Water",
    color: "#0A97D9",
    url: "https://sdgs.un.org/goals/goal14",
    targets: [
      { id: "14.1", name: "Reduce marine pollution", url: "https://sdgs.un.org/goals/goal14#targets" },
      { id: "14.2", name: "Protect and restore ecosystems", url: "https://sdgs.un.org/goals/goal14#targets" },
      { id: "14.3", name: "Reduce ocean acidification", url: "https://sdgs.un.org/goals/goal14#targets" },
      { id: "14.4", name: "Sustainable fishing", url: "https://sdgs.un.org/goals/goal14#targets" },
      { id: "14.5", name: "Conserve coastal and marine areas", url: "https://sdgs.un.org/goals/goal14#targets" },
    ],
  },
  {
    id: 15,
    name: "Life on Land",
    color: "#56C02B",
    url: "https://sdgs.un.org/goals/goal15",
    targets: [
      {
        id: "15.1",
        name: "Conserve and restore terrestrial ecosystems",
        url: "https://sdgs.un.org/goals/goal15#targets",
      },
      {
        id: "15.2",
        name: "End deforestation and restore degraded forests",
        url: "https://sdgs.un.org/goals/goal15#targets",
      },
      {
        id: "15.3",
        name: "End desertification and restore degraded land",
        url: "https://sdgs.un.org/goals/goal15#targets",
      },
      {
        id: "15.4",
        name: "Ensure conservation of mountain ecosystems",
        url: "https://sdgs.un.org/goals/goal15#targets",
      },
      {
        id: "15.5",
        name: "Protect biodiversity and natural habitats",
        url: "https://sdgs.un.org/goals/goal15#targets",
      },
    ],
  },
  {
    id: 16,
    name: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    url: "https://sdgs.un.org/goals/goal16",
    targets: [
      { id: "16.1", name: "Reduce violence everywhere", url: "https://sdgs.un.org/goals/goal16#targets" },
      {
        id: "16.2",
        name: "End abuse, exploitation, trafficking and violence against children",
        url: "https://sdgs.un.org/goals/goal16#targets",
      },
      {
        id: "16.3",
        name: "Promote the rule of law and ensure equal access to justice",
        url: "https://sdgs.un.org/goals/goal16#targets",
      },
      {
        id: "16.4",
        name: "Combat organized crime and illicit financial flows",
        url: "https://sdgs.un.org/goals/goal16#targets",
      },
      {
        id: "16.5",
        name: "Substantially reduce corruption and bribery",
        url: "https://sdgs.un.org/goals/goal16#targets",
      },
    ],
  },
  {
    id: 17,
    name: "Partnerships for the Goals",
    color: "#19486A",
    url: "https://sdgs.un.org/goals/goal17",
    targets: [
      {
        id: "17.1",
        name: "Strengthen domestic resource mobilization",
        url: "https://sdgs.un.org/goals/goal17#targets",
      },
      {
        id: "17.2",
        name: "Implement all development assistance commitments",
        url: "https://sdgs.un.org/goals/goal17#targets",
      },
      {
        id: "17.3",
        name: "Mobilize financial resources for developing countries",
        url: "https://sdgs.un.org/goals/goal17#targets",
      },
      {
        id: "17.4",
        name: "Assist developing countries in attaining debt sustainability",
        url: "https://sdgs.un.org/goals/goal17#targets",
      },
      { id: "17.5", name: "Invest in least-developed countries", url: "https://sdgs.un.org/goals/goal17#targets" },
    ],
  },
]; 