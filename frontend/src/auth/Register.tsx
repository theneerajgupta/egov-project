import { useState } from 'react';
import axios from 'axios';

interface FormContent {
  name: string;
  email: string;
  user_type: string;
  phone: string;
  password: string;
}

interface ApiResult {
  status: 'idle' | 'success' | 'error';
  message: string;
  data?: unknown;
}

const initialFormState: FormContent = {
  name: '',
  email: '',
  user_type: '',
  phone: '',
  password: '',
};

export default function Register() {
  const [form, setForm] = useState<FormContent>(initialFormState);
  const [result, setResult] = useState<ApiResult>({
    status: 'idle',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ CORRECT EVENT TYPE
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult({ status: 'idle', message: 'Submitting...' });

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/register',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setResult({
        status: 'success',
        message: 'Registration successful',
        data: response.data,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setResult({
          status: 'error',
          message:
            error.response?.data?.message || error.message || 'Request failed',
          data: error.response?.data,
        });
      } else {
        setResult({
          status: 'error',
          message: 'Unexpected error occurred',
          data: error,
        });
      }
    }
  };

  return (
    <div className='flex w-full h-full gap-4 p-4'>
      {/* FORM */}
      <form
        className='p-4 gap-2 border flex flex-1 flex-col'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='name'
          placeholder='name'
          value={form.name}
          onChange={handleChange}
          className='border py-2 px-4'
        />

        <input
          type='email'
          name='email'
          placeholder='email'
          value={form.email}
          onChange={handleChange}
          className='border py-2 px-4'
        />

        <input
          type='text'
          name='phone'
          placeholder='phone'
          value={form.phone}
          onChange={handleChange}
          className='border py-2 px-4'
        />

        <input
          type='text'
          name='user_type'
          placeholder='user_type'
          value={form.user_type}
          onChange={handleChange}
          className='border py-2 px-4'
        />

        <input
          type='password'
          name='password'
          placeholder='password'
          value={form.password}
          onChange={handleChange}
          className='border py-2 px-4'
        />

        <button type='submit' className='border py-2 px-4 text-lg'>
          Submit
        </button>
      </form>

      {/* RESULT PANEL */}
      <div className='border flex flex-1 p-4'>
        {result.status === 'idle' && (
          <p className='text-gray-500'>Awaiting submission…</p>
        )}

        {result.status === 'success' && (
          <div className='text-green-600'>
            <h3 className='font-bold'>Success</h3>
            <pre className='text-sm mt-2'>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}

        {result.status === 'error' && (
          <div className='text-red-600'>
            <h3 className='font-bold'>Error</h3>
            <p className='mt-2'>{String(result.message)}</p>

            <pre className='text-sm mt-2'>
              {String(
                result.data
                  ? JSON.stringify(result.data, null, 2)
                  : 'No error data',
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
