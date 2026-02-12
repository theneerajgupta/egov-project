export default function MetricsSection() {
  return (
    <section className='bg-white border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-8 py-16 flex flex-col gap-10'>
        <div className='max-w-2xl flex flex-col gap-4'>
          <h2 className='text-lg text-gray-900 font-medium'>
            Operational Overview
          </h2>
          <p className='text-base text-gray-700'>
            High-level metrics representing system stability and institutional
            performance.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { label: 'Active Deployments', value: '24' },
            { label: 'Processed Transactions', value: '1.2M' },
            { label: 'System Availability', value: '99.98%' },
          ].map((metric, index) => (
            <div
              key={index}
              className='bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-3'
            >
              <div className='text-xl text-gray-900 font-medium'>
                {metric.value}
              </div>
              <div className='text-sm text-gray-500'>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
