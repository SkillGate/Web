import React, { useState, useEffect } from "react";
import Back from "../../components/common/Back";
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
import { GetUserData } from "../../apiCalls/userApiCalls";
import { useRouter } from "next/router";
import FullPageLoader from "../../components/common/FullPageLoader";

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
  const router = useRouter();
  const { id } = router.query;
  const [userProjectData, setUserProjectData] = useState([]);
  const [user, setUser] = useState(null);
  const [currentGitHubUrl, setCurrentGitHubUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userJson = JSON.parse(storedUserData);
    setUser((prev) => userJson);
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const {
          data: userData = [],
          loading,
          error,
        } = await GetUserData(id, user?.accessToken);

        if (error) {
          setChange(!change);
        }

        const candidateProfile = {
          projects: userData?.projects,
        };

        setUserProjectData((prev) => {
          const githubData = [];

          if (userData?.projects) {
            userData?.projects?.map((project, index) => {
              githubData.push({
                projectName: project.projectName,
                projectUrl: project.gitHubLink,
              });
            });
          }
          return githubData;
        });
        console.log(userProjectData);
        // setChange(!change);
        setLoading(loading);
      } catch (error) {
        console.error("Error job fetching:", error);
        setChange(!change);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id, change]);

  console.log(userProjectData);

  const options = [
    { label: "Restaurant" },
    { label: "Employee Managment - CoEM" },
    { label: "Career Guidance System" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    console.log(selectedValue);
  };

  const handleConfirm = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/github/projects?gitHubUrl=${selectedItem}`
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let partialData = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partialData += decoder.decode(value, { stream: true });

        try {
          const parsedData = JSON.parse(partialData);
          setData((prevData) => [...prevData, parsedData]);
          partialData = "";
        } catch (error) {}
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return !loading ? (
    <div>
      <div className="container mx-auto flex flex-wrap justify-around items-center text-center my-4 mb-10">
        <div>
          <select
            className="block w-full px-4 py-2 text-base leading-tight bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-purple-500"
            onChange={handleSelect}
          >
            <option disabled selected>
              Select a project
            </option>
            {userProjectData.map((project, index) => (
              <option
                key={index}
                value={project.projectUrl}
                className="text-base font-sans"
              >
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={handleConfirm}
            className="mt-2 w-full px-4 py-2 text-sm font-medium text-white btn-primary-light border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Details
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, outerIndex) =>
          extractChartData(item).map((chartData, innerIndex) => (
            <div
              key={outerIndex}
              className="rounded-md overflow-hidden border p-4 bg-white dark:bg-dark-card"
            >
              <h2 className="text-xl font-bold mb-4">{chartData.repoName}</h2>
              <Line data={chartData} options={chartData.options} />
              {renderLegend(chartData.contributorColors)}
              <h3 className="mt-5">Languages:</h3>
              {renderLanguages(chartData.languages)}
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <div>
      <FullPageLoader />
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
