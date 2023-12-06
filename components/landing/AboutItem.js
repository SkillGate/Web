import React from 'react'
import Image from 'next/image'
import { imageUrl } from '../../constants'
// import { imageUrl } from '@/constants'

const AboutItem = ({ data }) => {
  return (
    <div>
      <div className='p-4 bg-white rounded-sm shadow-md transition-transform ease-in-out duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-400/50 h-80 w-80'>
        <div className='group relative flex gap-x-6 rounded-lg p-4 justify-center items-center mx-auto' >
          <div >
            <Image
              className='mb-10'
              src={data.icon}
              alt={data.title}
              width='60'
              height='60'
            />
            <p className='mt-3 font-semibold text-lg py-2'>{data.title}</p>
            <span className='absolute inset-0'></span>
            <p className='mt-3 text-gray-500 '>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutItem
