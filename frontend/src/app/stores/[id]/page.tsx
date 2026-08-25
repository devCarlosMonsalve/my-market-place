'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Offer {
  id: number;
  title: string;
  description?: string;
  price: number;
}

interface Store {
  id: number;
  name: string;
  description?: string;
  owner: { id: number; name: string };
  offers: Offer[];
}

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Store>(`/stores/${params.id}`)
      .then(setStore)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load store'))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!store) return <p className="text-center text-gray-500">Store not found.</p>;

  return (
    <div>
      <Link href="/stores" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Back to Stores
      </Link>
      <h1 className="mb-2 text-3xl font-bold">{store.name}</h1>
      {store.description && <p className="mb-2 text-gray-600">{store.description}</p>}
      <p className="mb-6 text-sm text-gray-400">Owner: {store.owner.name}</p>
      <h2 className="mb-4 text-xl font-semibold">Offers</h2>
      {store.offers.length === 0 ? (
        <p className="text-gray-500">No offers in this store.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {store.offers.map((offer) => (
            <Link
              key={offer.id}
              href={`/offers/${offer.id}`}
              className="rounded-xl bg-white p-4 shadow transition hover:shadow-md"
            >
              <h3 className="mb-1 font-semibold">{offer.title}</h3>
              {offer.description && <p className="mb-2 text-sm text-gray-500">{offer.description}</p>}
              <p className="font-bold text-green-600">${offer.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
