import React from "react";

// SDG impact data
//const sdgData = [
  //{ name: "Quality Education", value: 78, color: "#c5192d" },
  //{ name: "Gender Equality", value: 65, color: "#ff3a21" },
  //{ name: "Clean Water", value: 42, color: "#26bde2" },
  //{ name: "Climate Action", value: 86, color: "#3f7e44" },
  //{ name: "Decent Work", value: 70, color: "#a21942" },
  //{ name: "Partnerships", value: 92, color: "#19486a" },
//];

// Custom tooltip component



export const SDGImpactChart = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-4">SDG Impact Analysis</h3>
          <p className="text-slate-600 mb-4">
            Our research and education initiatives have the most significant 
            impact on SDGs related to education, climate action, and partnerships.
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Impact Score</span>
              <span className="text-lg font-bold">72%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }}></div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 h-80">
        </div>
      </div>
    </div>
  );
};
