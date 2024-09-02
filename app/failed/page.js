'use client';

import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-50 p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl rounded-lg text-center p-8">
        <h2 className="text-3xl font-bold text-gray-800">Pagamento Annullato</h2>
        <p className="text-gray-600 mt-4">Il pagamento è stato annullato. Se hai avuto problemi, puoi riprovare.</p>
        <button
          className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none mt-6"
          onClick={() => router.push('/')}
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
}
