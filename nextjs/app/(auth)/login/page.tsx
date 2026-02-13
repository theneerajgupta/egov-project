'use client';

import { useState, SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Login } from '@/lib/auth/auth-client';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setIsError(true);
      setMessage('Incomplete Credentials');
      return;
    }

    setIsProcessing(true);
    setIsError(false);
    setMessage('Signing in…');

    try {
      const response = await Login(email, password);
      console.log(response);
      if (!!response) router.push('/dashboard');
    } catch {
      setIsError(true);
      setMessage('Invalid credentials');
      setIsProcessing(false);
    }
  }

  return (
    <main className='flex flex-1 flex-col p-4 space-y-12 justify-center items-center'>
      <div className='p-4 w-120 flex flex-col gap-6'>
        <div>
          <h3 className='text-2xl font-medium'>Sign in to your account</h3>
          <p className='text-normal font-normal leading-tight'>
            Continue with your registered email and password to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          {/* Email */}
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            disabled={isProcessing}
            className='rounded-md border px-3 py-2 text-normal w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300'
          />

          {/* Password */}
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            disabled={isProcessing}
            className='rounded-md border px-3 py-2 text-normal w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300'
          />

          <button
            type='submit'
            disabled={isProcessing}
            className='rounded-md border px-3 py-2 text-normal w-full font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60'
          >
            {isProcessing ? 'PROCESSING…' : 'LOGIN'}
          </button>

          {message && (
            <div
              className={`text-sm font-bold text-center ${
                isError ? 'text-red-600' : 'text-green-700'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
