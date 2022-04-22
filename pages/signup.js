import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { supabase } from '../utils/SupabaseClient';
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log({error});;
    } else {
      router.push('/');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Create new account
        </h1>
        <div className="flex flex-col p-6">
        <form className="mt-2 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-200">
            Email
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mt-6 text-gray-200">
            Password
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <button
            className="mt-5 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
          >
            <Link href="/signin">Sign in with Email</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;