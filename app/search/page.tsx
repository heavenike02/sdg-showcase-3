'use client'
import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, Globe, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSDGColor } from "@/lib/sdgcolor";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Mock search results with expanded profiles
  const searchResults = [
    {
      id: "daniel-norton",
      name: "Dr. Daniel Norton",
      title: "Lecturer in Economics",
      department: "J.E. Cairnes School of Business and Economics",
      institution: "University of Galway",
      interests: ["Environmental Economics", "Sustainable Use of the Sea", "Natural Capital Accounting", "Marine Ecosystem Services"],
      primarySDG: 14,
      sdgs: [14, 13, 8, 17],
      image: "https://placehold.co/100x100/0A97D9/FFFFFF/png?text=DN"
    },
    {
      id: "jane-smith",
      name: "Dr. Jane Smith",
      title: "Professor of Economics",
      department: "School of Economics",
      institution: "University of Galway",
      interests: ["Sustainable Development", "Environmental Economics", "Climate Change Policy"],
      primarySDG: 13,
      sdgs: [13, 7, 11],
      image: "https://placehold.co/100x100/3F7E44/FFFFFF/png?text=JS"
    },
    {
      id: "john-doe",
      name: "Dr. John Doe",
      title: "Associate Professor",
      department: "Business School",
      institution: "University of Galway",
      interests: ["Social Enterprise", "Corporate Sustainability", "Ethical Business"],
      primarySDG: 8,
      sdgs: [8, 12, 10],
      image: "https://placehold.co/100x100/A21942/FFFFFF/png?text=JD"
    },
    {
      id: "sarah-johnson",
      name: "Dr. Sarah Johnson",
      title: "Senior Lecturer",
      department: "Marine Science",
      institution: "University of Galway",
      interests: ["Marine Biology", "Ocean Conservation", "Coastal Ecosystems"],
      primarySDG: 14,
      sdgs: [14, 15, 13],
      image: "https://placehold.co/100x100/0A97D9/FFFFFF/png?text=SJ"
    },
    {
      id: "michael-chen",
      name: "Dr. Michael Chen",
      title: "Research Fellow",
      department: "Renewable Energy",
      institution: "University of Galway",
      interests: ["Clean Energy", "Sustainable Technology", "Climate Mitigation"],
      primarySDG: 7,
      sdgs: [7, 9, 13],
      image: "https://placehold.co/100x100/FCC30B/FFFFFF/png?text=MC"
    }
  ];

  // Helper function to get SDG color


  // Filter results based on search query and active filter
  const filteredResults = searchResults.filter(result => {
    // First filter by search query
    const matchesQuery = 
      query === "" || 
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.department.toLowerCase().includes(query.toLowerCase()) ||
      result.interests.some(interest => interest.toLowerCase().includes(query.toLowerCase()));
    
    // Then filter by SDG category if not "all"
    if (activeFilter === "all") {
      return matchesQuery;
    } else if (activeFilter === "marine") {
      return matchesQuery && result.sdgs.includes(14);
    } else if (activeFilter === "climate") {
      return matchesQuery && result.sdgs.includes(13);
    } else if (activeFilter === "economic") {
      return matchesQuery && (result.sdgs.includes(8) || result.sdgs.includes(12));
    }
    
    return matchesQuery;
  });

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
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
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
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <Card key={result.id} className="transition-all hover:shadow-sm">
                  <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                          style={{ backgroundColor: getSDGColor(result.primarySDG) }}
                        >
                          {result.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl font-semibold mb-1">{result.name}</CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {result.title} • {result.department}
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
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {result.interests.map((interest) => (
                            <span
                              key={interest}
                              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-sm text-muted-foreground">Primary SDG:</span>
                          <span 
                            className="px-2.5 py-0.5 rounded-md text-sm font-medium text-white"
                            style={{ backgroundColor: getSDGColor(result.primarySDG) }}
                          >
                            SDG {result.primarySDG}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
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
