// pages/register.js
import { useState } from 'react';
import Link from 'next/link';

const RegisterPage = () => {
  const [selectedUsers, setSelectedUsers] = useState();

  const handleUserSelect = (userId) => {
    if (selectedUsers==userId) {
      // If user is already selected, remove them
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // If user is not selected, add them
      setSelectedUsers(userId);
    }
  };

  const handleRegistration = () => {
    // Handle registration with selected users
    console.log('Selected Users:', selectedUsers);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Who are you?</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select your role to register</label>
          <div className="grid grid-cols-2 gap-4">
            {/* User 1 */}
            <div
              onClick={() => handleUserSelect(1)}
              className={`cursor-pointer p-4 border rounded ${
                selectedUsers==1 ? 'bg-purple-500 text-white' : 'bg-gray-300'
              }`}
            >
              Register as Candidate
            </div>

            {/* User 2 */}
            <div
              onClick={() => handleUserSelect(2)}
              className={`cursor-pointer p-4 border rounded ${
                selectedUsers==2 ? 'bg-purple-500 text-white' : 'bg-gray-300'
              }`}
            >
              Register as HR Manager
            </div>
          </div>
        </div>

        <button
          onClick={handleRegistration}
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
        >
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/sign-in">
            <a className="text-purple-500">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
