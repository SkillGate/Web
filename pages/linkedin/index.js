import React, { useState } from 'react';
import Back from "../../components/common/Back";
import { skilldata, recommendationsdata } from "../../data/linkedinData";

const BlogInfo = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (skill_name) => {
        setIsHovered(skill_name);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const firstRec = recommendationsdata[0];
    const [currentRecommendation, setCurrentRecommendation] = useState(firstRec);
    const [currentIndex, setCurrentIndex] = useState(0);

    function moveCard(position) {
        const numberOfObjects = recommendationsdata.length
        if (position === "left") {
            if (currentIndex === 0) {
                setCurrentRecommendation(recommendationsdata[numberOfObjects - 1]);
                setCurrentIndex(numberOfObjects - 1);
            } else {
                setCurrentRecommendation(recommendationsdata[currentIndex - 1]);
                setCurrentIndex(currentIndex - 1);
            }
        } else if (position === "right") {
            if (currentIndex === numberOfObjects - 1) {
                setCurrentRecommendation(recommendationsdata[0]);
                setCurrentIndex(0);
            } else {
                setCurrentRecommendation(recommendationsdata[currentIndex + 1]);
                setCurrentIndex(currentIndex + 1);
            }
        }
    }

    return (

        <div className="container mx-auto">
            <div className="padding-container mb-5">
                <Back url={"/shortlist/1"} />
            </div>
            <div className="container mx-auto flex flex-wrap items-center text-start my-4">
                <div className="mb-10 w-full">
                    <h2 className="font-bold text-lg mb-10 text-center">Skills</h2>
                    <div className="max-w-5xl mx-auto relative flex flex-wrap mt-5 shadow-md bg-white rounded-lg p-5">
                        {skilldata.map(skill => (
                            <div
                                key={skill.skill_name}
                                className="w-full sm:w-1/2 lg:w-1/4 pl-5 mb-5 hover:bg-purple-500 hover:text-white rounded-lg p-2"
                                onMouseEnter={() => handleMouseEnter(skill.skill_name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <h3>{skill.skill_name}</h3>
                                {isHovered === skill.skill_name && (
                                    <div className="absolute bg-gray-600 text-gray-100 rounded-lg p-2 shadow-md">
                                        <h1>Skill Utilized Environments</h1>
                                        <p>{skill.utilize}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-10 w-full">
                    <h2 className="font-bold text-lg mb-10 text-center">Recommendations</h2>
                    <div className="mt-5">
                        <div class="max-w-5xl mx-auto relative overflow-hidden">
                            <div class="relative">
                                <div class="testimonial-card flex transition-transform duration-300 ease-in-out justify-center items-center">
                                    <div class="w-full bg-white rounded-lg m-1 p-12 shadow-md text-center">
                                        <p class="text-gray-700">{currentRecommendation.description}</p>
                                        <p class="text-gray-600 font-semibold mt-4">- {currentRecommendation.name} </p>
                                    </div>
                                </div>
                                <div class="swipe-button left-0" onClick={() => moveCard('left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-500 hover:text-purple-800" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414L10.414 10l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="swipe-button right-0" onClick={() => moveCard('right')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-500 hover:text-purple-800" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414-1.414L9.586 10 6.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default BlogInfo;