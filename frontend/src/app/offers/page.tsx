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

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Offer[]>('/offers')
      .then(setOffers)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load offers'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading offers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Offers</h1>
      {offers.length === 0 ? (
        <p className="text-gray-500">No offers found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={`/offers/${offer.id}`}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold">{offer.title}</h2>
              {offer.description && <p className="mb-3 text-sm text-gray-600">{offer.description}</p>}
              <p className="text-lg font-bold text-green-600">${offer.price.toFixed(2)}</p>
              <p className="mt-2 text-xs text-gray-400">From: {offer.store.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
