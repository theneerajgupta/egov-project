import dgLogo from '@/public/dg_logo.png';
import govIndiaLogo from '@/public/Emblem_of_India.png';
import Image from 'next/image';
import Link from 'next/link';

export function ExternalNavbar() {
  return (
    <header className='w-full bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto flex flex-row items-center justify-between px-8 h-24'>
        {/* Left Section */}
        <div className='flex flex-row gap-6 items-center'>
          {/* Logos */}
          <div className='flex flex-row gap-4 items-center'>
            <Image
              src={govIndiaLogo}
              alt='Government of India Emblem'
              className='h-16 w-auto object-contain'
              priority
            />
            <Image
              src={dgLogo}
              alt='DGShipping Logo'
              className='h-16 w-auto object-contain'
              priority
            />
          </div>

          {/* Text Block */}
          <div className='flex flex-col min-h-full justify-center'>
            {/* 🔹 Your Original Title CSS (unchanged) */}
            <div className='text-xl font-semibold flex flex-1 flex-col justify-center text-gray-900'>
              Directorate General of Shipping
            </div>

            <div className='flex flex-col'>
              <div className='text-sm text-gray-500 leading-[120%]'>
                Ministry of Ports, Shipping and Waterways
              </div>
              <div className='text-sm text-gray-500 leading-[120%]'>
                Government of India
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <Link
            href='/login'
            className='px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150'
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
