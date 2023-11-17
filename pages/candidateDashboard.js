import React from 'react'
import formattedDate from '../components/common/CurrentDate';

const CandidateDashboard = () => {
  return (
    <div className='padding-container'>
        <h1 className="font-bold text-2xl">Welcome, Brian</h1>
      <p>{formattedDate}</p>
    </div>
  )
}

export default CandidateDashboard