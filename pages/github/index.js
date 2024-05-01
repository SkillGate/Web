import React, { useState, useEffect } from 'react';
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip
);

const GitHubInfo = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/github/projects?gitHubUrl=https://github.com/SkillGate');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let partialData = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                partialData += decoder.decode(value, { stream: true });

                try {
                    const parsedData = JSON.parse(partialData);
                    setData(prevData => [...prevData, parsedData]);
                    partialData = '';
                } catch (error) {

                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        // fetchData();
        console.log('Fetching data');
    },[]);


    return (
        <div>
            <h2>Streaming Data:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, outerIndex) => (
                    extractChartData(item).map((chartData, innerIndex) => (
                        <div key={outerIndex} className="rounded-md overflow-hidden border p-4 bg-white dark:bg-dark-card">
                            <h2 className="text-xl font-bold mb-4">{chartData.repoName}</h2>
                            <Line data={chartData} options={chartData.options} />
                            {renderLegend(chartData.contributorColors)}
                            <h3 className="mt-5">Languages:</h3>
                            {renderLanguages(chartData.languages)}
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};

const extractChartData = (dataItem) => {
    const datasetsArray = [];
    const contributorColors = {};

    dataItem.repositories.forEach((repo) => {
        const commitDataByDate = {};
        const contributorsData = {};

        repo.contributors.forEach((contributor) => {
            if (!contributorColors[contributor.username]) {
                contributorColors[contributor.username] =
                    contributor.username === "AshaniLiyanagamage"
                        ? "yellow"
                        : getRandomColor(0.6);
            }

            contributor.commit_details.forEach((commit) => {
                const commitDate = new Date(commit.commit_data)
                    .toISOString()
                    .split("T")[0];

                if (!commitDataByDate[commitDate]) {
                    commitDataByDate[commitDate] = {
                        date: commitDate,
                        count: 0,
                        commitDetails: [],
                    };
                }

                commitDataByDate[commitDate].count += 1;
                commitDataByDate[commitDate].commitDetails.push(commit.commit_name);
            });

            contributorsData[contributor.username] = {
                label: contributor.username,
                data: Object.keys(commitDataByDate).map((date) => ({
                    x: date,
                    y: commitDataByDate[date].count,
                    commitDetails: commitDataByDate[date].commitDetails,
                })),
                borderColor: contributorColors[contributor.username],
            };
        });

        datasetsArray.push({
            repoName: repo.reponame,
            languages: repo.languages,
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const data = context.dataset.data[context.dataIndex];
                                const commitDetails = data.commitDetails.map(
                                    (commit) => `* ${commit}`
                                );
                                return [
                                    `Commits: ${data.y}`,
                                    "",
                                    "Commit Details:",
                                    ...commitDetails,
                                ];
                            },
                        },
                        borderWidth: 0.5,
                        bodyFont: {
                            size: 10,
                        },
                        cornerRadius: 4,
                        caretSize: 2,
                    },
                },
                scales: {
                    x: {
                        type: "category",
                        position: "bottom",
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        type: "linear",
                        position: "left",
                        title: {
                            display: true,
                            text: "Commit Count",
                        },
                    },
                },
            },
            datasets: Object.values(contributorsData),
            contributorColors,
        });
    });

    return datasetsArray;
};

const getRandomColor = (opacity = 1) => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${opacity})`;
};

const renderLanguages = (languages) => {
    const totalLines = Object.values(languages).reduce(
        (sum, lines) => sum + lines,
        0
    );
    return (
        <ul>
            {Object.entries(languages).map(([language, lines]) => (
                <li key={language}>
                    <strong>{language}:</strong> {calculatePercentage(lines, totalLines)}%
                </li>
            ))}
        </ul>
    );
};

const calculatePercentage = (lines, totalLines) => {
    return totalLines === 0 ? 0 : ((lines / totalLines) * 100).toFixed(2);
};

const renderLegend = (contributorColors) => {
    return (
        <div className="legend mt-5">
            {Object.keys(contributorColors).map((contributor, index) => (
                <div key={index} className="flex legend-item">
                    <div
                        className="legend-color"
                        style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: contributorColors[contributor],
                            marginRight: "5px",
                            marginTop: "5px",
                        }}
                    ></div>
                    <div>{contributor}</div>
                </div>
            ))}
        </div>
    );
};


export default GitHubInfo;
