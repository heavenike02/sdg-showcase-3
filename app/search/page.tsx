'use client'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Globe, Users, AlertCircle, Target } from "lucide-react";
import { Suspense } from "react";
import { SkeletonDemo } from '@/components/SkeletonDemo';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSDGColor } from "@/lib/sdgcolor";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { searchAssessments, SearchParams } from "@/queries/fetch-assessment-data";

// Define Assessment type based on database schema
interface Assessment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  university_school: string;
  title: string;
  objectives: string;
  targets: Record<string, string[]>;
  tags: string[];
  modules: {
    teaching?: {
      code: string;
      title: string;
      description: string;
      sdgs?: number[];
    }[];
    projects?: {
      title: string;
      description: string;
      year: string;
      funding: string;
    }[];
  };
  publications: string;
  // Add impact assessment fields
  impact_assessment?: {
    targetImpacts?: {
      targetId: string;
      impactType: 'positive' | 'negative';
      impactDirection: 'direct' | 'indirect';
      evidence?: string;
    }[];
    insights?: string;
    recommendedTags?: string[];
  };
}

const Search = () => {
  const searchParams = useSearchParams();
  
  // Get target parameters from URL
  const targetId = searchParams.get('targetId');
  const sdgNumber = targetId ? parseInt(targetId.split('.')[0]) : null;
  
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(
    sdgNumber === 14 ? "marine" : 
    sdgNumber === 13 ? "climate" : 
    (sdgNumber === 8 || sdgNumber === 12) ? "economic" : 
    "all"
  );

  const [filteredResults, setFilteredResults] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get primary SDG from targets
  const getPrimarySDG = useCallback((targets: Record<string, string[]> | null): number => {
    if (!targets || typeof targets !== 'object') {
      return 0;
    }
    
    const targetKeys = Object.keys(targets);
    return targetKeys.length > 0 ? parseInt(targetKeys[0]) : 0;
  }, []);

 

  // Check if an assessment has a specific target
  const hasTarget = useCallback((assessment: Assessment, targetId: string): boolean => {
    if (!targetId || !assessment.targets) return false;
    
    const [sdgStr, targetStr] = targetId.split('.');
    if (!sdgStr || !targetStr) return false;
    
    const sdgTargets = assessment.targets[sdgStr];
    return Array.isArray(sdgTargets) && sdgTargets.includes(targetStr);
  }, []);

  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParams: SearchParams = {
        query,
        filter: activeFilter as 'all' | 'marine' | 'climate' | 'economic'
      };
      
      const data = await searchAssessments(searchParams);
     
      
      // Filter by target if targetId is provided
      if (targetId) {
        const filtered = (data as Assessment[]).filter(assessment => 
          hasTarget(assessment, targetId)
        );
        setFilteredResults(filtered);
      } else {
        setFilteredResults(data as Assessment[]);
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to load search results. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [query, activeFilter, targetId, hasTarget]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  // Clear target filter
  const clearTargetFilter = () => {
    // Use window.location to navigate without the targetId parameter
    window.location.href = '/search';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm font-medium">Profile Search</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Find Experts & Researchers</h2>
            <p className="text-muted-foreground">
              Discover faculty members and researchers based on their expertise, research interests, 
              or department affiliations.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="mb-8">
            <CardContent className="pt-6">
              {targetId && (
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">Filtering by SDG Target: </span>
                      <Badge className="rounded-md">
                        {targetId}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearTargetFilter}
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  type="search"
                  placeholder="Search by name, research area, or department..."
                  className="flex-grow"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Searching...
                    </span>
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </form>

              <Tabs value={activeFilter} onValueChange={handleFilterChange} className="w-full">
                <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2">
                  <TabsTrigger value="all" className="data-[state=active]:bg-slate-100">
                    All Areas
                  </TabsTrigger>
                  <TabsTrigger value="marine" className="data-[state=active]:bg-[#0A97D9]/10">
                    <Globe className="mr-2 h-4 w-4" />
                    Marine
                  </TabsTrigger>
                  <TabsTrigger value="climate" className="data-[state=active]:bg-[#3F7E44]/10">
                    <Globe className="mr-2 h-4 w-4" />
                    Climate
                  </TabsTrigger>
                  <TabsTrigger value="economic" className="data-[state=active]:bg-[#A21942]/10">
                    <Users className="mr-2 h-4 w-4" />
                    Economic
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {loading ? (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                    <p className="text-muted-foreground">Loading search results...</p>
                  </div>
                </CardContent>
              </Card>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result) => {
                const primarySDG = getPrimarySDG(result.targets);
               
                
                return (
                  <Card key={result.id} className="transition-all hover:shadow-sm">
                    <CardContent className="py-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                            style={{ backgroundColor: getSDGColor(primarySDG) }}
                          >
                            {`${result.first_name?.[0] || ''}${result.last_name?.[0] || ''}`}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <CardTitle className="text-xl font-semibold mb-1">
                                {result.first_name} {result.last_name}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground">
                                {result.title} • {result.university_school || result.university}
                              </CardDescription>
                            </div>
                            <Button 
                              asChild 
                              variant="outline" 
                              className="md:self-start shrink-0"
                            >
                              <Link href={`/profile/${result.id}`}>View Profile</Link>
                            </Button>
                          </div>
                          
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {result.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="rounded-md">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {primarySDG > 0 && (
                            <div className="flex items-center gap-2 mt-4">
                              <span className="text-sm text-muted-foreground">Primary SDG:</span>
                              <span 
                                className="px-2.5 py-0.5 rounded-md text-sm font-medium text-white"
                                style={{ backgroundColor: getSDGColor(primarySDG) }}
                              >
                                SDG {primarySDG}
                              </span>
                            </div>
                          )}
                          
                          {/* Show matching target if filtering by target */}
                          {targetId && hasTarget(result, targetId) && (
                            <div className="mt-3 flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1 rounded-md border-primary/30 bg-primary/5">
                                <Target className="h-3 w-3" />
                                Target {targetId}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="text-center">
                <CardContent className="py-6">
                  <p className="text-slate-600 mb-2">No results found for your search criteria.</p>
                  <p className="text-slate-500 text-sm">
                    {targetId 
                      ? "No researchers found working on this specific SDG target. Try another target or clear the filter."
                      : "Try adjusting your search terms or filters."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SearchWrapper() {
  return (
    <Suspense fallback={<SkeletonDemo />}>
      <Search />
    </Suspense>
  );
}
