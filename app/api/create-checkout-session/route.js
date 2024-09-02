'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = searchParams.get('referralCode');
    if (code) {
      setReferralCode(code);
      const link = `${window.location.origin}?ref=${code}`;
      setReferralLink(link);

      // Controlla se il link Telegram è già salvato nel localStorage
      const savedTelegramLink = localStorage.getItem('telegramLink');
      if (savedTelegramLink) {
        setTelegramLink(savedTelegramLink);
        setLoading(false);
      } else {
        // Se non è salvato, genera il link Telegram
        generateTelegramLink(code);
      }
    } else {
      // Se il referralCode non è presente, reindirizza alla pagina index
      router.push('/');
    }
  }, [searchParams, router]);

  const generateTelegramLink = async (referralCode) => {
    try {
      const response = await fetch('/api/generate-telegram-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setTelegramLink(data.telegramLink);
        // Salva il link Telegram nel localStorage
        localStorage.setItem('telegramLink', data.telegramLink);
      } else {
        console.error('Errore nella generazione del link Telegram');
      }
    } catch (error) {
      console.error('Errore nella richiesta al server', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl rounded-lg text-center p-8">
        <h2 className="text-3xl font-bold text-gray-800">Grazie per il pagamento!</h2>
        <p className="text-gray-600 mt-4">Condividi il tuo link di affiliazione con i tuoi amici:</p>
        <div className="bg-gray-100 text-gray-800 mt-6 p-4 rounded-lg font-mono break-all">
          {referralLink}
        </div>
        <button
          className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none mt-6"
          onClick={() => navigator.clipboard.writeText(referralLink)}
        >
          Copia Link
        </button>
        <p className="text-gray-600 mt-4">
          Per ogni persona che acquista il pre-order tramite il tuo link, riceverai un buono Amazon da <strong>10€</strong>!
        </p>

        {loading ? (
          <p className="text-gray-600 mt-6">Generazione del link Telegram...</p>
        ) : (
          telegramLink && (
            <div>
              <p className="text-gray-600 mt-6">Ecco il tuo link di accesso al nostro canale Elite Telegram per rimanere aggiornato sull'uscita del bot</p>
              <button
                className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none mt-6"
                onClick={() => window.open(telegramLink, '_blank')}
              >
                Apri Link Telegram
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
