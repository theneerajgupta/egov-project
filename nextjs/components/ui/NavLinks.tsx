'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksType {
  name: string;
  path: string;
}

export default function NavLink({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const pathName: string = usePathname();
  const isActive: boolean = pathName === path;

  return (
    <Link
      href={path}
      className={`p-2 ${isActive ? 'text-blue-400 font-semibold' : 'hover:text-grey-400'}`}
    >
      {name}
    </Link>
  );
}
