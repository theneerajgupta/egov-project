export default function FeatureOverview() {
  return (
    <section className='bg-white border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-8 py-16 flex flex-col gap-10'>
        <div className='max-w-2xl flex flex-col gap-4'>
          <h2 className='text-lg text-gray-900 font-medium'>
            Core Capabilities
          </h2>
          <p className='text-base text-gray-700'>
            Structured modules designed for operational consistency and
            long-term administrative use.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className='bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4'
            >
              <div className='text-sm text-gray-500'>Module 0{item}</div>
              <div className='text-base text-gray-900 font-medium'>
                Structured Workflow
              </div>
              <p className='text-sm text-gray-700'>
                Standardized process definition with audit-friendly
                configuration and traceability.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
