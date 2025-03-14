"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

// Helper function to round numbers to 4 decimal places
const round = (num: number) => Number(num.toFixed(4))

// SDG data with official colors, descriptions and targets (subsections)
const sdgGoals = [
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
        name: "Protect the world&apos;s cultural and natural heritage",
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
]

export default function SdgCircle() {
  const [hoveredGoal, setHoveredGoal] = useState<number | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)

  const centerX = 250
  const centerY = 250
 
  const innerRadius = 80
  
  const handleGoalClick = (goalId: number) => {
    setSelectedGoal(goalId)
  }

  const handleBackClick = () => {
    setSelectedGoal(null)
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="relative w-full aspect-square max-w-xl mx-auto">
        {/* Main SDG Circle View - Always visible */}
        {hoveredGoal && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center max-w-[80%]">
              <h2 className="font-bold text-xl mb-1">
                {sdgGoals[hoveredGoal - 1].id}. {sdgGoals[hoveredGoal - 1].name}
              </h2>
              <p className="text-sm text-muted-foreground">Click to see targets</p>
            </div>
          </div>
        )}

        <svg viewBox="0 0 500 500" className="w-full h-full" aria-label="SDG Goals Circle">
          {sdgGoals.map((goal, index) => {
            const angle = (index * 360) / sdgGoals.length
            const nextAngle = ((index + 1) * 360) / sdgGoals.length
            
            // Calculate coordinates with rounded numbers
            const startX = round(250 + 200 * Math.cos((angle * Math.PI) / 180))
            const startY = round(250 + 200 * Math.sin((angle * Math.PI) / 180))
            const endX = round(250 + 200 * Math.cos((nextAngle * Math.PI) / 180))
            const endY = round(250 + 200 * Math.sin((nextAngle * Math.PI) / 180))
            const largeArcFlag = nextAngle - angle <= 180 ? 0 : 1
            
            const path = `M 250 250 L ${startX} ${startY} A 200 200 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
            
            return (
              <g
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
                onMouseEnter={() => setHoveredGoal(goal.id)}
                onMouseLeave={() => setHoveredGoal(null)}
                className="cursor-pointer"
                role="button"
                aria-label={`SDG Goal ${goal.id}: ${goal.name}`}
                tabIndex={0}
              >
                <path
                  d={path}
                  fill={goal.color}
                  stroke="white"
                  strokeWidth="2"
                  className={cn(
                    "transition-all duration-200",
                    selectedGoal === goal.id ? "opacity-100" : "opacity-80 hover:opacity-100"
                  )}
                />
                <text
                  x={round(250 + 160 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180))}
                  y={round(250 + 160 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180))}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                  style={{ textShadow: "0px 0px 3px rgba(0,0,0,0.5)" }}
                >
                  {goal.id}
                </text>
              </g>
            )
          })}

          {/* Center circle */}
          <circle cx={centerX} cy={centerY} r={innerRadius - 2} fill="white" stroke="#ddd" strokeWidth="1" />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#333"
          >
            SDGs
          </text>
        </svg>
      </div>

      {/* Targets Section - Shown below when a goal is selected */}
      {selectedGoal && (
        <div className="w-full animate-in slide-in-from-bottom duration-300">
          <div
            className="flex items-center p-4 gap-2 rounded-t-lg"
            style={{ backgroundColor: sdgGoals[selectedGoal - 1].color }}
          >
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h2 className="text-xl font-bold text-white ml-2">
              Goal {selectedGoal}: {sdgGoals[selectedGoal - 1].name}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
            <div className="grid gap-3 p-4">
              {sdgGoals[selectedGoal - 1].targets.map((target) => (
                <a
                  key={target.id}
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: sdgGoals[selectedGoal - 1].color }}
                    >
                      {target.id}
                    </div>
                    <div>
                      <h3 className="font-medium">{target.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Click to learn more about this target</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


