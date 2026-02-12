export default function HeroSection() {
  return (
    <section className='bg-white border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-8 py-16'>
        <div className='max-w-2xl flex flex-col gap-6'>
          {/* Heading */}
          <h1 className='text-xl text-gray-900 font-medium'>
            A Structured Platform for Modern Public Services
          </h1>

          {/* Body */}
          <p className='text-base text-gray-700'>
            Delivering reliable digital workflows for institutions, agencies,
            and organizations that require clarity, control, and long-term
            stability.
          </p>

          {/* Supporting Text */}
          <p className='text-sm text-gray-500'>
            Built for operational continuity. Designed for administrative
            clarity.
          </p>

          {/* Actions */}
          <div className='flex items-center gap-4 pt-2'>
            <button className='px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150'>
              Get Started
            </button>

            <button className='px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150'>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
