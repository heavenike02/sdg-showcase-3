'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, Globe, Users, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSDGColor } from "@/lib/sdgcolor";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  targets: Record<string, any>; // JSONB in the database
  tags: string[];
  modules: Record<string, any>; // JSONB in the database
  publications: string;
  [key: string]: any; // Add index signature for other unknown properties
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get primary SDG from targets
  const getPrimarySDG = (targets: Record<string, any> | null): number => {
    if (!targets || typeof targets !== 'object') {
      return 0;
    }
    
    // Try to find the primary SDG - this logic depends on how targets are stored
    const targetKeys = Object.keys(targets);
    return targetKeys.length > 0 ? parseInt(targetKeys[0]) : 0;
  };

  // Format interests from objectives text
  const getInterests = (objectives: string): string[] => {
    if (!objectives) return [];
    
    // Simple split by comma or period for now
    // In a real app, this might need more sophisticated parsing
    return objectives
      .split(/[,.;]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .slice(0, 5); // Limit to 5 interests
  };

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParams: SearchParams = {
        query,
        filter: activeFilter as 'all' | 'marine' | 'climate' | 'economic'
      };
      
      const data = await searchAssessments(searchParams);
      setResults(data as Assessment[]);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to load search results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  // Handle filter change
  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="page-container py-12">
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

              <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
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
            ) : results.length > 0 ? (
              results.map((result) => {
                const primarySDG = getPrimarySDG(result.targets);
                const interests = getInterests(result.objectives);
                
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
                          
                          {interests.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {interests.map((interest, idx) => (
                                <span
                                  key={idx}
                                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {interest}
                                </span>
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
                  <p className="text-slate-500 text-sm">Try adjusting your search terms or filters.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
