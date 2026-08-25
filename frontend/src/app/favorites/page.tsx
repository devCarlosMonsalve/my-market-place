'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Favorite {
  id: number;
  offer: {
    id: number;
    title: string;
    description?: string;
    price: number;
    store: { id: number; name: string };
  };
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    api
      .get<Favorite[]>('/favorites')
      .then(setFavorites)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load favorites'))
      .finally(() => setLoading(false));
  }, [router]);

  async function removeFavorite(offerId: number) {
    try {
      await api.delete(`/favorites/${offerId}`);
      setFavorites((prev) => prev.filter((favorite) => favorite.offer.id !== offerId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  }

  if (loading) return <p className="text-center text-gray-500">Loading favorites...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">
          You have no favorites yet.{' '}
          <Link href="/offers" className="text-blue-600 hover:underline">
            Browse offers
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <div key={fav.id} className="rounded-xl bg-white p-6 shadow">
              <Link href={`/offers/${fav.offer.id}`}>
                <h2 className="mb-2 text-xl font-semibold hover:text-blue-600">{fav.offer.title}</h2>
              </Link>
              {fav.offer.description && <p className="mb-3 text-sm text-gray-600">{fav.offer.description}</p>}
              <p className="text-lg font-bold text-green-600">${fav.offer.price.toFixed(2)}</p>
              <p className="mt-1 text-xs text-gray-400">From: {fav.offer.store.name}</p>
              <button
                onClick={() => removeFavorite(fav.offer.id)}
                className="mt-3 text-sm text-red-500 hover:text-red-700"
              >
                Remove from favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
