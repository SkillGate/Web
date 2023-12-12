import React from 'react'
import AboutItem from './AboutItem'
import { imageUrl } from "../../constants";
import { FaArrowAltCircleRight } from "react-icons/fa";

const data = [
  {
    id: 1,
    title: 'Commitment to Excellence',
    description: 'We are dedicated to delivering excellence in every aspect of our service.',
    icon: imageUrl.aboutitem1
  },
  {
    id: 2,
    title: 'Integrity and Transparency',
    description:
      'Upholding integrity and transparency in all our interactions.',
    icon: imageUrl.aboutitem2
  },
  {
    id: 3,
    title: 'Innovation',
    description:
      'Continuously innovating to improve the recruitment experience for all stakeholders.',
    icon: imageUrl.aboutitem3
  },
  {
    id: 4,
    title: 'Diversity and Inclusion',
    description:
      'Embracing diversity and fostering an inclusive environment for everyone.',
    icon: imageUrl.aboutitem4
  }
]

const About = () => {
  return (
    <section id='about' >
      <div className="relative isolate overflow-hidden container mx-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-20">
          <div className="flex flex-col sm:flex-row gap-10">
            <div className='relative max-w-4xl mt-12'>
              <div className="flex gap-2 mb-5 items-start"><FaArrowAltCircleRight style={{ color: 'purple', width: '50px' }}/><p className="text-lg font-semiBold">We offer an AI-powered recruitment system connecting HR managers and candidates seamlessly.</p></div>
              <div className="flex gap-2 mb-5 items-start"><FaArrowAltCircleRight style={{ color: 'purple', width: '50px' }}/><p className="text-lg font-semiBold">Our platform automatically matches candidate personas with company job posts and benefits, simplifying the selection process.</p></div>
              <div className="flex gap-2 mb-5 items-start"><FaArrowAltCircleRight style={{ color: 'purple', width: '50px' }}/><p className="text-lg font-semiBold">Candidates can create detailed CVs and personas, while HR managers can craft job posts and company profiles, ensuring personalized matches.</p></div>
              <div className="flex gap-2 mb-5 items-start"><FaArrowAltCircleRight style={{ color: 'purple', width: '50px' }}/><p className="text-lg font-semiBold">SkillGate automating candidate shortlisting, providing transparent reasons for selections, making the recruitment process more efficient and fair.</p></div>
              
              {/* <div className="flex gap-2 mb-2"><FaArrowAltCircleRight size={50} style={{ color: 'purple' }}/><p className="text-xl font-semiBold">Our platform automatically matches candidate personas with company job posts and benefits, simplifying the selection process.</p></div>
              <div className="flex gap-2 mb-2"><FaArrowAltCircleRight size={50} style={{ color: 'purple' }}/><h2 className="text-xl font-semiBold">Candidates can create detailed CVs and personas, while HR managers can craft job posts and company profiles, ensuring personalized matches.</h2></div>
              <div className="flex gap-2 mb-2"><FaArrowAltCircleRight size={50} style={{ color: 'purple' }}/><h2 className="text-xl font-semiBold">SkillGate automating candidate shortlisting, providing transparent reasons for selections, making the recruitment process more efficient and fair.</h2></div> */}
            </div>
            <div className="text-center mt-10 text-lg max-w-2xl">
              <h2 className="text-5xl font-bold mb-10">Our mission</h2>
              <span className="text-xl font-semiBold">is to bridge the gap between top-notch talent and exceptional opportunities. We strive to revolutionize the recruitment process and make hiring efficient, effective, and enjoyable for both employers and candidates.</span>
            </div>
          </div>
          {/* <div className='relative mx-auto max-w-c-1400 px-4 md:px-8 xl:px-0 mt-12'>
            <div className='grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-7'>
              {data?.map((item) => <AboutItem key={item.id} data={item} />)}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default About