'use client';

import NavLink from '@/components/ui/NavLinks';

export const LinkList = [
  { name: 'Greivance Module', path: '/grievances' },
  { name: 'Crisis Module', path: '/crisis' },
  { name: 'MTI Module', path: '/mti' },
  { name: 'RPSL Module', path: '/rpsl' },
];

export default function Navbar() {
  return (
    <header className='bg-gray-800 text-white p-4'>
      <nav className='container min-w-80 mx-auto flex-col justify-between items-center'>
        <h3 className='text-xl font-bold'>DG4Modules</h3>
        <ul className='flex flex-col w-full'>
          {LinkList.map((link) => (
            <li key={link.name}>
              <NavLink name={link.name} path={link.path} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
