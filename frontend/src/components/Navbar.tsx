'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem('token'));
    syncAuth();
    window.addEventListener('storage', syncAuth);
    window.addEventListener('auth-change', syncAuth as EventListener);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('auth-change', syncAuth as EventListener);
    };
  }, [pathname]);

  function logout() {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    setIsLoggedIn(false);
    router.push('/');
  }

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyMarketPlace
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/stores" className="text-gray-700 hover:text-blue-600">
            Stores
          </Link>
          <Link href="/offers" className="text-gray-700 hover:text-blue-600">
            Offers
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/favorites" className="text-gray-700 hover:text-blue-600">
                Favorites
              </Link>
              <button onClick={logout} className="text-red-500 hover:text-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
