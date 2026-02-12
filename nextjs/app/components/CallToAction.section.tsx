export default function CallToAction() {
  return (
    <section className='bg-white'>
      <div className='max-w-6xl mx-auto px-8 py-16'>
        <div className='border border-gray-200 rounded-lg p-8 flex flex-col gap-6 max-w-2xl'>
          <h2 className='text-lg text-gray-900 font-medium'>
            Initiate an Institutional Deployment
          </h2>

          <p className='text-base text-gray-700'>
            Engage with our team to evaluate alignment with your operational
            framework.
          </p>

          <div>
            <button className='px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150'>
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
