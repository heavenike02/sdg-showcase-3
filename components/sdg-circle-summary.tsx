"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Search, Globe, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { sdgGoals } from "@/lib/sdg-data"

// Helper function to round numbers to 4 decimal places
const round = (num: number) => Number(num.toFixed(4))

interface SdgCircleSummaryProps {
  // Summary data for all SDGs
  sdgSummary?: {
    sdgId: number
    researcherCount: number
    targetCounts: {
      targetId: string
      researcherCount: number
    }[]
  }[]
}

export default function SdgCircleSummary({ 
  sdgSummary = []
}: SdgCircleSummaryProps) {
  const router = useRouter()
  const [hoveredGoal, setHoveredGoal] = useState<number | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)

  // Get all SDGs that have at least one researcher
  const activeSDGs = sdgSummary.map(item => item.sdgId)

  const centerX = 250
  const centerY = 250
 
  const innerRadius = 80
  
  const handleGoalClick = (goalId: number) => {
    // Only allow clicking on goals that have researchers
    if (hasResearchers(goalId)) {
      setSelectedGoal(goalId)
    }
  }

  const handleBackClick = () => {
    setSelectedGoal(null)
  }

  // Check if a goal has any researchers
  const hasResearchers = (goalId: number): boolean => {
    return activeSDGs.includes(goalId)
  }

  // Get researcher count for a goal
  const getResearcherCount = (goalId: number): number => {
    const summary = sdgSummary.find(item => item.sdgId === goalId)
    return summary?.researcherCount || 0
  }

  // Get targets with researchers for a goal
  const getTargetsWithResearchers = (goalId: number) => {
    const summary = sdgSummary.find(item => item.sdgId === goalId)
    if (!summary) return []

    const goalTargets = sdgGoals[goalId - 1]?.targets || []
    
    return goalTargets.map(target => {
      const targetSummary = summary.targetCounts.find(tc => tc.targetId === target.id)
      return {
        ...target,
        researcherCount: targetSummary?.researcherCount || 0
      }
    }).filter(target => target.researcherCount > 0)
  }

  // Get total researcher count across all SDGs
  const getTotalResearcherCount = (): number => {
    // This is a simplification - in reality, researchers may work on multiple SDGs
    // For a true count, we'd need to deduplicate across SDGs
    return sdgSummary.reduce((total, sdg) => total + sdg.researcherCount, 0)
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
              
              {hasResearchers(hoveredGoal) ? (
                <>
                  <p className="text-sm text-primary font-medium">
                    {getResearcherCount(hoveredGoal)} {getResearcherCount(hoveredGoal) === 1 ? 'Researcher' : 'Researchers'}
                  </p>
                  
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-xs">Active Targets:</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {getTargetsWithResearchers(hoveredGoal).length}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 h-7 text-xs pointer-events-auto"
                    onClick={() => handleGoalClick(hoveredGoal)}
                  >
                    View Details
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center mt-2">
                  <Badge variant="outline" className="mb-1">
                    No Active Research
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    No researchers are currently working on this SDG
                  </p>
                </div>
              )}
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
            
            // Determine if this goal has researchers
            const hasResearchersForGoal = hasResearchers(goal.id)
            
            return (
              <g
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
                onMouseEnter={() => setHoveredGoal(goal.id)}
                onMouseLeave={() => setHoveredGoal(null)}
                className={cn(
                  "transition-all duration-200",
                  hasResearchersForGoal ? "cursor-pointer" : "cursor-not-allowed"
                )}
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
                    selectedGoal === goal.id ? "opacity-100" : 
                    hasResearchersForGoal ? "opacity-100" : "opacity-30"
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
            y={centerY - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#333"
          >
            SDGs
          </text>
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#666"
          >
            {getTotalResearcherCount()} researchers
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
            
            <a 
              href={sdgGoals[selectedGoal - 1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">View on UN Site</span>
            </a>
          </div>

          <div className="bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-3">Research Activity by Target</h3>
              
              <div className="grid gap-3">
                {getTargetsWithResearchers(selectedGoal).length > 0 ? (
                  getTargetsWithResearchers(selectedGoal).map((target) => {
                    return (
                      <div
                        key={target.id}
                        className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4">
                          {/* Target header with badge */}
                          <div className="flex items-start gap-3">
                            <div
                              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: sdgGoals[selectedGoal - 1].color }}
                            >
                              {target.id}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{target.name}</h3>
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="default" className="rounded-md">
                                  <Users className="h-3 w-3 mr-1" />
                                  {target.researcherCount} {target.researcherCount === 1 ? 'Researcher' : 'Researchers'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="h-9"
                              onClick={() => router.push(`/search?targetId=${target.id}`)}
                            >
                              <Search className="mr-2 h-4 w-4" />
                              Find researchers working on this target
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-9"
                              asChild
                            >
                              <a 
                                href={target.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Globe className="mr-2 h-4 w-4" />
                                View on UN SDG site
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No active research found for targets in this goal.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 