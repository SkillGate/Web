import React from 'react'
import Image from 'next/image'
import { imageUrl } from '../../constants'
// import { imageUrl } from '@/constants'

const AboutItem = ({ data }) => {
  return (
    <div>
      <div className='p-4'>
        <div className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50' >
          <div >
            <Image className='mb-10' src={data.icon} alt={data.title} width='60' height='60' />
            <p>{data.title}</p>
            <span className='absolute inset-0'></span>
            <p className='mt-1 text-gray-500 '>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutItem
