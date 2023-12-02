// pages/register.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [selectedUsers, setSelectedUsers] = useState();
  const router = useRouter();

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
    if(selectedUsers == 1){
      router.push('/candidate-register');
    }else if(selectedUsers == 2){
      router.push('/employer-register');
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-form-container">
        <h2 className="text-2xl font-semibold mb-4">Who are you?</h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-400 font-bold mb-2">Select your role to register</label>
          <div className="grid grid-cols-2 gap-4">
            {/* User 1 */}
            <div
              onClick={() => handleUserSelect(1)}
              className={`cursor-pointer p-4 rounded ${
                selectedUsers==1 ? 'bg-primary text-white ' : 'bg-gray-300 dark:bg-gray-800'
              }`}
            >
              Register as Candidate
            </div>

            {/* User 2 */}
            <div
              onClick={() => handleUserSelect(2)}
              className={`cursor-pointer p-4 rounded ${
                selectedUsers==2 ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-800'
              }`}
            >
              Register as HR Manager
            </div>
          </div>
        </div>

        <button
          onClick={handleRegistration}
          className="w-full btn-primary-light text-white p-2 rounded"
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
