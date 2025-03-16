"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Target,   Info, Search, Globe, Lock,  } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { sdgGoals, SdgTarget } from "@/lib/sdg-data"

// Helper function to round numbers to 4 decimal places
const round = (num: number) => Number(num.toFixed(4))

// SDG Target interface with impact assessment
interface SdgTargetWithImpact extends SdgTarget {
  impactType?: 'positive' | 'negative'
  impactDirection?: 'direct' | 'indirect'
  evidence?: string
  hasContribution?: boolean
}

interface SdgCircleProps {
  selectedSdgs?: number[]
  targetImpacts?: {
    targetId: string
    impactType: 'positive' | 'negative'
    impactDirection: 'direct' | 'indirect'
    evidence?: string
  }[]
  onTargetClick?: (targetId: string) => void
  recommendedTags?: string[]
  insights?: string
  showSearchLink?: boolean
}

export default function SdgCircle({ 
  
  targetImpacts = [],
  onTargetClick,
  recommendedTags = [],
  insights = "",
  showSearchLink = true
}: SdgCircleProps) {
  const router = useRouter()
  const [hoveredGoal, setHoveredGoal] = useState<number | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)

  // Get all SDGs that have at least one target with impact
  const contributedSdgs = Array.from(new Set(
    targetImpacts.map(impact => parseInt(impact.targetId.split('.')[0]))
  )).sort((a, b) => a - b)

  const centerX = 250
  const centerY = 250
 
  const innerRadius = 80
  
  const handleGoalClick = (goalId: number) => {
    // Only allow clicking on goals that have contributions
    if (hasGoalContribution(goalId)) {
    setSelectedGoal(goalId)
    }
  }

  const handleBackClick = () => {
    setSelectedGoal(null)
  }


  // Check if a goal has any target contributions
  const hasGoalContribution = (goalId: number): boolean => {
    return contributedSdgs.includes(goalId)
  }

  // Enhance targets with impact information
  const getEnhancedTargets = (goalId: number): SdgTargetWithImpact[] => {
    const baseTargets = sdgGoals[goalId - 1]?.targets || []
    
    return baseTargets.map(target => {
      const targetId = target.id
      const impact = targetImpacts.find(ti => ti.targetId === targetId)
      const hasContribution = !!impact
      
      return {
        ...target,
        impactType: impact?.impactType,
        impactDirection: impact?.impactDirection,
        evidence: impact?.evidence,
        hasContribution
      }
    })
  }

  // Get only the targets with contributions for a goal
  const getContributedTargets = (goalId: number): SdgTargetWithImpact[] => {
    const allTargets = getEnhancedTargets(goalId)
    return allTargets.filter(target => target.hasContribution)
  }


    

  // Get the impact score for a goal (percentage of positive impacts)
  const getGoalImpactScore = (goalId: number) => {
    const goalPrefix = `${goalId}.`
    const goalImpacts = targetImpacts.filter(ti => ti.targetId.startsWith(goalPrefix))
    
    if (goalImpacts.length === 0) return 0
    
    const positiveImpacts = goalImpacts.filter(ti => ti.impactType === 'positive').length
    return Math.round((positiveImpacts / goalImpacts.length) * 100)
  }

  // Get direct vs indirect count for a goal
  const getGoalDirectCount = (goalId: number) => {
    const goalPrefix = `${goalId}.`
    const goalImpacts = targetImpacts.filter(ti => ti.targetId.startsWith(goalPrefix))
    
    if (goalImpacts.length === 0) return { direct: 0, indirect: 0 }
    
    const directImpacts = goalImpacts.filter(ti => ti.impactDirection === 'direct').length
    const indirectImpacts = goalImpacts.length - directImpacts
    
    return { direct: directImpacts, indirect: indirectImpacts }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Insights section - if provided */}
      {insights && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="font-medium">SDG Impact Insights</h3>
          </div>
          <p className="text-sm text-muted-foreground">{insights}</p>
        </div>
      )}

      {/* Contribution summary */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Researcher&apos;s SDG Contributions</h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {contributedSdgs.length > 0 ? (
            contributedSdgs.map(sdgId => {
              const goal = sdgGoals[sdgId - 1]
              const impactCounts = getGoalDirectCount(sdgId)
              
              return (
                <div 
                  key={sdgId}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm"
                  onClick={() => handleGoalClick(sdgId)}
                  role="button"
                  tabIndex={0}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: goal.color }}
                  >
                    {goal.id}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{goal.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {impactCounts.direct > 0 && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                          {impactCounts.direct} Direct
                        </Badge>
                      )}
                      {impactCounts.indirect > 0 && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                          {impactCounts.indirect} Indirect
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-muted-foreground">No SDG contributions found for this researcher.</p>
          )}
        </div>
      </div>

      {/* Recommended tags - if provided */}
      {recommendedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
                  <Info className="h-4 w-4" />
                  <span>Thematic Tags</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  These tags represent key themes in the researcher&apos;s work related to sustainable development
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {recommendedTags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="rounded-md border-primary/30 bg-primary/5">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="relative w-full aspect-square max-w-xl mx-auto">
        {/* Main SDG Circle View - Always visible */}
        {hoveredGoal && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center max-w-[80%]">
              <h2 className="font-bold text-xl mb-1">
                {sdgGoals[hoveredGoal - 1].id}. {sdgGoals[hoveredGoal - 1].name}
              </h2>
              
              {hasGoalContribution(hoveredGoal) ? (
                <>
                  <p className="text-sm text-primary font-medium">
                    {getContributedTargets(hoveredGoal).length} target contributions
                  </p>
                  
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-xs">Impact:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      getGoalImpactScore(hoveredGoal) >= 75 ? 'bg-green-100 text-green-800' :
                      getGoalImpactScore(hoveredGoal) >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getGoalImpactScore(hoveredGoal)}% Positive
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 h-7 text-xs pointer-events-auto"
                    onClick={() => handleGoalClick(hoveredGoal)}
                  >
                    View Targets
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center mt-2">
                  <Badge variant="outline" className="mb-1">
                    <Lock className="h-3 w-3 mr-1" />
                    No Contributions
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    This researcher has no contributions to this SDG
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
            
            // Determine if this goal has contributions
            const hasContribution = hasGoalContribution(goal.id)
            
            return (
              <g
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
                onMouseEnter={() => setHoveredGoal(goal.id)}
                onMouseLeave={() => setHoveredGoal(null)}
                className={cn(
                  "transition-all duration-200",
                  hasContribution ? "cursor-pointer" : "cursor-not-allowed"
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
                    hasContribution ? "opacity-100" : "opacity-30"
                  )}
                />
                
                {/* Add a lock icon for goals without contributions */}
                {!hasContribution && (
                  <g>
                    <circle 
                      cx={round(250 + 160 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180))}
                      cy={round(250 + 160 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180))}
                      r="12"
                      fill="white"
                      opacity="0.8"
                    />
                    <text
                      x={round(250 + 160 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180))}
                      y={round(250 + 160 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180))}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#666"
                      fontSize="10"
                      className="select-none pointer-events-none"
                    >
                      🔒
                    </text>
                  </g>
                )}
                
                {/* Add a check icon for goals with contributions */}
                {hasContribution && (
                  <circle 
                    cx={round(250 + 160 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180))}
                    cy={round(250 + 160 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180)) - 15}
                    r="8"
                    fill="white"
                    stroke={goal.color}
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                )}
                
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
                
                {/* Add contribution count for goals with contributions */}
                {hasContribution && (
                  <text
                    x={round(250 + 160 * Math.cos(((angle + nextAngle) / 2 * Math.PI) / 180))}
                    y={round(250 + 160 * Math.sin(((angle + nextAngle) / 2 * Math.PI) / 180)) - 15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={goal.color}
                    fontSize="8"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    ✓
                  </text>
                )}
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
            {contributedSdgs.length} contributions
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
              <h3 className="text-lg font-medium mb-3">Researcher&apos;s Contributions to This Goal</h3>
              
              <div className="grid gap-3">
                {getContributedTargets(selectedGoal).length > 0 ? (
                  getContributedTargets(selectedGoal).map((target) => {
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
                                <Badge 
                                  variant={target.impactType === 'positive' ? 'default' : 'destructive'}
                                  className="rounded-md"
                                >
                                  {target.impactType === 'positive' ? 'Positive Impact' : 'Negative Impact'}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "rounded-md",
                                    target.impactDirection === 'direct' 
                                      ? "border-primary text-primary" 
                                      : "border-muted text-muted-foreground"
                                  )}
                                >
                                  {target.impactDirection === 'direct' ? 'Direct' : 'Indirect'} Impact
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {/* Evidence section if available */}
                          {!showSearchLink && target.evidence && (
                            <div className="text-sm text-muted-foreground bg-slate-50 p-3 rounded border border-slate-200">
                              <span className="font-medium text-xs text-slate-500 block mb-1">Evidence:</span>
                              {target.evidence}
                            </div>
                          )}
                          
                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {showSearchLink && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="h-9"
                                onClick={() => router.push(`/search?targetId=${target.id}`)}
                              >
                                <Search className="mr-2 h-4 w-4" />
                                Find researchers working on this target
                              </Button>
                            )}
                            
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
                            
                            {!showSearchLink && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="h-9"
                                onClick={() => onTargetClick && onTargetClick(target.id)}
                              >
                                <Target className="mr-2 h-4 w-4" />
                                View impact details
                              </Button>
                            )}
                          </div>
                        </div>
                    </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No specific target contributions found for this goal.</p>
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


