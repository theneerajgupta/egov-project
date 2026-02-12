export function ExternalAccessibilityBar() {
  return (
    <div className='w-full bg-gray-900 border-b border-gray-800 text-sm text-gray-300'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-8 py-2'>
        {/* Left Section */}
        <div className='flex items-center gap-3 text-gray-400'>
          <div>Government of India</div>
          <div className='text-gray-600'>|</div>
          <button className='hover:text-white transition-colors duration-150'>
            Sitemap
          </button>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-6'>
          {/* Font Controls */}
          <div className='flex items-center gap-2'>
            {['A-', 'A', 'A+'].map((label) => (
              <button
                key={label}
                type='button'
                className='px-3 py-1 text-xs font-medium text-gray-300 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors duration-150'
              >
                {label}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <select className='px-3 py-1 text-xs text-gray-300 border border-gray-700 rounded-md bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-colors duration-150'>
            <option value='en'>English</option>
            <option value='hi'>Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
}
