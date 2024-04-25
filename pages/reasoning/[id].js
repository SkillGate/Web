import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Pie,Line  } from 'react-chartjs-2';
import ExplainPopup from "../../components/reasoning/model/explain-model";

import {Chart, ArcElement,CategoryScale,LinearScale, PointElement,LineElement,Legend} from 'chart.js'
Chart.register(ArcElement,CategoryScale,LinearScale, PointElement,LineElement);
const Reasoning = () => {
    const [isExplainabilityOpen, setExplainabilityOpen] = useState(false);
    const handleExplainabilityOpen = () => {
        setExplainabilityOpen(true);
    };
    const handleExplainabilityClose = () => {
        setExplainabilityOpen(false);
    };
    const data = {
        labels: ['Food', 'Transportation', 'Rent', 'Utilities'],
        datasets: [
          {
            data: [20, 15, 40, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFCC00'],
          },
        ],
      };

    const options = {
        // Show the legend
        plugins: {
            legend: {
              display: true, // Enable the legend display
              labels: {
                fontColor: 'black', // Customize legend text color
              },
              position: 'right', // Set legend position (default: 'top')
            },
          },
      };
      return (
        <div className="h-screen flex flex-col gap-4">
            <div className="flex flex-row gap-4 self-center mt-4 mb-4 text-2xl font-semibold">Explaination of the Results</div>
            <div className="h-64 flex flex-row gap-4">
                <div className="w-1/2 flex flex-row rounded-md overflow-hidden border p-4 gap-4 justify-center">
                    <div className="w-full h-full flex flex-col gap-4 m-4 justify-center item-center self-center border-r-2">
                        <div className="flex text-2xl font-semibold">Overall Score</div>
                        <div className="flex text-2xl font-semibold">90.00%</div>
                    </div> 
                    <div className="w-full h-full flex flex-col gap-4 justify-center">
                        <div className="flex text-2xl font-semibold">Contribution</div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Education</div>
                            <div className="flex">50.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Technical Skills</div>
                            <div className="flex">20.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Soft Skills</div>
                            <div className="flex">10.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Experience</div>
                            <div className="flex">20.00%</div>
                        </div>
                    </div> 
                </div>
                <div className="flex flex-row w-1/2 rounded-md overflow-hidden border p-4 gap-4">
                    <div className="w-1/2 h-full flex flex-col gap-4 justify-center item-center self-center border-r-2">
                        <Pie data={data}  />
                    </div>
                    <div className="w-1/2 h-full flex flex-col gap-4 justify-center">
                        <div className="flex text-2xl font-semibold">Allocated Weights</div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Education</div>
                            <div className="flex">50.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Technical Skills</div>
                            <div className="flex">20.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Soft Skills</div>
                            <div className="flex">10.00%</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex">Experience</div>
                            <div className="flex">20.00%</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-row gap-4 self-center mt-10 mb-4 text-2xl font-semibold">Categories</div>
            <div className="h-55 flex flex-row gap-4">
                <div className="w-1/4 flex flex-col rounded-md overflow-hidden border p-4 gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex">Education</div>
                        <div className="flex">90.00%</div>
                    </div>
                    <button onClick={handleExplainabilityOpen} className="btn btn-primary">Statistics</button>
                    {isExplainabilityOpen && <ExplainPopup onClose={handleExplainabilityClose} title={"Education"} />}
                </div>
                <div className="w-1/4 flex flex-col rounded-md overflow-hidden border p-4 gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex">Technical Skills</div>
                        <div className="flex">90.00%</div>
                    </div>
                    <button className="btn btn-primary">Statistics</button>
                </div>
                <div className="w-1/4 flex flex-col rounded-md overflow-hidden border p-4 gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex">Soft Skills</div>
                        <div className="flex">90.00%</div>
                    </div>
                    <button className="btn btn-primary">Statistics</button>
                </div>
                <div className="w-1/4 flex flex-col rounded-md overflow-hidden border p-4 gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex">Experience</div>
                        <div className="flex">90.00%</div>
                    </div>
                    <button className="btn btn-primary">Statistics</button>
                </div>
            </div>
        </div>

        
      );

};

export default Reasoning;