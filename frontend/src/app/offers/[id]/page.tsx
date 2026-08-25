'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Offer {
  id: number;
  title: string;
  description?: string;
  price: number;
  store: { id: number; name: string };
}

interface Favorite {
  id: number;
  offer: {
    id: number;
  };
}

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem('token');
    setIsLoggedIn(loggedIn);

    Promise.all([
      api.get<Offer>(`/offers/${params.id}`),
      loggedIn ? api.get<Favorite[]>('/favorites').catch(() => []) : Promise.resolve([]),
    ])
      .then(([offerData, favorites]) => {
        setOffer(offerData);
        setFavorited(favorites.some((favorite) => favorite.offer.id === offerData.id));
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load offer'))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function toggleFavorite() {
    if (!offer || favoriteLoading) return;

    setFavoriteLoading(true);
    try {
      if (favorited) {
        await api.delete(`/favorites/${offer.id}`);
        setFavorited(false);
      } else {
        await api.post(`/favorites/${offer.id}`, {});
        setFavorited(true);
      }
    } catch {
      alert('Please login to manage favorites');
    } finally {
      setFavoriteLoading(false);
    }
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!offer) return <p className="text-center text-gray-500">Offer not found.</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/offers" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Back to Offers
      </Link>
      <div className="rounded-xl bg-white p-8 shadow">
        <h1 className="mb-3 text-3xl font-bold">{offer.title}</h1>
        {offer.description && <p className="mb-4 text-gray-600">{offer.description}</p>}
        <p className="mb-4 text-2xl font-bold text-green-600">${offer.price.toFixed(2)}</p>
        <p className="mb-6 text-sm text-gray-500">
          From store:{' '}
          <Link href={`/stores/${offer.store.id}`} className="text-blue-600 hover:underline">
            {offer.store.name}
          </Link>
        </p>
        {isLoggedIn && (
          <button
            onClick={toggleFavorite}
            disabled={favoriteLoading}
            className={`rounded-lg px-6 py-2 font-medium transition ${
              favorited
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {favorited ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        )}
      </div>
    </div>
  );
}
