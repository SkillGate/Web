import React from 'react'
import Image from 'next/image'
import { imageUrl } from '../../constants'
// import { imageUrl } from '@/constants'

const AboutItem = ({ data }) => {
  return (
    <div>
      <div className='p-4'>
        <div className='group relative flex gap-x-6 rounded-lg p-4 transition-transform ease-in-out duration-300 hover:scale-125 hover:shadow-lg hover:shadow-purple-400/50' >
          <div >
            <Image
              className='mb-10'
              src={data.icon}
              alt={data.title}
              width='60'
              height='60'
            />
            <p className='mt-3 font-semibold'>{data.title}</p>
            <span className='absolute inset-0'></span>
            <p className='mt-3 text-gray-500 '>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutItem
