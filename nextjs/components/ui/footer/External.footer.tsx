export default function ExternalFooter() {
  return (
    <footer className='bg-white border-t border-gray-200'>
      <div className='max-w-6xl mx-auto px-8 py-12 flex flex-col gap-8'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='flex flex-col gap-3'>
            <h3 className='text-base text-gray-900 font-medium'>
              Organization Name
            </h3>
            <p className='text-sm text-gray-500'>
              Structured digital infrastructure for administrative and public
              systems.
            </p>
          </div>

          {/* Navigation */}
          <div className='flex flex-col gap-3'>
            <h4 className='text-sm text-gray-900 font-medium'>Navigation</h4>
            <ul className='flex flex-col gap-2 text-sm text-gray-700'>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='flex flex-col gap-3'>
            <h4 className='text-sm text-gray-900 font-medium'>Resources</h4>
            <ul className='flex flex-col gap-2 text-sm text-gray-700'>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Policies
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className='flex flex-col gap-3'>
            <h4 className='text-sm text-gray-900 font-medium'>Legal</h4>
            <ul className='flex flex-col gap-2 text-sm text-gray-700'>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-900 transition-colors duration-150'
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-200 pt-6 text-sm text-gray-500'>
          © {new Date().getFullYear()} Organization Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
