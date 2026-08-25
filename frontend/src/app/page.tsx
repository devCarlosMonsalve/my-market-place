import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to My Market Place</h1>
      <p className="mb-8 text-lg text-gray-600">Discover amazing stores and offers</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/stores"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Browse Stores
        </Link>
        <Link
          href="/offers"
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Browse Offers
        </Link>
      </div>
    </div>
  );
}
