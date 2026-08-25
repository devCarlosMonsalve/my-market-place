'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Store {
  id: number;
  name: string;
  description?: string;
  owner: { id: number; name: string };
  createdAt: string;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Store[]>('/stores')
      .then(setStores)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load stores'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading stores...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Stores</h1>
      {stores.length === 0 ? (
        <p className="text-gray-500">No stores found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${store.id}`}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold">{store.name}</h2>
              {store.description && <p className="mb-3 text-sm text-gray-600">{store.description}</p>}
              <p className="text-xs text-gray-400">By {store.owner.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
