import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loader from "../common/Loader";
import { predictBenefits } from "../../apiCalls/jobApiCalls";
const BenefitsPopUp = ({onClose,candidateId,jobId,user,candidateDetails }) => {

    const [loading, setLoading] = useState(false);
    const [predictions,setPredictions]=useState(["","","","","","","",[],[]])
    useEffect(() => {
        const fetchData = async () => {
            const applyCandidates = candidateDetails
            ?.filter(candidate => candidate?.id === candidateId)
            .map(candidate => ({
                id: candidate?._id,
                skills: candidate?.skills,
                experience: candidate?.experience,
                education: candidate?.education,
            }));
            try {
                const { data, loading } = await predictBenefits(
                  jobId,
                  user?.accessToken,
                  candidateId,
                  applyCandidates
                );
                console.log(data);
                setPredictions(data);
                setLoading(loading);
              } catch (error) {
                console.error("Error job fetching:", error);
                setLoading(false);
              }
        };
        fetchData();
      }, []);

    // const predictions=[
    //     "$1,330.00 USD - $1,670.00 USD",
    //     "Hybrid",
    //     "6 - 8 hours",
    //     "Flexible to handle emergency cases. Otherwise it is fixed.",
    //     "2 days",
    //     "1 days",
    //     "Based on the performance. No matter about the years of employment",
    //     [
    //         "Knowledge Sharing sessions",
    //     ],
    //     [
    //         "Health and welfare benefits",
    //         "Health and welfare benefits",
    //         "Health and welfare benefits"
    //     ]
    // ];
    return !loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 transition-opacity z-50">
          <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
            <button className="float-right text-gray-500" onClick={onClose}>
              <IoMdClose />
            </button>
            <h2 className="text-xl font-bold mb-8">Predicted Compensation & Benefits</h2>
            <div class="flex flex-row p-4 bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Salary</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[0]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Work method</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[1]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Work hours</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[2]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Flexibility of working hours</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[3]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Monthly leaves</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[4]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Annual leaves</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[5]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Opportunity to promotion</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[6]}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Development opportunities</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[7].map(key=>(key+" , "))}</div>
            </div>
            <div class="flex flex-row bg-gray-200 dark:bg-gray-800">
                <div class="flex w-1/2 p-4 font-bold">Other Benefits</div>
                <div class="flex w-1/2 p-4 overflow-auto">{predictions[8].map(key=>(key+" , "))}</div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      );

};

export default BenefitsPopUp;

