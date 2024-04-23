import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loader from "../../common/Loader";
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['Bachelor', 'Degree', 'in', 'Computer', 'Science'],
    datasets: [
      {
        label: 'Explaination',
        fill: false, // Optional: Remove area fill under the line
        lineTension: 0.1, // Optional: Adjust line smoothness
        data: [5, 8, -3, 12, -15, 10, 8],
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: Background color for area fill
        pointBorderColor: 'rgba(75, 192, 192, 1)', // Point border color
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point background color
        pointHoverRadius: 5, // Optional: Point size on hover
        pointHoverBackgroundColor: 'rgba(220, 220, 220, 1)', // Optional: Point background color on hover
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)', // Optional: Point border color on hover
      },
    ],
  };
  const data2 = {
    labels: ['Bsc', 'in', 'Computer', 'Science'],
    datasets: [
      {
        label: 'Explaination',
        fill: false, // Optional: Remove area fill under the line
        lineTension: 0.1, // Optional: Adjust line smoothness
        data: [5, 8, -3, 12, -15, 10, 8],
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: Background color for area fill
        pointBorderColor: 'rgba(75, 192, 192, 1)', // Point border color
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point background color
        pointHoverRadius: 5, // Optional: Point size on hover
        pointHoverBackgroundColor: 'rgba(220, 220, 220, 1)', // Optional: Point background color on hover
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)', // Optional: Point border color on hover
      },
    ],
  };

const options = {
    layout: {
        canvasAspectRatio: 4, // Adjust aspect ratio (width:height)
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Optional: Start Y-axis at 0
          },
        },
      ],
    },
    legend: {
      display: true, // Optional: Show legend
      position: 'bottom', // Optional: Legend position
    },
  };

const ExplainPopup = ({ onClose,title }) => {

  const [loading, setLoading] = useState(false);




  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
      <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
        <button className="float-right text-gray-500" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-xl font-bold mb-8">Statistics of {title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid grid-cols-1 gap-4">
            
            <div  className="flex flex-col p-4">
                <div>Company Job Persona</div>
                <Line data={data} options={options} />
            </div>
            <div className="flex flex-col p-4">
                <div>Candidate Persona</div>
                <Line data={data} options={options} />
            </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ExplainPopup;
