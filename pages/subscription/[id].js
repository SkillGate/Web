import React from 'react';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Choose Your Subscription Plan</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 mx-auto">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-lg mb-4">Get started with basic features</p>
            <p className="text-4xl font-bold mb-4">$0<span className="text-base text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2">
              <li>5 job postings per month</li>
              <li>Basic candidate search</li>
              <li>Email support</li>
            </ul>
            <button className="w-full btn-primary-light text-white py-2 rounded-md">Choose Free</button>
          </div>
          <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 mx-auto">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-lg mb-4">Advanced features for small teams</p>
            <p className="text-4xl font-bold mb-4">$29<span className="text-base text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2">
              <li>50 job postings per month</li>
              <li>Advanced candidate search</li>
              <li>Candidate management tools</li>
              <li>Chat support</li>
            </ul>
            <button className="w-full btn-primary-light text-white py-2 rounded-md">Choose Basic</button>
          </div>
          <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 mx-auto">
            <h3 className="text-2xl font-bold mb-4">Premium</h3>
            <p className="text-lg mb-4">All features for large teams</p>
            <p className="text-4xl font-bold mb-4">$99<span className="text-base text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2">
              <li>Unlimited job postings</li>
              <li>AI-powered candidate matching</li>
              <li>Detailed analytics</li>
              <li>Custom reports</li>
              <li>Priority support</li>
            </ul>
            <button className="w-full btn-primary-light text-white py-2 rounded-md">Choose Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
